import React, { useEffect, useState } from "react";
import InputSearch from "../Input/InputSearch";
import { Dropdown, Select, Button, Menu } from "antd";
import { DownOutlined, SmileOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { pathDefault } from "../../common/path";
import { locationService } from "../../services/location.service";
import useDebounce from "../../hooks/useDebounce";
import LinkCustom from "../LinkCustom/LinkCustom";
import IconSearch from "../../assets/iconSearchProduct/IconSearch";
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

const FormSearchProduct = () => {
  const navigate = useNavigate();
  const [valueSearch, setValueSearch] = useState("");
  const [checkDropdown, setCheckDropdown] = useState(false);
  const [listLocationSuggest, setListLocationSuggest] = useState([
    {
      key: 1,
      label: "Hello",
    },
  ]);

  const debounceValue = useDebounce(valueSearch, 1000);
  const handleSubmit = (event) => {
    event.preventDefault();
    navigate(`${pathDefault.listProduct}?tenViTri=${valueSearch}`);
  };

  useEffect(() => {
    if (valueSearch) {
      locationService
        .getAllDestinations(valueSearch)
        .then((res) => {
          const newListLocationSuggest = res.data.content
            .slice(0, 4)
            .map((item, index) => {
              console.log(item);
              return {
                key: index.toString(),
                label: (
                  <LinkCustom to={`/vi-tri/${item.id}`} icon={<IconSearch />}>
                    <div className="text-red-500">
                      <p>{item.tinhThanh}</p>
                      <p>{item.quocGia}</p>
                    </div>
                  </LinkCustom>
                ),
              };
            });
          console.log(newListLocationSuggest);
          setListLocationSuggest(newListLocationSuggest);
          setCheckDropdown(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [debounceValue]);

  const handleChange = (event) => {
    setValueSearch(event.target.value);
    if (!event.target.value) {
      setCheckDropdown(false);
    }
  };

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
        <Button
          onClick={clearAllCounts}
          disabled={counts.every((count) => count === 0)}
          style={{ marginRight: "auto" }}
        >
          Clear All
        </Button>
        <Button onClick={saveCounts} style={{ marginLeft: "50%" }}>
          Save
        </Button>
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

  return (
    <div className="banner_form">
      <h1>Find home on Airbnb</h1>
      <p>Explore the perfect entire homes and rooms for every trip</p>
      <form onSubmit={handleSubmit} className="mt-4">
        <Dropdown
          menu={{
            items: listLocationSuggest,
          }}
          open={checkDropdown}
        >
          <div className="search_location_detail">
            <InputSearch
              classWrapper="location_content"
              classTitle={"location_content_top"}
              contentLabel={"Where"}
              placeHolder={"Search destinations"}
              classInput="input_search_location outline-none"
              onChange={handleChange}
              value={valueSearch}
            />
          </div>
        </Dropdown>
        <div className="choose_date grid mt-2">
          <div className="checkin_date">
            <label className="text-xs" style={{ height: "18px" }}>
              Check in
            </label>
            <DatePicker
              onChange={onChange}
              needConfirm
              placeholder="Add dates"
            />
          </div>
          <span className="divided_date"></span>
          <div className="checkout_date">
            <label className="text-xs" style={{ height: "18px" }}>
              Check out
            </label>
            <DatePicker
              placeholder="Add dates"
              onChange={onChange}
              needConfirm
            />
          </div>
        </div>
        <div className="add_guest">
          <div className="add_guest_form mt-2">
            <label>Who</label>
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
                }}
              >
                {savedCounts.reduce((acc, count) => acc + count, 0) > 0
                  ? getDisplayText()
                  : "Add guests"}
              </Button>
            </Dropdown>
          </div>
        </div>
        <button className="btn-search">
          <span className="btn-search-wrapper">
            <span className="btn-hover"></span>
          </span>
          <span className="btn-title">Search</span>
        </button>
      </form>
    </div>
  );
};

export default FormSearchProduct;
