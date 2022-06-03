import { useTheme } from "@emotion/react";
import {
  Backdrop,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogProps,
  DialogActions,
  Button,
} from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import Cookies from "universal-cookie";

export const Terms: React.FC = () => {
  const cookie = new Cookies();
  const [open, setOpen] = useState(cookie.get("IP_ACCEPT_TERMS") != "YES");
  const handleClose = () => {};
  const handleAgree = () => {
    cookie.set("IP_ACCEPT_TERMS", "YES");
    setOpen(false);
  };
  const textFormat = {
    whiteSpace: "pre-line",
    unicodeBidi: "embed",
    overflowWrap: "anywhere",
  };
  return (
    <>
      <Dialog
        open={open}
        scroll={"body"}
        onClose={handleClose}
        sx={{
          color: "#fff",
          zIndex: 1,
        }}
      >
        <DialogTitle>Please scroll to bottom</DialogTitle>
        <DialogContent>
          <DialogContentText noWrap={false} paragraph={true} sx={textFormat}>
            {copyTermsSale}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAgree}>
            I have read & agreed to the above
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

const copyTermsSale = `
Updated: June 1, 2022

Terms of UseWelcome to https://interestprotocol.io, a user interface (the “Interface” or “App”) provided byGFX Labs, Inc. (“we,” “our,” or “us”). The Interface allows access to a decentralized protocol thatallows users to borrow and lend stablecoins on the Ethereum and Ethereum-compatibleblockchains. ("Interest Protocol" or the "Protocol").

This Terms of Use Agreement (the “Agreement” or the “Terms”) explains the terms andconditions by which you may access and use the Interface. You must read this Agreementcarefully. By accessing or using the Interface, you signify that you have read, understand, andagree to be bound by this Agreement in its entirety. If you do not agree, you are not authorizedto access or use the Interface.

BY USING THE INTERFACE, YOU ARE ENTERING INTO A BINDING AGREEMENT.

PLEASE READ THIS AGREEMENT CAREFULLY AS IT GOVERNS YOUR USE OF THEINTERFACE. THIS AGREEMENT CONTAINS IMPORTANT INFORMATION, INCLUDING ABINDING ARBITRATION PROVISION AND A CLASS ACTION WAIVER, BOTH OF WHICHIMPACT YOUR RIGHTS AS TO HOW DISPUTES ARE RESOLVED. YOU SHOULD ONLYACCESS THE INTERFACE IF YOU AGREE TO THESE TERMS IN THEIR ENTIRETY.

To the extent that there is a conflict between these Terms and any applicable additional terms,this Agreement will control unless expressly stated otherwise. If you don't agree to these Terms,you may not use the Interface or otherwise engage with the Interface.

1. Modification of this Agreement

We reserve the right, in our sole discretion, to modify this Agreement from time to time. If wemake any modifications, we will notify you by updating the date at the top of the Agreement andby maintaining a current version of the Agreement at https://interestprotocol.io. All modificationswill be effective when they are posted, and your continued use of the Interface will serve asconfirmation of your acceptance of those modifications. If you do not agree with anymodifications to this Agreement, you must immediately stop accessing and using the Interface.

2. Eligibility

To access or use the Interface, you must be able to form a legally binding contract with us.Accordingly, you represent that you are at least eighteen (18) years old and have the full right,power, and authority to enter into and comply with the terms and conditions of this Agreementon behalf of yourself and any company or legal entity for which you may access or use theInterface. You further represent that you are not a citizen, resident, or member of any jurisdiction or group that is subject to economic sanctions by the United States or where your use of theInterface would be illegal or otherwise violate any applicable law. You further represent that youraccess and use of the Interface will fully comply with all applicable laws and regulations and thatyou will not access or use the Interface to conduct, promote, or otherwise facilitate any illegalactivity.

3. Proprietary Rights

While the Interface itself is open source under LGPLv3, we own intellectual property and otherrights in its contents, including (but not limited to) text, images, trademarks, service marks,copyrights, patents, and designs. The Protocol, however, is composed entirely of open-sourceor source-available software running on the public Ethereum blockchain.

4. Protocol Disclaimer

Interest Protocol is a decentralized protocol that allows users to borrow and lend stablecoins. The Protocol consists of free, public, open-source, or source-available software, including a setof smart contracts deployed on the Ethereum Blockchain. Your use of the Protocol involvesvarious risks, including (but not limited to) complete loss of the digital assets you supply to theProtocol. Before using the Protocol, you should review the Interest Protocol Whitepaper tounderstand how the Protocol works.INTEREST PROTOCOL IS PROVIDED "AS IS," AT YOUR OWN RISK, AND WITHOUTWARRANTIES OF ANY KIND.Although we developed the initial code for the Protocol, we do not provide, own, or controlInterest Protocol. Instead, the Protocol is run by smart contracts deployed on the Ethereumblockchain. Upgrades and modifications to the Protocol are community-managed by holders ofthe Interest Protocol governance token (“IPT”). No developer, entity, or person involved increating the Protocol will be liable for any claims or damages whatsoever associated with youruse, inability to use, or your interaction with other users of Interest Protocol—including anydirect, indirect, incidental, special, exemplary, punitive or consequential damages, or loss ofprofits, cryptocurrencies, governance tokens, or anything else of value.

5. Privacy

Please note that when you use the Interface, you are interacting with the Ethereum blockchain,in which your transactions are viewable by anyone. We do not control and are not responsiblefor any information you make public on the Ethereum blockchain by taking actions through theInterface.

6. Prohibited Activity

You agree not to engage in, or attempt to engage in, any of the following categories of prohibited activity involving your access and use of the Interface:

● Intellectual Property Infringement. Activity that infringes on or violates any copyright,trademark, service mark, patent, right of publicity, right of privacy, or other proprietary orintellectual property rights under the law.

● Cyberattack. Activity that seeks to interfere with or compromise the integrity, security, orproper functioning of any computer, server, network, personal device, or other information technology system, including (but not limited to) the deployment of virusesand denial of service attacks.

● Fraud and Misrepresentation. Activity that seeks to defraud us or any other person orentity, including (but not limited to) providing any false, inaccurate, or misleadinginformation to obtain the property of another unlawfully.

● Market Manipulation. Activity that violates any applicable law, rule, or regulationconcerning the integrity of trading markets, including (but not limited to) the manipulativetactics commonly known as spoofing and wash trading.

● Illegal Source of Funds. Activity that involves the transmission of digital assets that arethe direct or indirect proceeds of any criminal or fraudulent activity, including (but notlimited to) terrorism, tax evasion, and money laundering.

● Any Other Unlawful Conduct. Activity that violates any applicable law, rule, or regulationof the United States or another relevant jurisdiction, including (but not limited to) therestrictions and regulatory requirements imposed by U.S. law. 

7. No Professional Advice

All information provided by the Interface is for informational purposes only and should not beconstrued as professional advice. You should not take, or refrain from taking, any action basedon any information contained in the Interface. Before you make any financial, legal, or otherdecisions involving the Interface, you should seek independent professional advice from anindividual who is licensed and qualified in the area for which such advice would be appropriate.

You alone are responsible for determining whether any investment, investment strategy, orrelated transaction is appropriate for you based on your personal investment objectives,financial circumstances, and risk tolerance.

8. No Warranties

THE INTERFACE IS PROVIDED ON AN “AS IS” AND “AS AVAILABLE” BASIS. TO THEFULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ANY REPRESENTATIONS ANDWARRANTIES OF ANY KIND, WHETHER EXPRESS, IMPLIED, OR STATUTORY,INCLUDING (BUT NOT LIMITED TO) THE WARRANTIES OF MERCHANTABILITY ANDFITNESS FOR A PARTICULAR PURPOSE. TO THE EXTENT YOUR JURISDICTION DOESNOT ALLOW LIMITATIONS ON WARRANTIES, THIS LIMITATION MAY NOT APPLY TO YOU.YOUR SOLE AND EXCLUSIVE REMEDY RELATING TO YOUR USE OF THE SITE SHALL BETO DISCONTINUE USING THE SITE.

You acknowledge and agree that your use of the Interface is at your own risk. We do notrepresent or warrant that access to the Interface will be continuous, uninterrupted, timely, orsecure; that the information contained in the Interface will be accurate, reliable, complete, orcurrent; or that the Interface will be free from errors, defects, viruses, or other harmful elements.No advice, information, or statement that we make should be treated as creating any warrantyconcerning the Interface. We do not endorse, guarantee, or assume responsibility for anyadvertisements, offers, or statements made by third parties concerning the Interface.

9. No Fiduciary DutiesThis Agreement is not intended to, and does not, create or impose any fiduciary duties on us. Tothe fullest extent permitted by law, you acknowledge and agree that we owe no fiduciary dutiesor liabilities to you or any other party and that to the extent any such duties or liabilities mayexist at law or in equity, those duties and liabilities are hereby irrevocably disclaimed, waived,and eliminated. You further agree that the only duties and obligations we owe you are those setout expressly in this Agreement.

10. Compliance ObligationsThe Interface is operated from facilities within the United States. The Interface may not beavailable or appropriate for use in other jurisdictions. By accessing or using the Interface, youagree that you are solely and entirely responsible for compliance with all laws and regulationsthat may apply to you. You may not use the Interface if you are a citizen, resident, or member ofany jurisdiction or group that is subject to economic sanctions by the United States or if your useof the Interface would be illegal or otherwise violate any applicable law.

11. Assumption of Risk

You expressly agree that you assume all risks in connection with your access and use of theInterface and your interaction with the Protocol, including (but not limited to):

● User Sophistication and the Inherent Risks of Cryptographic Systems. By accessing andusing the Interface, you represent that you understand the inherent risks associated withusing cryptographic and blockchain-based systems and that you have a workingknowledge of the usage and intricacies of digital assets such as Bitcoin (BTC), Ether(ETH), and other digital tokens such as those following the Ethereum Token Standard(ERC-20).

● Digital Asset and Transaction Fee Volatility. You understand that Ethereum, otherblockchain technologies, associated digital assets, and the markets for those digitalassets are highly volatile due to factors including (but not limited to) adoption,speculation, technology, regulation, and security. You also acknowledge that the cost oftransacting on such technologies—commonly called “gas”—is variable and mayincrease, causing an impact on the cost of activities taking place on the Ethereumblockchain. You acknowledge these risks and represent that we cannot be held liable forsuch fluctuations or increased costs.

● Loss of Digital Assets Due to Liquidations. You acknowledge the risk that your digitalassets may lose some or all of their value while they are supplied to the Protocol. If youborrow digital assets from the Protocol, you will have to supply digital assets of your ownas collateral. If your collateral declines in value such that it is no longer sufficient tosecure the amount you borrowed, others may interact with the Protocol to seize some orall of your collateral in a liquidation event. You further acknowledge that we are notresponsible for any of these variables or risks, do not own or control the Protocol, andcannot be held liable for any resulting losses you experience while accessing or usingthe Protocol. Accordingly, you understand and agree to assume full responsibility for allof the risks of accessing and using the Interface and interacting with the Protocol.

● Loss of Private Key(s). You alone are responsible for securing your private key. We donot have access to your private key. Losing control of your private key will permanentlyand irreversibly deny you access to funds on the Ethereum blockchain. Neither we norany other person will be able to retrieve or protect your funds. Once your private key islost, you will not be able to transfer your Digital Assets to any other address or wallet. Ifthis occurs, you will not be able to realize any value or utility that you may hold now or inthe future.

● Risk of Weaknesses or Exploits in the Field of Cryptography. You acknowledge andunderstand that cryptography is a progressing field. Advances in code cracking ortechnical advances such as the development of quantum computers may present risksto digital assets, which could result in the theft or loss of your digital assets or property.By using or accessing the Interface, you acknowledge these inherent risks.

● Financial Risks. Digital assets are, by their nature, highly experimental, risky, andvolatile. Transactions conducted using the Interface are irreversible and final, and thereare no refunds. You acknowledge and agree that you will access and use the Interface atyour own risk. The risk of loss in utilizing digital assets can be substantial. You should,therefore, carefully consider whether use of the Interface is suitable for you in light ofyour circumstances and financial resources. By using the Interface, you represent thatyou have been, are, and will be solely responsible for making your own independentappraisal and investigations into the risks of a given transaction and the underlyingdigital assets.

● Variable Interest Rate Risk. You understand that borrower interest rates arealgorithmically adjusted in near-real-time. Under extreme market conditions, fees mayaccumulate significantly faster than in normal conditions. You acknowledge that if you donot actively monitor or manage your collateral assets, you increase the risk of a suddenliquidation of your vault.

● USDC Value Diverging from USD Risk. You understand that USDi is pegged to USD viaUSDC. If the price of USDC diverges from that of USD, the price of USDi can alsodiverge from USD. The Protocol's oracles system relies on both USDC andUSD-denominated prices. Therefore, if USDC’s price diverges from USD, the oraclesystem's safeguard will activate and prevent users from using certain Protocolfunctionalities. You acknowledge and understand this risk and that we are notresponsible for any USDC depeg and cannot be held liable for any resulting losses orlack of access to the Protocol.

● Applicable Law and Tax. You are responsible for complying with applicable law. You agree that we are not responsible for determining which laws may apply to your use ofthe Interface and Protocol, including tax laws. You are solely responsible for reportingand paying any taxes arising from your use of the Interface and Protocol.

● General Risk of Regulatory Actions in One or More Jurisdictions. You acknowledge thatthe Interface, the Protocol, USDi, IPT, and digital assets generally could be impacted byone or more regulatory inquiries or regulatory action, which could impede or limit yourability to access or use the Interface, the Protocol, or the Ethereum blockchain, includingaccess to your Digital Assets or other funds.

12. Third-Party Resources and PromotionsThe Interface may contain references or links to third-party resources, including (but not limitedto) information, materials, products, or services, that we do not own or control. In addition, thirdparties may offer promotions related to your access and use of the Interface. We do not endorseor assume any responsibility for any such resources or promotions. If you access any suchresources or participate in any such promotions, you do so at your own risk, and you

understand that this Agreement does not apply to your dealings or relationships with any thirdparties. You expressly relieve us of any and all liability arising from your use of any suchresources or participation in any such promotions.

13. Release of ClaimsYou expressly waive and release us from any and all liability, claims, causes of action, ordamages arising from or in any way relating to your use of the Interface and your interactionwith the Protocol. If you are a California resident, you waive the benefits and protections ofCalifornia Civil Code § 1542, which provides: “[a] general release does not extend to claims thatthe creditor or releasing party does not know or suspect to exist in his or her favor at the time ofexecuting the release and that, if known by him or her, would have materially affected his or hersettlement with the debtor or released party.”

14. IndemnityYou agree to hold harmless, release, defend, and indemnify us and our officers, directors,employees, contractors, agents, affiliates, and subsidiaries from and against all claims,damages, obligations, losses, liabilities, costs, and expenses arising from or relating to: (a) youraccess and use of the Interface; (b) your violation of any term or condition of this Agreement,the right of any third party, or any other applicable law, rule, or regulation; and (c) any otherparty’s access and use of the Interface with your assistance or using any device or account thatyou own or control.

15. Limitation of LiabilityUNDER NO CIRCUMSTANCES SHALL WE OR ANY OF OUR OFFICERS, DIRECTORS,EMPLOYEES, CONTRACTORS, AGENTS, AFFILIATES, OR SUBSIDIARIES BE LIABLE TOYOU FOR ANY CLAIMS, PROCEEDINGS, LIABILITIES, OBLIGATIONS, DAMAGES, LOSSES,OR COSTS IN AN AMOUNT EXCEEDING THE AMOUNT YOU PAID TO US IN EXCHANGEFOR ACCESS TO AND USE OF THE INTERFACE, OR $100.00, WHICHEVER IS GREATER.THIS LIMITATION OF LIABILITY APPLIES REGARDLESS OF WHETHER THE ALLEGEDLIABILITY IS BASED ON CONTRACT, TORT, NEGLIGENCE, STRICT LIABILITY, OR ANYOTHER BASIS, AND EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCHLIABILITY OR SUCH LIABILITY WAS REASONABLY FORESEEABLE.

We assume no liability or responsibility for any: (a) errors, mistakes, or inaccuracies of content;(b) personal injury or property damage, of any nature whatsoever, resulting from any access oruse of the Interface; (c) unauthorized access or use of any secure server or database in ourcontrol, or the use of any information or data stored therein; (d) interruption or cessation offunction related to the Interface; (e) bugs, viruses, trojan horses, or the like that may be transmitted to or through the Interface; (f) errors or omissions in, or loss or damage incurred asa result of the use of, any content made available through the Interface; and (g) the defamatory,offensive, or illegal conduct of any third party. Nor will we be responsible or liable for anydamage, loss, or injury resulting from hacking, tampering, or other unauthorized access or useof the Interface or the information contained within it.

Some jurisdictions do not allow the exclusion of certain warranties or the limitation or exclusionof certain liabilities and damages. Accordingly, some of the disclaimers and limitations set forthin this Agreement may not apply to you. This limitation of liability shall apply to the fullest extentpermitted by law.

16. Dispute Resolution

We will use our best efforts to resolve any potential disputes through informal, good-faithnegotiations. If a potential dispute arises, you must contact us by sending an email tolegal@gfxlabs.io so that we can attempt to resolve it without resorting to formal disputeresolution. If we aren’t able to reach an informal resolution within sixty (60) days of your email,then you and we both agree to resolve the potential dispute according to the process set forth below.

Any claim or controversy arising out of or relating to the Interface, this Agreement, or any otheracts or omissions for which you may contend that we are liable, including (but not limited to) anyclaim or controversy as to arbitrability (“Dispute”), shall be conducted in accordance with theexpedited procedures set forth in the JAMS Comprehensive Arbitration Rules and Proceduresas those Rules exist on the effective date of this Agreement, including Rules 16.1 and 16.2 ofthose Rules. You understand that you are required to resolve all Disputes by binding arbitration.The arbitration shall be held on a confidential basis before a single arbitrator, who shall beselected pursuant to JAMS rules. The arbitration will be held in Chicago, Illinois. Unless weagree otherwise, the arbitrator may not consolidate your claims with those of any other party.Any judgment on the award rendered by the arbitrator may be entered in any court of competent jurisdiction.

17. Class Action and Jury Trial Waiver

You must bring any and all Disputes against us in your individual capacity and not as a plaintiff in or member of any purported class action, collective action, private attorney general action, orany other representative proceeding. This provision applies to class arbitration. In addition, youand we both agree to waive the right to demand a trial by jury.

18. Governing Law

You agree that the laws of the State of Illinois, without regard to principles of conflict of laws,govern this Agreement and any Dispute between you and us. You further agree that theInterface shall be deemed to be based solely in the State of Illinois, and that although theInterface may be available in other jurisdictions, its availability does not give rise to general orspecific personal jurisdiction in any forum outside the State of Illinois. Any arbitration conductedpursuant to this Agreement shall be governed by the Federal Arbitration Act. You agree that thestate and federal courts of Cook County, Illinois, are the proper forum for any appeals of anarbitration award or for court proceedings in the event that this Agreement’s binding arbitrationclause is found to be unenforceable.

19. Entire Agreement

This Terms of Use Agreement constitutes the entire agreement between you and us withrespect to the subject matter hereof. This Agreement supersedes any and all prior orcontemporaneous written and oral agreements, communications, and other understandings (ifany) relating to the subject matter of the Terms.

20. Waiver and Severability of the Agreement

The failure of any entity to exercise or enforce any right or provision of the Agreement shall notconstitute a waiver of such right or provision. If any provision of the Agreement is found by anarbitrator or court of competent jurisdiction to be invalid, the parties nevertheless agree that thearbitrator or court should endeavor to give effect to the parties' intentions as reflected in theprovision, and the other provisions of the Agreement remain in full force and effect.

21. Statute of Limitations

You agree that regardless of any statute or law to the contrary, any claim or cause of actionarising out of or related to the use of the Interface must be filed within one (1) year after suchclaim or cause of action arose or be forever barred.

22. Section Titles

The section and bullet titles in the Agreement are for convenience only and have no legal orcontractual effect.

Users with questions, complaints, or claims with respect to the Interface or this Agreement maycontact us by email at legal@gfxlabs.io.
`;
