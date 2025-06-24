import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Account, Contract, RpcProvider } from 'starknet';

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

// Demo account (DO NOT use in production)
const DEMO_PRIVATE_KEY = "0x06db1530373282f627ffdf5267ac14865c882cda80927c61f748756bcb5a091b";
const DEMO_ACCOUNT_ADDRESS = "0x04295ff9d2eE81A9eD8a3753ED9ebCE77189D7362f14478Eef09283b801840d1";

const Send: React.FC = () => {
  const [recipient, setRecipient] = useState('');
  const [text, setText] = useState('');
  const [unlockTime, setUnlockTime] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [status, setStatus] = useState('');

  const handleSend = async () => {
    setStatus('Sending...');
    try {
      const provider = new RpcProvider({ nodeUrl: "https://starknet-sepolia.public.blastapi.io/rpc/v0_7" });
      const account = new Account(provider, DEMO_ACCOUNT_ADDRESS, DEMO_PRIVATE_KEY);
      const contract = new Contract(ABI, CONTRACT_ADDRESS, account);
      // Use timestamp as id for demo
      const id = Date.now().toString();
      const message = text;
      const unlock_time = Math.floor(new Date(unlockTime).getTime() / 1000);
      const is_public = !isAnonymous;
      const recipient_addr = recipient;
      const tx = await contract.seal_scroll(id, message, unlock_time, is_public, recipient_addr);
      setStatus(`Sent! Tx hash: ${tx.transaction_hash}`);
    } catch (e: any) {
      setStatus(e.message || 'Failed to send');
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center py-24 relative overflow-hidden">
      <div className="absolute -top-32 -right-32 w-[600px] h-[600px] bg-gradient-to-br from-pink-400 via-violet-500 to-blue-400 rounded-full blur-3xl opacity-40 animate-pulse z-0" />
      <motion.div
        className="glass-card card-animated-border p-10 w-full max-w-2xl flex flex-col items-center text-center shadow-2xl rounded-3xl border-2 border-blue-400/30 bg-gradient-to-br from-pink-400/30 via-violet-400/20 to-blue-400/20 relative z-10"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <div className="text-5xl mb-6 animate-bounce-slow">💌</div>
        <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-pink-300 via-violet-300 to-blue-300">Send a Time-Locked Message</h2>
        <input
          className="w-full rounded-xl p-4 bg-black/30 text-blue-100 text-lg mb-4 border border-pink-400/20 focus:border-pink-400/60 outline-none backdrop-blur-md"
          placeholder="Recipient wallet or ENS..."
          value={recipient}
          onChange={e => setRecipient(e.target.value)}
        />
        <textarea
          className="w-full min-h-[100px] rounded-xl p-4 bg-black/30 text-blue-100 text-lg mb-4 border border-pink-400/20 focus:border-pink-400/60 outline-none resize-none backdrop-blur-md"
          placeholder="Write your message..."
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <div className="flex flex-col md:flex-row gap-4 w-full mb-6">
          <input
            type="datetime-local"
            className="flex-1 rounded-lg p-3 bg-black/30 text-blue-100 border border-violet-400/30 focus:border-pink-400/60 outline-none backdrop-blur-md"
            value={unlockTime}
            onChange={e => setUnlockTime(e.target.value)}
          />
          <label className="flex items-center gap-2 cursor-pointer text-blue-200">
            <input
              type="checkbox"
              checked={isAnonymous}
              onChange={e => setIsAnonymous(e.target.checked)}
              className="accent-pink-500 w-5 h-5"
            />
            Anonymous
          </label>
        </div>
        <motion.button
          className="mt-2 bg-gradient-to-r from-pink-500 via-violet-500 to-blue-500 text-white font-bold py-3 px-10 rounded-xl shadow-lg hover:shadow-pink-400/40 transition-all text-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleSend}
        >
          🪄 Send
        </motion.button>
        <div className="mt-4 text-blue-200">{status}</div>
      </motion.div>
    </section>
  );
};

export default Send; 