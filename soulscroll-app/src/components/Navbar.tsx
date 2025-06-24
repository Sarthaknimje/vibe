import React, { useState, useEffect } from 'react';
import { connect, disconnect } from 'starknetkit';
import { WebWalletConnector } from 'starknetkit/webwallet';
import { InjectedConnector } from 'starknetkit/injected';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

const shorten = (addr: string) => addr.slice(0, 6) + '...' + addr.slice(-4);

const Navbar: React.FC = () => {
  const [address, setAddress] = useState<string>('');
  const [wallet, setWallet] = useState<any>(undefined);
  const [connecting, setConnecting] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const connectToStarknet = async () => {
      const { wallet, connectorData } = await connect({ modalMode: 'neverAsk' });
      if (wallet && wallet.isConnected) {
        setWallet(wallet);
        setAddress(connectorData.account || wallet.selectedAddress || '');
      }
    };
    connectToStarknet();
  }, []);

  const handleConnect = async () => {
    setConnecting(true);
    const { wallet, connectorData } = await connect({
      modalMode: 'alwaysAsk',
      modalTheme: 'system',
      connectors: [
        new InjectedConnector({ options: { id: 'argentX', name: 'Argent X' } }),
        new InjectedConnector({ options: { id: 'braavos', name: 'Braavos' } }),
        new WebWalletConnector({ url: 'https://web.argent.xyz' }),
      ],
    });
    setConnecting(false);
    if (wallet && connectorData) {
      setWallet(wallet);
      setAddress(connectorData.account || wallet.selectedAddress || '');
    }
  };

  const handleDisconnect = async () => {
    await disconnect();
    setWallet(undefined);
    setAddress('');
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 py-4 glass-card card-animated-border backdrop-blur-lg bg-black/30" style={{ minHeight: 64 }}>
      <motion.div className="flex items-center gap-3 select-none" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
        <Link to="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">SoulScrolls</Link>
        <span className="text-2xl">🪄</span>
      </motion.div>
      <div className="flex items-center gap-6">
        {address && (
          <motion.div className="flex gap-2 items-center" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <Link to="/write" className={`px-4 py-2 rounded-xl font-semibold transition-all duration-200 ${location.pathname === '/write' ? 'bg-gradient-to-r from-pink-500 via-violet-500 to-blue-500 text-white shadow-lg' : 'text-blue-200 hover:bg-black/30'}`}>Write</Link>
            <Link to="/explore" className={`px-4 py-2 rounded-xl font-semibold transition-all duration-200 ${location.pathname === '/explore' ? 'bg-gradient-to-r from-pink-500 via-violet-500 to-blue-500 text-white shadow-lg' : 'text-blue-200 hover:bg-black/30'}`}>Explore</Link>
            <Link to="/send" className={`px-4 py-2 rounded-xl font-semibold transition-all duration-200 ${location.pathname === '/send' ? 'bg-gradient-to-r from-pink-500 via-violet-500 to-blue-500 text-white shadow-lg' : 'text-blue-200 hover:bg-black/30'}`}>Send</Link>
            <Link to="/my-scrolls" className={`px-4 py-2 rounded-xl font-semibold transition-all duration-200 ${location.pathname === '/my-scrolls' ? 'bg-gradient-to-r from-pink-500 via-violet-500 to-blue-500 text-white shadow-lg' : 'text-blue-200 hover:bg-black/30'}`}>My Scrolls</Link>
          </motion.div>
        )}
        {address ? (
          <motion.div className="flex items-center gap-2 bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 text-white px-4 py-2 rounded-xl font-mono shadow-lg border border-purple-400/40" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <span className="hidden sm:inline">{shorten(address)}</span>
            <button onClick={handleDisconnect} className="ml-2 px-2 py-1 rounded bg-black/30 hover:bg-black/60 transition text-xs">Disconnect</button>
          </motion.div>
        ) : (
          <motion.button
            onClick={handleConnect}
            className="flex items-center gap-2 bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 text-white px-5 py-2 rounded-xl font-bold shadow-lg border border-purple-400/40 hover:scale-105 transition-all duration-200"
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            disabled={connecting}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="-ml-1"><circle cx="12" cy="12" r="10" fill="#fff" opacity="0.15"/><path d="M7 12h10M12 7v10" stroke="#fff" strokeWidth="2" strokeLinecap="round"/></svg>
            {connecting ? 'Connecting...' : 'Connect Wallet'}
          </motion.button>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 