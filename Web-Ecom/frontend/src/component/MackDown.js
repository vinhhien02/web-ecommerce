import React, { memo } from "react";
import { Editor } from "@tinymce/tinymce-react";
const MackDown = ({
  label,
  value,
  onchnageValue,
  name,
  invalid,
  setInvalid,
}) => {
  return (
    <div className="flex flex-col ">
      <span className="">{label}</span>
      <Editor
        apiKey={process.env.REACT_APP_TINY}
        initialValue={value}
        init={{
          height: 500,
          menubar: true,
          zindex: 0,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "preview",
            "help",
            "wordcount",
          ],
          toolbar:
            "undo redo | blocks | " +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
        onChange={(e) =>
          onchnageValue((prev) => ({ ...prev, [name]: e.target.getContent() }))
        }
        onFocus={() => setInvalid && setInvalid([])}
      />
      {invalid?.some((el) => el.name === name) && (
        <small className="text-red-500 text-sm">
          {invalid.find((el) => el.name === name)?.message}
        </small>
      )}
    </div>
  );
};

export default memo(MackDown);
