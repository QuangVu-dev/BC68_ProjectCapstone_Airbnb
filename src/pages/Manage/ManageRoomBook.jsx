import { useContext, useEffect, useState } from "react";
import { Modal, Space, Table } from "antd";
import InputCustom from "../../components/FormInput/FormInput";
import { datPhongService } from "../../services/datPhong.service";
import { NotificationContext } from "../../App";

import { useFormik } from "formik";
import CreateNewRoomBook from "./CreateNewRoomBook";

const ManageRoomBook = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  //search
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  const getValueRoomBookApi = async () => {
    try {
      const response = await datPhongService.getBookedRooms();
      console.log(response);
      return response.data.content;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };
  const [room, setRoom] = useState([]);
  //call api room
  const fetchRoomBook = async () => {
    try {
      const roomData = await getValueRoomBookApi();
      setRoom(roomData);
    } catch (error) {
      handleNotification("Không thể lấy dữ liệu room", error);
    }
  };

  const [isModalBookedRoomOpen, setIsModalBookedRoomOpen] = useState(false);
  const { handleNotification } = useContext(NotificationContext);

  // const { listBookRoom } = useSelector((state) => state.bookRoomSlice);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const handleSearchSubmit = () => {
    const results = room.filter((room) =>
      room.id.toString().includes(searchTerm)
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
    initialValues,
    setFieldValue,
    setValues,
    errors,
    touched,
  } = useFormik({
    initialValues: {
      id: "",
      maPhong: "",
      ngayDen: "",
      ngayDi: "",
      soLuongKhach: "",
      maNguoiDung: "",
    },
    onSubmit: (values) => {
      console.log(values);
      setIsModalOpen(false);
      datPhongService
        .updateBookedRoom(values.id, values)
        .then((res) => {
          console.log(res);

          handleNotification("Update thành công", "success");
          fetchRoomBook();
        })
        .catch((err) => {
          console.log(err);
          handleNotification("Update thất bại", "error");
        });
    },
  });

  const isFormChanged = () => {
    return values == initialValues;
  };

  const checkChanged = () => {
    if (isFormChanged() == true) {
      handleCancel();
      console.log("exit");
    } else {
      handleSubmit();
      console.log("commit");
    }
  };

  const showModal = (roomId) => {
    setIsModalOpen(true);
    datPhongService
      .getBookedRoomsById(roomId)
      .then((res) => {
        console.log(res);
        setValues(res.data.content);
        const comingDay = new Date(res.data.content.ngayDen)
          .toISOString()
          .split("T")[0];
        setFieldValue("ngayDen", comingDay);
        const movingDay = new Date(res.data.content.ngayDi)
          .toISOString()
          .split("T")[0];
        setFieldValue("ngayDi", movingDay);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setIsModalBookedRoomOpen(false);
    fetchRoomBook();
  };

  const showAddBookedRoomModal = () => {
    setIsModalBookedRoomOpen(true);
  };
  const columns = [
    {
      title: "ID ",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "User ID",
      dataIndex: "maNguoiDung",
      key: "maNguoiDung",
    },
    {
      title: "Room ID",
      dataIndex: "maPhong",
      key: "maPhong",
    },
    {
      title: "Arrival",
      dataIndex: "ngayDen",
      key: "ngayDen",
    },
    {
      title: "Departure",
      dataIndex: "ngayDi",
      key: "ngayDi",
    },
    {
      title: "Guest",
      dataIndex: "soLuongKhach",
      key: "soLuongKhach",
    },

    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <button
            onClick={() => {
              datPhongService
                .deleteBookedRoom(record.id)
                .then((res) => {
                  console.log(res);
                  handleNotification(res.data.message, "success");
                  fetchRoomBook();
                })
                .catch((err) => {
                  console.log(err);
                  handleNotification(
                    err.response.data.message || err.response.data.content,
                    "error"
                  );
                  fetchRoomBook();
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
            title="Booked Room Information"
            open={isModalOpen}
            onOk={checkChanged}
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
                contentLabel={"RoomID"}
                name="maPhong"
                value={values.maPhong}
                onChange={handleChange}
                onBlur={handleBlur}
                errors={errors.maPhong}
                touched={touched.maPhong}
              />

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Arrival
                </label>
                <input
                  type="date"
                  name="ngayDen"
                  value={values.ngayDen}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Depature
                </label>
                <input
                  type="date"
                  name="ngayDi"
                  value={values.ngayDi}
                  onChange={handleChange}
                />
              </div>

              <InputCustom
                contentLabel={"Guest"}
                value={values.soLuongKhach}
                name="soLuongKhach"
                onChange={handleChange}
                onBlur={handleBlur}
                errors={errors.soLuongKhach}
                touched={touched.soLuongKhach}
              />
              <InputCustom
                contentLabel={"UserID"}
                value={values.maNguoiDung}
                name="maNguoiDung"
                onChange={handleChange}
                onBlur={handleBlur}
                errors={errors.maNguoiDung}
                touched={touched.maNguoiDung}
              />
            </form>
          </Modal>
        </Space>
      ),
    },
  ];
  console.log(values);

  useEffect(() => {
    fetchRoomBook();
  }, []);
  return (
    <div className="space-y-3">
      <div className="flex space-x-5">
        <button
          onClick={() => {
            showAddBookedRoomModal(true);
          }}
          className="px-4 py-2 bg-gray-200 text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-300"
        >
          Book Room
        </button>
        <Modal
          title="Create New Room"
          open={isModalBookedRoomOpen}
          onCancel={handleCancel}
          okButtonProps={{ style: { display: "none" } }}
          width={800}
        >
          <CreateNewRoomBook />
        </Modal>
        <div className="flex space-x-3">
          <input
            className="w-[280px] border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            placeholder="Search by RoomID"
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
        dataSource={isSearching ? searchResults : room}
      />
    </div>
  );
};

export default ManageRoomBook;
