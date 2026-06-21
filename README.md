# AstroForge Contracts

## 📌 Description

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

5. **Run Local Deployment Simulation**

```bash
# Using npm
npx hardhat run scripts/deploy.ts --network hardhatMainnet

# Using pnpm
pnpm hardhat run scripts/deploy.ts --network hardhatMainnet
```

---

## 🧪 Running Tests

```bash
# Using npm
npx hardhat test

# Using pnpm
pnpm hardhat test
```
