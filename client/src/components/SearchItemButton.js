import React from "react";

function SearchItemButton(props) {
  return (
    <button
      className="search-item-button add-button btn btn-primary m-2"
      id={`search-button-${props.item}`}
      style={{ backgroundColor: "#3fc5a7", borderColor: "#3fc5a7" }}
    >
      {props.item}
    </button>
  );
}

export default SearchItemButton;
