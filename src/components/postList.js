import React from "react";
import PostMeta from "./postMeta";
import { Link } from "gatsby";
import "../styles/postList.scss";

function Thumbnail({thumbnail})
{
    if(thumbnail)
    return (
        <img class="post-thumbnail" src={thumbnail} alt="post thumbnail"/>
    );
    else return null;
}


export default function PostList ({posts, contentHeader}) {
    return (
        <section>
            {contentHeader}

            <div className="postlist">
            {posts.map((edge) => {
                const node = edge.node;

                const slug = node.slug;
                const title = node.frontmatter.title;
                const thumbnail = node.frontmatter.thumbnail;
                const excerpt = node.excerpt;
                const date = node.frontmatter.date;
                const categories = node.frontmatter.categories;
                const pinned = node.frontmatter.pinned;
                const notice = node.frontmatter.notice;

                return(
                    <article className="post-item" key={node.id}>
                        <Thumbnail thumbnail={thumbnail}/>
                        <Link to={`/${slug}`} className="post-content">            
                            <h1 className="post-title">{title}</h1>

                            <div className="post-excerpt">{excerpt}</div>

                            <PostMeta date={date} categories={categories} pinned={pinned} notice={notice}/>
                        </Link>
                    </article>
                );
            })}
            </div>
        </section>
    );
}