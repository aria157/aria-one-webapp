# ARIA ONE integration operations

## Canonical network configuration

The repo now treats `src/config/networks.json` as the public source of truth for:

- supported networks
- chain IDs
- default RPC endpoints
- explorer URLs
- default public contract addresses
- swap links

Secrets and environment-specific overrides must stay in GitHub/Vercel/local environment variables only.

## Environment matrix

| Environment | Frontend URL | API base URL | Web3 network | RPC source | Contract address source | Explorer | Deployment target | Required secrets |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| local | `http://localhost:3000` | `REACT_APP_API_BASE_URL` | `baseSepolia` | `BASE_SEPOLIA_RPC_URL` or public fallback | `REACT_APP_BASE_SEPOLIA_CONTRACT_ADDRESS` | Base Sepolia | local machine | `REACT_APP_ALCHEMY_API_KEY` optional, `HARDHAT_DEPLOYER_PRIVATE_KEY` optional |
| preview | Vercel preview URL | preview API URL | `baseSepolia` | `BASE_SEPOLIA_RPC_URL` | `REACT_APP_BASE_SEPOLIA_CONTRACT_ADDRESS` | Base Sepolia | Vercel preview | `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID` |
| staging | team-defined staging URL | staging API URL | `baseSepolia` unless promoted | `BASE_SEPOLIA_RPC_URL` | `REACT_APP_BASE_SEPOLIA_CONTRACT_ADDRESS` | Base Sepolia | optional Vercel environment | same as preview plus any staging API secrets |
| production | production Vercel domain | production API URL | `base` | `BASE_MAINNET_RPC_URL` | `REACT_APP_BASE_CONTRACT_ADDRESS` | Base mainnet | Vercel production | `BASESCAN_API_KEY`, `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID` |

## Required GitHub secrets

### Repository or environment secrets

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`
- `ETH_SEPOLIA_RPC_URL`
- `BASE_SEPOLIA_RPC_URL`
- `BASE_MAINNET_RPC_URL`
- `HARDHAT_DEPLOYER_PRIVATE_KEY`
- `ETHERSCAN_API_KEY`
- `BASESCAN_API_KEY`

### Frontend runtime variables

- `REACT_APP_APP_ENV`
- `REACT_APP_FRONTEND_URL`
- `REACT_APP_API_BASE_URL`
- `REACT_APP_WEB3_NETWORK`
- `REACT_APP_CONTRACT_ADDRESS`
- `REACT_APP_BASE_CONTRACT_ADDRESS`
- `REACT_APP_BASE_SEPOLIA_CONTRACT_ADDRESS`
- `REACT_APP_SEPOLIA_CONTRACT_ADDRESS`
- `REACT_APP_ALCHEMY_API_KEY`

## Manual GitHub setup

1. Add the CI workflow as a required status check for protected branches.
2. Protect `main` with pull request review, no force push, and no branch deletion.
3. Create GitHub environments named `preview` and `production`.
4. Store Vercel credentials in the matching GitHub environments.
5. Store chain RPC and explorer API keys as repository secrets unless environment-specific values are required.
6. Rotate any secret previously committed to git history before relying on these workflows.

## Manual GitKraken setup

1. Connect GitKraken to the `aria157/aria-one-webapp` GitHub repository.
2. Authenticate GitKraken with GitHub access that can read pull requests, branches, and issues.
3. Mirror the GitHub protected branch policy inside GitKraken workspaces.
4. Use pull-request based merges into `main`.
5. Confirm GitKraken boards or issue integrations point to the same GitHub repository and default branch.

## Manual Vercel setup

1. Import the repository into the correct Vercel project.
2. Add the production domain and any preview/staging domains.
3. Set build command to `npm run build` and output directory to `build`.
4. Add frontend runtime variables for preview and production.
5. Keep secret values in Vercel project/environment settings only.

## Validation checklist

- `npm run build`
- `npm run compile`
- `npm test`
- verify the frontend network badge shows the intended chain
- verify explorer links open the intended contract
- verify wallet token import uses the intended contract address
- verify preview and production deployments read the correct environment variables

## Immediate follow-up

- Rotate the previously committed private key and API keys because removing them from the current branch does not erase git history.
- Fill in missing Sepolia and Base Sepolia contract addresses before enabling preview/staging deployments.
- Decide whether staging is required as a separate Vercel environment or can stay aligned to preview.
