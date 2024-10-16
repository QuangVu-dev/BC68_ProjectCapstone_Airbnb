import { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { NotificationContext } from "../../App";
import { viTriService } from "../../services/viTri.service";
import InputCustom from "../../components/FormInput/FormInput";
const CreateNewLocation = () => {
  const { user } = useSelector((state) => state.authSlice);

  const { handleNotification } = useContext(NotificationContext);
  const initialLocationValue = { tenViTri: "", tinhThanh: "", quocGia: "" };
  const [locationValue, setLocationValue] = useState({ initialLocationValue });

  const [errors, setErrors] = useState({});

  const handleChangeValue = (e) => {
    const { name, value } = e.target;
    setLocationValue({
      ...locationValue,
      [name]: value,
    });
  };
  const validateForm = () => {
    let formErrors = {};
    if (!locationValue.tenViTri.trim()) {
      formErrors.tenViTri = "This field cannot be left blank";
    }
    if (!locationValue.tinhThanh.trim()) {
      formErrors.tinhThanh = "This field cannot be left blank";
    }
    if (!locationValue.quocGia.trim()) {
      formErrors.quocGia = "This field cannot be left blank";
    }
    return formErrors;
  };
  const handleSubmitFormCreateLocation = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      setErrors({});
      console.log(locationValue);
      viTriService
        .postLocation(
          locationValue, //user.token
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQzNDc4IiwiZW1haWwiOiJ0b255MDAxQHlhaG9vLmNvbSIsInJvbGUiOiJBRE1JTiIsIm5iZiI6MTcyODIwMjczMywiZXhwIjoxNzI4ODA3NTMzfQ.QklrvJVCLqtAt2IGJm5jnldQOuNu7ABgzGHmNLm9RSo"
        )
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
  const resetForm = () => {
    setLocationValue(initialLocationValue);
  };
  return (
    <div>
      <form
        onSubmit={handleSubmitFormCreateLocation}
        className="formCreateLocation space-y-5"
      >
        <InputCustom
          contentLabel="Name"
          name="tenViTri"
          onChange={handleChangeValue}
          value={locationValue.tenViTri}
        />
        {errors.tenViTri && (
          <p className="italic text-red-500 text-sm">*{errors.tenViTri}</p>
        )}
        <InputCustom
          contentLabel="Province"
          name="tinhThanh"
          onChange={handleChangeValue}
          value={locationValue.tinhThanh}
        />
        {errors.tinhThanh && (
          <p className="italic text-red-500 text-sm">*{errors.tinhThanh}</p>
        )}
        <InputCustom
          contentLabel="Nation"
          name="quocGia"
          onChange={handleChangeValue}
          value={locationValue.quocGia}
        />
        {errors.quocGia && (
          <p className="italic text-red-500 text-sm">*{errors.quocGia}</p>
        )}

        <button
          type="submit"
          className="px-5  py-2 w-full bg-black text-white rounded-md  hover:bg-black/70 duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateNewLocation;
