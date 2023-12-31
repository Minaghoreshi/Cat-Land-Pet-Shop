import * as Yup from "yup";

export const singUpValidationSchema = Yup.object({
  username: Yup.string().required("نام کاربری الزامی است"),
  firstname: Yup.string().required("نام الزامی است"),
  lastname: Yup.string().required("نام خانوادگی الزامی است"),
  phoneNumber: Yup.string().required("شماره تلفن الزامی است"),
  address: Yup.string().required("آدرس الزامی است"),
  password: Yup.string().required("رمز عبور الزامی است"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "رمز عبور و تأیید مطابقت ندارند")
    .required("تأیید رمز عبور الزامی است"),
});
