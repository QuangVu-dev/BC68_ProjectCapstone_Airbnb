import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NotificationContext } from "../../App";
import { phongThueService } from "../../services/phongThue.service";
import InputCustom from "../../components/FormInput/FormInput";
import { Checkbox } from "antd";
const CreateNewRoom = () => {
  const { user } = useSelector((state) => state.authSlice);

  const { handleNotification } = useContext(NotificationContext);
  const initialRoomValue = {
    tenPhong: "",
    khach: 0,
    phongNgu: 0,
    giuong: 0,
    phongTam: 0,
    moTa: "",
    giaTien: 0,
    mayGiat: false,
    banLa: false,
    tivi: false,
    dieuHoa: false,
    wifi: false,
    bep: false,
    doXe: false,
    hoBoi: false,
    banUi: false,
    maViTri: 0,
  };
  const [roomValue, setRoomValue] = useState({ initialRoomValue });

  const [errors, setErrors] = useState({});

  const handleChangeValue = (e) => {
    const { name, value, type, checked } = e.target;

    setRoomValue((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  const validateForm = () => {
    let formErrors = {};
    if (!roomValue.tenPhong.trim()) {
      formErrors.tenPhong = "This field cannot be left blank";
    }
    if (!roomValue.khach.trim()) {
      formErrors.khach = "This field cannot be left blank";
    }
    if (!roomValue.phongNgu.trim()) {
      formErrors.phongNgu = "This field cannot be left blank";
    }
    if (!roomValue.giuong.trim()) {
      formErrors.giuong = "This field cannot be left blank";
    }
    if (!roomValue.phongTam.trim()) {
      formErrors.phongTam = "This field cannot be left blank";
    }
    if (!roomValue.moTa.trim()) {
      formErrors.moTa = "This field cannot be left blank";
    }
    if (!roomValue.giaTien.trim()) {
      formErrors.giaTien = "This field cannot be left blank";
    }
    return formErrors;
  };
  const handleSubmitFormCreateRoom = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      setErrors({});
      console.log(roomValue);
      phongThueService
        .postRoom(
          roomValue, //user.token
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
    setRoomValue(initialRoomValue);
  };
  useEffect(() => {
    console.log(roomValue);
  }, [roomValue]);
  return (
    <div>
      <form
        onSubmit={handleSubmitFormCreateRoom}
        className="formCreateRoom space-y-5"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 space-x-2">
          <InputCustom
            contentLabel="Name"
            name="tenPhong"
            onChange={handleChangeValue}
            value={roomValue.tenViTri}
          />
          {errors.tenPhong && (
            <p className="italic text-red-500 text-sm">*{errors.tenPhong}</p>
          )}
          <InputCustom
            contentLabel="Guest"
            name="khach"
            type="number"
            onChange={handleChangeValue}
            value={roomValue.khach}
          />
          {errors.khach && (
            <p className="italic text-red-500 text-sm">*{errors.khach}</p>
          )}
        </div>
        <div className=" grid grid-cols-1 space-x-2 lg:grid-cols-3">
          <InputCustom
            contentLabel="Bed room"
            name="phongNgu"
            type="number"
            onChange={handleChangeValue}
            value={roomValue.phongNgu}
          />
          {errors.phongNgu && (
            <p className="italic text-red-500 text-sm">*{errors.phongNgu}</p>
          )}
          <InputCustom
            contentLabel="Bed"
            name="giuong"
            type="number"
            onChange={handleChangeValue}
            value={roomValue.giuong}
          />
          {errors.giuong && (
            <p className="italic text-red-500 text-sm">*{errors.giuong}</p>
          )}
          <InputCustom
            contentLabel="Shower room"
            name="phongTam"
            type="number"
            onChange={handleChangeValue}
            value={roomValue.phongTam}
          />
          {errors.phongTam && (
            <p className="italic text-red-500 text-sm">*{errors.phongTam}</p>
          )}
        </div>
        <InputCustom
          contentLabel="Detail"
          name="moTa"
          onChange={handleChangeValue}
          value={roomValue.moTa}
        />
        {errors.moTa && (
          <p className="italic text-red-500 text-sm">*{errors.moTa}</p>
        )}
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:space-x-2">
          <InputCustom
            contentLabel="Location"
            name="maViTri"
            type="number"
            onChange={handleChangeValue}
            value={roomValue.maViTri}
          />
          {errors.maViTri && (
            <p className="italic text-red-500 text-sm">*{errors.maViTri}</p>
          )}
          <InputCustom
            contentLabel="Price"
            name="giaTien"
            type="number"
            onChange={handleChangeValue}
            value={roomValue.giaTien}
          />
          {errors.giaTien && (
            <p className="italic text-red-500 text-sm">*{errors.giaTien}</p>
          )}
        </div>
        <div className="grid grid-cols-2">
          <div className="grid grid-cols-1 lg:space-y-3">
            <div className="check-contain">
              <Checkbox
                name="mayGiat"
                checked={roomValue.mayGiat}
                onChange={handleChangeValue}
              >
                Washing Machine
              </Checkbox>
            </div>
            <div className="check-contain">
              <Checkbox
                name="tivi"
                checked={roomValue.tivi}
                value={roomValue.tivi}
                onChange={handleChangeValue}
              >
                TV
              </Checkbox>
            </div>
            <div className="check-contain">
              <Checkbox
                name="banLa"
                checked={roomValue.banLa}
                value={roomValue.banLa}
                onChange={handleChangeValue}
              >
                Flat Iron
              </Checkbox>
            </div>
            <div className="check-contain">
              <Checkbox
                name="dieuHoa"
                value={roomValue.dieuHoa}
                checked={roomValue.dieuHoa}
                onChange={handleChangeValue}
              >
                Air Conditioner
              </Checkbox>
            </div>
            <div className="check-contain">
              <Checkbox
                name="wifi"
                checked={roomValue.wifi}
                value={roomValue.wifi}
                onChange={handleChangeValue}
              >
                Wifi
              </Checkbox>
            </div>
          </div>

          <div className="grid grid-cols-1  ">
            <div className="check-contain">
              <Checkbox
                name="bep"
                checked={roomValue.bep}
                value={roomValue.bep}
                onChange={handleChangeValue}
              >
                Kitchen
              </Checkbox>
            </div>
            <div className="check-contain">
              <Checkbox
                name="hoBoi"
                checked={roomValue.hoBoi}
                value={roomValue.hoBoi}
                onChange={handleChangeValue}
              >
                Pool
              </Checkbox>
            </div>
            <div className="check-contain">
              <Checkbox
                name="doXe"
                checked={roomValue.doXe}
                value={roomValue.doXe}
                onChange={handleChangeValue}
              >
                Parking
              </Checkbox>
            </div>
          </div>
        </div>
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

export default CreateNewRoom;
