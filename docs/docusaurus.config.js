// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github')
const darkCodeTheme = require('prism-react-renderer/themes/dracula')
const math = require('remark-math')
const katex = require('rehype-katex')

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'ip',
  tagline: 'interest protocol',
  url: 'https://usdi.io',
  baseUrl: '/',
  baseUrlIssueBanner: false,
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  trailingSlash: true,
  organizationName: 'ip',
  projectName: 'book',
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        blog: false,
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://gfx.cafe/ip/app/-/tree/master/docs',
          remarkPlugins: [math],
          rehypePlugins: [katex],
          async sidebarItemsGenerator({
            defaultSidebarItemsGenerator,
            ...args
          }) {
            const sidebarItems = await defaultSidebarItemsGenerator(args)
            return clearIndex(sidebarItems)
          },
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],
  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
      type: 'text/css',
      integrity:
        'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
      crossorigin: 'anonymous',
    },
  ],
  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */

    ({
      algolia: {
        // The application ID provided by Algolia
        appId: '7JZ90C2PH6',

        // Public API key: it is safe to commit it
        apiKey: 'ae492c9cffd766ff20d640fcf2b345f8',

        indexName: 'interestprotocol',

        // Optional: see doc section below
        contextualSearch: true,

        // Optional: Specify domains where the navigation should occur through window.location instead on history.push. Useful when our Algolia config crawls multiple documentation sites and we want to navigate with window.location.href to them.
        // externalUrlRegex: 'external\\.com|domain\\.com',

        // Optional: Algolia search parameters
        // searchParameters: {},

        // Optional: path for search page that enabled by default (`false` to disable it)
        // searchPagePath: 'search',

        //... other Algolia params
      },
      metadata: [
        {
          property: 'og:image',
          content: 'https://interestprotocol.io/images/ip.png',
        },
        { property: 'og:name', content: 'Interest Protocol' },

        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:site', content: '@InterestDeFi' },
        { name: 'twitter:creator', content: '@labsGFX' },
        {
          name: 'twitter:image',
          content: 'https://interestprotocol.io/images/ip.png',
        },
        {
          name: 'keywords',
          key: 'keywords',
          content:
            'Interest, Protocol, usdi, usdc, weth, crypto, Decentralized Finance, DeFi, lending, borrowing, stablecoins, Ethereum,',
        },
      ],
      navbar: {
        title: 'Interest Protocol',
        logo: {
          alt: 'Interest Protocol Logo',
          src: 'img/ip_green.svg',
        },
        items: [
          {
            href: 'https://gfx.cafe/ip/app',
            label: 'Contracts',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Community',
            items: [
              {
                label: 'Discord',
                href: 'https://discord.gg/s9Wja2tb6k',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/labsgfx',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Site Source',
                href: 'https://gfx.cafe/ip/app',
              },
              {
                label: 'Site Source (github mirror)',
                href: 'https://github.com/gfx-labs/ip-app',
              },
              {
                label: 'Contract Source',
                href: 'https://gfx.cafe/ip/contracts',
              },
              {
                label: 'Contract Source (github mirror)',
                href: 'https://github.com/gfx-labs/ip-contracts',
              },
            ],
          },
        ],
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
}

function clearIndex(items) {
  // Reverse items in categories
  const result = items.map((item) => {
    if (item.type === 'category') {
      return { ...item, items: clearIndex(item.items) }
    }
    return item
  })
  // Reverse items at current level
  return result.filter((x) => {
    if (x.id) {
      return !x.id.endsWith('index')
    }
    return true
  })
}

module.exports = config
