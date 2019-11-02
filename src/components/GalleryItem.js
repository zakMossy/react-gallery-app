import React from "react";

const GalleryItem = props => (
    <li>
        <img
            src={props.url}
            alt={props.title}
        />
    </li>
);                                                                              // displays each individual li and image

export default GalleryItem;
