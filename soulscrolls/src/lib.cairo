#[starknet::contract]
pub mod SoulScrolls {
    #[derive(Drop, starknet::Event)]
    pub struct ScrollSealed {
        pub id: felt252,
        pub author: starknet::ContractAddress,
        pub recipient: starknet::ContractAddress,
        pub unlock_time: u64,
        pub is_public: bool,
    }
    #[derive(Drop, starknet::Event)]
    pub struct ScrollRevealed {
        pub id: felt252,
        pub author: starknet::ContractAddress,
        pub recipient: starknet::ContractAddress,
        pub unlock_time: u64,
        pub is_public: bool,
    }
    #[event]
    #[derive(Drop, starknet::Event)]
    pub enum Event {
        ScrollSealed: ScrollSealed,
        ScrollRevealed: ScrollRevealed,
    }

    use starknet::ContractAddress;
    use starknet::get_caller_address;
    use starknet::get_block_timestamp;
    use starknet::storage::{Map, StoragePathEntry, StoragePointerReadAccess, StoragePointerWriteAccess};

    #[derive(Copy, Drop, Serde, PartialEq, starknet::Store)]
    pub struct Scroll {
        pub author: ContractAddress,
        pub recipient: ContractAddress,
        pub message: felt252,
        pub unlock_time: u64,
        pub is_public: bool,
        pub revealed: bool,
    }

    #[starknet::interface]
    pub trait ISoulScrolls<TContractState> {
        fn seal_scroll(
            ref self: TContractState,
            id: felt252,
            message: felt252,
            unlock_time: u64,
            is_public: bool,
            recipient: ContractAddress
        );
        fn get_scroll(self: @TContractState, id: felt252) -> Scroll;
    }

    #[storage]
    struct Storage {
        scrolls: Map<felt252, Scroll>,
    }

    #[abi(embed_v0)]
    impl SoulScrollsImpl of ISoulScrolls<ContractState> {
        fn seal_scroll(
            ref self: ContractState,
            id: felt252,
            message: felt252,
            unlock_time: u64,
            is_public: bool,
            recipient: ContractAddress
        ) {
            let author = get_caller_address();
            let scroll = Scroll {
                author,
                recipient,
                message,
                unlock_time,
                is_public,
                revealed: false,
            };
            self.scrolls.entry(id).write(scroll);
            self.emit(Event::ScrollSealed(ScrollSealed {
                id,
                author,
                recipient,
                unlock_time,
                is_public,
            }));
        }

        fn get_scroll(self: @ContractState, id: felt252) -> Scroll {
            self.scrolls.entry(id).read()
        }
    }
}