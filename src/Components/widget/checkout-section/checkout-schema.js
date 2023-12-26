import * as Yup from "yup";
export const checkuotSchema = Yup.object().shape({
  firstname: Yup.string().required("نام الزامی است"),
  lastname: Yup.string().required("نام خانوادگی الزامی است"),
  address: Yup.string().required(" آدرس الزامی است"),
  phoneNumber: Yup.number().required(" تلفن همراه الزامی است"),
  deliveryDate: Yup.date().required("تاریخ تحویل الزامی است"),
});
