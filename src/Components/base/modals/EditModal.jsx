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
import {
  getAllCategories,
  getCategoryById,
} from "../../../api/category/category-api";
import axios from "axios";

import { useEffect, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useQuery } from "react-query";
export const EditModal = () => {
  const [openModal, setOpenModal] = useState(false);
  const [categories, setCategories] = useState();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const editorRef = useRef(null);

  //
  // useEffect(() => {
  //   console.log(data);
  // }, [data]);
  const categoryURL = `http://localhost:8000/api/categories`;

  const { data, error, isLoading } = useQuery(["categories"], () =>
    getAllCategories()
  );

  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };
  function onCloseModal() {
    setOpenModal(false);
  }
  useEffect(() => {
    if (data) {
      console.log(data);
      setCategories(data);
    }
  }, [data]);
  useEffect(() => {
    if (selectedCategory) {
      console.log(selectedCategory);
    }
  }, [selectedCategory]);
  useEffect(() => {
    const close = (e) => {
      if (e.keyCode === 27) {
        setOpenModal(false);
      }
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);
  const handleSelectCategory = (categoryId) => {
    setSelectedCategory(categoryId);
    console.log("hey");
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    console.error("Error fetching data:", error);
    return <p>Error fetching data</p>;
  }

  return (
    <>
      {" "}
      <button
        className="hover:underline text-blue-600"
        onClick={() => setOpenModal(true)}
      >
        ویرایش
      </button>
      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
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
            {/* product name */}
            {/* category options */}
            <Select
              id="category"
              defaultValue={"سشیبس"}
              // value={selectedCategory} // Assuming you have a state variable like selectedCategory to control the value
              onChange={(e) => {
                handleSelectCategory(e.target.value);
              }}
            >
              <option value="" selected>
                دسته بندی
              </option>{" "}
              {categories
                ? categories.map((category, index) => (
                    <option key={index} value={category._id}>
                      {category.name}
                    </option>
                  ))
                : ""}
            </Select>
            {/* category options */}
            {/* subcategory options */}
            <Select id="category" defaultValue={"دسته بندی"}>
              {" "}
              <option selected>زیرمجموعه </option>
            </Select>{" "}
            {/* subcategory options */}
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
              <Button onClick={log}>ذخیره</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
