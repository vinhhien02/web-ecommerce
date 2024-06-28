import React from "react";

const InputForm = ({
  value,
  setValue,
  namekey,
  type,
  invalid,
  setInvalid,
  placeholder,
  leftIcon,
  rightIcon,
}) => {
  return (
    <div class="w-full ">
      <div className="relative ">
        <span className="absolute inset-y-0 text-gray-400 left-5 flex items-center pointer-events-none ">
          {leftIcon}
        </span>
        <input
          type={type || "text"}
          placeholder={placeholder}
          value={value}
          onChange={(e) =>
            setValue((pre) => ({ ...pre, [namekey]: e.target.value }))
          }
          onFocus={() => setInvalid([])}
          className="px-10 py-2.5 text-sm text-black rounded-2xl bg-white border w-full outline-[#007bff]"
        />
        <span
          className="absolute inset-y-0 text-gray-400  flex right-5 items-center cursor-pointer "
          onClick={rightIcon?.onClick}
        >
          {rightIcon?.icon}
        </span>
      </div>
      {invalid.some((el) => el.name === namekey) && (
        <small className="text-red-700 left-3 text[-10px] italic">
          {invalid.find((el) => el.name === namekey)?.message}
        </small>
      )}
    </div>
  );
};

export default InputForm;
