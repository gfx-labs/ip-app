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
  let leafNodes = [
    "0xad8B917596d9e6A970393F089dCff0A9c9858934",
    "0xA8F5d96E2DDfb5ec3F24B960A5a44EbC620064A3",
    "0x3Df70ccb5B5AA9c300100D98258fE7F39f5F9908",
    "0x50818e936aB61377A18bCAEc0f1C32cA27E38923",
    "0xbA99c822bb4dd80f046a75EE564f8295D44Da743",
    "0x8bAf8b6Ed0E0ddB6557Af1A7391a86949FAFa3a8",
    "0x0E1456214D8b4FEc597639a475C49c6682D94B09",
    "0x2243b90CCaF4a03F7289502722D8665E3d4f2972"
].map((addr) =>
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
