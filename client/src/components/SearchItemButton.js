import React from "react";

function SearchItemButton(props) {
  return (
    <button
      className="add-button btn btn-primary"
      id={`search-button-${props.item}`}
      style={{
        backgroundColor: "#3fc5a7",
        borderColor: "#3fc5a7",
        whiteSpace: "nowrap",
        textAlign: "center",
      }}
    >
      {props.item} x
    </button>
  );
}

export default SearchItemButton;
