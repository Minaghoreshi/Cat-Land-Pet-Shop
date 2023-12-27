import React, { useEffect, useState } from "react";
import { TableTitle } from "../tables";
import { Button, Label, TextInput, Textarea } from "flowbite-react";
import DatePicker from "react-multi-date-picker";
import { Calendar } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "react-query";
import { editUserById, getUserById } from "../../../api/users/users-api";
import { useFormik } from "formik";
import { checkuotSchema } from "./checkout-schema";
import { store } from "../../../store";
import { changeUserPrivateInfo } from "../../../features/users-private-info/privateSlice";
import { useNavigate } from "react-router-dom";
export const UserCheckout = () => {
  const [value, setValue] = useState(new Date());
  const userId = useSelector((state) => state.user.userId);
  console.log(userId);
  const userInitialData = useSelector((state) => state.userPrivateInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      firstname: userInitialData.firstname || "",
      lastname: userInitialData.lastname || "",
      address: userInitialData.address || "",
      phoneNumber: userInitialData.phoneNumber || "",
      deliveryDate: "",
    },
    validationSchema: checkuotSchema,
    onSubmit: (values) => {
      console.log(formik.values);
      const userOrders = store.getState().user.userCart;
      const updatedOrders = userOrders.map((order) => ({
        ...order,
        deliveryDate: values.deliveryDate,
      }));
      // console.log(formik.values.firstname);
      const dataToEdit = {
        firstname: formik.values.firstname,
        lastname: formik.values.lastname,
        address: formik.values.address,
        phoneNumber: formik.values.phoneNumber,
      };
      // editUserById(userId, dataToEdit);
      // dispatch(
      //   changeUserPrivateInfo()
      // );
      navigate("/payment");
      // const newt = store.getState().userPrivateInfo;
      // console.log(newt);
    },
  });
  useEffect(() => {
    // Set the value to a Date object
    formik.setValues({
      ...formik.values,
      deliveryDate: value?.toDate?.().toISOString(),
    });
  }, [value]);
  return (
    <div className="mt-5 flex  w-3/5 flex-col gap-10">
      <TableTitle title={"تکمیل اطلاعات کاربری"} />
      <form
        onSubmit={formik.handleSubmit}
        className="shadow-custom rounded-3xl flex flex-col items-center pt-5 py-10 px-24 gap-11 "
      >
        <div className="flex gap-24 w-full justify-between ">
          <div className="w-5/12">
            <div className="mb-2 block">
              <Label
                className="text-primary text-xl"
                htmlFor="firstname"
                value="نام"
              />
            </div>
            <TextInput
              name="firstname"
              id="firstname"
              type="text"
              className="w-full"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.firstname}
            />{" "}
            {formik.touched.firstname && formik.errors.firstname ? (
              <div className="text-red-500">{formik.errors.firstname}</div>
            ) : null}
          </div>{" "}
          <div className="w-5/12">
            <div className="mb-2 block">
              <Label
                className="text-primary text-xl"
                htmlFor="lastname"
                value="نام خانوادگی"
              />
            </div>
            <TextInput
              name="lastname"
              id="lastname"
              type="text"
              className="w-full"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.lastname}
            />{" "}
            {formik.touched.lastname && formik.errors.lastname ? (
              <div className="text-red-500">{formik.errors.lastname}</div>
            ) : null}
          </div>
        </div>{" "}
        <div className="flex gap-24 w-full justify-between">
          <div className=" w-5/12">
            <div className="mb-2 block">
              <Label
                className="text-primary text-xl"
                htmlFor="address"
                value="آدرس"
              />
            </div>
            <Textarea
              name="address"
              id="address"
              type="text"
              className="w-full resize-none"
              rows={4}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.address}
            />{" "}
            {formik.touched.address && formik.errors.address ? (
              <div className="text-red-500">{formik.errors.address}</div>
            ) : null}
          </div>{" "}
          <div className="w-5/12">
            <div className="mb-2 block">
              <Label
                className="text-primary text-xl"
                htmlFor="phoneNumber"
                value="تلفن همراه"
              />
            </div>
            <TextInput
              name="phoneNumber"
              id="phoneNumber"
              type="text"
              className="w-full"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phoneNumber}
            />{" "}
            {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
              <div className="text-red-500">{formik.errors.phoneNumber}</div>
            ) : null}
          </div>
        </div>
        <div className="flex w-full ">
          {" "}
          <div className="w-5/12 justify-self-start">
            <div className="mb-2 block">
              <Label
                className="text-primary text-xl"
                htmlFor="deliveryDate"
                value="تاریخ تحویل"
              />
            </div>
            {/* // name="deliveryDate"
            // onChange={setValue}
            // onBlur={formik.handleBlur}
            // value={formik.values.deliveryDate}
            // style={{ width: "200px", height: "50px" }}
            // format="YYYY/MM/DD"
            // calendar={persian}
            // locale={persian_fa} */}
            <DatePicker
              name="deliveryDate"
              onChange={setValue}
              onBlur={formik.handleBlur}
              value={formik.values.deliveryDate}
              style={{ width: "200px", height: "50px" }}
              format="YYYY/MM/DD"
              calendar={persian}
              locale={persian_fa}
            />
            {formik.touched.deliveryDate && formik.errors.deliveryDate ? (
              <div className="text-red-500">{formik.errors.deliveryDate}</div>
            ) : null}
          </div>{" "}
        </div>
        <Button className="w-1/2" type="submit">
          ادامه
        </Button>
      </form>
    </div>
  );
};
