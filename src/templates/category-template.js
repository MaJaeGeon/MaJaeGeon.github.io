import React from "react";
import { graphql } from "gatsby";
import Layout from "../layout";
import PostList from "../components/postList";
import ContentHeader from "../components/contentHeader";
import NoticePosts from "../widgets/noticePosts";
import RecentPosts from "../widgets/recentPosts";
import Pagination from "../components/pagination";

export default function Category({ pageContext, data }) {
    const { category, currentPage, numPages, slug } = pageContext;
    const { edges, totalCount } = data.allMdx;

    return (
        <Layout pageTitle="Home">
            <main id="main-wrapper">
                <div id="rightbar">
                    <NoticePosts limit={5} />
                    <RecentPosts limit={5} />
                </div>

                <div id="content">
                    <PostList posts={edges} contentHeader={
                        <ContentHeader header={
                            <div>{category} 전체 글 <span style={{ color: '#ef402f'}}>{totalCount}</span></div>
                        }/>
                    }/>

                    <Pagination currentPage={currentPage} numPages={numPages} slug={slug}/>
                </div>
            </main>
        </Layout>
    );
}

export const pageQuery = graphql`
    query ($category: String, $skip: Int!, $limit: Int!) {
        allMdx(
            limit: $limit
            skip: $skip
            sort: {fields: [frontmatter___date], order: DESC} 
            filter: {frontmatter: {categories: {in: [$category]}}}
        ) {
            totalCount
            edges {
                node {
                    frontmatter {
                        categories
                        date
                        notice
                        pinned
                        title
                        thumbnail
                    }
                    excerpt(truncate: true)
                    id
                    slug
                }
            }
        }
    }
`;