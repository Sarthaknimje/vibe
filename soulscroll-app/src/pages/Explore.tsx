import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import ScrollWall from '../components/ScrollWall';
import { Contract, RpcProvider } from "starknet";

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

const Explore: React.FC = () => {
  const [scrolls, setScrolls] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchScrolls() {
      setLoading(true);
      setError(null);
      try {
        const provider = new RpcProvider({ nodeUrl: "https://starknet-sepolia.public.blastapi.io/rpc/v0_7" });
        const contract = new Contract(ABI, CONTRACT_ADDRESS, provider);
        const result = await contract.get_all_scrolls();
        setScrolls(result[0] || []);
      } catch (e: any) {
        setError(e.message || "Failed to fetch scrolls");
      } finally {
        setLoading(false);
      }
    }
    fetchScrolls();
  }, []);

  return (
    <section className="min-h-screen py-24 relative overflow-hidden">
      <div className="absolute -top-32 -right-32 w-[600px] h-[600px] bg-gradient-to-br from-pink-400 via-violet-500 to-blue-400 rounded-full blur-3xl opacity-40 animate-pulse z-0" />
      <div className="container mx-auto px-4 relative z-10">
        <motion.h2
          className="text-5xl md:text-6xl font-bold mb-12 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-violet-400 to-blue-400 text-center drop-shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          🌌 Explore the Scroll Wall
        </motion.h2>
        {/* TODO: Add filters/search here */}
        <ScrollWall />
        {loading && <div>Loading scrolls...</div>}
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <ul>
          {scrolls.map((id, idx) => (
            <li key={idx}>{id}</li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Explore; 