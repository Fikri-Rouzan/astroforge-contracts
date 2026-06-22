# AstroForge Contracts

## 📌 Description

The smart contract layer for AstroForge, a Web3 space-mining game. This layer handles the decentralized token economics and asset distribution linked to core gameplay states. It contains the asset token contract responsible for minting, burning, and transferring economy balances securely within the distributed network while maintaining full synchronization with the gameplay servers.

---

## 🛠️ Tech Stack

| Category                     | Technologies Used        |
| :--------------------------- | :----------------------- |
| 🌐 **Programming Languages** | `TypeScript`, `Solidity` |
| 🧩 **Framework**             | `Hardhat`                |
| ⚛️ **Library**               | `OpenZeppelin Contracts` |

---

## ⚙️ Setup Instructions

1. **Prerequisites**
   - Node.js 24 or higher.
   - Git installed on your system.
   - PNPM 10 installed on your system (Optional).

2. **Clone the Repository**

```bash
git clone https://github.com/Fikri-Rouzan/astroforge-contracts.git
cd astroforge-contracts
```

3. **Install Packages**

```bash
# Using npm
npm i

# Using pnpm
pnpm i
```

4. **Compile the Contracts**

```bash
# Using npm
npx hardhat compile

# Using pnpm
pnpm hardhat compile
```

5. **Start a Local Ethereum Node**

```bash
# Using npm
npx hardhat node

# Using pnpm
pnpm hardhat node
```

6. **Run Local Deployment Simulation**

```bash
# Using npm
npx hardhat run scripts/deploy.ts --network localhost

# Using pnpm
pnpm hardhat run scripts/deploy.ts --network localhost
```

---

## 🧪 Running Tests

```bash
# Using npm
npx hardhat test

# Using pnpm
pnpm hardhat test
```
