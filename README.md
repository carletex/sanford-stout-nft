# Sanford Stout NFT

Example NFT project for the [web2-to-web3 open-source curriculum](https://github.com/austintgriffith/web2-to-web3-curriculum)

See contract code at `contracts/SanfordStoutNFT.sol`.
- Implements ERC721 standard
- Metadata + image uploaded to ipfs (check `scripts/ipfsUpload.js`)

## Set up

1. Clone repo:

```shell
git clone https://github.com/carletex/sanford-stout-nft
```

2. Install dependencies
```shell
yarn install # (or npm install)
```

3. Misc

- Run the unit tests with `npx hardhat test test/SanfordStoutNFT.js`.
- Deploy to rinkeby with `npx hardhat run scripts/deploy.js --network rinkeby`
  - You will need to copy `.env.example` to `.env` and fill the required fields
  - You can upload your own metadata / NFT image (check `.env.example` and `scripts/ipfsUpload.js`)
- Verify your deployed contract with `npx hardhat verify --network rinkeby <YOUR_DEPLOYED_CONTRACT_ADDRESS>`
