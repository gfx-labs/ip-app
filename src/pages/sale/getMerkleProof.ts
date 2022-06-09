import MerkleTree from "merkletreejs";
import { keccak256, solidityKeccak256 } from "ethers/lib/utils";
import { BN } from "../../easy/bn";
import { wave1 } from "../whitelist/wave1";
import { wave2 } from "../whitelist/wave2";

//ropsten addresses
const keyAmount = BN("5e5");
let root1: string;
let merkleTree1: MerkleTree;
const initMerkle = async (wave: number) => {
  const whitelist1 = wave === 1 ? wave1 : wave2;
  let leafNodes = [...whitelist1].map((addr) =>
    solidityKeccak256(["address", "uint256"], [addr, keyAmount])
  );
  merkleTree1 = new MerkleTree(leafNodes, keccak256, { sortPairs: true });
  root1 = merkleTree1.getHexRoot();
};

export const getSaleMerkleProof = async (
  currentAccount: string,
  wave: number
) => {
  try {
    await initMerkle(wave);

    let leaf = solidityKeccak256(
      ["address", "uint256"],
      [currentAccount, keyAmount]
    );

    let proof = merkleTree1.getHexProof(leaf);
    
    return proof;
  } catch (err) {
    throw new Error("Could not find Proof");
  }
};
