import * as Yup from "yup";
export const validationSchema = Yup.object().shape({
  name: Yup.string().required("نام کاربری الزامی است"),
  password: Yup.string().required("رمز عبور الزامی است"),
});
