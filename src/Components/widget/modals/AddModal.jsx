import { Button, Label, Modal, Select, TextInput } from "flowbite-react";
import React, { useEffect, useRef, useState } from "react";
import { validationSchema } from "./AddSchema";
import { useFormik } from "formik";
import { useQuery, useQueryClient } from "react-query";
import { getAllCategories } from "../../../api/category/category-api";
import { getSubCategoryByCategoryId } from "../../../api/subcategory/subcategory-api";
import {
  addEditedProduct,
  addNewProduct,
} from "../../../api/products/products-api";
import { TiDelete } from "react-icons/ti";

// import { Store } from "@reduxjs/toolkit";
import { store } from "../../../store";
import { Editor } from "@tinymce/tinymce-react";

export const AddModal = ({ product }) => {
  const queryClient = useQueryClient();

  const [openModal, setOpenModal] = useState(false);
  const [categories, setCategories] = useState();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [subcategories, setSubCategories] = useState(null);
  const editorRef = useRef(null);
  function onCloseModal() {
    setOpenModal(false);
  }
  const handleSelectCategory = (categoryId) => {
    setSelectedCategory(categoryId);
    console.log("hey");
  };
  const handleEditorChange = (content) => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  const flattenArrays = (values) => {
    const flattened = {};
    for (const key in values) {
      const value = values[key];

      flattened[key] = value;
    }
    return flattened;
  };
  const formik = useFormik({
    initialValues: {
      thumbnail: product?.thumbnail || "",
      images: product?.images || "",
      name: product?.name || "",
      category: product?.category || "",
      subcategory: product?.subcategory || "",
      quantity: product?.quantity || "",
      price: product?.price || "",
      description: product?.description || "",
      brand: product?.brand || "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const flattenArray = flattenArrays(formik.values);
        console.log(flattenArray);
        const formdata = new FormData();

        Object.entries(flattenArray).forEach(([key, value]) => {
          // Check if key is 'thumbnail' or 'images'
          if (key === "thumbnail" && value) {
            formdata.append("thumbnail", value);
          } else if (key === "images" && value) {
            // If 'images' key, and value is an array, iterate and append each image
            value.forEach((image) => {
              formdata.append("images", image);
            });
          } else {
            // For other keys, append as usual
            formdata.append(key, value);
          }
        });

        for (let pair of formdata.entries()) {
          console.log(pair[0] + ", " + pair[1]);
        }
        setOpenModal(false);
        if (product) {
          // If product exists, update the product
          addEditedProduct(product._id, formdata);
          queryClient.invalidateQueries("products");
        } else {
          // If no product, add a new product
          addNewProduct(formdata);
          queryClient.invalidateQueries("products");
        }

        // addNewProduct(formdata);
      } catch (error) {
        const state = store.getState();
        const isLogin = state.auth.isLogin;
        if (error.response.status === "401" && isLogin) {
          console.log(error.message);
        }
      }
    },
  });
  const handleImageDelete = (index) => {
    const updatedImages = [...formik.values.images];
    updatedImages.splice(index, 1);
    formik.setFieldValue("images", updatedImages);
  };
  const { data, error, isLoading } = useQuery(["categories"], () =>
    getAllCategories()
  );
  useEffect(() => {
    if (data) {
      setCategories(data);
    }
  }, [data]);
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
  const setContent = () => {
    const content = editorRef.current.getContent();
    // console.log(content);
    formik.setFieldValue("description", content);
    console.log(formik.values.description);
  };
  return (
    <>
      {product ? (
        <button
          className="hover:underline text-blue-600"
          onClick={() => setOpenModal(true)}
        >
          ویرایش
        </button>
      ) : (
        <Button onClick={() => setOpenModal(true)}>افزودن کالا</Button>
      )}

      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        {" "}
        <Modal.Header />
        <Modal.Body>
          <form
            className="flex max-w-md flex-col gap-4"
            onSubmit={formik.handleSubmit}
          >
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">
              {product ? "ویرایش کالا" : "افزودن کالا"}
            </h3>{" "}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="thumbnail" value="تصویر پیش نمایش کالا" />
              </div>
              <TextInput
                name="thumbnail"
                id="multiple-file-upload"
                type="file"
                multiple
                // value={formik.values.thumbnail}
                onChange={(event) => {
                  // Update the formik values when the file input changes
                  formik.setFieldValue(
                    "thumbnail",
                    event.currentTarget.files[0]
                  );
                }}
                onBlur={formik.handleBlur}
              />{" "}
              <div className="mt-3 flex gap-3 flex-wrap">
                {product && formik.values.thumbnail ? (
                  <div className="relative">
                    <TiDelete
                      className="w-8 absolute z-10 top-0 h-8 cursor-pointer"
                      onClick={() => {
                        formik.setFieldValue("thumbnail", ""); // Clear the thumbnail value
                      }}
                    />
                    <img
                      className="w-24 h-24 border "
                      alt={`product-${formik.values.thumbnail}`}
                      src={`http://localhost:8000/images/products/thumbnails/${formik.values.thumbnail}`}
                    />
                  </div>
                ) : (
                  ""
                )}{" "}
              </div>
              {formik.touched.thumbnail && formik.errors.thumbnail && (
                <div className="text-red-500">{formik.errors.thumbnail}</div>
              )}
            </div>{" "}
            <TextInput
              name="images"
              id="multiple-file-upload"
              type="file"
              multiple
              onChange={(event) => {
                const files = event.currentTarget.files;
                const allImages = [];
                for (let i = 0; i < files.length; i++) {
                  allImages.push(files[i]);
                }

                formik.setFieldValue("images", allImages);
              }}
              onBlur={formik.handleBlur}
            />{" "}
            <div className="mt-3 flex gap-3 flex-wrap">
              {product
                ? formik.values.images.map((image, index) => (
                    <div key={index} className="relative">
                      <TiDelete
                        className="w-8 absolute z-10 top-0 h-8 cursor-pointer"
                        onClick={() => {
                          handleImageDelete(index);
                        }}
                      />
                      <img
                        className="w-24 h-24 border "
                        alt={`product-${index}`}
                        src={`http://localhost:8000/images/products/images/${image}`}
                      />
                    </div>
                  ))
                : ""}{" "}
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
            </div>{" "}
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
                دسته بندی
              </option>
              {categories?.map(
                (category, index) => {
                  return (
                    <option key={index} value={category._id}>
                      {category.name}
                    </option>
                  );
                }
                // <option key={index} value={category._id}>
                //   {category.name}
                // </option>
              )}
            </Select>{" "}
            <Select
              name="subcategory"
              id="subcategory"
              defaultValue={"زیر مجموعه"}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.subcategory}
            >
              <option value="">زیرمجموعه </option>
              {subcategories
                ? subcategories.map((subcategory, index) => (
                    <option key={index} value={subcategory._id}>
                      {subcategory.name}
                    </option>
                  ))
                : ""}
            </Select>{" "}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="name" value="موجودی " />
              </div>
              <TextInput
                name="quantity"
                id="quantity"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.quantity}
              />
              {formik.touched.quantity && formik.errors.quantity && (
                <div className="text-red-500">{formik.errors.quantity}</div>
              )}
            </div>{" "}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="price" value="مبلغ (تومان) " />
              </div>
              <TextInput
                name="price"
                id="price"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.price}
              />
              {formik.touched.price && formik.errors.price && (
                <div className="text-red-500">{formik.errors.price}</div>
              )}
            </div>{" "}
            <div>
              <div className="mb-2 block">
                <Label htmlFor="price" />
              </div>
              <TextInput
                name="brand"
                id="brand"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.brand}
              />
              {formik.touched.brand && formik.errors.brand && (
                <div className="text-red-500">{formik.errors.brand}</div>
              )}
            </div>{" "}
            <Editor
              name="description"
              apiKey="xqt3jzmt4hl3qfdunazekutixv0ihakcq2kjijkym918v30w"
              onEditorChange={handleEditorChange}
              onInit={(evt, editor) => (editorRef.current = editor)}
              initialValue={formik.values.description}
              onBlur={setContent}
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
            <Button type="submit">ذخیره</Button>
          </form>{" "}
        </Modal.Body>
      </Modal>
    </>
  );
};
