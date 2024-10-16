import { Checkbox, Modal, Space, Table } from "antd";
import { useContext, useEffect, useRef, useState } from "react";

import { phongThueService } from "../../services/phongThue.service";
import { useSelector } from "react-redux";
import { NotificationContext } from "../../App";
import InputCustom from "../../components/FormInput/FormInput";
import { useFormik } from "formik";
import CreateNewRoom from "./CreateNewRoom";
const ManageInfoRoom = () => {
  //search
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const getValueRoomApi = async () => {
    try {
      const response = await phongThueService.getRooms();
      console.log(response);
      return response.data.content;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };
  const [rooms, setRooms] = useState([]);
  //call api user
  const fetchRoom = async () => {
    try {
      const roomData = await getValueRoomApi();
      setRooms(roomData);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu user:", error);
      handleNotification("Không thể lấy dữ liệu user", "error");
    }
  };

  const { user } = useSelector((state) => state.authSlice);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalAddRoomOpen, setIsModalAddRoomOpen] = useState(false);
  const [isModalUploadOpen, setIsModalUploadOpen] = useState(false);
  const { handleNotification } = useContext(NotificationContext);

  const [selectedId, setSelectedId] = useState(null);
  const handleSelectedId = (id) => {
    setSelectedId(id);
  };
  const [uploadImage, setUploadImage] = useState(null);
  const [errorImage, setErrorImage] = useState("");
  const inputFileRef = useRef(null);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const handleSearchSubmit = () => {
    const results = rooms.filter(
      (room) =>
        room.id.toString().includes(searchTerm) ||
        room.tenPhong.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
    setIsSearching(true);
  };

  const handleResetSearch = () => {
    setSearchTerm("");
    setSearchResults([]);
    setIsSearching(false);
  };
  const handleSubmitImage = (e) => {
    e.preventDefault();
    let formData = new FormData();
    if (uploadImage) {
      formData.append("formFile", uploadImage.img);
      phongThueService
        .uploadImageRoom(
          selectedId,
          formData,
          // user.token
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQzNDc4IiwiZW1haWwiOiJ0b255MDAxQHlhaG9vLmNvbSIsInJvbGUiOiJBRE1JTiIsIm5iZiI6MTcyODIwMjczMywiZXhwIjoxNzI4ODA3NTMzfQ.QklrvJVCLqtAt2IGJm5jnldQOuNu7ABgzGHmNLm9RSo"
        )
        .then((res) => {
          console.log(res);
          handleNotification("Upload avatar successfully", "success");
          fetchRoom();
        })
        .catch((err) => {
          console.log(err);
          handleNotification(err.message, "error");
          fetchRoom();
        });
    }
  };
  const {
    handleBlur,
    handleChange,

    handleSubmit,
    values,
    // setFieldValue,
    setValues,
    errors,
    touched,
  } = useFormik({
    initialValues: {
      id: "",
      tenPhong: "",
      khach: 0,
      phongNgu: 0,
      giuong: 0,
      phongTam: 0,
      moTa: "",
      giaTien: 0,
      mayGiat: true,
      banLa: true,
      tivi: true,
      dieuHoa: true,
      wifi: true,
      bep: true,
      doXe: true,
      hoBoi: true,
      banUi: true,
      maViTri: 0,
      hinhAnh: "",
    },
    onSubmit: (values) => {
      console.log(values);

      phongThueService
        .updateRoom(
          values.id,
          values,
          //user.token
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQzNDc4IiwiZW1haWwiOiJ0b255MDAxQHlhaG9vLmNvbSIsInJvbGUiOiJBRE1JTiIsIm5iZiI6MTcyODEyMDM1MiwiZXhwIjoxNzI4NzI1MTUyfQ.UMDrAn8hSPUOKuCq6QqmBv0LCXmQUvSuvLucVw_L248"
        )
        .then((res) => {
          console.log(res);
          handleNotification("Update thành công", "success");
          fetchRoom();
          setIsModalOpen(false);
        })
        .catch((err) => {
          console.log(err);
          handleNotification(err.response.data.content, "error");
        });
    },
  });
  const showModal = (id) => {
    setIsModalOpen(true);
    phongThueService
      .getRoomsById(id)
      .then((res) => {
        console.log(res);
        setValues(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setIsModalAddRoomOpen(false);
    setIsModalUploadOpen(false);
    fetchRoom();
  };
  const showAddRoomModal = () => {
    setIsModalAddRoomOpen(true);
  };
  const showUploadModal = () => {
    setIsModalUploadOpen(true);
  };
  const columns = [
    {
      title: "Room ID",
      dataIndex: "id",
      key: "id",
      align: "center",
    },
    {
      title: "Name",
      dataIndex: "tenPhong",
      key: "tenPhong",
    },
    {
      title: "Image",
      dataIndex: "hinhAnh",
      key: "hinhAnh",
      render: (text) => <img className="h-14" src={text} alt="avatar" />,
    },
    {
      title: "Location",
      key: "maViTri",
      dataIndex: "maViTri",
      align: "center",
    },
    {
      title: "Max Guest ",
      dataIndex: "khach",
      key: "khach",
      align: "center",
    },
    {
      title: "Price",
      dataIndex: "giaTien",
      key: "giaTien",
      align: "center",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <button
            onClick={() => {
              phongThueService
                .deleteRoom(
                  record.id, //user.token
                  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQzNDc4IiwiZW1haWwiOiJ0b255MDAxQHlhaG9vLmNvbSIsInJvbGUiOiJBRE1JTiIsIm5iZiI6MTcyODEyMDM1MiwiZXhwIjoxNzI4NzI1MTUyfQ.UMDrAn8hSPUOKuCq6QqmBv0LCXmQUvSuvLucVw_L248"
                )
                .then((res) => {
                  console.log(res);
                  handleNotification(res.data.message, "success");
                  fetchRoom();
                })
                .catch((err) => {
                  console.log(err);
                  handleNotification(
                    err.response.data.message || err.response.data.content,
                    "error"
                  );
                  // dispatch(getValueRoomApi());
                });
            }}
            className="bg-red-500 text-white py-2 px-5 rounded-md hover:bg-red-500/80 duration-300"
          >
            Delete
          </button>
          <button
            onClick={() => {
              showModal(record.id);
            }}
            className="bg-yellow-500 text-white py-2 px-5 rounded-md hover:bg-yellow-500/80 duration-300"
          >
            Edit Room
          </button>
          <Modal
            title="Room Information"
            open={isModalOpen}
            onOk={handleSubmit}
            onCancel={handleCancel}
            okText={"Submit"}
            width={800}
          >
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 lg:grid-cols-3 space-x-2">
                <InputCustom
                  contentLabel={"ID"}
                  name="id"
                  value={values.id}
                  disabled
                />
                <InputCustom
                  classWrapper="col-span-2"
                  contentLabel={"Name"}
                  name="tenPhong"
                  value={values.tenPhong}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errors={errors.tenPhong}
                  touched={touched.tenPhong}
                />
              </div>
              <div className=" grid  space-x-2 grid-cols-1  lg:grid-cols-4">
                <InputCustom
                  contentLabel={"Max Guest"}
                  name="khach"
                  value={values.khach}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errors={errors.khach}
                  touched={touched.khach}
                />

                <InputCustom
                  contentLabel={"Bed Room"}
                  value={values.phongNgu}
                  name="phongNgu"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errors={errors.phongNgu}
                  touched={touched.phongNgu}
                />
                <InputCustom
                  contentLabel={"Bed"}
                  value={values.giuong}
                  name="giuong"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errors={errors.giuong}
                  touched={touched.giuong}
                />
                <InputCustom
                  contentLabel={"Shower Room"}
                  value={values.phongTam}
                  name="phongTam"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errors={errors.phongTam}
                  touched={touched.phongTam}
                />
              </div>
              <div>
                <InputCustom
                  contentLabel={"Detail"}
                  value={values.moTa}
                  name="moTa"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errors={errors.moTa}
                  touched={touched.moTa}
                />
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 lg:space-x-2">
                <InputCustom
                  contentLabel={"Price"}
                  value={values.giaTien}
                  name="giaTien"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errors={errors.giaTien}
                  touched={touched.giaTien}
                />
                <InputCustom
                  contentLabel={"Location"}
                  value={values.maViTri}
                  name="maViTri"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  errors={errors.maViTri}
                  touched={touched.maViTri}
                />
              </div>

              <div className="grid grid-cols-2">
                <div className="grid grid-cols-1 lg:space-y-3">
                  <Checkbox
                    name="mayGiat"
                    checked={values.mayGiat}
                    onChange={handleChange}
                  >
                    Washing Machine
                  </Checkbox>
                  <Checkbox
                    name="tivi"
                    checked={values.tivi}
                    onChange={handleChange}
                  >
                    TV
                  </Checkbox>
                  <Checkbox
                    name="banLa"
                    checked={values.banLa}
                    onChange={handleChange}
                  >
                    Flat Iron
                  </Checkbox>
                  <Checkbox
                    name="dieuHoa"
                    checked={values.dieuHoa}
                    onChange={handleChange}
                  >
                    Air Conditioner
                  </Checkbox>
                  <Checkbox
                    name="wifi"
                    checked={values.wifi}
                    onChange={handleChange}
                  >
                    Wifi
                  </Checkbox>
                </div>

                <div className="grid grid-cols-1">
                  <Checkbox
                    name="bep"
                    checked={values.bep}
                    onChange={handleChange}
                  >
                    Kitchen
                  </Checkbox>
                  <Checkbox
                    name="hoBoi"
                    checked={values.hoBoi}
                    onChange={handleChange}
                  >
                    Pool
                  </Checkbox>
                  <Checkbox
                    name="doXe"
                    checked={values.doXe}
                    onChange={handleChange}
                  >
                    Parking
                  </Checkbox>
                </div>
              </div>
            </form>
          </Modal>
          <button
            onClick={() => {
              showUploadModal(true);
              handleSelectedId(record.id);
            }}
            className="bg-green-500 text-white py-2 px-5 rounded-md hover:bg-yellow-500/80 duration-300"
          >
            Upload Image
          </button>
          <Modal
            open={isModalUploadOpen}
            okButtonProps={{ style: { display: "none" } }}
            onCancel={handleCancel}
          >
            <div>
              <form onSubmit={handleSubmitImage} className="space-y-2">
                <h2 className="text-2xl">Upload Image Location</h2>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Choose an image
                  </label>
                  <input
                    accept="image/png, image/jpeg"
                    type="file"
                    ref={inputFileRef}
                    onChange={(e) => {
                      const img = e.target.files[0];
                      if (img) {
                        if (img.size > 1024 * 1024) {
                          setErrorImage("Vui lòng upload hình ảnh dưới 1mb ");
                          return;
                        }
                        const imgURL = URL.createObjectURL(img);
                        setUploadImage({ img, imgURL });
                      }
                    }}
                  />
                </div>
                <p className="text-red-500">{errorImage}</p>
                {uploadImage ? (
                  <img
                    className="w-32"
                    src={uploadImage?.imgURL}
                    alt="avatar"
                  />
                ) : null}
                <button
                  type="submit"
                  className="py-2 px-5 bg-green-700 text-white rounded-md hover:bg-green-600 duration-300"
                >
                  Upload
                </button>
                <button
                  onClick={() => {
                    setUploadImage(null);
                    setErrorImage("");
                    inputFileRef.current.value = "";
                  }}
                  className="py-2 px-5 ml-5 bg-red-600 text-white rounded-md hover:bg-red-500 duration-300"
                >
                  Delete
                </button>
              </form>
            </div>
          </Modal>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    fetchRoom();
  }, []);
  return (
    <div>
      <div className="flex space-x-4 mb-5">
        <button
          onClick={() => {
            showAddRoomModal(true);
          }}
          className="px-4 py-2 bg-gray-200 text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-300"
        >
          Add Room
        </button>
        <Modal
          title="Create New Room"
          open={isModalAddRoomOpen}
          onCancel={handleCancel}
          okButtonProps={{ style: { display: "none" } }}
          width={800}
        >
          <CreateNewRoom />
        </Modal>
        <div className="flex space-x-3">
          <input
            className="w-[280px] border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder="Search by Room Name or Room ID"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <button
            onClick={handleSearchSubmit}
            className="px-4 py-2 bg-gray-200 text-gray-800 border-r text-sx border-gray-300 hover:bg-gray-300 rounded-lg"
          >
            Search <i className="fa-solid fa-magnifying-glass"></i>
          </button>
          {isSearching && (
            <button
              onClick={handleResetSearch}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Reset
            </button>
          )}
        </div>
      </div>
      <Table
        columns={columns}
        dataSource={isSearching ? searchResults : rooms}
      />
    </div>
  );
};

export default ManageInfoRoom;
