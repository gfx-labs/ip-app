import React, { ReactNode } from "react";
import clsx from "clsx";
import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import Head from "@docusaurus/Head";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import styles from "./index.module.css";
import DocCard from "@theme/DocCard";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{"Interest Protocol"}</h1>
        <p className="hero__subtitle">{"documentation & guides"}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro"
          >
            click here to read!
          </Link>
        </div>
      </div>
    </header>
  );
}

function CardContainer({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}): JSX.Element {
  return (
    <Link
      href={href}
      className={clsx("card padding--lg", styles.cardContainer)}
    >
      {children}
    </Link>
  );
}

function CardLayout({
  href,
  icon,
  title,
  description,
}: {
  href: string;
  icon: ReactNode;
  title: string;
  description?: string;
}): JSX.Element {
  return (
    <CardContainer href={href}>
      <h2 className={clsx("text--truncate", styles.cardTitle)} title={title}>
        {icon} {title}
      </h2>
      {description && (
        <p
          className={clsx(styles.cardDescription)}
          title={description}
          style={{
            wordWrap: "normal",
            overflowWrap: "anywhere",
            maxWidth: "250px",
          }}
        >
          {description}
        </p>
      )}
    </CardContainer>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title={`${siteConfig.title}`} description="interest protocol">
      <Head>
        <meta property="og:image" content="https://interestprotocol.io/images/favicon.ico" />
        <meta property="og:title" content={`${siteConfig.title}`} />
        <meta property="og:name" content={`${siteConfig.title}`} />
        <meta
          property="og:description"
          content={`${siteConfig.title} Documentation and guides`}
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@InterestDeFi" />
        <meta name="twitter:creator" content="@labsGFX" />
        <meta name="twitter:title" content={`${siteConfig.title}`} />
        <meta
          name="twitter:description"
          content={`${siteConfig.title} Documentation and guides`}
        />
        <meta name="twitter:image" content="https://interestprotocol.io/images/favicon.ico" />
      </Head>
      <HomepageHeader />
      <main>
        <div className="container">
          <br></br>
          <h1 style={{ textAlign: "center" }}>Not sure where to start?</h1>
          <h3 className="hero__subtitle" style={{ textAlign: "center" }}>
            Try one of these articles:
          </h3>
          <div
            style={{
              display: "flex",
              flex: "1 1 0px",
              flexDirection: "column",
              justifyContent: "center",
              gap: 20,
            }}
          >
            <div
              style={{
                flexBasis: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                gap: 20,
              }}
            >
              <CardLayout
                href="docs/intro"
                icon={"🔗"}
                title="Intro"
                description={"A brief overview of Interest Protocol"}
              />
              <CardLayout
                href="docs/concepts/USDi"
                icon={"🔗"}
                title="USDi"
                description={"An Interest Bearing Stablecoin redeemable for $1"}
              />
              <CardLayout
                href="docs/concepts/Risks/RiskManagement"
                icon={"🔗"}
                title="Risk Management"
                description={"How IP manages Risk"}
              />
            </div>
            <div
              style={{
                flexBasis: "100%",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                gap: 20,
              }}
            >
              <CardLayout
                href="docs/guides/Protocol Interaction/How To Borrow"
                icon={"🔗"}
                title="Borrowing"
                description={"How to Borrow from the Protocol"}
              />
              <CardLayout
                href="docs/guides/Protocol Interaction/How To Lend"
                icon={"🔗"}
                title="Lending"
                description={"How to Lend to the Protocol"}
              />
              <CardLayout
                href="docs/guides/Protocol Interaction/How To Liquidate"
                icon={"🔗"}
                title="Liquidating"
                description={"How to Liquidate a Vault"}
              />
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
