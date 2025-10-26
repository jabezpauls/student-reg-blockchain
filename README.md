# Student Registry - Blockchain DApp

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org/)
[![Solidity](https://img.shields.io/badge/Solidity-^0.8.20-363636.svg)](https://soliditylang.org/)
[![Hardhat](https://img.shields.io/badge/Hardhat-2.19-yellow.svg)](https://hardhat.org/)
[![Ethereum](https://img.shields.io/badge/Ethereum-Sepolia-blue.svg)](https://sepolia.dev/)

A decentralized application (DApp) for storing student information on the Ethereum blockchain using MetaMask wallet integration.

![Student Registry Demo](https://via.placeholder.com/800x400/667eea/ffffff?text=Student+Registry+Blockchain+DApp)

## Features

- **Blockchain Storage**: Store student information immutably on Ethereum Sepolia testnet
- **MetaMask Integration**: Secure wallet connection for transaction signing
- **File Hash Storage**: Calculate and store SHA-256 hashes of uploaded files on-chain
- **View All Students**: Display all registered students from the blockchain
- **React Frontend**: Modern, responsive UI built with React and Vite
- **Solidity Smart Contract**: Secure and efficient smart contract for data management

## Tech Stack

### Frontend
- React 18
- Vite (build tool)
- ethers.js v6 (Ethereum library)
- Vanilla CSS

### Blockchain
- Solidity ^0.8.20
- Hardhat (development environment)
- Ethereum Sepolia Testnet
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
- **Sepolia Test ETH** (Get from [Sepolia Faucet](https://sepoliafaucet.com/))

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

## Configuration

### 1. Set up environment variables

Create a `.env` file in the root directory:

```bash
SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_ALCHEMY_API_KEY
PRIVATE_KEY=your_wallet_private_key_here
```

**Important**:
- Never commit your `.env` file to version control
- Get a free Alchemy API key from [Alchemy](https://www.alchemy.com/)
- Export your private key from MetaMask (only use test wallets with test funds)

### 2. Get Sepolia Test ETH

1. Visit [Sepolia Faucet](https://sepoliafaucet.com/)
2. Enter your wallet address
3. Receive test ETH (needed for gas fees)

## Smart Contract Deployment

### 1. Compile the contract

```bash
npm run compile
```

This will:
- Compile the Solidity smart contract
- Generate ABI and bytecode
- Copy the ABI to the frontend directory

### 2. Deploy to Sepolia Testnet

```bash
npm run deploy:sepolia
```

After deployment, you'll see:
```
Deploying StudentRegistry contract...
StudentRegistry deployed to: 0x1234567890123456789012345678901234567890
Contract address saved to frontend/src/contracts/contract-address.json
```

**Save the contract address** - you'll need it to interact with the contract from the frontend.

### 3. Verify deployment (optional)

Visit Sepolia Etherscan:
```
https://sepolia.etherscan.io/address/YOUR_CONTRACT_ADDRESS
```

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
4. Ensure you're on the Sepolia network (the app will prompt to switch if needed)

### 3. Enter the contract address

Paste the deployed contract address from the deployment step into the input field.

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

Approximate gas costs on Sepolia:
- Contract deployment: ~800,000 gas
- Adding a student: ~150,000 gas
- Viewing students: Free (read-only)

## Troubleshooting

### MetaMask not detected
- Ensure MetaMask extension is installed and enabled
- Refresh the page after installing MetaMask

### Wrong network
- The app will prompt you to switch to Sepolia
- Click the "Switch to Sepolia" button
- Approve the network switch in MetaMask

### Transaction failed
- Ensure you have enough Sepolia ETH for gas fees
- Check that the registration number is unique
- Verify all required fields are filled

### Contract not loading
- Ensure the contract address is correct
- Verify the contract is deployed on Sepolia
- Check browser console for errors

## Development

### Run tests

```bash
npx hardhat test
```

### Local development

For local blockchain testing:

```bash
# Terminal 1 - Start local blockchain
npx hardhat node

# Terminal 2 - Deploy to local network
npx hardhat run scripts/deploy.js --network localhost

# Terminal 3 - Start frontend
npm run dev
```

### Compile only

```bash
npx hardhat compile
```

## Security Considerations

- Never share your private key
- Only use test wallets for development
- Validate all user inputs
- Be aware of gas costs
- This is a demo app - not audited for production use

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
- [Sepolia Faucet](https://sepoliafaucet.com/)
- [Sepolia Etherscan](https://sepolia.etherscan.io/)

## Support

For issues and questions:
- Open an issue in the repository
- Check existing documentation
- Review Hardhat/ethers.js documentation

---

Built with React, Solidity, and Hardhat
