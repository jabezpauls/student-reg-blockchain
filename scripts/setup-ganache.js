const hre = require("hardhat");
const fs = require("fs");
const { ethers } = require("hardhat");

async function main() {
  console.log("\n🚀 Setting up Ganache for Student Registry DApp...\n");

  try {
    // Check if we can connect to the network
    const provider = hre.ethers.provider;
    const network = await provider.getNetwork();
    console.log(`✅ Connected to network: ${network.name} (Chain ID: ${network.chainId})`);

    // Get accounts
    const accounts = await hre.ethers.getSigners();
    console.log(`✅ Found ${accounts.length} accounts`);
    console.log(`   Default account: ${accounts[0].address}`);

    // Check balance
    const balance = await provider.getBalance(accounts[0].address);
    console.log(`   Balance: ${hre.ethers.formatEther(balance)} ETH\n`);

    // Deploy the contract
    console.log("📝 Deploying StudentRegistry contract...");
    const StudentRegistry = await hre.ethers.getContractFactory("StudentRegistry");
    const studentRegistry = await StudentRegistry.deploy();

    await studentRegistry.waitForDeployment();

    const address = await studentRegistry.getAddress();
    console.log(`✅ StudentRegistry deployed to: ${address}\n`);

    // Save the contract address to frontend
    const contractsDir = "./frontend/src/contracts";

    if (!fs.existsSync(contractsDir)) {
      fs.mkdirSync(contractsDir, { recursive: true });
    }

    fs.writeFileSync(
      contractsDir + "/contract-address.json",
      JSON.stringify({ StudentRegistry: address }, null, 2)
    );

    console.log("✅ Contract address saved to frontend/src/contracts/contract-address.json\n");

    // Instructions for MetaMask
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    console.log("📱 METAMASK SETUP INSTRUCTIONS");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");

    console.log("1. Open MetaMask and click on the network dropdown");
    console.log("2. Click 'Add Network' or 'Add a network manually'");
    console.log("3. Enter the following details:\n");
    console.log("   Network Name:     Localhost 8545");
    console.log("   RPC URL:          http://127.0.0.1:8545");
    console.log("   Chain ID:         1337");
    console.log("   Currency Symbol:  ETH\n");
    console.log("4. Click 'Save' and switch to the Localhost 8545 network\n");

    console.log("5. Import a test account using one of these private keys:");
    console.log("   (These are Ganache's default accounts - DO NOT use in production!)\n");

    // Show first 3 accounts
    for (let i = 0; i < Math.min(3, accounts.length); i++) {
      const bal = await provider.getBalance(accounts[i].address);
      console.log(`   Account ${i + 1}: ${accounts[i].address}`);
      console.log(`   Balance:   ${hre.ethers.formatEther(bal)} ETH\n`);
    }

    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n");
    console.log("🎉 Setup complete! Now run:");
    console.log("   npm run dev\n");
    console.log("Then:");
    console.log("   1. Open http://localhost:5173 in your browser");
    console.log("   2. Connect MetaMask (make sure you're on Localhost 8545)");
    console.log("   3. Enter the contract address: " + address);
    console.log("   4. Start registering students!\n");

  } catch (error) {
    console.error("\n❌ Error during setup:");

    if (error.code === 'NETWORK_ERROR' || error.message.includes('could not detect network')) {
      console.error("\n🔴 Cannot connect to local blockchain!");
      console.error("\nPlease start Ganache first:");
      console.error("   Option 1: Ganache GUI - Download from https://trufflesuite.com/ganache/");
      console.error("   Option 2: Ganache CLI - Run: npx ganache --port 8545\n");
      console.error("Make sure Ganache is running on http://127.0.0.1:8545\n");
    } else {
      console.error(error);
    }

    process.exit(1);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
