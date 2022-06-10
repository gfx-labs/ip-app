import { Box, Typography, Tabs, Tab, Button } from "@mui/material";
import { FormEvent, useEffect, useState } from "react";
import { formatColor, neutral } from "../../theme";
import { AppLayout } from "../../components/partials/app-layout";
import { useLight } from "../../hooks/useLight";
import { DecimalInput } from "../../components/util/textFields";
import { DisableableModalButton } from "../../components/util/button/DisableableModalButton";
import { ModalInputContainer } from "../../components/util/modal/ModalContent/ModalInputContainer";
import Cookies from "universal-cookie";
import { PDFModal } from "../../components/util/pdfViewer/PDFModal";
import { useRolodexContext } from "../../components/libs/rolodex-data-provider/RolodexDataProvider";
import {
  getAccountRedeemedCurrentWave,
  getTotalClaimed,
  useClaimIPT,
  useCommitUSDC,
  useDisableTime,
  WAVEPOOL_ADDRESS,
} from "../../hooks/useSaleUtils";
import { useWeb3Context } from "../../components/libs/web3-data-provider/Web3Provider";
import { getSaleMerkleProof } from "./getMerkleProof";
import { useModalContext } from "../../components/libs/modal-content-provider/ModalContentProvider";
import { TransactionReceipt } from "@ethersproject/providers";
import { BN } from "../../easy/bn";
import { locale } from "../../locale";
import { BNtoHexNumber } from "../../components/util/helpers/BNtoHex";
import useCurrentTime from "../../hooks/useCurrentTime";

