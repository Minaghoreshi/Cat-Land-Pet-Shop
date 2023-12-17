import * as Yup from "yup";

export const editValidationSchema = Yup.object().shape({
  thumbnail: Yup.mixed().required("تصویر پیش نمایش کالا الزامی است"),
  name: Yup.string()
    .required("نام کالا الزامی است")
    .min(1, "نام کالا الزامی است"),
  category: Yup.string().required("دسته بندی الزامی است"),
  subcategory: Yup.string().required("زیرمجموعه الزامی است"),
});
