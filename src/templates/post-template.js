import React from "react";
import Layout from "../layout";

import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";

import TableOfContents from "../components/tableOfContents";
import ContentHeader from "../components/contentHeader";
import PostMeta from "../components/postMeta";
import SEO from "../components/seo";

export default function PostTemplate({ data }) {
    const postContent = data.mdx.body;
    const postExcerpt = data.mdx.excerpt;
    const tableOfPostContents = data.mdx.tableOfContents.items;
    const { title, date, categories, pinned, notice } = data.mdx.frontmatter;

    return ( 
        <Layout pageTitle={title}>
            <SEO title={title} description={postExcerpt}/>
            
            <main id="main-wrapper">
                <div id="rightbar">
                    <TableOfContents headings={tableOfPostContents} />
                </div>
                <div id="content">
                    <ContentHeader header={
                        <div>
                            <h1>{title}</h1>
                            <PostMeta date={date} categories={categories} pinned={pinned} notice={notice}/>
                        </div>
                    }/>
                    <MDXRenderer>{postContent}</MDXRenderer>
                </div>
            </main>
        </Layout>
    )
}

export const query = graphql`
    query($id: String!) {
        mdx(id: {eq: $id}) {
            body
            excerpt
            tableOfContents
            frontmatter {
                categories
                date
                notice
                pinned
                title
            }
        }
    }
`;