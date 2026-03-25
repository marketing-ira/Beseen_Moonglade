import type { GatsbyConfig } from "gatsby"

// Custom SVGR template (avoids generating `defaultProps` on function components)
// eslint-disable-next-line @typescript-eslint/no-var-requires
const svgrTemplate = require("./svgr-template")

const config: GatsbyConfig = {
  siteMetadata: {
    siteUrl: `https://www.beseen.moonglade.life`,
    title: `Moonglade`,
    description: `Luxury apartments in Kokapet, Hyderabad`,
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  // NOTE: We output types outside of `src` to avoid infinite rebuild loops
  // when the generated file changes during `gatsby develop`, especially on Windows.
  graphqlTypegen: {
    typesOutputPath: `./gatsby-types.d.ts`,
  },
  plugins: [
    'gatsby-plugin-postcss',
    {
      resolve: `gatsby-plugin-image`,
      options: {
        defaults: {
          formats: [`auto`, `webp`],
          placeholder: `blurred`,
          quality: 80,
          breakpoints: [480, 768, 1024, 1280, 1920],
        },
      },
    },
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaults: {
          formats: [`auto`, `webp`],
          placeholder: `blurred`,
          quality: 80,
          breakpoints: [480, 768, 1024, 1280, 1920],
        },
      },
    },
    `gatsby-transformer-sharp`,
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /\.svg$/,  // Include all SVG files
          exclude: /node_modules/ 
    
        },
        svgrOptions: {
          template: svgrTemplate,
        },
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
  options: {
    name: `images`,
    path: `${__dirname}/src/assets/images/`,
  },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `fonts`,
        path: `${__dirname}/src/assets/fonts`,
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                siteUrl
              }
            }
            allSitePage {
              nodes {
                path
              }
            }
          }
        `,
        resolvePages: ({
          allSitePage: { nodes: allPages },
        }: {
          allSitePage: { nodes: Array<{ path: string }> };
        }) => {
          return allPages.map((page) => {
            return { ...page };
          });
        },
        serialize: ({ path }: { path: string }) => {
          return {
            url: path,
            changefreq: path === '/' ? 'daily' : 'weekly',
            priority: path === '/' ? 1.0 : 0.7,
          };
        },
      },
    },
    {
      resolve: `gatsby-plugin-robots-txt`,
      options: {
        host: `https://www.beseen.moonglade.life`,
        sitemap: `https://www.beseen.moonglade.life/sitemap-index.xml`,
        policy: [{ userAgent: `*`, allow: `/` }],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Moonglade - Luxury Apartments in Kokapet, Hyderabad`,
        short_name: `Moonglade`,
        description: `Premium 3 & 4 BHK apartments in Kokapet near Financial District, Hyderabad`,
        start_url: `/`,
        background_color: `#FFFFFF`,
        theme_color: `#1D256C`,
        display: `standalone`,
        icon: `src/assets/images/icon.png`,
        icon_options: {
          purpose: `any maskable`,
        },
        cache_busting_mode: `none`,
        include_favicon: true,
        legacy: true,
      },
    },
  ],
  trailingSlash: `never`,
  flags: {
    FAST_DEV: true,
    PARALLEL_SOURCING: true,
    PRESERVE_FILE_DOWNLOAD_CACHE: true,
  },
}

export default config
