import React from "react";
import Layout from "../layout";
import NoticePosts from "../widgets/noticePosts";
import RecentPosts from "../widgets/recentPosts";
import SEO from "../components/seo";

export default function PageTemplate({ pageContext, children }) {
    const { title, description } = pageContext.frontmatter;

    return (
        <Layout pageTitle={title}>
            <SEO title={title} description={description}/>

            <main id="main-wrapper">
                <div id="rightbar">
                    <NoticePosts limit={5} />
                    <RecentPosts limit={5} />
                </div>
                <div id="content">
                    {children}
                </div>
            </main>
        </Layout>
    )
}