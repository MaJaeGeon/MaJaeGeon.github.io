import React from "react";
import { Link } from "gatsby";
import "../styles/tableOfContents.scss";

function createList(headings) {
    if(!headings) return null;

    return (
        <ul>
            {headings?.map((heading) => {
                const title = heading.title;
                const url = heading.url;
                const items = heading.items;

                return(
                    <li>
                        <Link to={url} activeClassName="active">{title}</Link>
                        {createList(items)}
                    </li>
                );
            })}
        </ul>
    );
}

export default function TableOfContents ({headings}) {

    return (
        <nav className="widget toc-wrapper">
            <div className="widget-header">TABLE OF CONTENTS</div>
            {createList(headings)}
        </nav>
    );
}