import { BigNumber, providers, Wallet } from "ethers";
import  { merkleTree } from './merkleTree';


const dotenv = require('dotenv');
dotenv.config()

const CHAIN_ID = 5; //Goerli TesNetWork
const provider = new providers.InfuraProvider(CHAIN_ID)
const GWEI = BigNumber.from(10).pow(9)
const ETHER = BigNumber.from(10).pow(18)


async function main() {

    if(process.env.WALLET_PRIVATE_KEY === undefined)
    {
        console.error("Please Provide WALLET_PRIVATE_KEY env")
        process.exit(1);
    }
    const wallet = new Wallet(process.env.WALLET_PRIVATE_KEY,provider)

    provider.on('block',async (blockNumber)=>{
      console.log(blockNumber)
      var blockInfo = await provider.getBlock(blockNumber)
      console.log(blockInfo)
    })
}

async function newBlockListener() {
    
    provider.on('block',async (blockNumber)=>{
      console.log(blockNumber)
      var blockInfo = await provider.getBlock(blockNumber)
      console.log(blockInfo)
    })
}

//main()
//merkleTree()
newBlockListener()

