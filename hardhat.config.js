require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      },
      evmVersion: "shanghai"
    }
  },
  networks: {
    sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/A2HFBOITe9WJOi0-mO7YA",
      accounts: ["bb442aac0eaf633368d4936021808fedf86c6cd080c00956db4d7d52ad11a281"]
    },
    base: {
      url: "https://mainnet.base.org", // Base mainnet
      accounts: ["bb442aac0eaf633368d4936021808fedf86c6cd080c00956db4d7d52ad11a281"],
      chainId: 8453
    },
    baseSepolia: {
      url: "https://sepolia.base.org", // Base testnet
      accounts: ["bb442aac0eaf633368d4936021808fedf86c6cd080c00956db4d7d52ad11a281"],
      chainId: 84532
    }
  },
  etherscan: {
    apiKey: "BY29V8PDBPNSM84EUW5ARYVUG4EJ2J1D97",
    customChains: [
      {
        network: "base",
        chainId: 8453,
        urls: {
          apiURL: "https://api.basescan.org/api",
          browserURL: "https://basescan.org"
        }
      }
    ]
  },
  sourcify: {
    enabled: false
  }
};
