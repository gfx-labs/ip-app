import { JsonRpcProvider, JsonRpcSigner } from "@ethersproject/providers";
import { BigNumber, BigNumberish, Contract, EventFilter, utils } from "ethers";
import { Rolodex } from "../chain/rolodex/rolodex";
import { useVaultDataContext } from "../components/libs/vault-data-provider/VaultDataProvider";
import { useWeb3Context } from "../components/libs/web3-data-provider/Web3Provider";
import {
  GovernorCharlieDelegate__factory,
  GovernorCharlieDelegator__factory,
  GovernorCharlieEvents__factory,
  TokenDelegateStorageV1__factory,
  TokenDelegatorStorage__factory,
  Vault__factory,
} from "../chain/contracts";
import {
  ProposalCreatedEventFilter,
  VoteCastEventObject,
} from "../chain/contracts/_external/openzeppelin/GovernorBravoInterfaces.sol/GovernorBravoEvents";
import { useModalContext } from "../components/libs/modal-content-provider/ModalContentProvider";
import { tokenDelegatorSol } from "../chain/contracts/factories/governance/token";

export interface ProposalInfo {
  id: BigNumber;
  proposer: string;
  eta: BigNumber;
  startBlock: BigNumber;
  endBlock: BigNumber;
  forVotes: BigNumber;
  againstVotes: BigNumber;
  abstainVotes: BigNumber;
  canceled: boolean;
  executed: boolean;
  emergency: boolean;
  quorumVotes: BigNumber;
  delay: BigNumber;
}

export const governor = "0x3389d29e457345e4f22731292d9c10ddfc78088f";

interface rawProposalInfo {
  id: BigNumber;
  proposer: string;
  eta: BigNumber;
  startBlock: BigNumber;
  endBlock: BigNumber;
  forVotes: BigNumber;
  againstVotes: BigNumber;
  abstainVotes: BigNumber;
  canceled: boolean;
  executed: boolean;
  emergency: boolean;
  quorumVotes: BigNumber;
  delay: BigNumber;
}

export const getRecentProposals = async (
  signer: JsonRpcProvider,
  headBlock?: number
) => {
  try {
    const contract = GovernorCharlieDelegate__factory.connect(governor, signer);
    console.log(contract, "this is contract");

    const filters = await contract.filters.ProposalCreated();

    const logs = await contract.queryFilter(filters, undefined, headBlock);

    return logs;
  } catch (err) {
    throw new Error("error getting proposals");
  }
};

export const useProposalInfo = async (
  id: BigNumberish,
  signer: JsonRpcProvider
): Promise<ProposalInfo> => {
  const contract = GovernorCharlieDelegate__factory.connect(governor, signer);
  return contract.proposals(id);
};

export const getProposalVoters = async (
  id: BigNumberish,
  signer: JsonRpcProvider
): Promise<VoteCastEventObject[]> => {
  const contract = GovernorCharlieDelegate__factory.connect(governor, signer);
  const log = await contract.queryFilter(
    contract.filters.VoteCast(undefined),
    undefined,
    undefined
  );
  return log
    .filter((x) => {
      return x.args.proposalId.eq(id);
    })
    .map((x) => {
      return {
        ...x.args,
      };
    });
};

export const useProposalCount = async (signer: JsonRpcProvider) => {
  const contract = GovernorCharlieDelegate__factory.connect(governor, signer);
  const info = await contract.proposalCount();
  return info.toNumber();
};

export const useCastVote = async (
  id: string,
  vote: number,
  signer: JsonRpcSigner
) => {
  const { updateTransactionState } = useModalContext();

  const contract = GovernorCharlieDelegate__factory.connect(governor, signer);

  const castVoteTransaction = await contract.castVote(id, vote);

  updateTransactionState(castVoteTransaction);

  const voteReceipt = await castVoteTransaction.wait();

  updateTransactionState(voteReceipt);

  return voteReceipt;
};

