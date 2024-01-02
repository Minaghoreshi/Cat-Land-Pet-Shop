import React, { useEffect, useState } from "react";
import { Button, Label, Select, TextInput } from "flowbite-react";
import { createDataToSend } from "./utils";
import { useFormik } from "formik";
import { validationSchema } from "./schema";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  addEditedProduct,
  addNewProduct,
} from "../../../../api/products/products-api";
import { getSubCategoryByCategoryId } from "../../../../api/subcategory/subcategory-api";
import { Thumbnail } from "./Thumbnail";
import { FormEditor } from "./FormEditor";
import { getAllCategories } from "../../../../api/category/category-api";

export const AddModalForm = ({ setOpenModal, product }) => {
  const [productThumbnail, setProductThumbnail] = useState("");
  const [categories, setCategories] = useState();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [subcategories, setSubCategories] = useState(null);
  const queryClient = useQueryClient();

  //when fomr loads: get all the categories for the select option
  const { data } = useQuery(["categories"], () => getAllCategories());
  useEffect(() => {
    if (data) {
      setCategories(data);
    }
  }, [data]);
  //after selecting a category, get its subcategories
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (selectedCategory) {
          const result = await getSubCategoryByCategoryId(selectedCategory);
          setSubCategories(result);
        }
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      }
    };

    fetchData();
  }, [selectedCategory]);
  //save the thumnail in state for showing the image
  useEffect(() => {
    if (product && product.thumbnail) {
      setProductThumbnail(product.thumbnail);
    }
  }, [product]);
  //mutations-----
  const addEditedOrder = useMutation(
    (params) => addEditedProduct(params.formData, params.productId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("products");
      },
    }
  );
  const { mutateAsync: addMutation } = useMutation({
    mutationFn: addNewProduct,
    onSuccess: () => {
      queryClient.invalidateQueries("products");
    },
  });
  //mutations-----
  const formikInitialValues = {
    thumbnail: product?.thumbnail || "",
    images: [],
    name: product?.name || "",
    category: "",
    subcategory: "",
    quantity: product?.quantity || "",
    price: product?.price || "",
    description: product?.description || "",
    brand: product?.brand || "",
  };
  const formik = useFormik({
    initialValues: formikInitialValues,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const formData = createDataToSend(formik.values);
        setOpenModal(false);
        await (product
          ? addEditedOrder.mutate({ formData, productId: product._id })
          : addMutation(formData));
      } catch (error) {
        console.log("here");
      }
    },
  });

  const handleThumbnailDelete = () => {
    setProductThumbnail("");
  };
  const handleSelectCategory = (categoryId) => {
    setSelectedCategory(categoryId);
  };
  return (
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
          onChange={(event) => {
            setProductThumbnail("");
            formik.setFieldValue("thumbnail", event.currentTarget.files[0]);
          }}
          onBlur={formik.handleBlur}
        />{" "}
        {productThumbnail ? (
          <Thumbnail
            handleThumbnailDelete={handleThumbnailDelete}
            productThumbnail={productThumbnail}
          />
        ) : (
          ""
        )}
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
      >
        <option value="" selected>
          دسته بندی
        </option>
        {categories?.map((category, index) => {
          return (
            <option key={index} value={category._id}>
              {category.name}
            </option>
          );
        })}
      </Select>{" "}
      {formik.touched.category && formik.errors.category ? (
        <div className="text-red-500">{formik.errors.category}</div>
      ) : null}
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
      {formik.touched.category && formik.errors.subcategory ? (
        <div className="text-red-500">{formik.errors.subcategory}</div>
      ) : null}
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
          <Label htmlFor="price" value="برند" />
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
      <FormEditor formik={formik} />
      <Button type="submit">ذخیره</Button>
    </form>
  );
};
