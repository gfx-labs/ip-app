import { Box, Link, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLight } from "../../../hooks/useLight";
import { blue, formatColor, green, neutral, pink, theme } from "../../../theme";
import { Votes } from "./Votes";
import { Status } from "./Status";
import { Spinner, WithDots } from "../loading";

import ReactMarkdown from "react-markdown";
import {
  exampleProposal,
  ProposalInfo,
  useProposalInfo,
} from "../../../hooks/useGovernance";
import { NormalComponents } from "react-markdown/lib/complex-types";
import { SpecialComponents } from "react-markdown/lib/ast-to-react";
import remarkGfm from "remark-gfm";
import { useWeb3Context } from "../../libs/web3-data-provider/Web3Provider";
import ProposalDetails from "./proposal";
import { Logp } from "../../../logger";
import { Proposal } from "../../../pages/governance";

export interface ProposalCardProps {
  proposal: Proposal;
}

export const ProposalCard = (props: ProposalCardProps) => {
  const { dataBlock, provider } = useWeb3Context();
  const { id, proposer, body, endBlock, emergency } = props.proposal;
  const isLight = useLight();
  const [isExpanded, setIsExpanded] = useState(false);
  const [expandedContent, setExpandedContent] = useState<string | undefined>(
    undefined
  );

  const [status, setStatus] = useState("");

  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const bdiff = endBlock - dataBlock;
    const secs = bdiff * 13.5;
    const hrdiff = Math.abs(Math.round((100 * secs) / (60 * 60)) / 100);
    if (bdiff < 0) {
      setTimeLeft(`Voting Ended ${hrdiff} Hour(s) ago`);
      setStatus("Ended");
      return;
    }
    setTimeLeft(`Active for ${hrdiff} Hour(s)`);
    setStatus("Active");
  }, [dataBlock]);

  const expandCard = () => {
    setIsExpanded(!isExpanded);
    setExpandedContent(body);
  };
  return (
    <Box
      sx={{
        backgroundColor: isLight
          ? formatColor(neutral.white)
          : formatColor(neutral.black6),
        borderRadius: 2,
        paddingX: { xs: 1, md: 4 },
        paddingY: 3,
        cursor: "pointer",
        borderColor: formatColor(pink.pink1),
        borderWidth: 2,
        borderStyle: emergency ? "solid" : "none",
      }}
    >
      <Box onClick={expandCard} display="flex" justifyContent="space-between">
        <Box display="flex" alignItems="center">
          <Typography
            variant="h3"
            fontWeight={500}
            color={formatColor(blue.blue1)}
            mr={1}
          >
            {id}
          </Typography>
          <Box position="relative" top={4}>
            <Typography variant="h3" fontWeight={500} color="text.secondary">
              {"title"}
            </Typography>
            {timeLeft ? (
              <Typography variant="body2" color={formatColor(neutral.gray3)}>
                {timeLeft}
              </Typography>
            ) : (
              <Box height="8px"></Box>
            )}
          </Box>
        </Box>

        <Box display="flex">
          <Box display={{ xs: "none", md: "flex" }}>
            <Votes noVotes={"0"} yesVotes={"1"} />
          </Box>
          <Status status={status} />
        </Box>
      </Box>

      {isExpanded ? (
        <Box
          sx={{
            marginTop: 3,
            cursor: "auto",
          }}
        >
          {expandedContent ? (
            <Box>
              <ProposalDetails id={Number(id)} />
              <ReactMarkdown
                children={expandedContent}
                components={markdownComponentConfig}
                remarkPlugins={[remarkGfm]}
              />
            </Box>
          ) : (
            <Spinner />
          )}
        </Box>
      ) : (
        <></>
      )}
    </Box>
  );
};

const markdownComponentConfig: Partial<
  Omit<NormalComponents, keyof SpecialComponents> & SpecialComponents
> = {
  a: ({ node, style, children, ...props }) => {
    return (
      <Link
        {...props}
        style={{
          ...style,
        }}
      >
        {children}
      </Link>
    );
  },
  table: ({ node, style, children, ...props }) => {
    return (
      <table
        {...props}
        style={{
          borderRadius: 10,
          backgroundColor: "#fcfcfc",
          color: "#303030",
          border: "1px solid black",
          borderCollapse: "collapse",
          ...style,
        }}
      >
        {children}
      </table>
    );
  },
  td: ({ node, style, children, isHeader, ...props }) => {
    if (isHeader) {
      return (
        <th
          style={{
            border: "1px solid black",
            padding: "2px",
            paddingRight: "4px",
            paddingLeft: "4px",
            ...style,
          }}
        >
          {children}
        </th>
      );
    }
    return (
      <td
        style={{
          border: "1px solid black",
          padding: "2px",
          paddingRight: "4px",
          paddingLeft: "4px",
          ...style,
        }}
      >
        {children}
      </td>
    );
  },
  tr: ({ node, style, children, isHeader, ...props }) => {
    return (
      <tr
        {...props}
        style={{
          border: "1px solid black",
          ...style,
        }}
      >
        {children}
      </tr>
    );
  },
  img: ({ node, ...props }) => {
    return (
      <img
        {...props}
        style={{
          width: "25%",
        }}
      ></img>
    );
  },
  pre: ({ node, ...props }) => {
    return (
      <pre
        {...props}
        style={{
          border: "1px solid #CCCCCC",
          borderRadius: 3,
          backgroundColor: "#fafafa",
          color: "#303030",
          whiteSpace: "pre",
          fontFamily: "monospace",
          margin: "1em 0",
          overflow: "auto",
          padding: "6px 10px",
        }}
      ></pre>
    );
  },
  code: ({ node, inline, className, children, ...props }) => {
    return (
      <code
        className={className}
        {...props}
        style={{
          fontFamily: "monospace",
          borderRadius: 3,
          backgroundColor: "#fafafa",
          color: "#303030",
          border: inline ? "1px solid #EAEAEA" : "none",
        }}
      >
        {children}
      </code>
    );
  },
};
