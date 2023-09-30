"use client";
import React, { useEffect, useState } from "react";
import { Layout, Menu } from "antd";
import { SidebarItems } from "@/constants/sidebarItems";
import { getUserInfo } from "@/services/auth.service";
import { USER_ROLE } from "@/constants/role";
import type { MenuProps } from "antd";

const { Sider } = Layout;

const Sidebar = () => {
  const [menuItems, setMenuItems] = useState<MenuProps["items"]>([]);
  const [collapsed, setCollapsed] = useState(false);

  const { role } = getUserInfo() as { role: string };

  const items = SidebarItems(role);

  useEffect(() => {
    if (role && items.length && !menuItems?.length) {
      setMenuItems(items);
    }
  }, [menuItems, items, role]);

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
      {Array.isArray(menuItems) && menuItems.length && (
        <Menu
          style={{ padding: 10 }}
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={menuItems}
        />
      )}
    </Sider>
  );
};

export default Sidebar;
