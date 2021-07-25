module.exports = {
    pathPrefix: "/",
    siteMetadata: {
        title: "MaJaeGeon",
        subtitle: "A text-focused theme",
        description: "A minimal, portfolio, sidebar theme with responsive web design and focuses on text presentation.",
        image: "https://avatars.githubusercontent.com/u/59637845?v=4",
        favicon: "https://avatars.githubusercontent.com/u/59637845?v=4",
        siteUrl: "https://majaegeon.github.io",
        social: { 
            name: "MaJaeGeon",
            email: "akworjs0517@gmail.com",
            homepage: "https://github.com/MaJaeGeon",
            avatar: "https://avatars.githubusercontent.com/u/59637845?v=4",
            links: ["https://github.com/MaJaeGeon"],
        },
    },
    plugins: [
        "gatsby-plugin-sass",
        "gatsby-plugin-react-helmet",
        "gatsby-plugin-sharp",
        "gatsby-remark-images",
        "gatsby-plugin-sitemap",
        {
            resolve: "gatsby-source-filesystem",
            options: {
                name: "posts",
                path: `${__dirname}/posts/`,
            },
        },
        {
            resolve: "gatsby-plugin-mdx",
            options: {
                extensions: [".mdx", ".md"],
                gatsbyRemarkPlugins: [
                    {
                        resolve: `gatsby-remark-highlight-code`,
                        options: {
                            terminal: "carbon",
                            lineNumbers: "true"
                        },
                    },
                    {
                        resolve: `gatsby-remark-autolink-headers`,
                        options: {
                          maintainCase: false, // 이 부분은 반드시 false로 하자. url이 대소문자를 구분하기 때문에 링크가 작동하지 않을 수 있다.
                          removeAccents: true,
                          elements: [`h2`, 'h3', `h4`, 'h5', `h6`], // 링크를 추가할 Header 종류 선택
                        },
                    },
                    {
                        resolve: `gatsby-remark-images`,
                        options: {
                        maxWidth: 1200,
                        },
                    },
                ],
                defaultLayouts: {
                    default: require.resolve(`./src/templates/page-template.js`),
                }
            },
        },
    ],
};