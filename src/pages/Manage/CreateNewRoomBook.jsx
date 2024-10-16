import { datPhongService } from "../../services/datPhong.service";
import { useContext, useState } from "react";
import { NotificationContext } from "../../App";
import InputCustom from "../../components/FormInput/FormInput";
import { DatePicker } from "antd";

const CreateNewRoomBook = () => {
  const { RangePicker } = DatePicker;
  const { handleNotification } = useContext(NotificationContext);
  const initialBookedValue = {
    maPhong: "",
    ngayDen: "",
    ngayDi: "",
    soLuongKhach: "",
    maNguoiDung: "",
  };
  const [bookedValue, setBookedValue] = useState({ initialBookedValue });
  // const [bookedValue, setBookedValue] = useState({
  //   ngayDen: '',
  //   ngayDi: ''
  // });

  const [errors, setErrors] = useState({});

  const handleChangeValue = (e) => {
    const { name, value } = e.target;
    setBookedValue({
      ...bookedValue,
      [name]: value,
    });
  };
  const validateForm = () => {
    let formErrors = {};
    if (!bookedValue.maPhong.trim()) {
      formErrors.maPhong = "This field cannot be left blank";
    }
    if (!bookedValue.ngayDen.trim()) {
      formErrors.ngayDen = "This field cannot be left blank";
    }
    if (!bookedValue.ngayDi.trim()) {
      formErrors.ngayDi = "This field cannot be left blank";
    }
    if (!bookedValue.soLuongKhach.trim()) {
      formErrors.soLuongKhach = "This field cannot be left blank";
    }
    if (!bookedValue.maNguoiDung.trim()) {
      formErrors.maNguoiDung = "This field cannot be left blank";
    }
    return formErrors;
  };
  const handleSubmitFormAddBookedRoom = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      setErrors({});
      console.log(bookedValue);
      datPhongService
        .postBookedRoom(bookedValue)
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
    setBookedValue(initialBookedValue);
  };
  const handleRangePickerChange = (dates, dateStrings) => {
    setBookedValue((prev) => ({
      ...prev,
      ngayDen: dateStrings[0],
      ngayDi: dateStrings[1],
    }));
  };
  return (
    <div>
      <form
        onSubmit={handleSubmitFormAddBookedRoom}
        className="formAddBookedRoom space-y-5"
      >
        <InputCustom
          contentLabel="RoomID"
          name="maPhong"
          type="number"
          onChange={handleChangeValue}
          value={bookedValue.maPhong}
        />
        {errors.maPhong && (
          <p className="italic text-red-500 text-sm">*{errors.maPhong}</p>
        )}
        <RangePicker onChange={handleRangePickerChange} />
        <InputCustom
          contentLabel="Arrival"
          name="ngayDen"
          onChange={handleChangeValue}
          value={bookedValue.ngayDen}
          disable
        />
        {errors.ngayDen && (
          <p className="italic text-red-500 text-sm">*{errors.ngayDen}</p>
        )}
        <InputCustom
          contentLabel="Depature"
          name="ngayDi"
          onChange={handleChangeValue}
          value={bookedValue.ngayDi}
          disable
        />
        {errors.ngayDi && (
          <p className="italic text-red-500 text-sm">*{errors.ngayDi}</p>
        )}

        <InputCustom
          contentLabel="Guest"
          name="soLuongKhach"
          type="number"
          onChange={handleChangeValue}
          value={bookedValue.soLuongKhach}
        />
        {errors.soLuongKhach && (
          <p className="italic text-red-500 text-sm">*{errors.soLuongKhach}</p>
        )}
        <InputCustom
          contentLabel="UserID"
          type="number"
          name="maNguoiDung"
          onChange={handleChangeValue}
          value={bookedValue.maNguoiDung}
        />
        {errors.maNguoiDung && (
          <p className="italic text-red-500 text-sm">*{errors.maNguoiDung}</p>
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

export default CreateNewRoomBook;
