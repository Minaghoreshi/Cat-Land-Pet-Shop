import React, { useEffect, useState } from "react";
import { TableTitle } from "../tables";
import { Label, TextInput, Textarea } from "flowbite-react";
import DatePicker from "react-multi-date-picker";
import { Calendar } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { useSelector } from "react-redux";
import { useQuery } from "react-query";
import { getUserById } from "../../../api/users/users-api";
export const UserCheckout = () => {
  const [value, setValue] = useState(new Date());
  const userId = useSelector((state) => state.user.userId);
  console.log(userId);
  // const {
  //   data: user,
  //   isLoading,
  //   error,
  // } = useQuery(["user", userId], () => {
  //   getUserById(userId);
  // });

  // function handleSubmit() {
  //   if (value instanceof DateObject) value = value.toDate();

  //   submitDate(value);
  // }
  // const handleDateChange = () => {
  //   console.log(value);
  // };
  useEffect(() => {
    console.log(value?.toDate?.().toISOString());
  }, [value]);
  return (
    <div className="mt-5 flex  w-3/5 flex-col gap-10">
      <TableTitle title={"تکمیل اطلاعات کاربری"} />
      <form className="shadow-custom rounded-3xl flex flex-col pt-5 py-10 px-24 gap-11 ">
        <div className="flex gap-24 w-full justify-between ">
          <div className="w-5/12">
            <div className="mb-2 block">
              <Label
                className="text-primary text-xl"
                htmlFor="firstname"
                value="نام"
              />
            </div>
            <TextInput id="firstname" type="text" className="w-full" required />{" "}
          </div>{" "}
          <div className="w-5/12">
            <div className="mb-2 block">
              <Label
                className="text-primary text-xl"
                htmlFor="lastname"
                value="نام خانوادگی"
              />
            </div>
            <TextInput id="lastname" type="text" className="w-full" required />{" "}
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
              id="address"
              type="text"
              className="w-full resize-none"
              required
              rows={4}
            />{" "}
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
              id="phoneNumber"
              type="text"
              className="w-full"
              required
            />{" "}
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
            <DatePicker
              value={value}
              onChange={setValue}
              style={{ width: "200px", height: "50px" }}
              format="YYYY/MM/DD"
              calendar={persian}
              locale={persian_fa}
            />
            {/* <TextInput
              id="deliveryDate"
              type="date"
              className="w-full resize-none"
              required
            />{" "} */}
          </div>{" "}
        </div>
      </form>
    </div>
  );
};
