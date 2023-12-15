import {
  Button,
  Checkbox,
  Label,
  Modal,
  TextInput,
  Dropdown,
  FileInput,
  Select,
} from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
export const EditModal = () => {
  const [openModal, setOpenModal] = useState(false);
  const [email, setEmail] = useState("");
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };
  function onCloseModal() {
    setOpenModal(false);
    setEmail("");
  }
  useEffect(() => {
    const close = (e) => {
      if (e.keyCode === 27) {
        setOpenModal(false);
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);
  return (
    <>
      {" "}
      <button
        className="hover:underline text-blue-600"
        onClick={() => setOpenModal(true)}
      >
        ویرایش
      </button>
      <Modal
        show={openModal}
        size="md"
        onClose={onCloseModal}
        popup
        // onKeyDown={() => {
        //   handleKEyDown(e);
        // }}
      >
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              ویرایش کالا
            </h3>
            {/* file Upload */}
            <div>
              <div>
                <Label htmlFor="multiple-file-upload" value="تصویر کالا" />
              </div>
              <input type="file" id="multiple-file-upload" multiple />
            </div>
            {/* file Upload */}
            {/* product name */}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password" value="نام کالا" />
              </div>
              <TextInput id="password" type="text" required />
            </div>{" "}
            <Select id="category" defaultValue={"دسته بندی"}>
              {" "}
              <option selected>دسته بندی</option>
              <option>op 1</option>
              <option>op 2</option>
            </Select>
            {/* drop down */}{" "}
            <Editor
              apiKey="xqt3jzmt4hl3qfdunazekutixv0ihakcq2kjijkym918v30w"
              onInit={(evt, editor) => (editorRef.current = editor)}
              initialValue=""
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
            />
            <div className="w-full flex justify-center">
              <Button>ذخیره</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
