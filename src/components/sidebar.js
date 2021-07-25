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
                        homepage
                    }
                }
            }
        }
    `);

    const { title, subtitle } = data.site.siteMetadata;
    const { name, avatar, homepage } = data.site.siteMetadata.social;


    return (
        <div className="sidebar-wrapper">
            <div className="profile sidebar-item">
                <a href={homepage} className="avatar">
                    <div className="name">{name}</div>
                    <img src={avatar} alt="profile avatar" />
                </a>
                <Link to="/" className="title">{title}</Link>
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