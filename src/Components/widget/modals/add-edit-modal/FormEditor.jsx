import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

export const FormEditor = ({ formik }) => {
  const editorRef = useRef(null);
  const setContent = (content) => {
    formik.setFieldValue("description", content);
    console.log(formik.values.description);
  };
  return (
    <>
      <Editor
        name="description"
        apiKey="xqt3jzmt4hl3qfdunazekutixv0ihakcq2kjijkym918v30w"
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue={formik.values.description}
        onBlur={() => {
          setContent(editorRef.current.getContent());
        }}
        init={{
          resize: false,
          height: 300,
          menubar: false,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
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
      />{" "}
      {formik.touched.description && formik.errors.description && (
        <div className="text-red-500">{formik.errors.description}</div>
      )}
    </>
  );
};
