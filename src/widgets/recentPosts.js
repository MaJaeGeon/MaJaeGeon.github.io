import React from "react";
import { graphql, Link, useStaticQuery } from "gatsby";

export default function RecentPosts({limit}) {
    const data = useStaticQuery(graphql`
        query{
            allMdx(sort: {fields: frontmatter___date, order: DESC}, limit: 10) {
                totalCount
                edges {
                    node {
                        frontmatter {
                            title
                        }
                        id
                        slug
                    }
                }
            }
        }
    `);

    const posts = data.allMdx.edges.slice(0, limit);

    return (
        <div className="widget">
            <div className="widget-header">Recent Posts</div>
            <ul>
                {posts.length > 0 ? posts.map((edge) => {
                    const { slug, id } = edge.node;
                    const { title } = edge.node.frontmatter;

                    return (
                        <li key={id}>
                            <Link className="list-item" to={`/${slug}`}>{title}</Link>
                        </li>
                    );
                }) : (<li className="list-item">The list is empty.</li>)}
            </ul>
        </div>
    );
}