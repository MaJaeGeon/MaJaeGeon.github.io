import React from "react";
import Sidebar from "./components/sidebar";
import "./styles/layout.scss";
import { graphql, useStaticQuery } from "gatsby";
import { defineCustomElements as deckDeckGoHighlightElement } from '@deckdeckgo/highlight-code/dist/loader';
import { Helmet } from "react-helmet";

deckDeckGoHighlightElement();

export default function Layout ({ pageTitle, children }) {
    const data = useStaticQuery(graphql`
        query {
            site {
                siteMetadata {
                    title
                    social {
                        homepage
                    }
                }
            }
        }
    `);

    const site = data.site.siteMetadata;

    return (
        <div id="container">
            <Helmet>
                <title>{pageTitle ? `${pageTitle} | ${site.title}` : site.title}</title>
            </Helmet>

            <aside id="sidebar">
                <Sidebar />
            </aside>

            <div id="main-container">
                <header id="topbar">
                    {pageTitle}
                </header>

                {children}

                <footer id="footer">
                    <div className="footer-wrapper">
                        <div>Copyright 2021. <a href={site.homepage}>{site.title}</a> All Rights Reserved.</div>
                        
                        <div>Designed by <a href="https://github.com/MaJaeGeon">MaJaeGeon</a></div> {/* 내용 수정 금지 */}
                    </div>
                </footer>
            </div>
        </div>
    );
}