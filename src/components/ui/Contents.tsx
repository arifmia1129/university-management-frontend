"use client";

import React from "react";
import { Layout } from "antd";

const { Content } = Layout;

const Contents = ({ children }: { children: React.ReactNode }) => {
  return <Content>{children}</Content>;
};

export default Contents;
