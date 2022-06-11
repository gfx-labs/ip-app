import MerkleTree from "merkletreejs";
import { keccak256, solidityKeccak256 } from "ethers/lib/utils";
import { BN } from "../../easy/bn";
import { wave1 } from "../whitelist/wave1";
import { wave2 } from "../whitelist/wave2";
import {BigNumberish} from "ethers";

const keyAmounts:BigNumberish[]= [0,BN("1000000e6"),BN("500000e6"),0]
const initMerkle = async (wave: number) => {
  const whitelist = wave === 1 ? wave1 : wave2;
  let leafNodes = Array.from(whitelist).map((addr) =>
    solidityKeccak256(["address", "uint256"], [addr, keyAmounts[wave]])
  );
  let merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true });
  let root = merkleTree.getHexRoot();
  return {tree: merkleTree, root: root}
};

export const getSaleMerkleProof = async (
  currentAccount: string,
  wave: number
) :Promise<{proof:string[], key:BigNumberish}>=>{
  try {
    const {tree, root} = await initMerkle(wave);
    let leaf = solidityKeccak256(
      ["address", "uint256"],
      [currentAccount, keyAmounts[wave]]
    );
    let proof = tree.getHexProof(leaf);

    return {proof, key:keyAmounts[wave]};
  } catch (err) {
    throw new Error("Could not find Proof");
  }
};
