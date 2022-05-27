import { Box, Link, Typography } from "@mui/material";
import React, { useState } from "react";
import { useLight } from "../../../hooks/useLight";
import { blue, formatColor, green, neutral, pink, theme } from "../../../theme";
import { Votes } from "./Votes";
import { Status } from "./Status";
import { Spinner } from "../loading";

import ReactMarkdown from "react-markdown";
import { exampleProposal } from "../../../hooks/useGovernance";
import { NormalComponents } from "react-markdown/lib/complex-types";
import { SpecialComponents } from "react-markdown/lib/ast-to-react";
import remarkGfm from "remark-gfm";
import Proposal from "./proposal";

export interface Proposal {
  id: string;
  title: string;
  yesVotes: string;
  noVotes: string;
  status: string;
  timeLeft: string;
}
export interface ProposalProps {
  proposal: Proposal;
}

export const ProposalCard = (props: ProposalProps) => {
  const { id, title, yesVotes, noVotes, status, timeLeft } = props.proposal;
  const isLight = useLight();
  const [isExpanded, setIsExpanded] = useState(false);
  const [expandedContent, setExpandedContent] = useState<string | undefined>(
    undefined
  );

  const expandCard = () => {
    setIsExpanded(!isExpanded);
    setExpandedContent(exampleProposal);
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
      }}
    >
      <Box display="flex" justifyContent="space-between">
        <Box display="flex" alignItems="center">
          <Typography
            variant="h3"
            fontWeight={500}
            color={formatColor(blue.blue1)}
            mr={1}
          >
            {id}
          </Typography>
          <Box onClick={expandCard} position="relative" top={4}>
            <Typography variant="h3" fontWeight={500} color="text.secondary">
              {title}
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
            <Votes noVotes={noVotes} yesVotes={yesVotes} />
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
              <Proposal />
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
