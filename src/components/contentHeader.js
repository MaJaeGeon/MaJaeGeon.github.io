import React from "react";
import { Link } from "gatsby";

import "../styles/contentHeader.scss";

export default function ContentHeader ({header, url}) {
    if(url)
        return (
            <div className="content-header">
                {header}

                <Link to={url} className="link">
                더보기
                </Link>
            </div>
        );
    else
        return (
            <div className="content-header">
                {header}
            </div>
        );
}