const hre = require("hardhat");

async function main() {
  // Get the Ganache accounts
  const [sender] = await hre.ethers.getSigners();

  console.log("Sending ETH from Ganache account:", sender.address);

  // The address you want to send ETH to (your MetaMask account)
  // REPLACE THIS with your actual MetaMask address
  const recipient = process.argv[2];

  if (!recipient) {
    console.error("\n❌ Please provide a recipient address!");
    console.log("\nUsage:");
    console.log("  node scripts/send-eth.js YOUR_METAMASK_ADDRESS");
    console.log("\nExample:");
    console.log("  node scripts/send-eth.js 0x1234567890123456789012345678901234567890");
    process.exit(1);
  }

  const amount = hre.ethers.parseEther("100"); // 100 ETH

  console.log(`\nSending 100 ETH to: ${recipient}`);
  console.log("Please wait...\n");

  // Send the transaction
  const tx = await sender.sendTransaction({
    to: recipient,
    value: amount
  });

  console.log("Transaction sent! Hash:", tx.hash);

  // Wait for confirmation
  await tx.wait();

  console.log("\n✅ SUCCESS! 100 ETH has been sent to your account!");
  console.log("\nNow refresh your MetaMask - you should see 100 ETH! 🎉");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
