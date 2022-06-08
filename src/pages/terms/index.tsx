import { Box } from "@mui/system";
import React, { useState } from "react";
import { Document, Page } from "react-pdf";
import { useEffect } from "react";
import { pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { Button, Typography } from "@mui/material";
import { formatColor, neutral } from "../../theme";
import useWindowDimensions from "../../hooks/useWindowDimensions";
import { PDFFullPage } from "../../components/util/pdfViewer/PDFFullPage";

pdfjs.GlobalWorkerOptions.workerSrc = "pdf.worker.min.js";

export const TermsPage: React.FC = () => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const { height, width } = useWindowDimensions();
  function onDocumentLoadSuccess({ numPages }: { numPages: any }) {
    setNumPages(numPages);
  }
  const [scrollTop, setScrollTop] = useState(0);

  useEffect(() => {
    const onScroll = (e: any) => {
      setScrollTop(e.target.documentElement.scrollTop);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollTop]);

  useEffect(() => {
    let bottom =
      (document.documentElement.scrollHeight - window.innerHeight) * 0.7;
    if (numPages && bottom < scrollTop && pageNumber < numPages) {
      if (pageNumber <= numPages - 2) {
        setPageNumber(pageNumber + 1);
      }
    }
  }, [scrollTop]);

  useEffect(() => {
    setTimeout(() => {
      if (numPages) {
        setPageNumber(numPages - 1);
        // automatically download the entire thing after 10 seconds
      }
    }, 1000 * 15);
  }, [numPages]);

  const mw = 1500;
  return (
    <Box>
      <PDFFullPage pdf_src="ip_terms.pdf" downloadable={true} />
    </Box>
  );
};