import { useContext } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import InputCustom from "../../components/Input/InputCustom";
import IconEmail from "../../assets/iconSignup/IconEmail";
import IconPassword from "../../assets/iconSignup/IconPassword";
import { NotificationContext } from "../../App";
import { useFormik } from "formik";
import * as yup from "yup";
import { authService } from "./../../services/auth.service";
import { setLocalStorage } from "../../utils/utils";
import { setValueUser } from "../../redux/authSlice";
import LinkCustom from "../../components/LinkCustom/LinkCustom";
import IconArrow from "../../assets/iconSignin/IconArrow";
import { pathDefault } from "../../common/path";
import signinImage from "../../assets/iconSignin/signinImage.jpg";
import { Tilt } from "react-tilt";
import { notiValidation } from "../../common/notiValidation";

const SigninPage = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const { handleNotification } = useContext(NotificationContext);
   const { values, handleSubmit, handleChange, errors, touched, handleBlur } = useFormik({
      initialValues: {
         email: "",
         password: "",
      },
      onSubmit: async (values) => {
         console.log(values);
         try {
            const result = await authService.signIn(values);
            console.log(result);
            setLocalStorage("user", result.data.content);
            dispatch(setValueUser(result.data.content));
            handleNotification(
               "Sign in successful, you will be redirected to the homepage",
               "success"
            );
            setTimeout(() => {
               navigate("/");
            }, 2000);
         } catch (error) {
            console.log(error);
            handleNotification(error.response.data.content, "error");
         }
      },
      validationSchema: yup.object({
         email: yup.string().required(notiValidation.empty).email(notiValidation.email),
         password: yup.string().required(notiValidation.empty).min(6).max(10),
      }),
   });

   return (
      <div className="limiter">
         <div className="container_signin100">
            <div className="wrapper_signin100">
               <Tilt className="signin100_pic">
                  <img src={signinImage} />
               </Tilt>
               <form onSubmit={handleSubmit} className="signin100_form">
                  <h1>Airbnb Signin Form</h1>
                  <InputCustom
                     contentLabel={<IconEmail />}
                     placeHolder="Email"
                     name="email"
                     onChange={handleChange}
                     value={values.email}
                     onBlur={handleBlur}
                     error={errors.email}
                     touched={touched.email}
                     classWrapper="wrap_input100"
                     focusInputClass="focus_input100"
                  />

                  <InputCustom
                     contentLabel={<IconPassword />}
                     placeHolder="Password"
                     type="password"
                     name="password"
                     onChange={handleChange}
                     value={values.password}
                     onBlur={handleBlur}
                     error={errors.password}
                     touched={touched.password}
                     classWrapper="wrap_input100"
                     focusInputClass="focus_input100"
                  />

                  <div className="container_signin100_form_btn">
                     <button type="submit" className="signin100_form_btn">
                        SIGN IN
                     </button>
                  </div>
                  <div className="signin_image">
                     <LinkCustom
                        content={"Create your Account"}
                        to={pathDefault.signup}
                        className={"signin_image_link flex items-center justify-end gap-2"}
                        icon={<IconArrow />}
                     />
                  </div>
               </form>
            </div>
         </div>
      </div>
   );
};

export default SigninPage;
