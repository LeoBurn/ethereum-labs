import { BigNumber, providers, Wallet, utils } from "ethers";
import  { merkleTree } from './merkleTree';


const dotenv = require('dotenv');
dotenv.config()

const CHAIN_ID = 5; //Goerli TesNetWork
const provider = new providers.InfuraProvider(CHAIN_ID)
const GWEI = BigNumber.from(10).pow(9)
const ETHER = BigNumber.from(10).pow(18)

async function getWallet() {
    
  if(process.env.WALLET_PRIVATE_KEY === undefined)
  {
      console.error("Please Provide WALLET_PRIVATE_KEY env")
      process.exit(1);
  }
  const wallet = new Wallet(process.env.WALLET_PRIVATE_KEY,provider)
  return wallet
}

async function main() {



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


//Make transaction Without specify gas.
async function makeTransaction(address,amount) {
  const wallet = new Wallet(process.env.WALLET_PRIVATE_KEY,provider)
  
  //Get Wallet source
  const addressWallet = await wallet.getAddress()
  console.log('Wallet Source: ',addressWallet);

  //Build the transaction
  let transaction = {
    to: address,
    value: utils.parseEther(amount)
  }
  
  //Send transaction and write the txHash
  wallet.sendTransaction(transaction)
        .then((txObj) => {
          console.log('txHash', txObj.hash)
        }
  )
  

}


//main()
//merkleTree()
//newBlockListener()
makeTransaction('0x2972915285416D0a923280f9786Fd85e6b50C17A','0.01');

