
import React, { useEffect, useState } from "react";
import { getLocalStorage } from "../../utils/utils";
import "./adminTemplate.scss";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  BarChartOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { Link, Outlet, useNavigate } from "react-router-dom";
const { Header, Sider, Content } = Layout;
const AdminTemplate = () => {
  // const navigate = useNavigate();
  // const handleBackToHomePage = () => {
  //   navigate("/");
  // };
  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  // useEffect(() => {
  //   let dataLocal = getLocalStorage("user");
  //   dataLocal.user.role !== "ADMIN"
  //     ? (window.location.href = "https://google.com")
  //     : null;
  // }, []);
  return (
    <Layout className="min-h-screen">
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        className="min-w-52"
      >
        <div className="demo-logo-vertical" />
        <Menu
          width={400}
          theme="dark"
          mode="vertical"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <UserOutlined />,
              label: <Link to={"/admin/manage-user"}>Quản lý người dùng</Link>,
            },
            {
              key: "2",
              icon: <VideoCameraOutlined />,
              label: (
                <Link to={"/admin/manage-info-location"}>
                  Quản lý thông tin vị trí
                </Link>
              ),
            },
            {
              key: "3",
              icon: <UploadOutlined />,
              label: (
                <Link to={"/admin/manage-info-room"}>
                  Quản lý thông tin phòng
                </Link>
              ),
            },
            {
              key: "4",
              icon: <BarChartOutlined />,
              label: (
                <Link to={"/admin/manage-room-book"}>Quản lý đặt phòng</Link>
              ),
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminTemplate;
