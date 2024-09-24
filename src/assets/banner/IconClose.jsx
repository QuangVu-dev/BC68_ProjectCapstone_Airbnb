import React from "react";

const IconClose = () => {
  return (
    <span className="icon_close">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        aria-hidden="true"
        role="presentation"
        focusable="false"
        style={{
          display: "block",
          fill: "none",
          height: 12,
          width: 12,
          stroke: "currentcolor",
          strokeWidth: 4,
          overflow: "visible",
        }}
      >
        <path d="m6 6 20 20M26 6 6 26" />
      </svg>
    </span>
  );
};

export default IconClose;
