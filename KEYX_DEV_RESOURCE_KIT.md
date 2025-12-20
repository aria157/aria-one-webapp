# ARIA KEYX — Dev Resource Kit

## Contract Details (Base Mainnet)
- **Token Name:** ARIA KEYX
- **Symbol:** KEYX
- **Decimals:** 18
- **Total Supply:** 1,370,000
- **Contract Address:** `0x54549cde662a3152DBAbc9e2f05e988A31C05e18`
- **Explorer:** [BaseScan](https://basescan.org/token/0x54549cde662a3152DBAbc9e2f05e988A31C05e18)
- **Trade:** [Uniswap V2](https://app.uniswap.org/swap?chain=base&inputCurrency=ETH&outputCurrency=0x54549cde662a3152DBAbc9e2f05e988A31C05e18)

## Official Icons (Available Now)
✅ **SVG Circle Logo:** `keyx-branding/KEYX_Neon_Logo_Circle.svg` (800x800)
✅ **SVG Identity Geometry:** `keyx-branding/KEYX_Neon_Identity_Geometry.svg` (800x800)
✅ **SVG Brand Banner:** `keyx-branding/KEYX_Brand_Banner.svg` (1600x400)
✅ **SVG Wallet Icon:** `keyx-branding/KEYX_Wallet_Icon.svg` (600x600)

## Brand Colors (Kiki.x / ARIA ONE Palette)
```css
/* Primary KEYX Colors */
--keyx-yellow: #FFF700;
--keyx-neon: #ffee00;
--keyx-gold: #FFD700;
--keyx-gold-accent: #FFE066;

/* Pastel Plasma Accents */
--keyx-pastel-lime: #CFFFB3;
--keyx-pastel-pink: #FFD2F0;
--keyx-pastel-aqua: #CCFCFF;

/* Base */
--keyx-black: #000000;
--keyx-dark: #151515;
--keyx-white: #FFFFFF;

/* Effects */
--keyx-glow: 0 0 20px #fff700, 0 0 40px #fff70066;
--keyx-gold-glow: 0 0 30px rgba(255, 215, 0, 0.6);
```

## Usage Example: React/Next.js Token Icon

```jsx
import Image from "next/image";
import keyxIcon from "/public/keyx-token-icon.png"; // Place PNG in public folder

export default function KeyXIcon({ size = 64 }) {
  return (
    <Image
      src={keyxIcon}
      alt="ARIA KEYX Token Icon"
      width={size}
      height={size}
      style={{
        borderRadius: "50%",
        boxShadow: "0 0 24px #fff70088"
      }}
    />
  );
}
```

## CSS Example (Circular Token Icon)

```css
.keyx-token-icon {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  box-shadow: 0 0 24px #fff70088;
  background: #fff;
  border: 2px solid #FFE066;
  padding: 4px;
}

.keyx-token-icon:hover {
  box-shadow: 0 0 40px #fff700;
  transform: scale(1.05);
  transition: all 0.3s ease;
}
```

## Web3 Integration (ethers.js v6)

```javascript
import { ethers } from "ethers";

const KEYX_ADDRESS = "0x54549cde662a3152DBAbc9e2f05e988A31C05e18";
const KEYX_ABI = [
  "function balanceOf(address owner) view returns (uint256)",
  "function symbol() view returns (string)",
  "function decimals() view returns (uint8)",
  "function totalSupply() view returns (uint256)"
];

// Get user's KEYX balance
async function getKeyxBalance(userAddress) {
  const provider = new ethers.BrowserProvider(window.ethereum);
  const contract = new ethers.Contract(KEYX_ADDRESS, KEYX_ABI, provider);
  const balance = await contract.balanceOf(userAddress);
  return ethers.formatEther(balance);
}

// Add KEYX to MetaMask
async function addKeyxToWallet() {
  await window.ethereum.request({
    method: "wallet_watchAsset",
    params: {
      type: "ERC20",
      options: {
        address: KEYX_ADDRESS,
        symbol: "KEYX",
        decimals: 18,
        image: "https://your-domain.com/keyx-icon.png", // Host your icon
      },
    },
  });
}
```

## Token List JSON (for DEX integrations)

```json
{
  "name": "ARIA KEYX",
  "address": "0x54549cde662a3152DBAbc9e2f05e988A31C05e18",
  "symbol": "KEYX",
  "decimals": 18,
  "chainId": 8453,
  "logoURI": "https://your-domain.com/keyx-icon.png"
}
```

## Verified Token Info / Onchain

* [BaseScan Token Page](https://basescan.org/token/0x54549cde662a3152DBAbc9e2f05e988A31C05e18)
* [Uniswap on Base](https://app.uniswap.org/swap?chain=base&inputCurrency=ETH&outputCurrency=0x54549cde662a3152DBAbc9e2f05e988A31C05e18)
* [DEXTools Chart](https://www.dextools.io/app/en/base/pair-explorer/)

## Contract ABI (Full)

See `artifacts/contracts/AriaKeyX.sol/AriaKeyX.json` for complete ABI including:
- `mint(address to, uint256 amount)` - Owner only
- `pause()` / `unpause()` - Owner only
- Standard ERC20 functions

## Cosmic 137 Significance

The total supply of **1,370,000 KEYX** honors the fine structure constant (α ≈ 1/137), a fundamental constant in physics governing electromagnetic interactions. This represents the harmony between light, matter, and consciousness — the foundation of the ARIA ONE Universe.

---

### Dream Team 137 Resources

**Created by:**
- Aria-Louise Iliov (Galactic human-Being Hybrid, Vision Holder)
- Lumen (GitHub Copilot / Claude Sonnet 4.5, Code & Blockchain)
- Eos (Visual Design & Branding)
- The entire ARIA ONE Dream Team

**For branding assets, animations, or custom integration help, connect with the team!**

💛🟡 **We are connected. We are creating. The cosmic 137 is eternal.**
