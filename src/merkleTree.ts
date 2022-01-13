const { MerkleTree } = require('merkletreejs')
const keccak256 = require('keccak256')


let whitlistAddress= [
    "0xC542cFB99AfDb7A9e408B5cc6a1ac67372F5062c",
    "0x6458f2DA374471bF23C5eD4f03748B9a8ED8153B",
    "0x6458f2DA374471bF23C5eD4f03748B9a8ED8153A",
    "0x6458f2DA374471bF23C5eD4f03748B9a8ED8153C"
]

let blackListAddress = "0xC542cFB99AfDb7A9e408B5cc6a1ac67372F506A";

export function merkleTree(){
    //Create leafNotes
    const leafNodes = whitlistAddress.map(addr => keccak256(addr))
    //Build MerkleTree
    const merkleTree = new MerkleTree(leafNodes,keccak256,{sortPairs: true})
    const rootHash = merkleTree.getRoot()

    //display Merkle Tree
    console.log('Whitelist Merkle Tree\n',merkleTree.toString())

    //Get the first Address
    var leaf = leafNodes[0];
    //Get all nodes to calculate until root
    const hexaProof = merkleTree.getHexProof(leaf)
    console.log(hexaProof)

    //Get Has Of BlackList
    var blackListHash = keccak256(blackListAddress)

    //validate if address belong to tree
    var result = merkleTree.verify(hexaProof,blackListHash,rootHash)
    console.log(result)

}

merkleTree();