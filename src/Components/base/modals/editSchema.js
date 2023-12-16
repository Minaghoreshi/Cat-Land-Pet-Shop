import * as Yup from "yup";
export const editValidationSchema = Yup.object().shape({
  // Define validation rules for each field
  name: Yup.string().required("نام کالا الزامی است"),
  category: Yup.string().required("دسته بندی الزامی است"),
  subcategory: Yup.string().required("زیرمجموعه الزامی است"),
});
