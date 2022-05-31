import {useTheme} from "@emotion/react"
import {Backdrop, Dialog, DialogContent, DialogContentText, DialogTitle, DialogProps, DialogActions, Button} from "@mui/material"
import {Box} from "@mui/system"
import {useState} from "react"
import Cookies from "universal-cookie"




export const Terms: React.FC = ()=>{
    const cookie = new Cookies()
    const [open, setOpen] = useState(cookie.get("IP_ACCEPT_TERMS") != "YES")
    const handleClose = ()=>{
    }
    const handleAgree = ()=>{
        cookie.set("IP_ACCEPT_TERMS", "YES")
        setOpen(false)
    }
    const textFormat = {whiteSpace:"pre-line", unicodeBidi: "embed", overflowWrap:"anywhere"}
    return (<>
        <Dialog
            open={open}
            scroll={"body"}
            onClose={handleClose}
            sx={{
            color: '#fff',
            zIndex: 1,
            }}
        >
            <DialogTitle>Please scroll to bottom</DialogTitle>
            <DialogContent>
                    <DialogContentText noWrap={false} paragraph={true} sx={textFormat} >
                    {copyTermsSale}
                </DialogContentText>
                </DialogContent>
            <DialogActions>
                <Button onClick={handleAgree}>I have read & agreed to the above</Button>
            </DialogActions>
        </Dialog>
    </>)
}


