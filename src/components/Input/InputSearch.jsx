import React from "react";

const InputSearch = ({
  contentLabel,
  placeHolder,
  value,
  onChange,
  type = "text",
  classWrapper = "",
  classTitle = "",
  classInput = "",
}) => {
  return (
    <div className={classWrapper}>
      <label className={classTitle}>{contentLabel}</label>
      <input
        type={type}
        className={classInput}
        placeholder={placeHolder}
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

export default InputSearch;
