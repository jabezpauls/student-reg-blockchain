# Student Registry - Blockchain DApp

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org/)
[![Solidity](https://img.shields.io/badge/Solidity-^0.8.20-363636.svg)](https://soliditylang.org/)
[![Hardhat](https://img.shields.io/badge/Hardhat-2.19-yellow.svg)](https://hardhat.org/)
[![Ganache](https://img.shields.io/badge/Ganache-Local-orange.svg)](https://trufflesuite.com/ganache/)

A decentralized application (DApp) for storing student information on a local Ethereum blockchain using Ganache and MetaMask wallet integration. Perfect for demos and testing!

![Student Registry Demo](https://via.placeholder.com/800x400/667eea/ffffff?text=Student+Registry+Blockchain+DApp)

## Features

- **Local Blockchain**: Store student information on Ganache (local Ethereum blockchain)
- **No Test ETH Needed**: Free, instant transactions for demos and testing
- **MetaMask Integration**: Secure wallet connection and transaction signing
- **File Hash Storage**: Calculate and store SHA-256 hashes of uploaded files on-chain
- **View All Students**: Display all registered students from the blockchain
- **React Frontend**: Modern, responsive UI with gradient theme
- **Solidity Smart Contract**: Secure and efficient smart contract for data management
- **One-Command Setup**: Get everything running with `npm run setup`

## Tech Stack

### Frontend
- React 18
- Vite (build tool)
- ethers.js v6 (Ethereum library)
- Modern CSS with gradients

### Blockchain
- Solidity ^0.8.20
- Hardhat (development environment)
- Ganache (local blockchain)
- MetaMask wallet

## Project Structure

```
ruban/
├── contracts/              # Solidity smart contracts
│   └── StudentRegistry.sol
├── scripts/               # Deployment and utility scripts
│   ├── deploy.js
│   └── copy-abi.js
├── frontend/              # React frontend application
│   ├── src/
│   │   ├── components/   # React components
│   │   │   ├── WalletConnect.jsx
│   │   │   ├── StudentForm.jsx
│   │   │   └── StudentList.jsx
│   │   ├── utils/       # Utility functions
│   │   │   └── web3.js
│   │   ├── contracts/   # Contract ABIs and addresses
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
├── hardhat.config.js     # Hardhat configuration
└── package.json
```

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or later)
- **npm** or **yarn**
- **MetaMask** browser extension ([Install MetaMask](https://metamask.io/download/))
- **Ganache** (Choose one):
  - Ganache GUI: Download from [trufflesuite.com/ganache](https://trufflesuite.com/ganache/)
  - Ganache CLI: `npm install -g ganache` (or use `npx ganache`)

## Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd ruban
```

### 2. Install root dependencies

```bash
npm install
```

### 3. Install frontend dependencies

```bash
cd frontend
npm install
cd ..
```

## Quick Start (3 Steps!)

### Step 1: Start Ganache

Choose one option:

**Option A: Ganache GUI** (Recommended for beginners)
1. Open Ganache application
2. Click "Quickstart Ethereum"
3. Make sure it's running on `http://127.0.0.1:8545`

**Option B: Ganache CLI**
```bash
npx ganache --port 8545 --host 0.0.0.0 --network-id 1337
```
Or if installed globally:
```bash
ganache --port 8545 --host 0.0.0.0 --network-id 1337
```

Or use our npm script (recommended):
```bash
npm run ganache
```

### Step 2: Setup & Deploy

Run the automated setup script:
```bash
npm run setup
```

This single command will:
- ✅ Compile the Solidity smart contract
- ✅ Deploy to your local Ganache blockchain
- ✅ Save the contract address
- ✅ Copy ABI to frontend
- ✅ Show MetaMask configuration instructions

You'll see output like:
```
✅ Connected to network: localhost (Chain ID: 1337)
✅ Found 10 accounts
📝 Deploying StudentRegistry contract...
✅ StudentRegistry deployed to: 0x5FbDB2315678afecb367f032d93F642f64180aa3
✅ Contract address saved

📱 METAMASK SETUP INSTRUCTIONS
[... detailed instructions ...]
```

### Step 3: Configure MetaMask

Add Localhost network to MetaMask:
1. Open MetaMask → Click network dropdown
2. Click "Add Network" or "Add a network manually"
3. Enter these details:
   - **Network Name**: `Localhost 8545`
   - **RPC URL**: `http://127.0.0.1:8545`
   - **Chain ID**: `1337`
   - **Currency Symbol**: `ETH`
4. Click "Save"

Import a test account (Ganache provides 10 accounts with 100 ETH each):
1. In MetaMask → Click account icon → "Import Account"
2. Use one of the private keys shown in Ganache
3. Done! You now have 100 free test ETH 🎉

## Running the Application

### 1. Start the development server

```bash
npm run dev
```

This will start the frontend at `http://localhost:5173`

### 2. Connect MetaMask

1. Open the application in your browser
2. Click "Connect MetaMask"
3. Approve the connection in MetaMask
4. Make sure you're on the "Localhost 8545" network (the app will prompt to switch if needed)

### 3. Verify contract loaded

The contract address should load automatically. If not, paste the deployed contract address (shown after running `npm run setup`) into the input field.

### 4. Register students

Fill out the form with student information:
- Name
- Registration Number
- College Name
- Department
- File (optional)

Click "Register Student" and approve the transaction in MetaMask.

### 5. View registered students

After successful registration, the student list will automatically refresh to show all registered students.

## Smart Contract Details

### StudentRegistry.sol

The smart contract stores student information with the following structure:

```solidity
struct Student {
    string name;
    string regno;
    string clgname;
    string department;
    string fileHash;      // SHA-256 hash of uploaded file
    uint256 timestamp;    // Registration timestamp
    address submitter;    // Address that submitted the record
}
```

### Main Functions

- `addStudent()`: Add a new student record
- `getAllStudents()`: Retrieve all student records
- `getStudentByRegno()`: Get a student by registration number
- `getStudentCount()`: Get total number of students
- `studentExists()`: Check if a student exists

## File Upload & Hashing

Files are handled as follows:
1. User selects a file in the browser
2. JavaScript calculates the SHA-256 hash of the file
3. Only the hash is stored on the blockchain (not the file itself)
4. This ensures data integrity while keeping gas costs low

## Gas Costs

On Ganache (local blockchain):
- **Contract deployment**: ~800,000 gas (instant, FREE!)
- **Adding a student**: ~150,000 gas (instant, FREE!)
- **Viewing students**: Free (read-only operation)

All transactions are instant and completely free with Ganache!

## Troubleshooting

### Ganache not running
- Make sure Ganache is started on port 8545
- Check that you can access `http://127.0.0.1:8545`
- Try restarting Ganache

### MetaMask not detected
- Ensure MetaMask extension is installed and enabled
- Refresh the page after installing MetaMask

### Wrong network
- The app will prompt you to switch to Localhost
- Click the "Switch to Localhost" button
- Or manually switch to "Localhost 8545" in MetaMask

### Transaction failed
- Make sure Ganache is running
- Check that you're connected to the correct account
- Verify the registration number is unique
- Ensure all required fields are filled

### Contract not loading
- Ensure you ran `npm run setup` successfully
- Check the contract address is correct
- Verify Ganache is running
- Check browser console for errors

## Development

### Run tests

```bash
npx hardhat test
```

### Development workflow

```bash
# Terminal 1 - Start Ganache
npm run ganache

# Terminal 2 - Deploy contract
npm run setup

# Terminal 3 - Start frontend
npm run dev
```

### Compile contract only

```bash
npm run compile
```

### Deploy to Ganache manually

```bash
npm run deploy
```

## Available NPM Scripts

- `npm run compile` - Compile smart contracts and copy ABI
- `npm run setup` - Full setup: compile + deploy + configure
- `npm run deploy` - Deploy contract to localhost
- `npm run dev` - Start frontend development server
- `npm run ganache` - Start Ganache CLI on port 8545

## Security Considerations

- **Ganache accounts are for testing only** - Never use these private keys on mainnet or with real ETH!
- The private keys shown by Ganache are publicly known
- This is a demo app - not audited for production use
- Always validate user inputs
- Keep your production private keys secure

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Resources

- [Hardhat Documentation](https://hardhat.org/docs)
- [ethers.js Documentation](https://docs.ethers.org/)
- [Solidity Documentation](https://docs.soliditylang.org/)
- [MetaMask Documentation](https://docs.metamask.io/)
- [Ganache Documentation](https://trufflesuite.com/docs/ganache/)
- [React Documentation](https://react.dev/)

## Support

For issues and questions:
- Open an issue in the repository
- Check [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines
- Review Hardhat/ethers.js/Ganache documentation

---

Built with ❤️ using React, Solidity, Hardhat, and Ganache
