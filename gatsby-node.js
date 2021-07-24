exports.createPages = async ({ graphql, actions, reporter }) => {
    const { createPage } = actions;

    const result = await graphql(`{
        postsRemark: allMdx(
            sort: { order: DESC, fields: [frontmatter___date] }
            limit: 2000
        ) {
            totalCount
            edges {
                node {
                    frontmatter {
                        title
                        categories
                    }
                    id
                    slug
                }
            }
        }

        categoriesGroup: allMdx(limit: 2000) {
            group(field: frontmatter___categories) {
                fieldValue
                totalCount
            }
        }
    }`);

    // Handle errors
    if (result.errors) {
        reporter.panicOnBuild(`Error while running GraphQL query.`);
        return;
    }

    // Create post detail pages
    const Posts = result.data.postsRemark.edges;
    const blogPostTemplate = require.resolve(`./src/templates/post-template.js`);
    Posts.forEach(({ node }) => {
        createPage({
            path: node.slug,
            component: blogPostTemplate,
            context: {
                id: node.id
            }
        });
    });



    const postsPerPage = 5;

    //Create category pages
    const Categories = result.data.categoriesGroup.group;
    const CategoryTemplate = require.resolve(`./src/templates/category-template.js`);
    Categories.forEach(category => {
        const { fieldValue, totalCount } = category;
        const numPages = Math.ceil(totalCount / postsPerPage);

        for(i = 0; i < numPages; i++)
        {
            const slug = `/categories/${fieldValue}`;
            createPage({
                path: i === 0 ? slug : `${slug}/${i + 1}`,
                component: CategoryTemplate,
                context: { 
                    category: fieldValue,
                    limit: postsPerPage,
                    skip: i * postsPerPage,
                    numPages,
                    currentPage: i + 1,
                    slug: slug
                },
            });
        }
    });
}