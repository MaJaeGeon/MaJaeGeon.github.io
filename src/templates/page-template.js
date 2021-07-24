import React from "react";
import Layout from "../layout";
import NoticePosts from "../widgets/noticePosts";
import RecentPosts from "../widgets/recentPosts";

export default function PageTemplate({ pageContext, children }) {
    const { title } = pageContext.frontmatter;

    return (
        <Layout pageTitle={title}>
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