import { useContext, useEffect, useRef, useState } from "react";

import { useSelector } from "react-redux";
import { useFormik } from "formik";
import { Button, Modal, Space, Table } from "antd";
import { viTriService } from "../../services/viTri.service";
import InputCustom from "../../components/FormInput/FormInput";
import { NotificationContext } from "../../App";
import CreateNewLocation from "./CreateNewLocation";
const ManageInfoLocation = () => {
  const getValueLocationApi = async () => {
    try {
      const response = await viTriService.getLocations();
      console.log(response);
      return response.data.content;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };
  const [location, setLocations] = useState([]);
  //call api user
  const fetchLocations = async () => {
    try {
      const locationData = await getValueLocationApi();
      setLocations(locationData);
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu user:", error);
      handleNotification("Không thể lấy dữ liệu user", "error");
    }
  };
  const { user } = useSelector((state) => state.authSlice);
  //search
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalLocationOpen, setIsModalLocationOpen] = useState(false);
  const [isModalUploadOpen, setIsModalUploadOpen] = useState(false);
  const { handleNotification } = useContext(NotificationContext);

  const [selectedId, setSelectedId] = useState(null);
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const handleSearchSubmit = () => {
    const results = location.filter(
      (location) =>
        location.tenViTri.toLowerCase().includes(searchTerm.toLowerCase()) ||
        location.tinhThanh.toLowerCase().includes(searchTerm.toLowerCase()) ||
        location.quocGia.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
    setIsSearching(true);
  };

  const handleResetSearch = () => {
    setSearchTerm("");
    setSearchResults([]);
    setIsSearching(false);
  };
  const handleSelectedId = (id) => {
    setSelectedId(id);
  };
  const [uploadImage, setUploadImage] = useState(null);
  const [errorImage, setErrorImage] = useState("");
  const inputFileRef = useRef(null);

  const handleSubmitImage = (e) => {
    e.preventDefault();
    let formData = new FormData();
    if (uploadImage) {
      formData.append("formFile", uploadImage.img);
      viTriService
        .uploadImageLocation(
          selectedId,
          formData,
          // user.token
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQzNDc4IiwiZW1haWwiOiJ0b255MDAxQHlhaG9vLmNvbSIsInJvbGUiOiJBRE1JTiIsIm5iZiI6MTcyODIwMjczMywiZXhwIjoxNzI4ODA3NTMzfQ.QklrvJVCLqtAt2IGJm5jnldQOuNu7ABgzGHmNLm9RSo"
        )
        .then((res) => {
          console.log(res);
          handleNotification("Upload avatar successfully", "success");
          fetchLocations();
        })
        .catch((err) => {
          console.log(err);
          handleNotification(err.message, "error");
          fetchLocations();
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
      tenViTri: "",
      tinhThanh: "",
      quocGia: "",
    },
    onSubmit: (values) => {
      console.log(values);

      viTriService
        .updateLocation(
          values.id,
          values, //user.token
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQzNDc4IiwiZW1haWwiOiJ0b255MDAxQHlhaG9vLmNvbSIsInJvbGUiOiJBRE1JTiIsIm5iZiI6MTcyODIwMjczMywiZXhwIjoxNzI4ODA3NTMzfQ.QklrvJVCLqtAt2IGJm5jnldQOuNu7ABgzGHmNLm9RSo"
        )
        .then((res) => {
          console.log(res);
          handleNotification("Update thành công", "success");
          setIsModalOpen(false);
          fetchLocations();
        })
        .catch((err) => {
          console.log(err);
          handleNotification("Update thất bại", "error");
          setIsModalOpen(true);
          fetchLocations();
        });
    },
  });
  const showModal = (id) => {
    setIsModalOpen(true);
    viTriService
      .getLocationsById(id)
      .then((res) => {
        console.log(res);
        setValues(res.data.content);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const showCreateNewLocationModal = () => {
    setIsModalLocationOpen(true);
  };
  const showUploadImageModal = () => {
    setIsModalUploadOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setIsModalLocationOpen(false);
    setIsModalUploadOpen(false);
    fetchLocations();
  };
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "tenViTri",
      key: "tenViTri",
    },
    {
      title: "Image",
      dataIndex: "hinhAnh",
      key: "hinhAnh",
      render: (text) => <img className="h-20 w-24" src={text} alt="avatar" />,
    },
    {
      title: "Province",
      key: "tinhThanh",
      dataIndex: "tinhThanh",
    },
    {
      title: "Nation",
      dataIndex: "quocGia",
      key: "quocGia",
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <button
            onClick={() => {
              viTriService
                .deleteLocation(
                  record.id, //user.token
                  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQzNDc4IiwiZW1haWwiOiJ0b255MDAxQHlhaG9vLmNvbSIsInJvbGUiOiJBRE1JTiIsIm5iZiI6MTcyODIwMjczMywiZXhwIjoxNzI4ODA3NTMzfQ.QklrvJVCLqtAt2IGJm5jnldQOuNu7ABgzGHmNLm9RSo"
                )
                .then((res) => {
                  console.log(res);
                  handleNotification(res.data.message, "success");
                  fetchLocations();
                })
                .catch((err) => {
                  console.log(err);
                  handleNotification(
                    err.response.data.message || err.response.data.content,
                    "error"
                  );
                  fetchLocations();
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
            Edit Info
          </button>
          <Modal
            title="Location Information"
            open={isModalOpen}
            onOk={handleSubmit}
            onCancel={handleCancel}
            okText="Update"
          >
            <form className="space-y-5" onSubmit={handleSubmit}>
              <InputCustom
                contentLabel={"ID"}
                name="id"
                value={values.id}
                disabled
              />

              <InputCustom
                contentLabel={"Name"}
                name="tenViTri"
                value={values.tenViTri}
                onChange={handleChange}
                onBlur={handleBlur}
                errors={errors.tenViTri}
                touched={touched.tenViTri}
              />

              <InputCustom
                contentLabel={"Province"}
                value={values.tinhThanh}
                name="tinhThanh"
                onChange={handleChange}
                onBlur={handleBlur}
                errors={errors.tinhThanh}
                touched={touched.tinhThanh}
              />

              <InputCustom
                contentLabel={"Nation"}
                value={values.quocGia}
                name="quocGia"
                onChange={handleChange}
                onBlur={handleBlur}
                errors={errors.quocGia}
                touched={touched.quocGia}
              />
            </form>
          </Modal>
          <button
            onClick={() => {
              showUploadImageModal(true);
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
    fetchLocations();
  }, []);

  return (
    <div>
      <div className="flex space-x-4 mb-5">
        <Button
          onClick={showCreateNewLocationModal}
          className="px-4 py-2 bg-gray-200 text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-300"
        >
          Add Location
        </Button>
        <Modal
          title={"Add Location"}
          open={isModalLocationOpen}
          okButtonProps={{ style: { display: "none" } }}
          onCancel={handleCancel}
        >
          <CreateNewLocation />
        </Modal>
        <div className="flex space-x-3">
          <input
            className="w-[280px] border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder="Search by Location's Name"
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
        dataSource={isSearching ? searchResults : location}
      />
    </div>
  );
};

export default ManageInfoLocation;
