import React, { useState, useEffect } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  TeamOutlined,
  DashboardOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  Link,
} from "react-router-dom";
import axios from "axios";

import DashBoardIndex from "../dashboard";
import ClientIndex from "../client";
import NoPage from "../error_404";

const { Header, Sider, Content } = Layout;

const LayoutIndex = (data) => {
  const navigate = useNavigate(data);

  const [collapsed, setCollapsed] = useState(false);
  const [userData, setUserData] = useState({
    loading: false,
    user_list: [],
  });

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const changeMenu = (data) => {
    navigate(data.key);
    console.log("1---7", data);
  };
  useEffect(() => {
    setUserData({ ...userData, loading: true });
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        console.log(response.data);
        const newData = response.data.map((obj) => {
          console.log(obj);
          return {
            city: obj.address.city,
            lat: obj.address.geo.lat,
            lng: obj.address.geo.lng,
            street: obj.address.street,
            address: `${obj.address.suite}, ${obj.address.street},${obj.address.city}`,
            suite: obj.address.suite,
            zipcode: obj.address.zipcode,
            company_bs: obj.company.bs,
            company_catch_phrase: obj.company.catchPhrase,
            company_name: obj.company.name,
            email: obj.email,
            id: obj.id,
            name: obj.name,
            phone: obj.phone,
            username: obj.username,
            website: obj.website,
          };
        });
        setUserData({ ...userData, user_list: newData, loading: false });
      })
      .then((data) => {
        //do some stuff
      })
      .catch((err) => {
        //log error
      });
  }, []);
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          onClick={changeMenu}
          items={[
            {
              key: "dashboard",
              icon: <DashboardOutlined />,
              label: "Dashboard",
            },
            {
              key: "user_list",
              icon: <TeamOutlined />,
              label: "User List",
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
          <Routes>
            <Route
              path="/dashboard"
              element={
                <DashBoardIndex
                  user_list={userData.user_list}
                  loading={userData.loading}
                />
              }
            />
            <Route
              path="user_list"
              element={
                <ClientIndex
                  user_list={userData.user_list}
                  loading={userData.loading}
                />
              }
            />
            <Route path="*" element={<NoPage />} />
          </Routes>
          {/* <ClientIndex
            user_list={userData.user_list}
            loading={userData.loading}
          />
          <DashBoardIndex
            user_list={userData.user_list}
            loading={userData.loading}
          /> */}
        </Content>
      </Layout>
    </Layout>
  );
};
export default LayoutIndex;
