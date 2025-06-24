const { Account, Contract, RpcProvider } = require('starknet');

const CONTRACT_ADDRESS = "0x435a0378eb95d5427d6b76b79ba68090f2e92e1d1932db2e0f1c2dab018bae9";
const ABI = [
  {"type":"impl","name":"SoulScrollsImpl","interface_name":"soulscrolls::SoulScrolls::ISoulScrolls"},
  {"type":"enum","name":"core::bool","variants":[{"name":"False","type":"()"},{"name":"True","type":"()"}]},
  {"type":"struct","name":"soulscrolls::SoulScrolls::Scroll","members":[{"name":"author","type":"core::starknet::contract_address::ContractAddress"},{"name":"recipient","type":"core::starknet::contract_address::ContractAddress"},{"name":"message","type":"core::felt252"},{"name":"unlock_time","type":"core::integer::u64"},{"name":"is_public","type":"core::bool"},{"name":"revealed","type":"core::bool"}]},
  {"type":"interface","name":"soulscrolls::SoulScrolls::ISoulScrolls","items":[{"type":"function","name":"seal_scroll","inputs":[{"name":"id","type":"core::felt252"},{"name":"message","type":"core::felt252"},{"name":"unlock_time","type":"core::integer::u64"},{"name":"is_public","type":"core::bool"},{"name":"recipient","type":"core::starknet::contract_address::ContractAddress"}],"outputs":[],"state_mutability":"external"},{"type":"function","name":"get_scroll","inputs":[{"name":"id","type":"core::felt252"}],"outputs":[{"type":"soulscrolls::SoulScrolls::Scroll"}],"state_mutability":"view"},{"type":"function","name":"reveal_scroll","inputs":[{"name":"id","type":"core::felt252"}],"outputs":[],"state_mutability":"external"},{"type":"function","name":"get_all_scrolls","inputs":[],"outputs":[{"type":"core::array::Array::<core::felt252>"}],"state_mutability":"view"},{"type":"function","name":"get_user_scrolls","inputs":[{"name":"user","type":"core::starknet::contract_address::ContractAddress"}],"outputs":[{"type":"core::array::Array::<core::felt252>"}],"state_mutability":"view"}]},
  {"type":"constructor","name":"constructor","inputs":[{"name":"owner","type":"core::starknet::contract_address::ContractAddress"}]},
  {"type":"event","name":"soulscrolls::SoulScrolls::ScrollSealed","kind":"struct","members":[{"name":"id","type":"core::felt252","kind":"data"},{"name":"author","type":"core::starknet::contract_address::ContractAddress","kind":"data"},{"name":"recipient","type":"core::starknet::contract_address::ContractAddress","kind":"data"},{"name":"unlock_time","type":"core::integer::u64","kind":"data"},{"name":"is_public","type":"core::bool","kind":"data"}]},
  {"type":"event","name":"soulscrolls::SoulScrolls::ScrollRevealed","kind":"struct","members":[{"name":"id","type":"core::felt252","kind":"data"},{"name":"author","type":"core::starknet::contract_address::ContractAddress","kind":"data"},{"name":"recipient","type":"core::starknet::contract_address::ContractAddress","kind":"data"},{"name":"unlock_time","type":"core::integer::u64","kind":"data"},{"name":"is_public","type":"core::bool","kind":"data"}]},
  {"type":"event","name":"soulscrolls::SoulScrolls::Event","kind":"enum","variants":[{"name":"ScrollSealed","type":"soulscrolls::SoulScrolls::ScrollSealed","kind":"nested"},{"name":"ScrollRevealed","type":"soulscrolls::SoulScrolls::ScrollRevealed","kind":"nested"}]}
];

// Replace with your provided keys
const PRIVATE_KEY = "0x03edad6a165d53f39228260882a53ab07b0938f5d629a09545ff532c8ba5a071";
const ACCOUNT_ADDRESS = "0x04295ff9d2eE81A9eD8a3753ED9ebCE77189D7362f14478Eef09283b801840d1";

async function main() {
  const args = process.argv.slice(2);
  if (args.length < 3) {
    console.log("Usage: node send_scroll.js <message> <unlock_time_iso> <is_private>");
    process.exit(1);
  }
  const [message, unlockTimeIso, isPrivateStr] = args;
  const unlock_time = Math.floor(new Date(unlockTimeIso).getTime() / 1000);
  const is_private = isPrivateStr === 'true';
  const is_public = !is_private;
  const recipient_addr = ACCOUNT_ADDRESS; // For demo, send to self
  const id = Date.now().toString();

  const provider = new RpcProvider({ nodeUrl: "https://starknet-sepolia.public.blastapi.io/rpc/v0_7" });
  const account = new Account(provider, ACCOUNT_ADDRESS, PRIVATE_KEY);
  const contract = new Contract(ABI, CONTRACT_ADDRESS, account);

  try {
    const tx = await contract.seal_scroll(id, message, unlock_time, is_public, recipient_addr);
    console.log(`Sent! Tx hash: ${tx.transaction_hash}`);
  } catch (e) {
    console.error(e);
  }
}

main(); 