const copyTermsSale = `
Updated: June 1, 2022
Terms of Use

Welcome to https://interestprotocol.io, a user interface (the “Interface” or “App”) provided by GFX Labs, Inc. (“we,” “our,” or “us”). The Interface provides access to a decentralized protocol on the Ethereum blockchain that allows users to borrow and lend stablecoins ("Interest Protocol" or the "Protocol").

This Terms of Use Agreement (the “Agreement” or the “Terms”) explains the terms and conditions by which you may access and use the Interface. You must read this Agreement carefully. By accessing or using the Interface, you signify that you have read, understand, and agree to be bound by this Agreement in its entirety. If you do not agree, you are not authorized to access or use the Interface.

BY USING THE INTERFACE, YOU ARE ENTERING INTO A BINDING AGREEMENT.

PLEASE READ THIS AGREEMENT CAREFULLY AS IT GOVERNS YOUR USE OF THE INTERFACE. THIS AGREEMENT CONTAINS IMPORTANT INFORMATION, INCLUDING A BINDING ARBITRATION PROVISION AND A CLASS ACTION WAIVER, BOTH OF WHICH IMPACT YOUR RIGHTS AS TO HOW DISPUTES ARE RESOLVED. YOU SHOULD ONLY ACCESS THE INTERFACE IF YOU AGREE COMPLETELY WITH THESE TERMS.

To the extent that there is a conflict between these Terms and any applicable additional terms, this Agreement will control unless expressly stated otherwise. If you don't agree to these Terms, you may not use the Interface or otherwise engage with the Interface.


1. Modification of this Agreement

We reserve the right, in our sole discretion, to modify this Agreement from time to time. If we make any modifications, we will notify you by updating the date at the top of the Agreement and by maintaining a current version of the Agreement at https://interestprotocol.io. All modifications will be effective when they are posted, and your continued use of the Interface will serve as confirmation of your acceptance of those modifications. If you do not agree with any modifications to this Agreement, you must immediately stop accessing and using the Interface.


2. Eligibility

To access or use the Interface, you must be able to form a legally binding contract with us. Accordingly, you represent that you are at least eighteen years old and have the full right, power, and authority to enter into and comply with the terms and conditions of this Agreement on behalf of yourself and any company or legal entity for which you may access or use the Interface. You further represent that you are not a citizen, resident, or member of any jurisdiction or group that is subject to economic sanctions by the United States or where your use of the Interface would be illegal or otherwise violate any applicable law. You further represent that your access and use of the Interface will fully comply with all applicable laws and regulations and that you will not access or use the Interface to conduct, promote, or otherwise facilitate any illegal activity.


3. Proprietary Rights

We own all intellectual property and other rights in the Interface and its contents, including (but not limited to) software, text, images, trademarks, service marks, copyrights, patents, and designs. Unlike the Interface, the Protocol is composed entirely of open-source or source-available software running on the public Ethereum blockchain.


4. Protocol Disclaimer

Interest Protocol is a decentralized protocol that allows users to borrow and lend stablecoins. The Protocol consists of free, public, open-source, or source-available software, including a set of smart contracts deployed on the Ethereum Blockchain. Your use of the Protocol involves various risks, including (but not limited to) complete loss of the digital assets you supply to the Protocol. Before using the Protocol, you should review the Interest Protocol Whitepaper to understand how the Protocol works.

INTEREST PROTOCOL IS PROVIDED "AS IS," AT YOUR OWN RISK, AND WITHOUT WARRANTIES OF ANY KIND.

Although we developed the initial code for the Protocol, we do not provide, own, or control Interest Protocol. Instead, the Protocol is run by smart contracts deployed on the Ethereum blockchain. Upgrades and modifications to the Protocol are community-managed by holders of the Interest Protocol governance token (“IPT”). No developer, entity, or person involved in creating the Protocol will be liable for any claims or damages whatsoever associated with your use, inability to use, or your interaction with other users of Interest Protocol—including any direct, indirect, incidental, special, exemplary, punitive or consequential damages, or loss of profits, cryptocurrencies, governance tokens, or anything else of value.


5. Privacy

Please note that when you use the Interface, you are interacting with the Ethereum blockchain, in which your transactions are viewable by anyone. We do not control and are not responsible for any information you make public on the Ethereum blockchain by taking actions through the Interface.


6. Prohibited Activity

You agree not to engage in, or attempt to engage in, any of the following categories of prohibited activity involving your access and use of the Interface:

Intellectual Property Infringement. Activity that infringes on or violates any copyright, trademark, service mark, patent, right of publicity, right of privacy, or other proprietary or intellectual property rights under the law.

Cyberattack. Activity that seeks to interfere with or compromise the integrity, security, or proper functioning of any computer, server, network, personal device, or other information technology system, including (but not limited to) the deployment of viruses and denial of service attacks.

Fraud and Misrepresentation. Activity that seeks to defraud us or any other person or entity, including (but not limited to) providing any false, inaccurate, or misleading information to obtain the property of another unlawfully.

Market Manipulation. Activity that violates any applicable law, rule, or regulation concerning the integrity of trading markets, including (but not limited to) the manipulative tactics commonly known as spoofing and wash trading.

Illegal Source of Funds. Activity that involves the transmission of digital assets that are the direct or indirect proceeds of any criminal or fraudulent activity, including (but not limited to) terrorism, tax evasion, and money laundering.

Any Other Unlawful Conduct. Activity that violates any applicable law, rule, or regulation of the United States or another relevant jurisdiction, including (but not limited to) the restrictions and regulatory requirements imposed by U.S. law.


7. No Professional Advice

All information provided by the Interface is for informational purposes only and should not be construed as professional advice. You should not take, or refrain from taking, any action based on any information contained in the Interface. Before you make any financial, legal, or other decisions involving the Interface, you should seek independent professional advice from an individual who is licensed and qualified in the area for which such advice would be appropriate.

You alone are responsible for determining whether any investment, investment strategy or related transaction is appropriate for you based on your personal investment objectives, financial circumstances, and risk tolerance.


8. No Warranties

THE INTERFACE IS PROVIDED ON AN “AS IS” AND “AS AVAILABLE” BASIS. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ANY REPRESENTATIONS AND WARRANTIES OF ANY KIND, WHETHER EXPRESS, IMPLIED, OR STATUTORY, INCLUDING (BUT NOT LIMITED TO) THE WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE. TO THE EXTENT YOUR JURISDICTION DOES NOT ALLOW LIMITATIONS ON WARRANTIES, THIS LIMITATION MAY NOT APPLY TO YOU. YOUR SOLE AND EXCLUSIVE REMEDY RELATING TO YOUR USE OF THE SITE SHALL BE TO DISCONTINUE USING THE SITE.

You acknowledge and agree that your use of the Interface is at your own risk. We do not represent or warrant that access to the Interface will be continuous, uninterrupted, timely, or secure; that the information contained in the Interface will be accurate, reliable, complete, or current; or that the Interface will be free from errors, defects, viruses, or other harmful elements. No advice, information, or statement that we make should be treated as creating any warranty concerning the Interface. We do not endorse, guarantee, or assume responsibility for any advertisements, offers, or statements made by third parties concerning the Interface.


9. No Fiduciary Duties

This Agreement is not intended to, and does not, create or impose any fiduciary duties on us. To the fullest extent permitted by law, you acknowledge and agree that we owe no fiduciary duties or liabilities to you or any other party and that to the extent any such duties or liabilities may exist at law or in equity, those duties and liabilities are hereby irrevocably disclaimed, waived, and eliminated. You further agree that the only duties and obligations we owe you are those set out expressly in this Agreement.


10. Compliance Obligations

The Interface is operated from facilities within the United States. The Interface may not be available or appropriate for use in other jurisdictions. By accessing or using the Interface, you agree that you are solely and entirely responsible for compliance with all laws and regulations that may apply to you. You may not use the Interface if you are a citizen, resident, or member of any jurisdiction or group that is subject to economic sanctions by the United States or if your use of the Interface would be illegal or otherwise violate any applicable law.


11. Assumption of Risk

User Sophistication and the Inherent Risks of Cryptographic Systems. By accessing and using the Interface, you represent that you understand the inherent risks associated with using cryptographic and blockchain-based systems and that you have a working knowledge of the usage and intricacies of digital assets such as Bitcoin (BTC), Ether (ETH), and other digital tokens such as those following the Ethereum Token Standard (ERC-20).

Volatility of Digital Assets. You understand that Ethereum, other blockchain technologies, associated digital assets, and the markets for those digital assets, are highly volatile due to factors including (but not limited to) adoption, speculation, technology, and security risks. You also acknowledge that the cost of transacting on such technologies is variable and may increase, causing an impact on the cost of activities taking place on the Ethereum blockchain. You acknowledge these risks and represent that we cannot be held liable for such fluctuations or increased costs.

Loss of Digital Assets Due to Liquidations. You further acknowledge the risk that your digital assets may lose some or all of their value while they are supplied to the Protocol. If you borrow digital assets from the Protocol, you will have to supply digital assets of your own as collateral. If your collateral declines in value such that it is no longer sufficient to secure the amount you borrowed, others may interact with the Protocol to seize your collateral in a liquidation event. You further acknowledge that we are not responsible for any of these variables or risks, do not own or control the Protocol, and cannot be held liable for any resulting losses you experience while accessing or using the Protocol. Accordingly, you understand and agree to assume full responsibility for all of the risks of accessing and using the Interface and interacting with the Protocol.

Loss of Private Key(s). You alone are responsible for securing your private key. We do not have access to your private key. Losing control of your private key will permanently and irreversibly deny you access to funds on the Ethereum blockchain. Neither we nor any other person will be able to retrieve or protect your funds. Once your private key is lost, you will not be able to transfer your Digital Assets to any other address or wallet. If this occurs, you will not be able to realize any value or utility that you may hold now or in the future.

Risk of Weaknesses or Exploits in the Field of Cryptography. You acknowledge and understand that cryptography is a progressing field. Advances in code cracking or technical advances such as the development of quantum computers may present risks to digital assets, which could result in the theft or loss of your digital assets or property. By using or accessing the Interface, you acknowledge these inherent risks.

Financial Risks. Digital assets are, by their nature, highly experimental, risky, and volatile. Transactions conducted using the Interface are irreversible and final and there are no refunds. You acknowledge and agree that you will access and use the Interface at your own risk. The risk of loss in utilizing digital assets can be substantial. You should, therefore, carefully consider whether use of the Interface is suitable for you in light of your circumstances and financial resources. By using the Interface, you represent that you have been, are, and will be solely responsible for making your own independent appraisal and investigations into the risks of a given transaction and the underlying digital assets.

Variable Interest Rate Risk. Borrower interest rates are algorithmically adjusted in near-real-time. Under extreme market conditions, fees may accumulate significantly faster than in normal conditions. You acknowledge that if you do not actively monitor or manage your collateral assets, you increase the risk of a sudden liquidation of your vault.

Applicable Law and Tax. You are responsible for complying with applicable law. You agree that we are not responsible for determining whether or which laws may apply to your use of the Interface and Protocol, including tax laws. You are solely responsible for reporting and paying any taxes arising from your use of the Interface and Protocol.

Risk of Regulatory Actions in One or More Jurisdictions. The Interface, the Protocol, USDi, IPT, and digital assets generally could be impacted by one or more regulatory inquiries or regulatory action, which could impede or limit your ability to access or use the Interface, the Protocol, or the Ethereum blockchain, including access to your Digital Assets or other funds.


12. Third-Party Resources and Promotions

The Interface may contain references or links to third-party resources, including (but not limited to) information, materials, products, or services, that we do not own or control. In addition, third parties may offer promotions related to your access and use of the Interface. We do not endorse or assume any responsibility for any such resources or promotions. If you access any such resources or participate in any such promotions, you do so at your own risk, and you understand that this Agreement does not apply to your dealings or relationships with any third parties. You expressly relieve us of any and all liability arising from your use of any such resources or participation in any such promotions.


13. Release of Claims

You expressly agree that you assume all risks in connection with your access and use of the Interface and your interaction with the Protocol. You further expressly waive and release us from any and all liability, claims, causes of action, or damages arising from or in any way relating to your use of the Interface and your interaction with the Protocol. If you are a California resident, you waive the benefits and protections of California Civil Code § 1542, which provides: “[a] general release does not extend to claims that the creditor or releasing party does not know or suspect to exist in his or her favor at the time of executing the release and that, if known by him or her, would have materially affected his or her settlement with the debtor or released party.”


14. Indemnity

You agree to hold harmless, release, defend, and indemnify us and our officers, directors, employees, contractors, agents, affiliates, and subsidiaries from and against all claims, damages, obligations, losses, liabilities, costs, and expenses arising from or relating to: (a) your access and use of the Interface; (b) your violation of any term or condition of this Agreement, the right of any third party, or any other applicable law, rule, or regulation; and (c) any other party’s access and use of the Interface with your assistance or using any device or account that you own or control.


15. Limitation of Liability

UNDER NO CIRCUMSTANCES SHALL WE OR ANY OF OUR OFFICERS, DIRECTORS, EMPLOYEES, CONTRACTORS, AGENTS, AFFILIATES, OR SUBSIDIARIES BE LIABLE TO YOU FOR ANY CLAIMS, PROCEEDINGS, LIABILITIES, OBLIGATIONS, DAMAGES, LOSSES, OR COSTS IN AN AMOUNT EXCEEDING THE AMOUNT YOU PAID TO US IN EXCHANGE FOR ACCESS TO AND USE OF THE INTERFACE, OR $100.00, WHICHEVER IS GREATER. THIS LIMITATION OF LIABILITY APPLIES REGARDLESS OF WHETHER THE ALLEGED LIABILITY IS BASED ON CONTRACT, TORT, NEGLIGENCE, STRICT LIABILITY, OR ANY OTHER BASIS, AND EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH LIABILITY OR SUCH LIABILITY WAS REASONABLY FORESEEABLE.

We assume no liability or responsibility for any: (a) errors, mistakes, or inaccuracies of content; (b) personal injury or property damage, of any nature whatsoever, resulting from any access or use of the Interface; (c) unauthorized access or use of any secure server or database in our control, or the use of any information or data stored therein; (d) interruption or cessation of function related to the Interface; (e) bugs, viruses, trojan horses, or the like that may be transmitted to or through the Interface; (f) errors or omissions in, or loss or damage incurred as a result of the use of, any content made available through the Interface; and (g) the defamatory, offensive, or illegal conduct of any third party. Nor will we be responsible or liable for any damage, loss, or injury resulting from hacking, tampering, or other unauthorized access or use of the Interface or the information contained within it.

Some jurisdictions do not allow the exclusion of certain warranties or the limitation or exclusion of certain liabilities and damages. Accordingly, some of the disclaimers and limitations set forth in this Agreement may not apply to you. This limitation of liability shall apply to the fullest extent permitted by law.


16. Dispute Resolution

We will use our best efforts to resolve any potential disputes through informal, good-faith negotiations. If a potential dispute arises, you must contact us by sending an email to legal@gfxlabs.io so that we can attempt to resolve it without resorting to formal dispute resolution. If we aren’t able to reach an informal resolution within sixty (60) days of your email, then you and we both agree to resolve the potential dispute according to the process set forth below.

Any claim or controversy arising out of or relating to the Interface, this Agreement, or any other acts or omissions for which you may contend that we are liable, including (but not limited to) any claim or controversy as to arbitrability (“Dispute”), shall be conducted in accordance with the expedited procedures set forth in the JAMS Comprehensive Arbitration Rules and Procedures as those Rules exist on the effective date of this Agreement, including Rules 16.1 and 16.2 of those Rules. You understand that you are required to resolve all Disputes by binding arbitration. The arbitration shall be held on a confidential basis before a single arbitrator, who shall be selected pursuant to JAMS rules. The arbitration will be held in Chicago, Illinois. Unless we agree otherwise, the arbitrator may not consolidate your claims with those of any other party. Any judgment on the award rendered by the arbitrator may be entered in any court of competent jurisdiction.


17. Class Action and Jury Trial Waiver

You must bring any and all Disputes against us in your individual capacity and not as a plaintiff in or member of any purported class action, collective action, private attorney general action, or any other representative proceeding. This provision applies to class arbitration. In addition, you and we both agree to waive the right to demand a trial by jury.


18. Governing Law

You agree that the laws of the State of Illinois, without regard to principles of conflict of laws, govern this Agreement and any Dispute between you and us. You further agree that the Interface shall be deemed to be based solely in the State of Illinois, and that although the Interface may be available in other jurisdictions, its availability does not give rise to general or specific personal jurisdiction in any forum outside the State of Illinois. Any arbitration conducted pursuant to this Agreement shall be governed by the Federal Arbitration Act. You agree that the state and federal courts of Cook County, Illinois, are the proper forum for any appeals of an arbitration award or for court proceedings in the event that this Agreement’s binding arbitration clause is found to be unenforceable.


19. Entire Agreement

This Terms of Use Agreement constitutes the entire agreement between you and us with respect to the subject matter hereof. This Agreement supersedes any and all prior or contemporaneous written and oral agreements, communications, and other understandings (if any) relating to the subject matter of the Terms.


20. Waiver and Severability of the Agreement

The failure of any entity to exercise or enforce any right or provision of the Agreement shall not constitute a waiver of such right or provision. If any provision of the Agreement is found by an arbitrator or court of competent jurisdiction to be invalid, the parties nevertheless agree that the arbitrator or court should endeavor to give effect to the parties' intentions as reflected in the provision, and the other provisions of the Agreement remain in full force and effect.


21. Statute of Limitations

You agree that regardless of any statute or law to the contrary, any claim or cause of action arising out of or related to the use of the Interface must be filed within one (1) year after such claim or cause of action arose or be forever barred.


22. Section Titles

The section and bullet titles in the Agreement are for convenience only and have no legal or contractual effect.



Users with questions, complaints, or claims with respect to the Interface or this Agreement may contact us by email at legal@gfxlabs.io.
`
