import React from "react";
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
import { TiDelete } from "react-icons/ti";

import {
  getAllCategories,
  getCategoryById,
} from "../../../api/category/category-api";
import { addEditedProduct } from "../../../api/products/products-api";
import axios from "axios";
import { Formik, useFormik } from "formik";
import { editValidationSchema } from "./editSchema";
import { getSubCategoryByCategoryId } from "../../../api/subcategory/subcategory-api";
import { useEffect, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useQuery } from "react-query";
export const NewEditModal = ({ product }) => {
  const [openModal, setOpenModal] = useState(false);
  const [categories, setCategories] = useState();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [subcategories, setSubCategories] = useState(null);
  const [productThumbnail, setProductThumbnail] = useState(
    product ? product.thumbnail : null
  );
  const [productImages, setProductImages] = useState(
    product ? product.images : []
  );
  const [productDescription, setProductDescription] = useState(
    product ? product.description : ""
  );
  const editorRef = useRef(null);
  const flattenArrays = (values) => {
    const flattened = {};
    for (const key in values) {
      const value = values[key];
      if (Array.isArray(value)) {
        value.forEach((element, index) => {
          flattened[`${key}[${index}]`] = element;
        });
      } else {
        flattened[key] = value;
      }
    }
    return flattened;
  };

  const formik = useFormik({
    initialValues: {
      thumbnail: product ? productThumbnail : null,
      images: product ? productImages : [],
      name: product ? product.name : "", // Add initial values for your form fields
      category: product ? product.category : "",
      subcategory: product ? product.subcategory : "",
      quantity: product ? product.quantity : "",
      price: product ? product.price : "",
      description: product ? productDescription : "",
    },
    validationSchema: editValidationSchema,
    onSubmit: async (values) => {
      try {
        values.thumbnail = values.thumbnail || productThumbnail;
        values.images =
          values.images.length > 0 ? values.images : productImages;
        // Handle form submission logic here
        const formdata = new FormData();
        const flattenArray = flattenArrays(formik.values);
        Object.entries(flattenArray).forEach(([key, value]) => {
          formdata.append(key, value);
        });
        setOpenModal(false);
        // Add logic to handle the form submission (e.g., calling an API)
        addEditedProduct(formdata, product._id);
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    },
  });

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
  const handleThumbnailDelete = () => {
    setProductThumbnail(null);
    formik.setFieldValue("thumbnail", "");
    console.log(productThumbnail);
  };
  const handleImageDelete = (imageToDelete) => {
    const newImageState = productImages.filter(
      (image) => image !== imageToDelete
    );
    setProductImages(newImageState);
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    console.error("Error fetching data:", error);
    return <p>Error fetching data</p>;
  }
  // console.log(formik.values.description);

  const handleEditorChange = (content) => {
    console.log(content);
  };
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
                disabled={productThumbnail ? true : false}
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
              {productThumbnail ? (
                <div className="mt-3 relative">
                  {" "}
                  <TiDelete
                    className="w-8 absolute z-10 top-0 h-8 cursor-pointer"
                    onClick={handleThumbnailDelete}
                  />
                  <img
                    className="w-24 h-24 border "
                    alt="thumbail"
                    src={`http://localhost:8000/images/products/thumbnails/${product.thumbnail}`}
                  />
                </div>
              ) : (
                ""
              )}
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
                {productImages
                  ? productImages.map((image, index) => (
                      <div key={image} className="relative">
                        <TiDelete
                          className="w-8 absolute z-10 top-0 h-8 cursor-pointer"
                          onClick={() => {
                            handleImageDelete(image);
                          }}
                        />
                        <img
                          className="w-24 h-24 border "
                          alt="product"
                          src={`http://localhost:8000/images/products/images/${image}`}
                        />
                      </div>
                    ))
                  : ""}{" "}
              </div>
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
              {categories?.map((category, index) => {
                if (category.name !== product.category) {
                  return (
                    <option key={index} value={category._id}>
                      {category.name}
                    </option>
                  );
                } else {
                  return null;
                }
              })}
            </Select>
            {formik.touched.category && formik.errors.category && (
              <div className="text-red-500">{formik.errors.category}</div>
            )}
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
            </Select>
            {formik.touched.subcategory && formik.errors.subcategory && (
              <div className="text-red-500">{formik.errors.subcategory}</div>
            )}
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
            </div>
            <Editor
              name="description"
              apiKey="xqt3jzmt4hl3qfdunazekutixv0ihakcq2kjijkym918v30w"
              onInit={(evt, editor) => (editorRef.current = editor)}
              onEditorChange={handleEditorChange}
              initialValue={formik.values.description}
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
