require("@nomicfoundation/hardhat-toolbox");

const fs = require("fs");
const path = require("path");
const sharedNetworks = require("./src/config/networks.json");

function loadEnvFile(fileName) {
  const filePath = path.join(__dirname, fileName);

  if (!fs.existsSync(filePath)) {
    return;
  }

  let lines = [];

  try {
    lines = fs.readFileSync(filePath, "utf8").split(/\r?\n/);
  } catch (error) {
    console.warn(`Unable to read ${fileName}: ${error.message}`);
    return;
  }

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
  const placeholderPattern = /\b(your|placeholder|changeme|example)\b/i;
  const normalized = trimmed.startsWith("0x") ? trimmed.slice(2) : trimmed;

  if (!trimmed || placeholderPattern.test(trimmed)) {
    return "";
  }

  if (!/^[a-fA-F0-9]{64}$/.test(normalized)) {
    return "";
  }

  return `0x${normalized}`;
}

const deployerPrivateKey = normalizePrivateKey(process.env.HARDHAT_DEPLOYER_PRIVATE_KEY);
const accounts = deployerPrivateKey ? [deployerPrivateKey] : [];

const rpcUrls = {
  sepolia: process.env.ETH_SEPOLIA_RPC_URL || sharedNetworks.networks.sepolia.rpcUrl,
  base: process.env.BASE_MAINNET_RPC_URL || sharedNetworks.networks.base.rpcUrl,
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
  },
  etherscan: {
    apiKey: {
      sepolia: process.env.ETHERSCAN_API_KEY || "",
      base: process.env.BASESCAN_API_KEY || process.env.ETHERSCAN_API_KEY || "",
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
    ],
  },
  sourcify: {
    enabled: false,
  },
};
