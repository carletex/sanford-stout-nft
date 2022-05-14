const { expect } = require("chai");
const { ethers } = require("hardhat");
const { BigNumber } = require("ethers");

describe("SanfordStoutNFT", () => {
  let hardhatAccounts, ownerAddress, clientAddress, clientSigner, nft, mintPrice, maxMints;

  beforeEach(async () => {
    hardhatAccounts = await ethers.provider.listAccounts();
    [ownerAddress, clientAddress] = hardhatAccounts;
    clientSigner = ethers.provider.getSigner(clientAddress);

    const Nft = await ethers.getContractFactory("SanfordStoutNFT");
    nft = await Nft.deploy();
    await nft.deployed();

    /** @type BigNumber */
    mintPrice = await nft.MINT_PRICE();
  });

  it("Should allow an user to mint an NFT", async function () {
    const mintTx = await nft.connect(clientSigner).mint({
      value: mintPrice
    });

    // wait until the transaction is mined
    await mintTx.wait();

    expect(await nft.balanceOf(clientAddress)).to.equal(1);
  });

  it("Should revert if the user send less than the minting price", async function () {
    /** @type BigNumber */
    const sentPrice = mintPrice.sub(ethers.utils.parseUnits("1", "wei"));

    const mintTx = nft.connect(clientSigner).mint({
      value: sentPrice,
    });

    await expect(mintTx).to.be.reverted;
  });

  it("Should allow admins to mint for free", async function () {
    const mintTx = await nft.ownerMint(ownerAddress);

    await mintTx.wait();

    expect(await nft.balanceOf(ownerAddress)).to.equal(1);
  });

  it("Should allow admins to withdraw ETH", async function () {
    // Mint & Send 1 ETH to the contract.
    const mintTx = await nft.connect(clientSigner).mint({
      value: ethers.utils.parseUnits("1", "ether")
    });

    await mintTx.wait();

    const currentContractBalance = await ethers.provider.getBalance(nft.address);
    expect(currentContractBalance).to.equal(ethers.utils.parseUnits("1", "ether"));

    const currentOwnerBalance = await ethers.provider.getBalance(ownerAddress);

    const withdrawTx = await nft.withdraw(ownerAddress, ethers.utils.parseUnits("1", "ether"));
    await withdrawTx.wait();

    const newContractBalance = await ethers.provider.getBalance(nft.address);
    const newOwnerBalance = await ethers.provider.getBalance(ownerAddress);

    expect(newContractBalance).to.equal(0);
    expect(newOwnerBalance).to.be.gt(currentOwnerBalance);
  });
});
