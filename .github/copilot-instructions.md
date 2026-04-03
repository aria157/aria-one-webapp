# Copilot Instructions for aria-one-webapp

## Project Overview

ARIA ONE Universe is a Web3 DApp combining a React frontend with Ethereum smart contracts. It features a KEYX ERC-20 token and a user-facing recording/interaction interface deployed on Vercel.

## Tech Stack

- **Frontend**: React 18 (JavaScript, Create React App)
- **Smart Contracts**: Solidity 0.8.20, Hardhat 2, OpenZeppelin Contracts 5
- **Web3**: ethers.js v6
- **Deployment**: Vercel (frontend), Sepolia / Base / Base Sepolia (contracts)

## Project Structure

```
src/          # React frontend (App.js, App.css, index.js)
scripts/      # Hardhat deployment scripts
public/       # Static assets and HTML entry point
hardhat.config.js  # Hardhat network and compiler config
```

## Development Setup

```bash
npm install          # Install all dependencies
npm start            # Start the React dev server
npm run build        # Build React app for production
npm run compile      # Compile Solidity contracts
npm test             # Run Hardhat contract tests
npm run node         # Start a local Hardhat node
npm run deploy:local # Deploy contracts to local Hardhat network
```

## Coding Standards

### JavaScript / React
- Use JavaScript (not TypeScript) for all frontend code.
- Use React functional components and hooks (`useEffect`, `useState`, etc.).
- Keep all components inside `src/`.
- Use `async/await` for asynchronous code.
- Use camelCase for variables and function names.
- Use single quotes for strings.

### Solidity
- Target Solidity version `0.8.20`.
- Use OpenZeppelin contracts for standard patterns (ERC-20, access control, etc.).
- Enable the optimizer (200 runs) and target EVM version `shanghai` as configured in `hardhat.config.js`.
- Write Hardhat tests for all new contract functionality.

### CSS / Styling
- Use CSS custom properties (e.g., `var(--color-primary)`) for theming and consistent styling.
- Keep styles in `App.css` or co-located CSS files.

## Environment Variables

- All frontend environment variables must use the `REACT_APP_` prefix (Create React App requirement).
- Never hardcode API keys, private keys, or contract addresses in source files.
- Use `.env` locally (gitignored) and reference `.env.example` for required variable names.
- For Hardhat network configuration, load private keys and API keys from environment variables, not hardcoded values.

## Security

- Do not commit secrets, private keys, or API keys to the repository.
- Keep `.env` in `.gitignore`; document required variables in `.env.example`.
- Use environment variables for any sensitive configuration in `hardhat.config.js`.

## Testing

- Smart contract tests live in the `test/` directory and use Hardhat's testing framework.
- Run `npm test` to execute contract tests.
- Add tests for all new or modified contract logic.

## Deployment

- Frontend is deployed automatically via Vercel on push.
- Contracts are deployed with `npm run deploy:sepolia` (Sepolia testnet) or the equivalent Base network scripts.
- Verify contracts on-chain after deployment using `hardhat verify`.
