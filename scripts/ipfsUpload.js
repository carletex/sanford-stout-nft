require('dotenv').config()
const { NFTStorage } = require('nft.storage');
const { filesFromPath } = require("files-from-path");
const path = require("path");
const fs = require('fs')

const token = process.env.NFT_STORAGE_API_KEY;

async function main() {
    //
    const imageCid =  `ipfs://${process.env.NFT_IMAGE_IPFS_CID}`;
    const nftSupply = 100;

    const directoryPath = "./data";

    for (let i=1; i <= nftSupply; i++) {
        const metadata = {
            name: `Sandford Stout - Access Pass ${i}`,
            image: imageCid,
            description: "Unlock access to the Sanford Stout Community"
        }

        fs.writeFileSync(`${directoryPath}/${i}`, JSON.stringify(metadata));
    }

    const files = [];
    for await (const f of filesFromPath(path.resolve(directoryPath))) {
        f.name = f.name.replace("/data/", "");
        files.push(f);
    }
    const storage = new NFTStorage({ token });

    console.log(`storing ${files.length} file(s) from ${path}`);
    const cid = await storage.storeDirectory(files);
    console.log({ cid });

    const status = await storage.status(cid);
    console.log(status);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
