require("@nomicfoundation/hardhat-toolbox");

const fs = require("fs");
const path = require("path");
const sharedNetworks = require("./src/config/networks.json");

function loadEnvFile(fileName) {
  const filePath = path.join(__dirname, fileName);

  if (!fs.existsSync(filePath)) {
    return;
  }

  const lines = fs.readFileSync(filePath, "utf8").split(/\r?\n/);

  for (const line of lines) {
    const trimmed = line.trim();

    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }

    const separatorIndex = trimmed.indexOf("=");

    if (separatorIndex === -1) {
      continue;
    }

    const key = trimmed.slice(0, separatorIndex).trim();
    const value = trimmed.slice(separatorIndex + 1).trim().replace(/^['"]|['"]$/g, "");

    if (key && !process.env[key]) {
      process.env[key] = value;
    }
  }
}

loadEnvFile(".env");
loadEnvFile(".env.local");

function normalizePrivateKey(value) {
  if (!value) {
    return "";
  }

  const trimmed = value.trim();
  const placeholderPattern = /your|placeholder|changeme|example/i;

  if (!trimmed || placeholderPattern.test(trimmed)) {
    return "";
  }

  return trimmed.startsWith("0x") ? trimmed : `0x${trimmed}`;
}

const deployerPrivateKey = normalizePrivateKey(process.env.HARDHAT_DEPLOYER_PRIVATE_KEY);
const accounts = deployerPrivateKey ? [deployerPrivateKey] : [];

const rpcUrls = {
  sepolia: process.env.ETH_SEPOLIA_RPC_URL || sharedNetworks.networks.sepolia.rpcUrl,
  base: process.env.BASE_MAINNET_RPC_URL || sharedNetworks.networks.base.rpcUrl,
  baseSepolia: process.env.BASE_SEPOLIA_RPC_URL || sharedNetworks.networks.baseSepolia.rpcUrl,
};

module.exports = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
      evmVersion: "shanghai",
    },
  },
  networks: {
    sepolia: {
      url: rpcUrls.sepolia,
      accounts,
      chainId: sharedNetworks.networks.sepolia.chainId,
    },
    base: {
      url: rpcUrls.base,
      accounts,
      chainId: sharedNetworks.networks.base.chainId,
    },
    baseSepolia: {
      url: rpcUrls.baseSepolia,
      accounts,
      chainId: sharedNetworks.networks.baseSepolia.chainId,
    },
  },
  etherscan: {
    apiKey: {
      sepolia: process.env.ETHERSCAN_API_KEY || "",
      base: process.env.BASESCAN_API_KEY || process.env.ETHERSCAN_API_KEY || "",
      baseSepolia: process.env.BASESCAN_API_KEY || process.env.ETHERSCAN_API_KEY || "",
    },
    customChains: [
      {
        network: "base",
        chainId: sharedNetworks.networks.base.chainId,
        urls: {
          apiURL: "https://api.basescan.org/api",
          browserURL: sharedNetworks.networks.base.explorerUrl,
        },
      },
      {
        network: "baseSepolia",
        chainId: sharedNetworks.networks.baseSepolia.chainId,
        urls: {
          apiURL: "https://api-sepolia.basescan.org/api",
          browserURL: sharedNetworks.networks.baseSepolia.explorerUrl,
        },
      },
    ],
  },
  sourcify: {
    enabled: false,
  },
};
