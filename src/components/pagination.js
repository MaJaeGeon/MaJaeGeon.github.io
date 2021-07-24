import React from "react";
import { Link } from "gatsby";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "../styles/pagination.scss";

export default function Pagination ({currentPage, numPages, slug}) {
    const prevPage = `${slug}/${currentPage <= 2 ? "" : currentPage - 1}`;
    const nextPage = `${slug}/${(currentPage === numPages) ? (currentPage === 1? "" : currentPage) : currentPage + 1}`;

    return (
        <ul className="pagination">
            <li className="pagination-item">
                <Link to={prevPage} className="pagination-link" activeClassName="disabled">
                    <FontAwesomeIcon icon={faAngleLeft} fixedWidth/>
                </Link>

            </li>

            {Array.from({ length: numPages }, (_, i) => (
                <li className="pagination-item">
                    <Link key={`pagination-number${i + 1}`} to={`${slug}/${i === 0 ? "" : i + 1}`} className="pagination-link" activeClassName="active">
                        {i + 1}
                    </Link>
                </li>
            ))}

            <li className="pagination-item">
                <Link to={nextPage} className="pagination-link" activeClassName="disabled">
                    <FontAwesomeIcon icon={faAngleRight} fixedWidth/>
                </Link>
            </li>
        </ul>
    );
}