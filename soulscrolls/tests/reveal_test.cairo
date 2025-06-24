use snforge_std::{declare, ContractClassTrait, DeclareResultTrait, start_cheat_caller_address, stop_cheat_caller_address, start_cheat_block_timestamp, stop_cheat_block_timestamp};
use soulscrolls::SoulScrolls::{ISoulScrollsDispatcher, ISoulScrollsDispatcherTrait};
use starknet::ContractAddress;

// Helper function to deploy the contract
fn deploy_contract() -> ISoulScrollsDispatcher {
    let contract = declare("SoulScrolls").unwrap().contract_class();
    let owner: ContractAddress = 999.try_into().unwrap();
    let (contract_address, _) = contract.deploy(@array![owner.into()]).unwrap();
    ISoulScrollsDispatcher { contract_address }
}

#[test]
fn test_reveal_scroll_successfully() {
    let dispatcher = deploy_contract();
    let author: ContractAddress = 1.try_into().unwrap();
    let recipient: ContractAddress = 2.try_into().unwrap();
    let scroll_id = 1;
    let unlock_time = 1000;

    // Seal the scroll
    start_cheat_caller_address(dispatcher.contract_address, author);
    dispatcher.seal_scroll(scroll_id, 42, unlock_time, false, recipient);
    stop_cheat_caller_address(dispatcher.contract_address);

    // Advance time past the unlock time
    start_cheat_block_timestamp(dispatcher.contract_address, unlock_time + 1);

    // Reveal the scroll as the recipient
    start_cheat_caller_address(dispatcher.contract_address, recipient);
    dispatcher.reveal_scroll(scroll_id);
    stop_cheat_caller_address(dispatcher.contract_address);
    
    // Check that the scroll is marked as revealed
    let scroll = dispatcher.get_scroll(scroll_id);
    assert(scroll.revealed, 'Not revealed');

    // Clean up cheatcodes
    stop_cheat_block_timestamp(dispatcher.contract_address);
}

#[test]
#[should_panic(expected: ('Not the recipient',))]
fn test_reveal_scroll_by_wrong_user() {
    let dispatcher = deploy_contract();
    let author: ContractAddress = 1.try_into().unwrap();
    let recipient: ContractAddress = 2.try_into().unwrap();
    let wrong_user: ContractAddress = 3.try_into().unwrap();
    let scroll_id = 1;

    // Seal the scroll
    start_cheat_caller_address(dispatcher.contract_address, author);
    dispatcher.seal_scroll(scroll_id, 42, 0, false, recipient);
    stop_cheat_caller_address(dispatcher.contract_address);
    
    // Attempt to reveal as the wrong user
    start_cheat_caller_address(dispatcher.contract_address, wrong_user);
    dispatcher.reveal_scroll(scroll_id);
    stop_cheat_caller_address(dispatcher.contract_address);
}

#[test]
#[should_panic(expected: ('Scroll is time-locked',))]
fn test_reveal_scroll_before_unlock_time() {
    let dispatcher = deploy_contract();
    let author: ContractAddress = 1.try_into().unwrap();
    let recipient: ContractAddress = 2.try_into().unwrap();
    let scroll_id = 1;
    let unlock_time = 1000;

    // Seal the scroll
    start_cheat_caller_address(dispatcher.contract_address, author);
    dispatcher.seal_scroll(scroll_id, 42, unlock_time, false, recipient);
    stop_cheat_caller_address(dispatcher.contract_address);

    // Set the block time to be before the unlock time
    start_cheat_block_timestamp(dispatcher.contract_address, unlock_time - 1);

    // Attempt to reveal as the recipient
    start_cheat_caller_address(dispatcher.contract_address, recipient);
    dispatcher.reveal_scroll(scroll_id);
    stop_cheat_caller_address(dispatcher.contract_address);

    // Clean up cheatcodes
    stop_cheat_block_timestamp(dispatcher.contract_address);
} 