const fs = require('fs');
const path = require('path');

const artifactPath = path.join(__dirname, '../artifacts/contracts/StudentRegistry.sol/StudentRegistry.json');
const destinationPath = path.join(__dirname, '../frontend/src/contracts/StudentRegistry.json');

// Ensure destination directory exists
const destDir = path.dirname(destinationPath);
if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

// Read the artifact
const artifact = JSON.parse(fs.readFileSync(artifactPath, 'utf8'));

// Create a simplified version with just the ABI
const abiFile = {
  abi: artifact.abi,
  contractName: artifact.contractName,
  sourceName: artifact.sourceName
};

// Write to destination
fs.writeFileSync(destinationPath, JSON.stringify(abiFile, null, 2));

console.log('ABI copied successfully to frontend/src/contracts/StudentRegistry.json');
