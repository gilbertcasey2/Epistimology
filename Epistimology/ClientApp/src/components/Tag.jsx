import React from "react";

const Tag = ({ tag}) => {
  let tagClass = tag.color + " tag";
  return <span className={tagClass}><p>{tag.name}</p></span>;
}

export default Tag;
