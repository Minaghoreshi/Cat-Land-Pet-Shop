import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  thumbnail: Yup.mixed().required("تصویر پیش نمایش کالا الزامی است"),
  images: Yup.array().of(Yup.mixed()).min(1, "تصویر کالا الزامی است"),
  name: Yup.string()
    .required("نام کالا الزامی است")
    .min(1, "نام کالا الزامی است"),
  category: Yup.string().required("دسته بندی الزامی است"),
  subcategory: Yup.string().required("زیرمجموعه الزامی است"),
  price: Yup.number().min(1).required("مبلغ کالا الزامی است"),
  quantity: Yup.number().min(1).required("موجودی الزامی است"),
  brand: Yup.string().required("برند الزامی است"),
  description: Yup.string().required("توضیحات الزامی است"),
});
