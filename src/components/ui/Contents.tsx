"use client";

import React from "react";
import { Layout } from "antd";
import Header from "./Header";

const { Content } = Layout;

const Contents = ({ children }: { children: React.ReactNode }) => {
  return (
    <Content>
      <Header />
      <div style={{ padding: 10 }}>{children}</div>
    </Content>
  );
};

export default Contents;
