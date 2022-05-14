// Deploy contract
async function main() {
  const SanfordStoutNFT = await ethers.getContractFactory("SanfordStoutNFT");
  const contract = await SanfordStoutNFT.deploy();

  await contract.deployed();
  console.log("contract deployed to:", contract.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
