// Integration tests for SoulScrolls contract
use soulscrolls::SoulScrolls::{ISoulScrollsDispatcher, ISoulScrollsDispatcherTrait, ScrollSealed, ScrollRevealed, Event};
use snforge_std::{declare, DeclareResultTrait, ContractClassTrait};
use snforge_std::{EventSpyAssertionsTrait, spy_events};
use snforge_std::{start_cheat_block_timestamp, stop_cheat_block_timestamp, start_cheat_caller_address, stop_cheat_caller_address};
use starknet::ContractAddress;

// Helper function to deploy the contract
fn deploy_contract() -> ISoulScrollsDispatcher {
    let contract = declare("SoulScrolls");
    let constructor_args = array![];
    let (contract_address, _err) = contract
        .unwrap()
        .contract_class()
        .deploy(@constructor_args)
        .unwrap();
    ISoulScrollsDispatcher { contract_address }
}

#[test]
fn test_seal_and_reveal_scroll() {
    let dispatcher = deploy_contract();
    let mut spy = spy_events();

    // Set up test addresses and scroll parameters
    let author: ContractAddress = 123.try_into().unwrap();
    let recipient: ContractAddress = 456.try_into().unwrap();
    let scroll_id: felt252 = 1;
    let message: felt252 = 42;
    let unlock_time: u64 = 1000;
    let is_public: bool = false;

    // Set the caller as author
    start_cheat_caller_address(dispatcher.contract_address, author);

    // Seal the scroll
    dispatcher.seal_scroll(scroll_id, message, unlock_time, is_public, recipient);

    // Check that the ScrollSealed event was emitted
    let expected_event = Event::ScrollSealed(
        soulscrolls::SoulScrolls::ScrollSealed {
            id: scroll_id,
            author,
            recipient,
            unlock_time,
            is_public,
        }
    );
    let expected_events = array![(dispatcher.contract_address, expected_event)];
    spy.assert_emitted(@expected_events);

    // Try to reveal before unlock time (should panic)
    // (Commented out for now, as reveal_scroll is not implemented)
    // let result = std::panic::catch_unwind(|| {
    //     dispatcher.reveal_scroll(scroll_id);
    // });
    // assert!(result.is_err(), "Reveal before unlock time should panic");

    // Advance block timestamp to after unlock_time
    // start_cheat_block_timestamp(dispatcher.contract_address, unlock_time + 1);

    // Reveal the scroll (should succeed)
    // dispatcher.reveal_scroll(scroll_id);

    // Check that the ScrollRevealed event was emitted
    // let expected_event = SoulScrolls::Event::ScrollRevealed(
    //     ScrollRevealed {
    //         id: scroll_id,
    //         author,
    //         recipient,
    //         unlock_time,
    //         is_public,
    //     }
    // );
    // let expected_events = array![(dispatcher.contract_address, expected_event)];
    // spy.assert_emitted(@expected_events);

    // Clean up cheatcodes
    // stop_cheat_block_timestamp(dispatcher.contract_address);
    stop_cheat_caller_address(dispatcher.contract_address);
}
