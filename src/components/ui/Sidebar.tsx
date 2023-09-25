"use client";

import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { SidebarItems } from "@/constants/sidebarItems";
import { USER_ROLE } from "@/constants/role";

const { Sider } = Layout;

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      width={280}
      style={{
        overflow: "auto",
        height: "100vh",
        position: "sticky",
        left: 0,
        top: 0,
        bottom: 0,
      }}
    >
      <div>
        <h2
          style={{
            color: "#fff",
            textAlign: "center",
            marginTop: 10,
            marginBottom: 5,
          }}
        >
          PH University
        </h2>
      </div>
      <Menu
        theme="dark"
        defaultSelectedKeys={["1"]}
        mode="inline"
        items={SidebarItems(USER_ROLE.SUPER_ADMIN)}
      />
    </Sider>
  );
};

export default Sidebar;
