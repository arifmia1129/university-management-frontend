import React, { useState, useEffect } from "react";
import { Dropdown, Layout, Button, Row, Space, Avatar } from "antd";
import type { MenuProps } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { removeFromLocalStorage } from "@/utils/local-store";
import { LOCAL_STORAGE_KEYS } from "@/constants/localStorageKeys";
import { useRouter } from "next/navigation";
import { getUserInfo } from "@/services/auth.service";

const { Header: AntHeader } = Layout;

const Header = () => {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<any>(null);

  useEffect(() => {
    // Fetch user info on the client side
    const userData: any = getUserInfo();
    setUserInfo(userData);
  }, []);

  const handleSignout = () => {
    removeFromLocalStorage(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
    router.push("/login");
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Button onClick={handleSignout} type="text" danger>
          Signout
        </Button>
      ),
    },
  ];

  return (
    <AntHeader style={{ background: "#fff" }}>
      {userInfo && (
        <>
          <Row justify="end" align="middle" style={{ height: "100%" }}>
            <p style={{ marginRight: 5 }}>{userInfo?.role}</p>
            <Dropdown menu={{ items }} placement="bottomLeft" arrow>
              <Space wrap size={16}>
                <Avatar size={52} icon={<UserOutlined />} />
              </Space>
            </Dropdown>
          </Row>
        </>
      )}
    </AntHeader>
  );
};

export default Header;
