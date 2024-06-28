import React, { memo } from "react";
import clsx from "clsx";

const InputForms = ({
  label,
  disable,
  register,
  errors,
  id,
  validate,
  type,
  placehoder,
  fullWidth,
  style,
  defaultValue,
}) => {
  return (
    <div className={clsx("flex flex-col gap-2", style)}>
      {label && <label htmlFor={id}>{label}</label>}
      <input
        type={type || "text"}
        id={id}
        {...register(id, validate)}
        disabled={disable}
        placeholder={placehoder}
        className={clsx("input-form", fullWidth && "w-full", style)}
        defaultValue={defaultValue}
      ></input>
      {errors[id] && (
        <small className="text-xs text-red-500">{errors[id]?.message}</small>
      )}
    </div>
  );
};

export default memo(InputForms);
