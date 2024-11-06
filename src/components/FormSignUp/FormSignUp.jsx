import React, { useContext } from "react";
import InputCustom from "../Input/InputCustom";
import { useFormik } from "formik";
import * as yup from "yup";
import { notiValidation } from "../../common/notiValidation";
import { authService } from "../../services/auth.service";
import { NotificationContext } from "../../App";
import IconUser from "../../assets/iconSignup/IconUser";
import IconEmail from "../../assets/iconSignup/IconEmail";
import IconPassword from "../../assets/iconSignup/IconPassword";
import IconPhone from "../../assets/iconSignup/IconPhone";
import IconArrow from "../../assets/iconSignin/IconArrow";
import { DatePicker } from "antd";
import { pathDefault } from "../../common/path";
import { useNavigate } from "react-router-dom";
import LinkCustom from "../../components/LinkCustom/LinkCustom";

const FormSignUp = () => {
  const navigate = useNavigate();
  const { handleNotification } = useContext(NotificationContext);
  const {
    handleChange,
    handleSubmit,
    values,
    setFieldValue,
    resetForm,
    handleReset,
    errors,
    touched,
    handleBlur,
  } = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
      birthday: "",
      gender: "",
    },
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      authService
        .signUp({
          ...values,
          gender: values.gender == "Nam" ? true : false,
        })
        .then((res) => {
          console.log(res);
          handleNotification(
            "Congratulations on successfully creating your account. You will be redirected to the sign in page",
            "success"
          );
          localStorage.setItem("user", JSON.stringify(res.data));
          setTimeout(() => {
            navigate("/dang-nhap");
          }, 2000);
        })
        .catch((err) => {
          console.log(err);
          handleNotification(err.response.data.content, "error");
        });
      resetForm();
    },
    validationSchema: yup.object({
      name: yup
        .string()
        .required(notiValidation.empty)
        .matches(/^[A-Za-zÀ-ỹà-ỹ\s]+$/, "Please enter a name without numbers"),
      email: yup
        .string()
        .required(notiValidation.empty)
        .email(notiValidation.email),
      password: yup
        .string()
        .required(notiValidation.empty)
        .min(6, "Please enter a minimum of 6 characters")
        .max(20, "Please enter a maximum of 20 characters")
        .matches(
          /^(?=.*[A-Z])(?=.*\d).+$/,
          "Please enter at least one uppercase letter and one number"
        ),
      phone: yup
        .string()
        .required(notiValidation.empty)
        .matches(
          /^(0|\+84)[3|5|7|8|9][0-9]{8}$/,
          "Please enter a valid phone number"
        ),
      birthday: yup.string().required(notiValidation.empty),
      gender: yup.string().required(notiValidation.empty),
    }),
  });

  return (
    <div className="main">
      <section className="signup">
        <div className="container">
          <div className="signup_content">
            <div className="signup_form">
              <h2 className="form_title">Welcome to Airbnb</h2>
              <form
                method="POST"
                className="register_form"
                onSubmit={handleSubmit}
              >
                <InputCustom
                  name="name"
                  placeHolder="Your name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.name}
                  touched={touched.name}
                  classWrapper="form_group"
                  contentLabel={<IconUser />}
                  autoComplete="username"
                />
                <InputCustom
                  name="email"
                  placeHolder="Your email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.email}
                  touched={touched.email}
                  classWrapper="form_group"
                  contentLabel={<IconEmail />}
                  autoComplete="email"
                />

                <InputCustom
                  name="password"
                  type="password"
                  placeHolder="Password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.password}
                  touched={touched.password}
                  classWrapper="form_group"
                  contentLabel={<IconPassword />}
                  autoComplete="current-password"
                />
                <InputCustom
                  contentLabel={<IconPhone />}
                  name="phone"
                  placeHolder="Your phone"
                  classWrapper="form_group"
                  value={values.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.phone}
                  touched={touched.phone}
                />
                <div className="flex items-center justify-center gap-2">
                  <div className="form_group w-1/2">
                    <div style={{ height: "43px" }}>
                      <DatePicker
                        placeholder="Your birthday"
                        className="w-full h-full"
                        format="DD-MM-YYYY"
                        onChange={(dayjs, dateString) => {
                          setFieldValue("birthday", dateString);
                        }}
                      />
                    </div>

                    {errors.birthday && touched.birthday ? (
                      <p className="text-red-500">{errors.birthday}</p>
                    ) : null}
                  </div>
                  <div className="form_group w-1/2">
                    <select
                      name="gender"
                      className="bg-gray-50 border border-gray-300 text-[16px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full h-full p-2.5"
                      onChange={handleChange}
                      value={values.gender}
                    >
                      <option value="">Please select gender</option>
                      <option value="Nam">Male</option>
                      <option value="Nữ">Female</option>
                    </select>
                    {errors.gender && touched.gender ? (
                      <p className="text-red-500">{errors.gender}</p>
                    ) : null}
                  </div>
                </div>

                <div className="w-full">
                  <button
                    type="submit"
                    className="py-3 px-6 bg-black text-white rounded-md w-full hover:bg-[#ff385c]"
                  >
                    Sign Up
                  </button>
                </div>
              </form>
            </div>
            <div className="signup_image">
              <LinkCustom
                content={"I already have an account"}
                to={pathDefault.signin}
                className={
                  "signup_image_link flex items-center justify-end gap-2"
                }
                icon={<IconArrow />}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FormSignUp;
