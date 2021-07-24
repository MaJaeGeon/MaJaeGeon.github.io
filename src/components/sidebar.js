import React from "react";
import { Link, graphql, useStaticQuery } from "gatsby";
import "../styles/sidebar.scss";
 

export default function Sidebar () {
    const data = useStaticQuery(graphql`
        query {
            site {
                siteMetadata {
                    title
                    subtitle
                    social {
                        name
                        avatar
                    }
                }
            }
        }
    `);

    const { title, subtitle } = data.site.siteMetadata;
    const { name, avatar } = data.site.siteMetadata.social;


    return (
        <div className="sidebar-wrapper">
            <div className="profile sidebar-item">
                <Link to="/" className="avatar">
                    <div className="name">{name}</div>
                    <img src={avatar} alt="profile avatar" />
                </Link>
                <a href="/" className="title">{title}</a>
                <div className="subtitle">{subtitle}</div>
            </div>

            <ul class="menu sidebar-item">
                <li class="menu-item">
                    <Link to="/" activeClassName="active">HOME</Link>
                </li>
                <li class="menu-item">
                    <Link to="/categories" activeClassName="active">CATEGORIES</Link>
                </li>
                <li class="menu-item">
                    <Link to="/posts" activeClassName="active">POSTS</Link>
                </li>
            </ul>
        </div>
    );
}