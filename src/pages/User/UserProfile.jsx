import React, { useContext, useEffect, useState } from "react";
import Container from "../../components/Container/Container";
import EditProfile from "./EditProfile";
import { phongThueService } from "../../services/phongThue.service";
import { datPhongService } from "../../services/datPhong.service";
import { userService } from "../../services/user.service";
import { NotificationContext } from "../../App";
import { getLocalStorage, setLocalStorage } from "../../utils/utils";

const UserProfile = () => {
  const user = getLocalStorage("user");
  const { handleNotification } = useContext(NotificationContext);
  const [listBookedRooms, setListBookedRooms] = useState([]);
  const [avatar, setAvatar] = useState(user?.user.avatar);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      alert("Please select a file before sending.");
      return;
    }

    const formData = new FormData();
    formData.append("formFile", selectedFile);
    userService
      .uploadAvatar(formData, user?.token)
      .then((res) => {
        console.log(res);
        handleNotification("Upload avatar successfully", "success");
        setSelectedFile(null);
        setLocalStorage("user", {
          ...user,
          user: { ...user.user, avatar: res.data.content.avatar },
        });
      })
      .catch((err) => {
        console.log(err);
        handleNotification(err.message, "error");
      });
  };

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const res = await datPhongService.getBookedRoomsByUser(user?.user.id);
        const roomIds = res.data.content.map((item) => item.maPhong);

        const roomPromises = roomIds.map((id) =>
          phongThueService.getRoomsById(id)
        );
        const roomResponses = await Promise.all(roomPromises);

        const rooms = roomResponses.map((response) => response.data.content);
        setListBookedRooms(rooms);
      } catch (err) {
        console.log("Đã xảy ra lỗi:", err);
      }
    };

    fetchRooms();
  }, [user?.user.id]);

  return (
    <Container>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-10 pt-10">
        <div className="card">
          <div className="border rounded-lg sm:rounded-3xl shadow-xl p-5 sm:p-8 flex flex-col justify-center items-center">
            <div className="relative">
              <img
                className="w-32 h-32 rounded-full"
                src={avatar}
                alt="avatar"
              />
              <label
                htmlFor="avatarUpload"
                className="absolute bottom-0 right-0 cursor-pointer px-3 py-2 rounded-full shadow-md bg-gray-200 hover:bg-gray-300 duration-300"
              >
                <i className="fa-solid fa-circle-camera"></i>
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                id="avatarUpload"
                className="hidden"
              />
            </div>
            {selectedFile && (
              <button
                onClick={handleSubmit}
                className="py-2 px-5 mt-5 bg-rose-600 text-white rounded-md hover:opacity-70 duration-300"
              >
                Save
              </button>
            )}
            <h2 className="dark:text-white text-2xl sm:text-3xl font-semibold my-5">
              {user?.user.name}
            </h2>

            <EditProfile user={user} />
          </div>

          <div className="border rounded-3xl p-5 sm:p-8 mt-10">
            <div className="border-b mb-5">
              <h3 className="dark:text-white text-xl font-semibold">
                {user?.user.name}'s confirmed information
              </h3>
              <p className="my-5 dark:text-white">
                <i className="fa-duotone fa-solid fa-check"></i>
                <span> Email address</span>
              </p>
            </div>
            <div>
              <h3 className="dark:text-white text-xl font-semibold">
                Verify your identity
              </h3>
              <p className="my-5 dark:text-white">
                Before you book or host on Airbnb, you’ll need to complete this
                step.
              </p>
              <button className="dark:text-white px-5 py-3 font-semibold border border-black dark:border-white rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 duration-300">
                Get Verified
              </button>
            </div>
          </div>
        </div>

        <div className="rooms lg:col-span-2">
          <h3 className="dark:text-white text-2xl sm:text-3xl font-semibold mb-10">
            Booked rooms
          </h3>
          {listBookedRooms.map((category) => (
            <div
              //   to={pathDefault.homePage}
              key={category.id}
              className="cursor-pointer relative overflow-hidden group mb-5"
            >
              <div className="rounded-lg overflow-hidden mb-5">
                <img
                  className="rounded-lg h-60 min-[524px]:h-80 md:h-96 w-full object-cover group-hover:scale-105 duration-300"
                  src={category.hinhAnh}
                  alt={category.tenPhong}
                />
              </div>
              <h3 className="dark:text-white text-xl sm:text-2xl font-semibold hover:underline duration-300">
                {category.tenPhong}
              </h3>
              <p className="dark:text-white">
                <span className="font-semibold">${category.giaTien}</span> night
              </p>
              <button
                type="button"
                className="heart h-10 w-10 rounded-full text-center text-gray-500 focus:text-red-500 bg-white hover:bg-gray-100 absolute top-2 right-2 opacity-0 duration-300 group-hover:opacity-100"
              >
                <i className="fa-regular fa-heart"></i>
              </button>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default UserProfile;