export const exampleProposal = `
---

  # h1 Heading 8-)
## h2 Heading
### h3 Heading
#### h4 Heading
##### h5 Heading
###### h6 Heading


## Horizontal Rules

___

---

  ***


  ## Typographic replacements

Enable typographer option to see result.

  (c) (C) (r) (R) (tm) (TM) (p) (P) +-

  test.. test... test..... test?..... test!....

  !!!!!! ???? ,,  -- ---

  "Smartypants, double quotes" and 'single quotes'


## Emphasis

**This is bold text**

  __This is bold text__

*This is italic text*

  _This is italic text_

~~Strikethrough~~


## Blockquotes


> Blockquotes can also be nested...
  >> ...by using additional greater-than signs right next to each other...
  > > > ...or with spaces between arrows.


  ## Lists

Unordered

+ Create a list by starting a line with \`+\`, \`-\`, or \`*\`
+ Sub-lists are made by indenting 2 spaces:
  - Marker character change forces new list start:
  * Ac tristique libero volutpat at
+ Facilisis in pretium nisl aliquet
- Nulla volutpat aliquam velit
+ Very easy!

Ordered

1. Lorem ipsum dolor sit amet
2. Consectetur adipiscing elit
3. Integer molestie lorem at massa


1. You can use sequential numbers...
  1. ...or keep all the numbers as \`1.\`

Start numbering with offset:

  57. foo
1. bar


## Code

Inline \`code\`

Indented code

// Some comments
line 1 of code
line 2 of code
line 3 of code


Block code "fences"

\`\`\`
Sample text here...
  \`\`\`

Syntax highlighting

\`\`\` js
var foo = function (bar) {
  return bar++;
};

console.log(foo(5));
\`\`\`

## Tables

| Option | Description |
  | ------ | ----------- |
  | data   | path to data files to supply the data that will be passed into templates. |
  | engine | engine to be used for processing templates. Handlebars is the default. |
  | ext    | extension to be used for dest files. |

  Right aligned columns

| Option | Description |
  | ------:| -----------:|
  | data   | path to data files to supply the data that will be passed into templates. |
  | engine | engine to be used for processing templates. Handlebars is the default. |
  | ext    | extension to be used for dest files. |


  ## Links

[link text](http://dev.nodeca.com)

  [link with title](http://nodeca.github.io/pica/demo/ "title text!")

  Autoconverted link https://github.com/nodeca/pica (enable linkify to see)


  ## Images

![Minion](https://octodex.github.com/images/minion.png)
  ![Stormtroopocat](https://octodex.github.com/images/stormtroopocat.jpg "The Stormtroopocat")

  Like links, Images also have a footnote style syntax

![Alt text][id]

With a reference later in the document defining the URL location:

  [id]: https://octodex.github.com/images/dojocat.jpg  "The Dojocat"


  ## Plugins

The killer feature of \`markdown-it\` is very effective support of
[syntax plugins](https://www.npmjs.org/browse/keyword/markdown-it-plugin).


  ### [Emojies](https://github.com/markdown-it/markdown-it-emoji)

  > Classic markup: :wink: :crush: :cry: :tear: :laughing: :yum:
  >
> Shortcuts (emoticons): :-) :-( 8-) ;)

see [how to change output](https://github.com/markdown-it/markdown-it-emoji#change-output) with twemoji.


  ### [Subscript](https://github.com/markdown-it/markdown-it-sub) / [Superscript](https://github.com/markdown-it/markdown-it-sup)

  - 19^th^
- H~2~O


### [\<ins>](https://github.com/markdown-it/markdown-it-ins)

  ++Inserted text++


  ### [\<mark>](https://github.com/markdown-it/markdown-it-mark)

  ==Marked text==


  ### [Footnotes](https://github.com/markdown-it/markdown-it-footnote)

  Footnote 1 link[^first].

  Footnote 2 link[^second].

  Inline footnote^[Text of inline footnote] definition.

  Duplicated footnote reference[^second].

  [^first]: Footnote **can have markup**

  and multiple paragraphs.

  [^second]: Footnote text.


  ### [Definition lists](https://github.com/markdown-it/markdown-it-deflist)

  Term 1

:   Definition 1
with lazy continuation.

  Term 2 with *inline markup*

    :   Definition 2

{ some code, part of Definition 2 }

Third paragraph of definition 2.

  _Compact style:_

Term 1
~ Definition 1

Term 2
~ Definition 2a
~ Definition 2b


### [Abbreviations](https://github.com/markdown-it/markdown-it-abbr)

  This is HTML abbreviation example.

  It converts "HTML", but keep intact partial entries like "xxxHTMLyyy" and so on.

  *[HTML]: Hyper Text Markup Language

### [Custom containers](https://github.com/markdown-it/markdown-it-container)

  ::: warning
*here be dragons*
  :::
  `;
