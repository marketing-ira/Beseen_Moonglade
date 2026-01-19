import type { GatsbyConfig } from "gatsby"

const config: GatsbyConfig = {
  siteMetadata: {
    siteUrl: `https://www.beseen.moonglade.life`,
    title: `Moonglade`,
    description: `Luxury apartments in Kokapet, Hyderabad`,
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    'gatsby-plugin-postcss',
    {
      resolve: `gatsby-plugin-image`,
      options: {
        defaults: {
          formats: [`auto`, `webp`, `avif`],
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
          formats: [`auto`, `webp`, `avif`],
          placeholder: `blurred`,
          quality: 80,
          breakpoints: [480, 768, 1024, 1280, 1920],
        },
      },
    },
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-webfonts`,
      options: {
        fonts: {
          google: [
            {
              family: "Poppins",
              variants: ["300", "400", "500", "600", "700"],
            },
            {
              family: "Prata",
              variants: ["300", "400", "500", "600", "700"],
            },
          ],
        },
        formats: ["woff2"],
        useMinify: true,
        usePreload: true,
        usePreconnect: true,
      },
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /\.svg$/,  // Include all SVG files
          exclude: /node_modules/ 
    
        }
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/assets/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `fonts`,
        path: `${__dirname}/src/assets/fonts`,
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
