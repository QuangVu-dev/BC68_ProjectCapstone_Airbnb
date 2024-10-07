import React, { useState } from "react";
import { Dropdown, Button, Menu } from "antd";
import { DownOutlined, SmileOutlined } from "@ant-design/icons";
import { DatePicker } from "antd";

const onChange = (date, dateString) => {
  console.log(date, dateString);
};

const options = [
  { value: "Under 2", label: "Under 2", count: 0 },
  { value: "Ages 2-12", label: "Ages 2-12", count: 0 },
  { value: "Ages 13 or above", label: "Ages 13 or above", count: 0 },
];

const items = [
  {
    key: "1",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.antgroup.com"
      >
        1st menu item
      </a>
    ),
  },
  {
    key: "2",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.aliyun.com"
      >
        2nd menu item (disabled)
      </a>
    ),
    icon: <SmileOutlined />,
    disabled: true,
  },
  {
    key: "3",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.luohanacademy.com"
      >
        3rd menu item (disabled)
      </a>
    ),
    disabled: true,
  },
  {
    key: "4",
    danger: true,
    label: "a danger item",
  },
];

const CheckForm = ({ price }) => {
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [counts, setCounts] = useState([0, 0, 0]); // [Under 2, Ages 2-12, Ages 13 or above]
  const [savedCounts, setSavedCounts] = useState([0, 0, 0]); // Lưu số lượng đã chọn để hiển thị
  const [visible, setVisible] = useState(false); // Kiểm soát hiển thị dropdown
  const increaseCount = (index) => {
    const newCounts = [...counts];

    if (index === 0 || index === 1) {
      // Nếu chọn Under 2 hoặc Ages 2-12
      if (newCounts[2] === 0) {
        // Chỉ cộng cho Ages 13 or above nếu chưa chọn trước đó
        newCounts[2] += 1;
      }
    }

    newCounts[index] += 1;
    setCounts(newCounts);
  };
  const decreaseCount = (index) => {
    const newCounts = [...counts];

    // Kiểm tra nếu người dùng đang cố gắng giảm giá trị của Ages 13 or above
    if (index === 2) {
      // Chỉ giảm nếu giá trị lớn hơn 0
      if (newCounts[index] > 0) {
        newCounts[index] -= 1;
      }
    } else {
      // Giảm giá trị cho Under 2 hoặc Ages 2-12
      if (newCounts[index] > 0) {
        newCounts[index] -= 1;
        // Nếu giảm Under 2 hoặc Ages 2-12, có thể cần phải điều chỉnh Ages 13
        if (newCounts[2] === 0) {
          newCounts[2] = 0; // Giữ giá trị của Ages 13 ở mức 0 nếu không có trẻ em
        }
      }
    }

    setCounts(newCounts);
  };
  const clearAllCounts = () => {
    setCounts([0, 0, 0]); // Reset counts
    setSavedCounts([0, 0, 0]); // Reset savedCounts
    setVisible(false); // Đóng dropdown
  };
  const saveCounts = () => {
    setSavedCounts(counts); // Lưu counts vào savedCounts
    setVisible(false); // Đóng dropdown
  };
  const handleDropdownVisibleChange = (flag) => {
    setVisible(flag);
  };
  const isAges13Disabled = () => {
    return counts[2] === 1 && (counts[0] === 1 || counts[1] === 1);
  };
  const ageLabels = {
    "Under 2": "Infant",
    "Ages 2-12": "Children",
    "Ages 13 or above": "Adult",
  };
  const menu = (
    <Menu>
      {["Under 2", "Ages 2-12", "Ages 13 or above"].map((ageGroup, index) => (
        <Menu.Item
          key={index}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              borderBottom: "1px solid #ebebeb",
              padding: "20px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginRight: "auto",
              }}
            >
              <span style={{ fontSize: "16px" }}>{ageLabels[ageGroup]}</span>
              <span style={{ color: "#9ca3af" }}>{ageGroup}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Button
                onClick={() => decreaseCount(index)}
                style={{ margin: "0 5px" }}
                disabled={
                  counts[index] === 0 ||
                  (index === 2 && isAges13Disabled() && counts[2] === 1)
                }
              >
                -
              </Button>
              <span>{counts[index]}</span>
              <Button
                onClick={() => increaseCount(index)}
                style={{ margin: "0 5px" }}
              >
                +
              </Button>
            </div>
          </span>
        </Menu.Item>
      ))}
      <Menu.Item style={{ display: "flex", justifyContent: "space-between" }}>
        <span style={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            onClick={clearAllCounts}
            disabled={counts.every((count) => count === 0)}
          >
            Clear All
          </Button>
          <Button
            onClick={saveCounts}
            style={{
              background: "#ff385c",
              color: "white",
            }}
            className="hover:outline-none"
          >
            Save
          </Button>
        </span>
      </Menu.Item>
    </Menu>
  );
  const getDisplayText = () => {
    const totalUnderTwo = savedCounts[0];
    const totalBetweenTwoAndTwelve = savedCounts[1];
    const totalAboveThirteen = savedCounts[2];
    const guestText =
      totalBetweenTwoAndTwelve + totalAboveThirteen === 1 ? "guest" : "guests";
    if (totalUnderTwo > 0) {
      const infantText = totalUnderTwo === 1 ? "infant" : "infants";
      return `${totalUnderTwo} ${infantText}, ${
        totalBetweenTwoAndTwelve + totalAboveThirteen
      } ${guestText}`;
    } else {
      return `${totalBetweenTwoAndTwelve + totalAboveThirteen} ${guestText}`;
    }
  };
  const calculateNights = () => {
    if (!checkInDate || !checkOutDate) return 0;
    const inDate = new Date(checkInDate);
    const outDate = new Date(checkOutDate);
    return (outDate - inDate) / (1000 * 60 * 60 * 24); // Convert milliseconds to days
  };

  const nights = calculateNights();
  const totalPrice = price * nights;

  return (
    <div className="check_form">
      <span className="font-thin text-2xl">
        {" "}
        {checkInDate && checkOutDate && savedCounts.some((count) => count > 0)
          ? `$${price}`
          : "Add dates for prices"}
        {checkInDate &&
          checkOutDate &&
          savedCounts.some((count) => count > 0) &&
          nights === 1 && <span style={{ fontWeight: 400 }}> night</span>}
        {checkInDate &&
          checkOutDate &&
          savedCounts.some((count) => count > 0) && (
            <span
              style={{ fontWeight: 400, fontSize: "16px", color: "#717171" }}
            >
              {" "}
              night
            </span>
          )}
      </span>
      <form className="mt-4">
        <div className="choose_date grid mt-2">
          <div className="checkin_date">
            <label className="text-xs" style={{ height: "18px" }}>
              CKECK IN
            </label>
            <DatePicker
              onChange={(date) =>
                setCheckInDate(date ? date.format("YYYY-MM-DD") : null)
              }
              needConfirm
              placeholder="Add day"
            />
          </div>
          <span className="divided_date"></span>
          <div className="checkout_date">
            <label className="text-xs" style={{ height: "18px" }}>
              CHECK OUT
            </label>
            <DatePicker
              placeholder="Add day"
              onChange={(date) =>
                setCheckOutDate(date ? date.format("YYYY-MM-DD") : null)
              }
              needConfirm
            />
          </div>
        </div>
        <div className="add_guest">
          <div className="add_guest_form">
            <label>GUEST</label>
            <Dropdown
              overlay={menu}
              trigger={["click"]}
              onVisibleChange={handleDropdownVisibleChange}
              visible={visible}
            >
              <Button
                style={{
                  color: savedCounts.some((count) => count > 0)
                    ? "black"
                    : "#9ca3af",
                  borderColor: "transparent",
                }}
              >
                {savedCounts.reduce((acc, count) => acc + count, 0) > 0
                  ? getDisplayText()
                  : "Add guest"}
              </Button>
            </Dropdown>
          </div>
        </div>
        <button className="btn-search">
          <span className="btn-search-wrapper">
            <span className="btn-hover"></span>
          </span>
          <span className="btn-title">
            {checkInDate &&
            checkOutDate &&
            savedCounts.some((count) => count > 0)
              ? "Reserve"
              : "Check Availability"}
          </span>
        </button>
      </form>
      {checkInDate &&
        checkOutDate &&
        savedCounts.some((count) => count > 0) && (
          <div className="price-details mt-4">
            <p className="text-center text-xs">You won't be charged yet.</p>
            <div className="flex justify-between items-center mt-4">
              <p>
                {nights} x night{nights !== 1 ? "s" : ""}:
              </p>
              <p>${totalPrice.toFixed(2)}</p>
            </div>
            <div
              className="flex justify-between items-center font-bold mt-4"
              style={{
                color: "#222222",
                borderTop: "1px solid #dddddd",
                paddingTop: "20px",
              }}
            >
              <p className="m-0">Total: </p>
              <p className="m-0">${totalPrice.toFixed(2)}</p>
            </div>
          </div>
        )}
    </div>
  );
};

export default CheckForm;
