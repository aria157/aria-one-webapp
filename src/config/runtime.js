import networks from './networks.json';

const networkOverrides = {
  base: process.env.REACT_APP_BASE_CONTRACT_ADDRESS || process.env.REACT_APP_CONTRACT_ADDRESS || '',
  baseSepolia: process.env.REACT_APP_BASE_SEPOLIA_CONTRACT_ADDRESS || '',
  sepolia: process.env.REACT_APP_SEPOLIA_CONTRACT_ADDRESS || '',
};

const requestedNetworkKey = process.env.REACT_APP_WEB3_NETWORK || networks.defaultNetwork;
const activeNetworkKey = networks.networks[requestedNetworkKey] ? requestedNetworkKey : networks.defaultNetwork;
const activeNetwork = networks.networks[activeNetworkKey];
const alchemyApiKey = process.env.REACT_APP_ALCHEMY_API_KEY || '';

function getRpcUrl(network) {
  if (!alchemyApiKey || !network.alchemyNetwork) {
    return network.rpcUrl;
  }

  return `https://${network.alchemyNetwork}.g.alchemy.com/v2/${alchemyApiKey}`;
}

const contractAddress = networkOverrides[activeNetworkKey] || activeNetwork.contractAddress || '';

export const runtimeConfig = {
  appEnv: process.env.REACT_APP_APP_ENV || 'local',
  frontendUrl: process.env.REACT_APP_FRONTEND_URL || '',
  apiBaseUrl: process.env.REACT_APP_API_BASE_URL || '',
  networkKey: activeNetworkKey,
  network: activeNetwork,
  rpcUrl: getRpcUrl(activeNetwork),
  contractAddress,
  explorerAddressUrl: contractAddress ? `${activeNetwork.explorerUrl}/address/${contractAddress}` : '',
  swapUrl: activeNetwork.swapUrl || '',
};
