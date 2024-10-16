import { useContext, useRef, useState } from "react";
import { NotificationContext } from "../../App";
import { userService } from "../../services/user.service";
import { useSelector } from "react-redux";
import InputCustom from "../../components/FormInput/FormInput";
const CreateAdminstrator = () => {
  const { handleNotification } = useContext(NotificationContext);
  const { user } = useSelector((state) => state.authSlice);
  const initialUserValue = {
    name: "",
    email: "",
    password: "",
    phone: "",
    birthday: "",
    avatar: "",
    gender: true,
    role: "ADMIN",
    skill: [],
    certification: [],
  };
  const [userValue, setUserValue] = useState({ initialUserValue });
  const [errors, setErrors] = useState({});
  const handleChangeValue = (e) => {
    const { name, value } = e.target;
    setUserValue({
      ...userValue,
      [name]: value,
    });
  };

  const validateForm = () => {
    let formErrors = {};

    // Required field validation
    const requiredFields = [
      "name",
      "email",
      "phone",
      "password",
      "birthday",
      "role",
    ];
    for (const field of requiredFields) {
      if (typeof userValue[field] === "string" && !userValue[field].trim()) {
        formErrors[field] = "This field cannot be left blank";
      } else if (userValue[field] == null || userValue[field] === undefined) {
        formErrors[field] = "This field is required";
      }
    }
    if (userValue.email && typeof userValue.email === "string") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(userValue.email.trim())) {
        formErrors.email = "Please enter a valid email address";
      }
    }
    if (userValue.phone && typeof userValue.phone === "string") {
      const phoneRegex = /^(0|\+84)[3|5|7|8|9][0-9]{8}$/;
      if (!phoneRegex.test(userValue.phone.trim())) {
        formErrors.phone = "Please enter a valid phone number (digits only)";
      }
    }
    if (userValue.password && typeof userValue.password === "string") {
      const minPasswordLength = 8;
      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (
        userValue.password.length < minPasswordLength ||
        !passwordRegex.test(userValue.password)
      ) {
        formErrors.password =
          "Password must be at least 8 characters and include lowercase, uppercase, digits, and special characters";
      }
    }

    return formErrors;
  };
  const resetForm = () => {
    setUserValue(initialUserValue);
    setErrors({});
  };
  const handleSubmitFormCreateUser = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      setErrors({});
      console.log(userValue);
      userService
        .postUser(userValue)
        .then((res) => {
          console.log(res);
          handleNotification("Add successfully", "success");
          resetForm();
        })
        .catch((err) => {
          console.log(err);
          handleNotification(err.message, "error");
        });
    }
  };

  return (
    <form
      onSubmit={handleSubmitFormCreateUser}
      className="formCreateAdmin space-y-5"
    >
      <InputCustom
        contentLabel="Name"
        name="name"
        onChange={handleChangeValue}
        value={userValue.name}
      />
      {errors.name && (
        <p className="italic text-red-500 text-sm">*{errors.name}</p>
      )}
      <InputCustom
        contentLabel="Email"
        name="email"
        onChange={handleChangeValue}
        value={userValue.email}
      />
      {errors.email && (
        <p className="italic text-red-500 text-sm">*{errors.email}</p>
      )}
      <InputCustom
        contentLabel="Phone"
        name="phone"
        onChange={handleChangeValue}
        value={userValue.phone}
      />
      {errors.phone && (
        <p className="italic text-red-500 text-sm">*{errors.phone}</p>
      )}
      <InputCustom
        contentLabel="Password"
        type="password"
        name="password"
        onChange={handleChangeValue}
        value={userValue.password}
      />
      {errors.password && (
        <p className="italic text-red-500 text-sm">*{errors.password}</p>
      )}
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Date of birth
        </label>
        <input
          type="date"
          onChange={(e) => {
            setUserValue({ ...userValue, birthday: e.target.value });
          }}
          value={userValue.birthday}
        />
        {errors.birthday && (
          <p className="italic mt-5 text-red-500 text-sm">*{errors.birthday}</p>
        )}
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Gender
        </label>
        <select
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          name="gender"
          onChange={handleChangeValue}
        >
          <option value={true}>Male</option>
          <option value={false}>Female</option>
        </select>
      </div>
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Role
        </label>
        <select
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          name="role"
          onChange={handleChangeValue}
        >
          <option value={"ADMIN"}>ADMIN</option>
        </select>
        {errors.role && (
          <p className="italic mt-5 text-red-500 text-sm">*{errors.role}</p>
        )}
      </div>

      <button
        type="submit"
        className="px-5 py-2 bg-black text-white rounded-md w-full hover:bg-black/70 duration-300"
      >
        Submit
      </button>
    </form>
  );
};

export default CreateAdminstrator;
