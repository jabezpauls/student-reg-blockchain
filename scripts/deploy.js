const hre = require("hardhat");
const fs = require("fs");

async function main() {
  console.log("Deploying StudentRegistry contract...");

  const StudentRegistry = await hre.ethers.getContractFactory("StudentRegistry");
  const studentRegistry = await StudentRegistry.deploy();

  await studentRegistry.waitForDeployment();

  const address = await studentRegistry.getAddress();
  console.log("StudentRegistry deployed to:", address);

  // Save the contract address to a file
  const contractsDir = "./frontend/src/contracts";

  if (!fs.existsSync(contractsDir)) {
    fs.mkdirSync(contractsDir, { recursive: true });
  }

  fs.writeFileSync(
    contractsDir + "/contract-address.json",
    JSON.stringify({ StudentRegistry: address }, null, 2)
  );

  console.log("Contract address saved to frontend/src/contracts/contract-address.json");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
