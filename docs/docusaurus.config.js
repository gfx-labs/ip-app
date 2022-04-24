// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
    title: 'ip',
    tagline: 'interest protocol',
    url: 'https://usdi.io',
    baseUrl: '/',
    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',
    favicon: 'img/favicon.ico',
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
                    editUrl: 'https://gfx.cafe/ip/app/-/tree/master/book',
                    async sidebarItemsGenerator({ defaultSidebarItemsGenerator, ...args }) {
                        const sidebarItems = await defaultSidebarItemsGenerator(args);
                        return clearIndex(sidebarItems);
                    },
                },
                theme: {
                    customCss: require.resolve('./src/css/custom.css'),
                },
            }),
        ],
    ],
    themeConfig:
        /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
        ({
            navbar: {
                title: 'Interest Protocol',
                logo: {
                    alt: 'Interest Protocol Logo',
                    src: 'img/logo.svg',
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
                                href: 'https://discord.gg/W9mjQNTYca',
                            },
                            {
                                label: 'Twitter',
                                href: 'https://twitter.com/gfxlabs',
                            },
                        ],
                    },
                    {
                        title: 'More',
                        items: [
                            {
                                label: 'GitHub',
                                href: 'https://gfx.cafe/ip/app',
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

};

function clearIndex(items) {
    // Reverse items in categories
    const result = items.map((item) => {
        if (item.type === 'category') {
            return { ...item, items: clearIndex(item.items) };
        }
        return item;
    });
    // Reverse items at current level
    return result.filter((x) => {
        if (x.id) {
            return !x.id.endsWith("index")
        }
        return true
    })
}

module.exports = config;
