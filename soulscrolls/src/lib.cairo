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
    use core::array::ArrayTrait;

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
        fn reveal_scroll(ref self: TContractState, id: felt252);
        fn get_all_scrolls(self: @TContractState) -> core::array::Array::<core::felt252>;
        fn get_user_scrolls(self: @TContractState, user: ContractAddress) -> core::array::Array::<core::felt252>;
    }

    #[storage]
    struct Storage {
        scrolls: Map<felt252, Scroll>,
        all_scroll_ids: Map<u64, felt252>,
        all_scrolls_len: u64,
        user_scroll_ids: Map<(ContractAddress, u64), felt252>,
        user_scrolls_len: Map<ContractAddress, u64>,
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
            // Add to all_scroll_ids
            let all_len = self.all_scrolls_len.read();
            self.all_scroll_ids.entry(all_len).write(id);
            self.all_scrolls_len.write(all_len + 1);
            // Add to author's scrolls
            let author_len = self.user_scrolls_len.entry(author).read();
            self.user_scroll_ids.entry((author, author_len)).write(id);
            self.user_scrolls_len.entry(author).write(author_len + 1);
            // Add to recipient's scrolls
            let recipient_len = self.user_scrolls_len.entry(recipient).read();
            self.user_scroll_ids.entry((recipient, recipient_len)).write(id);
            self.user_scrolls_len.entry(recipient).write(recipient_len + 1);
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

        fn reveal_scroll(ref self: ContractState, id: felt252) {
            let caller = get_caller_address();
            let mut scroll = self.scrolls.entry(id).read();

            // Check if the caller is the recipient
            assert(caller == scroll.recipient, 'Not the recipient');

            // Check if the unlock time has passed
            let current_time = get_block_timestamp();
            assert(current_time >= scroll.unlock_time, 'Scroll is time-locked');
            
            // Mark the scroll as revealed
            scroll.revealed = true;
            self.scrolls.entry(id).write(scroll);

            // Emit the reveal event
            self.emit(Event::ScrollRevealed(ScrollRevealed {
                id,
                author: scroll.author,
                recipient: scroll.recipient,
                unlock_time: scroll.unlock_time,
                is_public: scroll.is_public,
            }));
        }

        fn get_all_scrolls(self: @ContractState) -> core::array::Array::<core::felt252> {
            let mut all_scroll_ids = core::array::ArrayTrait::new();
            let len = self.all_scrolls_len.read();
            let mut i = 0;
            while i < len {
                let id = self.all_scroll_ids.entry(i).read();
                all_scroll_ids.append(id);
                i += 1;
            }
            all_scroll_ids
        }

        fn get_user_scrolls(self: @ContractState, user: ContractAddress) -> core::array::Array::<core::felt252> {
            let mut user_scroll_ids = core::array::ArrayTrait::new();
            let len = self.user_scrolls_len.entry(user).read();
            let mut i = 0;
            while i < len {
                let id = self.user_scroll_ids.entry((user, i)).read();
                user_scroll_ids.append(id);
                i += 1;
            }
            user_scroll_ids
        }
    }
}