import { useContext, useEffect, useRef, useState } from "react";
import { Button, Modal, Space, Table, Tag } from "antd";

import { NotificationContext } from "../../App";

import * as Yup from "yup";
import { useFormik } from "formik";
import { userService } from "../../services/user.service";
import { notiValidation } from "../../common/notiValidation";
import InputCustom from "../../components/FormInput/FormInput";
import CreateAdminstrator from "./CreateAdminstrator";
import { useSelector } from "react-redux";
const ManageUser = () => {
  const { handleNotification } = useContext(NotificationContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalUploadOpen, setIsModalUploadOpen] = useState(false);
  const [isModalAdminOpen, setIsModalAdminOpen] = useState(false);
  //search
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const getValueUserApi = async () => {
    try {
      const response = await userService.getUsers();
      console.log(response);
      return response.data.content;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };
  const [users, setUsers] = useState([]);

  const { user } = useSelector((state) => state.authSlice);
  const [uploadImage, setUploadImage] = useState(null);
  const [errorImage, setErrorImage] = useState("");
  const inputFileRef = useRef(null);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const handleSearchSubmit = () => {
    const results = users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
    setIsSearching(true);
  };

  const handleResetSearch = () => {
    setSearchTerm("");
    setSearchResults([]);
    setIsSearching(false);
  };
  const {
    handleBlur,
    handleChange,

    handleSubmit,
    values,
    setFieldValue,
    setValues,
    errors,
    touched,
  } = useFormik({
    initialValues: {
      id: "",
      name: "",
      email: "",
      phone: "",
      birthday: "",
      gender: "",
      role: "",
    },
    onSubmit: (values) => {
      console.log(values);
      setIsModalOpen(false);
      userService
        .updateUser(values.id, values)
        .then((res) => {
          console.log(res);
          handleNotification("Update thành công", "success");

          fetchUsers();
        })
        .catch((err) => {
          console.log(err);
          handleNotification("Update thất bại", "error");
        });
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required(notiValidation.empty)
        .matches(/^[^\d0-9]*$/, "Vui lòng nhập tên không chứa số"),
      email: Yup.string()
        .required(notiValidation.empty)
        .email(notiValidation.email),
      phone: Yup.string()
        .required(notiValidation.empty)
        .matches(/^(0|\+84)[3|5|7|8|9][0-9]{8}$/, notiValidation.phone),
      birthday: Yup.string().required(notiValidation.empty),
      gender: Yup.string().required(notiValidation.empty),
    }),
  });

  const showModal = (userId) => {
    setIsModalOpen(true);
    userService
      .getUserById(userId)
      .then((res) => {
        console.log(res);
        setValues(res.data.content);
        const birthdayConvert = new Date(res.data.content.birthday)
          .toISOString()
          .split("T")[0];
        setFieldValue("birthday", birthdayConvert);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmitAvatar = (e) => {
    e.preventDefault();
    let formData = new FormData();
    if (uploadImage) {
      formData.append("formFile", uploadImage.img);
      userService
        .uploadAvatar(
          formData,
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjQzNTU5IiwiZW1haWwiOiJ0b255MDAxQGdtYWlsLmNvbSIsInJvbGUiOiJBRE1JTiIsIm5iZiI6MTcyODgzMjQzNywiZXhwIjoxNzI5NDM3MjM3fQ.vwSFYZuY74KqjfcJY9qFgFlvbFWsRFyLe3l6D58wBDY"
          // user.token
        )
        .then((res) => {
          console.log(res);
          handleNotification("Upload avatar successfully", "success");
          fetchUsers();
        })
        .catch((err) => {
          console.log(err);
          handleNotification(err.message, "error");
          fetchUsers();
        });
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setIsModalUploadOpen(false);
    setIsModalAdminOpen(false);
    fetchUsers();
  };
  const showModalUpload = () => {
    setIsModalUploadOpen(true);
  };

  const showAddAdmin = () => {
    setIsModalAdminOpen(true);
  };
  //call api user
  const fetchUsers = async () => {
    try {
      const userData = await getValueUserApi();
      setUsers(userData);
    } catch (err) {
      console.log(err);
      handleNotification("Can't get location", "error");
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Avatar",
      dataIndex: "avatar",
      key: "avatar",
      render: (text) => <img className="h-20 w-24" src={text} alt="avatar" />,
    },
    {
      title: "Email",
      key: "email",
      dataIndex: "email",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      render: (text) => (
        <Tag color={text ? "blue" : "cyan"}>{text ? "Male" : "Female"}</Tag>
      ),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (text) => (
        <Tag color={text == "ADMIN" ? "geekblue-inverse" : "lime-inverse"}>
          {text}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <button
            onClick={() => {
              userService
                .deleteUser(record.id)
                .then((res) => {
                  console.log(res);
                  handleNotification(res.data.message, "success");
                  fetchUsers();
                })
                .catch((err) => {
                  console.log(err);
                  handleNotification(
                    err.response.data.message || err.response.data.content,
                    "error"
                  );
                  fetchUsers();
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
            title="User Information"
            open={isModalOpen}
            onOk={handleSubmit}
            onCancel={handleCancel}
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
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                errors={errors.name}
                touched={touched.name}
              />

              <InputCustom
                contentLabel={"Email"}
                value={values.email}
                name="email"
                onChange={handleChange}
                onBlur={handleBlur}
                errors={errors.email}
                touched={touched.email}
              />

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Date of birth
                </label>
                <input
                  type="date"
                  name="birthday"
                  value={values.birthday}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Gender
                </label>
                <select
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
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

              <InputCustom
                contentLabel={"Phone number"}
                value={values.phone}
                name="phone"
                onChange={handleChange}
                onBlur={handleBlur}
                errors={errors.phone}
                touched={touched.phone}
              />

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Role
                </label>
                <select
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  name="role"
                  value={values.role}
                  onChange={handleChange}
                >
                  <option value="ADMIN">ADMIN</option>
                  <option value="USER">USER</option>
                </select>
                {errors.role && touched.role && (
                  <p className="text-red-500 mt-2">{errors.role}</p>
                )}
              </div>
            </form>
          </Modal>

          <button
            onClick={() => {
              showModalUpload(record.id);
            }}
            className="bg-green-500 text-white py-2 px-5 rounded-md hover:bg-yellow-500/80 duration-300"
          >
            Upload Avartar
          </button>
          <Modal
            open={isModalUploadOpen}
            // onOk={handleSubmitAvatar}
            onCancel={handleCancel}
            okButtonProps={{ style: { display: "none" } }}
          >
            <form onSubmit={handleSubmitAvatar} className="space-y-2">
              <h2 className="text-2xl">Upload new avatar</h2>
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
                        setErrorImage("Vui lòng upload hình ảnh dưới 1MB");
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
                <img className="w-32" src={uploadImage?.imgURL} alt="avatar" />
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
          </Modal>
        </Space>
      ),
    },
  ];
  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <>
      <div>
        <div className="flex space-x-4 mb-5">
          <Button
            onClick={showAddAdmin}
            className="px-4 py-2 bg-gray-200 text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-300"
          >
            Add Admin
          </Button>
          <Modal
            title="Adding Adminstrator"
            open={isModalAdminOpen}
            okButtonProps={{ style: { display: "none" } }}
            onCancel={handleCancel}
          >
            <CreateAdminstrator />
          </Modal>
          <div className="flex space-x-3">
            <input
              className="w-[280px] border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              placeholder="Search by Name or Email"
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
          dataSource={isSearching ? searchResults : users}
        />
      </div>
    </>
  );
};

export default ManageUser;
