
import React, { useContext, useState } from "react";
import FormInput from "../../components/FormInput/FormInput";
import { Modal } from "antd";
import { useFormik } from "formik";
import { object, string } from "yup";
import { notiValidation } from "../../common/notiValidation";
import { userService } from "../../services/user.service";
import { NotificationContext } from "../../App";
import { setLocalStorage } from "../../utils/utils";

const EditProfile = ({ user }) => {
  const { handleNotification } = useContext(NotificationContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        name: user.user.name,
        email: user.user.email,
        password: user.user.password,
        phone: user.user.phone,
        birthday: user.user.birthday,
        gender: user.user.gender,
      },
      onSubmit: (values) => {
        userService
          .updateUser(user?.user.id, values)
          .then((res) => {
            setIsModalOpen(false);
            setLocalStorage("user", {
              ...user,
              user: {
                ...user.user,
                name: values.name,
                email: values.email,
                phone: values.phone,
                birthday: values.birthday,
                gender: values.gender,
              },
            });
            handleNotification("Updated successfully!", "success");
          })
          .catch((err) => {
            console.log(err);
            handleNotification(err.response.statusText, "error");
          });
      },
      validationSchema: object({
        name: string()
          .required(notiValidation.empty)
          .matches(/^[^\d0-9]*$/, "Please enter a name without numbers"),
        email: string()
          .required(notiValidation.empty)
          .email(notiValidation.email),
        password: string()
          .required(notiValidation.empty)
          .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            notiValidation.password
          ),
        phone: string()
          .required(notiValidation.empty)
          .matches(/^(0|\+84)[3|5|7|8|9][0-9]{8}$/, notiValidation.phone),
        birthday: string().required(notiValidation.empty),
        gender: string().required(notiValidation.empty),
      }),
    });

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="cursor-pointer px-5 py-2 rounded-full shadow-md bg-gray-200 hover:bg-gray-300 duration-300"
      >
        Edit profile
      </button>
      <Modal
        title={`${user.user.name}'s Information`}
        centered
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={[
          <button
            onClick={handleSubmit}
            className="py-2 px-5 rounded-md bg-rose-500 text-white hover:opacity-70 duration-300"
          >
            Update
          </button>,
        ]}
      >
        <form onSubmit={handleSubmit}>
          <FormInput
            classWrapper="mb-2"
            contentLabel="Full name"
            name="name"
            placeholder="Change your full name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            errors={errors.name}
            touched={touched.name}
          />
          <FormInput
            classWrapper="mb-2"
            contentLabel="Email"
            name="email"
            placeholder="Change your email address"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            errors={errors.email}
            touched={touched.email}
          />
          <FormInput
            classWrapper="mb-2"
            contentLabel="Password"
            name="password"
            placeholder="Change your password"
            type="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            errors={errors.password}
            touched={touched.password}
          />
          <FormInput
            classWrapper="mb-2"
            contentLabel="Phone number"
            name="phone"
            placeholder="Change your phone number"
            value={values.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            errors={errors.phone}
            touched={touched.phone}
          />
          <FormInput
            classWrapper="mb-2"
            contentLabel="Date of birth"
            name="birthday"
            placeholder="Change your birthday"
            type="date"
            value={values.birthday}
            onChange={handleChange}
            onBlur={handleBlur}
            errors={errors.birthday}
            touched={touched.birthday}
          />
          <div className="mb-2">
            <label className="block mb-2 text-sm font-medium">Gender</label>
            <select
              className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              name="gender"
              value={values.gender}
              onChange={handleChange}
            >
              <option value={true}>Male</option>
              <option value={false}>Female</option>
            </select>
            {errors.gender && touched.gender && (
              <p className="text-red-500 mt-2">{errors.gender}</p>
            )}
          </div>
        </form>
      </Modal>
    </>
  );
};

export default EditProfile;
