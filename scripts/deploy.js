// Deploy contract
async function main() {
  const SanfordStoutNFT = await ethers.getContractFactory("SanfordStoutNFT");

  console.log("Deploying SanfordStoutNFT contract");
  const contract = await SanfordStoutNFT.deploy();
  console.log("Transaction sent. Waiting for the TX to be mined...");

  await contract.deployed();
  console.log("contract deployed to:", contract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
