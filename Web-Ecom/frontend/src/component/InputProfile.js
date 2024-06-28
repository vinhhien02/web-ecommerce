import React from "react";

const InputProfile = ({ rightIcon, placeholder, value, setValue, namekey }) => {
  return (
    <div class="relative flex items-center">
      <input
        type="text"
        value={value}
        onChange={(e) =>
          setValue((pre) => ({ ...pre, [namekey]: e.target.value }))
        }
        placeholder={placeholder}
        class="px-2 py-3 bg-white text-black w-full text-sm border-b-2 focus:border-[#007bff] outline-none"
      />
      <span class="w-[18px] h-[18px] absolute right-2">{rightIcon}</span>
    </div>
  );
};

export default InputProfile;
