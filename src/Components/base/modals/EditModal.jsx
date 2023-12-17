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
import { Formik, useFormik } from "formik";
import { editValidationSchema } from "./editSchema";
import { getSubCategoryByCategoryId } from "../../../api/subcategory/subcategory-api";
import { useEffect, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useQuery } from "react-query";
export const EditModal = ({ product }) => {
  const [openModal, setOpenModal] = useState(false);
  const [categories, setCategories] = useState();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [subcategories, setSubCategories] = useState(null);
  const editorRef = useRef(null);

  const formik = useFormik({
    initialValues: {
      thumbnail: "",
      images: "",
      name: "", // Add initial values for your form fields
      category: "",
      subCategory: "",
    },
    validationSchema: editValidationSchema,
    onSubmit: async (values) => {
      try {
        // Handle form submission logic here
        console.log("Form data submitted:", values);
        console.log(product);
        // Example: Sending data to the server using axios
        // await axios.post("/api/your-endpoint", values);
        console.log(formik.values.name);
        // Close the modal after successful submission
        setOpenModal(false);
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    },
  });
  // useEffect(() => {
  //   console.log(data);
  // }, [data]);
  const categoryURL = `http://localhost:8000/api/categories`;

  const { data, error, isLoading } = useQuery(["categories"], () =>
    getAllCategories()
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (selectedCategory) {
          const result = await getSubCategoryByCategoryId(selectedCategory);
          setSubCategories(result);
        }
      } catch (error) {
        // Handle errors if necessary
        console.error("Error fetching subcategories:", error);
      }
    };

    fetchData();
    // console.log(subcategories);
  }, [selectedCategory]);
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
          <form
            className="flex max-w-md flex-col gap-4"
            onSubmit={formik.handleSubmit}
          >
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              ویرایش کالا
            </h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="thumbnail" value="تصویر پیش نمایش کالا" />
              </div>
              <TextInput
                name="thumbnail"
                id="multiple-file-upload"
                type="file"
                multiple
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />{" "}
              {formik.touched.thumbnail && formik.errors.thumbnail && (
                <div className="text-red-500">{formik.errors.thumbnail}</div>
              )}
            </div>
            <div>
              {" "}
              <div className="mb-2 block">
                <Label htmlFor="images" value="تصویر کالا" />
              </div>
              <TextInput
                name="images"
                id="multiple-file-upload"
                type="file"
                multiple
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />{" "}
              {formik.touched.images && formik.errors.images && (
                <div className="text-red-500">{formik.errors.images}</div>
              )}
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="name" value="نام کالا" />
              </div>
              <TextInput
                name="name"
                id="name"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              />
              {formik.touched.name && formik.errors.name && (
                <div className="text-red-500">{formik.errors.name}</div>
              )}
            </div>
            <Select
              name="category"
              id="category"
              defaultValue={formik.values.category}
              onChange={(e) => {
                formik.handleChange(e);

                handleSelectCategory(e.target.value);
              }}
              onBlur={formik.handleBlur}
              value={formik.values.category}
            >
              <option value="" selected>
                {" "}
              </option>
              {categories
                ? categories.map(
                    (category, index) => {
                      if (category.name !== product.category) {
                        return (
                          <option key={index} value={category._id}>
                            {category.name}
                          </option>
                        );
                      } else {
                        return null;
                      }
                    }
                    // <option key={index} value={category._id}>
                    //   {category.name}
                    // </option>
                  )
                : ""}
            </Select>
            {formik.touched.category && formik.errors.category && (
              <div className="text-red-500">{formik.errors.category}</div>
            )}
            <Select
              name="subCategory"
              id="subCategory"
              defaultValue={"زیر مجموعه"}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.subCategory}
            >
              {/* <option value="">زیرمجموعه </option> */}
              {subcategories
                ? subcategories.map((subcategory, index) => (
                    <option key={index}>{subcategory.name}</option>
                  ))
                : ""}
            </Select>
            {formik.touched.subCategory && formik.errors.subCategory && (
              <div className="text-red-500">{formik.errors.subCategory}</div>
            )}
            <Editor
              name="description"
              apiKey="xqt3jzmt4hl3qfdunazekutixv0ihakcq2kjijkym918v30w"
              onInit={(evt, editor) => (editorRef.current = editor)}
              initialValue={product.description}
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
            <Button type="submit">ذخیره</Button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};
// {/* <div className="space-y-6">
//   <h3 className="text-xl font-medium text-gray-900 dark:text-white">
//     ویرایش کالا
//   </h3>
//   {/* file Upload */}
//   <div>
//     <div>
//       <Label htmlFor="multiple-file-upload" value="تصویر کالا" />
//     </div>
//     <input type="file" id="multiple-file-upload" multiple />
//   </div>
//   {/* file Upload */}
//   {/* product name */}
//   <div>
//     <div className="mb-2 block">
//       <Label htmlFor="password" value="نام کالا" />
//     </div>
//     <TextInput id="password" type="text" required />
//   </div>{" "}
//   {/* product name */}
//   {/* category options */}
//   <Select
//     id="category"
//     defaultValue={"سشیبس"}
//     onChange={(e) => {
//       handleSelectCategory(e.target.value);
//     }}
//   >
//     <option value="" selected>
//       دسته بندی
//     </option>{" "}
//     {categories
//       ? categories.map((category, index) => (
//           <option key={index} value={category._id}>
//             {category.name}
//           </option>
//         ))
//       : ""}
//   </Select>
//   {/* category options */}
//   {/* subcategory options */}
//   <Select id="category" defaultValue={"زیر مجموعه"}>
//     <option value="">زیرمجموعه </option>{" "}
//     {subcategories
//       ? subcategories.map((subcategory, index) => (
//           <option key={index}>{subcategory.name}</option>
//         ))
//       : ""}
//   </Select>
//   {/* subcategory options */}
//   <Editor
//     apiKey="xqt3jzmt4hl3qfdunazekutixv0ihakcq2kjijkym918v30w"
//     onInit={(evt, editor) => (editorRef.current = editor)}
//     initialValue=""
//     init={{
//       resize: false,
//       height: 300,
//       menubar: false,
//       plugins: [
//         "advlist",
//         "autolink",
//         "lists",
//         "link",
//         "image",
//         "charmap",
//         "preview",
//         "anchor",
//         "searchreplace",
//         "visualblocks",
//         "code",
//         "fullscreen",
//         "insertdatetime",
//         "media",
//         "table",
//         "code",
//         "help",
//         "wordcount",
//       ],
//       toolbar:
//         "undo redo | blocks | " +
//         "bold italic forecolor | alignleft aligncenter " +
//         "alignright alignjustify | bullist numlist outdent indent | " +
//         "removeformat | help",
//       content_style:
//         "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
//     }}
//   />
//   <div className="w-full flex justify-center">
//     <Button onClick={log}>ذخیره</Button>
//   </div>
// </div>; */}
