import React, { useState } from "react";

const InputCustom = ({
  placeHolder,
  name,
  value,
  onChange,
  type = "text",
  classWrapper = "",
  onBlur,
  error,
  touched,
  contentLabel,
  autoComplete,
  focusInputClass,
}) => {
  const [isFocused, setIsFocused] = useState(false); // Trạng thái để kiểm tra focus
  const hasError = error && touched;

  const handleFocus = () => {
    setIsFocused(true); // Đặt trạng thái focus là true khi input được focus
  };

  const handleBlur = (e) => {
    setIsFocused(false); // Đặt lại trạng thái focus khi input mất focus
    onBlur(e);

    // Nếu không có giá trị và không focus nữa thì xóa class 'active'
    const label = e.target.parentElement.querySelector("label");
    if (!e.target.value && !isFocused) {
      label.classList.remove("active");
    }
  };

  return (
    <div>
      <div className={`${classWrapper} ${hasError ? "has_error" : ""}`}>
        <label
          htmlFor={name}
          className={value || isFocused ? "active" : ""} // Thêm 'active' nếu có giá trị hoặc đang focus
        >
          {contentLabel}
        </label>
        <input
          id={name}
          type={type}
          name={name}
          placeholder={placeHolder}
          className="bg-transparent text-base text-white font-normal outline-none"
          onChange={onChange}
          value={value}
          onFocus={handleFocus} // Gọi hàm xử lý khi focus
          onBlur={handleBlur} // Gọi hàm xử lý khi mất focus
          autoComplete={autoComplete}
        />
        {focusInputClass && <div className={`${focusInputClass}`}></div>}
      </div>
      <div className={`notify_error`}>
        {hasError && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default InputCustom;
