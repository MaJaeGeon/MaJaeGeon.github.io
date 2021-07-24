import React from "react";
import { faCalendarAlt, faListUl, faThumbtack } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "../styles/postMeta.scss";

function PostDate({date})
{
    if(date)
        return (
            <div className="post-meta-group-item">
                <FontAwesomeIcon icon={faCalendarAlt} fixedWidth/>
                {date}
            </div>
        );
    else return null;
}

function PostCategories({categories})
{
    if(categories)
        return (
            <div className="post-meta-group-item">
                <FontAwesomeIcon icon={faListUl} fixedWidth/>
                {categories}
            </div>
        );
    else return null;
}

function PostPinned({pinned})
{
    if(pinned)
        return (
            <div className="post-meta-group-item">
                <FontAwesomeIcon icon={faThumbtack} fixedWidth/>
                Pinned
            </div>
        );
    else return null;
}

function PostNotice({notice})
{
    if(notice)
        return (
            <div className="post-meta-group-item">
                <FontAwesomeIcon icon={faListUl} fixedWidth/>
                Notice
            </div>
        );
    else return null;
}

export default function PostMeta ({date, categories, pinned, notice}) {
    return (
        <div className="post-meta">
            <div className="post-meta-group">
                <PostDate date={date} />
                <PostCategories categories={categories} />
            </div>
            <div className="post-meta-group">
                <PostPinned pinned={pinned} />
                <PostNotice notice={notice} />
            </div>
        </div>
    );
}