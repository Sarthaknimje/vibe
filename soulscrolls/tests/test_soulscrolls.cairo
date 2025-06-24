use snforge_std::{declare, ContractClassTrait, DeclareResultTrait};
use soulscrolls::SoulScrolls::{ISoulScrollsDispatcher, ISoulScrollsDispatcherTrait};
use starknet::ContractAddress;

fn deploy_contract() -> ISoulScrollsDispatcher {
    let contract = declare("SoulScrolls").unwrap().contract_class();
    let owner: ContractAddress = 999.try_into().unwrap();
    let (contract_address, _) = contract.deploy(@array![owner.into()]).unwrap();
    ISoulScrollsDispatcher { contract_address }
}

#[test]
fn test_seal_and_get_scroll() {
    let dispatcher = deploy_contract();
    let author: ContractAddress = 123.try_into().unwrap();
    let recipient: ContractAddress = 456.try_into().unwrap();

    snforge_std::start_cheat_caller_address(dispatcher.contract_address, author);
    dispatcher.seal_scroll(1, 42, 1000, false, recipient);
    snforge_std::stop_cheat_caller_address(dispatcher.contract_address);

    let scroll = dispatcher.get_scroll(1);
    assert(scroll.author == author, 'author');
    assert(scroll.recipient == recipient, 'recipient');
    assert(scroll.message == 42, 'message');
}

#[test]
fn test_scroll_listing() {
    let dispatcher = deploy_contract();
    let author1: ContractAddress = 1.try_into().unwrap();
    let author2: ContractAddress = 2.try_into().unwrap();
    let recipient1: ContractAddress = 3.try_into().unwrap();
    let recipient2: ContractAddress = 4.try_into().unwrap();

    snforge_std::start_cheat_caller_address(dispatcher.contract_address, author1);
    dispatcher.seal_scroll(1, 101, 0, false, recipient1);
    dispatcher.seal_scroll(2, 102, 0, true, recipient2);
    snforge_std::stop_cheat_caller_address(dispatcher.contract_address);

    snforge_std::start_cheat_caller_address(dispatcher.contract_address, author2);
    dispatcher.seal_scroll(3, 103, 0, false, recipient1);
    snforge_std::stop_cheat_caller_address(dispatcher.contract_address);

    let all_scrolls = dispatcher.get_all_scrolls();
    assert(all_scrolls.len() == 3, 'all_scrolls');

    let user1_scrolls = dispatcher.get_user_scrolls(author1);
    assert(user1_scrolls.len() == 2, 'user1_scrolls');

    let user2_scrolls = dispatcher.get_user_scrolls(author2);
    assert(user2_scrolls.len() == 1, 'user2_scrolls');
    
    let recipient1_scrolls = dispatcher.get_user_scrolls(recipient1);
    assert(recipient1_scrolls.len() == 2, 'recipient1_scrolls');
} 