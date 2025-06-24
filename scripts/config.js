import { config as dotenvConfig } from 'dotenv';
import { readFileSync } from 'fs';
import path from 'path';

// Load environment variables from the specific path
dotenvConfig({ path: '/Users/sarthakchandrashekharnimje/projects/SOULSCROLL/soulscrolls/.env' });

// Network configurations
const networks = {
    sepolia: {
        name: 'sepolia',
        rpcUrl: process.env.SEPOLIA_RPC_URL || 'https://starknet-sepolia.public.blastapi.io/rpc/v0_7',
        chainId: '0x534e5f5345504f4c4941',
    },
    mainnet: {
        name: 'mainnet',
        rpcUrl: process.env.MAINNET_RPC_URL || 'https://starknet-mainnet.public.blastapi.io/rpc/v0_7',
        chainId: '0x534e5f4d41494e',
    },
};

// Get current network
const currentNetwork = process.env.STARKNET_NETWORK || 'sepolia';

if (!networks[currentNetwork]) {
    throw new Error(`Unsupported network: ${currentNetwork}. Supported networks: ${Object.keys(networks).join(', ')}`);
}

// Validate required environment variables
function validateEnvVars() {
    const required = ['ACCOUNT_ADDRESS', 'PRIVATE_KEY', 'OWNER_ADDRESS'];
    const missing = required.filter(key => !process.env[key]);
    
    if (missing.length > 0) {
        throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
    }
}

// Load and validate configuration
try {
    validateEnvVars();
} catch (error) {
    console.error('❌ Configuration Error:', error.message);
    console.log('💡 Please create a .env file with required variables.');
    process.exit(1);
}

export const config = {
    // Network configuration
    network: currentNetwork,
    rpcUrl: networks[currentNetwork].rpcUrl,
    chainId: networks[currentNetwork].chainId,
    
    // Account configuration
    accountAddress: process.env.ACCOUNT_ADDRESS,
    privateKey: process.env.PRIVATE_KEY,
    
    // Contract configuration
    ownerAddress: process.env.OWNER_ADDRESS,
    classHash: process.env.CLASS_HASH || null,
    salt: process.env.SALT || '0x0',
    
    // Contract paths for SoulScrolls
    sierraPath: './soulscrolls/target/dev/soulscrolls_SoulScrolls.contract_class.json',
    casmPath: './soulscrolls/target/dev/soulscrolls_SoulScrolls.compiled_contract_class.json',
};

// Helper function to check if contract files exist
export function checkContractFiles() {
    // Get absolute paths to be sure
    const absoluteSierraPath = path.resolve(config.sierraPath);
    const absoluteCasmPath = path.resolve(config.casmPath);

    console.log(`🔍 Checking for Sierra file at: ${absoluteSierraPath}`);
    console.log(`🔍 Checking for Casm file at: ${absoluteCasmPath}`);

    try {
        readFileSync(absoluteSierraPath);
        readFileSync(absoluteCasmPath);
        console.log('✅ Found both contract files.');
        return true;
    } catch (error) {
        console.error('❌ Contract files not found. Please compile the contract first:');
        console.log('   scarb build');
        return false;
    }
}

// Display configuration summary
export function displayConfig() {
    console.log('⚙️  Configuration:');
    console.log(`   Network: ${config.network}`);
    console.log(`   RPC URL: ${config.rpcUrl}`);
    console.log(`   Account: ${config.accountAddress}`);
    console.log(`   Owner: ${config.ownerAddress}`);
    console.log(`   Salt: ${config.salt}`);
    if (config.classHash) {
        console.log(`   Class Hash: ${config.classHash}`);
    }
    console.log();
} 