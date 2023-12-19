import * as Yup from "yup";

export const editValidationSchema = Yup.object().shape({
  thumbnail: Yup.mixed().required("تصویر پیش نمایش کالا الزامی است"),
  name: Yup.string()
    .required("نام کالا الزامی است")
    .min(1, "نام کالا الزامی است"),
  category: Yup.string().required("دسته بندی الزامی است"),
  subcategory: Yup.string().required("زیرمجموعه الزامی است"),
  price: Yup.number().min(1).required("مبلغ کالا الزامی است"),
  quantity: Yup.number().min(1).required("موجودی الزامی است"),
  // images: Yup.array()
  // .test("fileFormat", "Only JPG and PNG files are allowed", (value) => {
  //   if (!value || value.length === 0) {
  //     // No files, validation passes
  //     return true;
  //   }

  //   // Check file extensions
  //   const allowedExtensions = ["jpg", "jpeg", "png"];
  //   for (let i = 0; i < value.length; i++) {
  //     const extension = value[i].name.split(".").pop().toLowerCase();
  //     if (!allowedExtensions.includes(extension)) {
  //       return false; // Validation fails if any file has an invalid extension
  //     }
  //   }

  //   return true; // All files have valid extensions
  // }),
});