const PurchasePage: React.FC = () => {
  const [scrollTop, setScrollTop] = useState(0);
  const cookie = new Cookies();

  const [open, setOpen] = useState(cookie.get("IP_ACCEPT_TERMS") != "YES");
  const handleAgree = () => {
    cookie.set("IP_ACCEPT_TERMS", "YES");
    setOpen(false);
  };

  useEffect(() => {
    const onScroll = (e: any) => {
      setScrollTop(e.target.documentElement.scrollTop);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollTop]);

  return (
    <AppLayout>
      <Box
        sx={{
          marginX: "auto",
          position: "relative",
          height: "100%",
          minHeight: "70vh",
          width: "100%",
          overflow: "hidden",
          py: { xs: 10 },
          maxWidth: 800,
          paddingX: { xs: 2, sm: 10 },
        }}
      >
        <PDFModal
          isOpen={open}
          setIsOpen={setOpen}
          pdf_src="ip_terms.pdf"
          must_agree={true}
          must_agree_handler={handleAgree}
        />

        <PurchaseBox />
      </Box>
    </AppLayout>
  );
};

const PurchaseBox: React.FC = () => {
  const isLight = useLight();
  const { currentAccount, connected } = useWeb3Context();
  const [value, setValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const TabStyle = {
    backgroundColor: isLight
      ? formatColor(neutral.white)
      : formatColor(neutral.gray7),
    color: "primary.main",
    px: { xs: 1, sm: 5 },
    py: { xs: 0.5, sm: 1.5 },
    minHeight: "auto",

    "&.Mui-selected": {
      backgroundColor: isLight
        ? formatColor(neutral.gray7)
        : formatColor(neutral.white),
      borderRadius: 2,
      color: isLight ? formatColor(neutral.white) : formatColor(neutral.gray7),
    },
  };

  return (
    <Box>
      <Tabs
        value={value}
        onChange={handleChange}
        centered
        sx={{
          mb: 4,
          "& .MuiTabs-indicator": {
            display: "none",
          },
        }}
      >
        <Tab sx={TabStyle} label="Wave 1" />
        <Tab sx={TabStyle} label="Wave 2" />
        <Tab sx={TabStyle} label="Wave 3" />
      </Tabs>
      {!connected && !currentAccount && (
        <Box textAlign="center" mb={2}>
          <Typography color="error" variant="h6">
            Please connect your wallet
          </Typography>
        </Box>
      )}
      <TabPanel value={value} index={0} iptForSale={35000000} limit={1000000} />
      <TabPanel value={value} index={1} iptForSale={35000000} limit={500000} />
      <TabPanel value={value} index={2} iptForSale={35000000} />
    </Box>
  );
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  iptForSale: number;
  limit?: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, iptForSale, limit, ...other } = props;
  const isLight = useLight();
  const [usdcAmountToCommit, setUsdcAmountToCommit] = useState("");
  const [focus, setFocus] = useState(false);
  const toggle = () => setFocus(!focus);
  const waveNum = index + 1;
  const rolodex = useRolodexContext();
  const { currentSigner, currentAccount, dataBlock, chainId, connected } =
    useWeb3Context();
  const { updateTransactionState } = useModalContext();
  const currentTime = useCurrentTime();

  const [loading, setLoading] = useState(false);
  const [loadmsg, setLoadmsg] = useState("");

  const [needAllowance, setNeedAllowance] = useState(true);
  const [disableTime, setDisableTime] = useState<Date>();
  const [salePeriodRemaining, setSalePeriodRemaining] = useState<
    number | undefined
  >();
  const [redeemed, setRedeemed] = useState(true);
  const [totalClaimed, setTotalClaimed] = useState("");
  const [claimable, setClaimable] = useState(0);
  useEffect(() => {
    useDisableTime(currentSigner!).then((res) => {
      const time: Date = new Date(BNtoHexNumber(res) * 1000);
      setDisableTime(time);

      setSalePeriodRemaining(
        Math.floor(
          ((time.valueOf() - currentTime.valueOf()) % (1000 * 60 * 60 * 24)) /
            (1000 * 60 * 60)
        )
      );
    });
    getAccountRedeemedCurrentWave(currentSigner!, currentAccount, waveNum).then(
      (res) => {
        setClaimable(BNtoHexNumber(res[0]));
        setRedeemed(res[1]);
      }
    );
  }, [connected, currentAccount, chainId, rolodex]);

  useEffect(() => {
    if (rolodex && usdcAmountToCommit && rolodex.USDC) {
      rolodex
        .USDC!.allowance(currentAccount, WAVEPOOL_ADDRESS)
        .then((initialApproval) => {
          const formattedUSDCAmount = BN(usdcAmountToCommit).mul(1e6);
          if (initialApproval.lt(formattedUSDCAmount)) {
            setNeedAllowance(true);
          } else {
            setNeedAllowance(false);
          }
        });
    }

    getTotalClaimed(currentSigner!).then((res) =>
      setTotalClaimed(BNtoHexNumber(res).toLocaleString())
    );
  }, [rolodex, dataBlock, chainId, usdcAmountToCommit]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (needAllowance) {
      handleApprovalRequest();
    } else {
      usdcCommitHandler();
    }
  };

  const claimHandler = async () => {
    try {
      const claimTransaction = await useClaimIPT(currentSigner!, waveNum);

      updateTransactionState(claimTransaction);
      const claimReceipt = await claimTransaction.wait();

      updateTransactionState(claimReceipt);
    } catch (err) {
      const error = err as TransactionReceipt;
      updateTransactionState(error);
    }
  };

  const handleApprovalRequest = async () => {
    if (rolodex && usdcAmountToCommit) {
      let formattedCommitAmount = BN(usdcAmountToCommit).mul(1e6);

      setLoading(true);
      try {
        setLoadmsg(locale("CheckWallet"));
        const approve = await rolodex.USDC?.connect(currentSigner!).approve(
          WAVEPOOL_ADDRESS,
          formattedCommitAmount
        );

        setLoadmsg(locale("TransactionPending"));
        await approve?.wait();
      } catch (e) {
        console.log(e);
      }
      setLoading(false);
    }
  };

  const usdcCommitHandler = async () => {
    if (rolodex !== null && Number(usdcAmountToCommit) > 0) {
      let formattedCommitAmount = BN(usdcAmountToCommit).mul(1e6);
      setLoading(true);

      try {
        setLoadmsg(locale("CheckWallet"));
        const { proof, key } = await getSaleMerkleProof(
          currentAccount,
          waveNum
        );

        const commitTransaction = await useCommitUSDC(
          formattedCommitAmount,
          currentSigner!,
          waveNum,
          key,
          proof
        );

        updateTransactionState(commitTransaction);
        setLoadmsg(locale("TransactionPending"));

        const commitReceipt = await commitTransaction.wait();

        updateTransactionState(commitReceipt);
      } catch (err) {
        const error = err as TransactionReceipt;
        updateTransactionState(error);
      }
      setLoading(false);
    }
  };

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box>
          <Box display="flex" alignItems="center">
            <Box
              component="img"
              src="images/ipt_blue.svg"
              width={80}
              mr={3}
            ></Box>
            <Typography variant="subtitle1">IPT Sale</Typography>
          </Box>

          <Box display="flex" mt={3}>
            <Typography variant="body3" color="#A3A9BA" mr={1}>
              Sale Period:{" "}
            </Typography>
            <Typography
              variant="body3"
              color={
                isLight
                  ? formatColor(neutral.gray7)
                  : formatColor(neutral.white)
              }
            >
              {salePeriodRemaining !== undefined && salePeriodRemaining > 0
                ? `Wave ${waveNum} Ending in
                  ${salePeriodRemaining}
                  Hours`
                : "Ended"}
            </Typography>
          </Box>

          <Box
            display="flex"
            flexDirection={{ xs: "column", md: "row" }}
            justifyContent="space-between"
            mt={3}
            columnGap={4}
            rowGap={2}
          >
            <Box display="flex">
              <Typography variant="body1" color="#A3A9BA" mr={1}>
                IPT for sale:{" "}
              </Typography>
              <Typography
                variant="body1"
                color={
                  isLight
                    ? formatColor(neutral.gray7)
                    : formatColor(neutral.white)
                }
              >
                {" "}
                {iptForSale.toLocaleString()}
              </Typography>
            </Box>
            <Box display="flex">
              <Typography variant="body1" color="#A3A9BA" mr={1}>
                USDC Committed:
              </Typography>
              <Typography
                variant="body1"
                color={
                  isLight
                    ? formatColor(neutral.gray7)
                    : formatColor(neutral.white)
                }
              >
                {totalClaimed}
              </Typography>
            </Box>
          </Box>
          <Box component="form" onSubmit={handleSubmit} mt={4}>
            <ModalInputContainer focus={focus}>
              <DecimalInput
                onFocus={toggle}
                onBlur={toggle}
                placeholder="USDC Amount"
                value={usdcAmountToCommit}
                onChange={setUsdcAmountToCommit}
              />
            </ModalInputContainer>
            <Box mt={2}>
              {limit &&
              disableTime !== undefined &&
              disableTime > currentTime ? (
                <Typography color="error" variant="label2">
                  Maximum commit allowed: {limit.toLocaleString()}
                </Typography>
              ) : (
                <Box height={28}></Box>
              )}
            </Box>

            {disableTime !== undefined && disableTime > currentTime ? (
              <DisableableModalButton
                disabled={
                  Number(usdcAmountToCommit) <= 0 ||
                  (limit && Number(usdcAmountToCommit) > limit) ||
                  !connected
                }
                type="submit"
                text={needAllowance ? "Set Allowance" : "Confirm Deposit"}
                loading={loading}
                load_text={loadmsg}
                onClick={handleSubmit}
              />
            ) : (
              <Button
                variant="contained"
                onClick={claimHandler}
                disabled={redeemed || !connected}
              >
                <Typography variant="body3" color={formatColor(neutral.white)}>
                  {!connected
                    ? `Please connect your wallet`
                    : redeemed
                    ? `Already claimed for wave ${waveNum}`
                    : claimable > 0
                    ? `Claim IPT for wave ${waveNum}`
                    : `Nothing to claim`}
                </Typography>
              </Button>
            )}
          </Box>

          <Box
            mt={5}
            display="flex"
            justifyContent="space-between"
            flexDirection={{ xs: "column", md: "row" }}
          >
            <Button>Token Sale Rules</Button>

            <Button>View Sales Contract</Button>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default PurchasePage;
