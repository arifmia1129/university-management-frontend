"use client";

import React from "react";
import { Layout } from "antd";
import UMBreadCrumb from "./UMBreadCrumb";

const { Content } = Layout;

const base = "admin";

const Contents = ({ children }: { children: React.ReactNode }) => {
  return (
    <Content>
      <UMBreadCrumb
        items={[
          {
            label: `${base}`,
            link: `/${base}`,
          },
          {
            label: `${base}`,
            link: `/${base}/student`,
          },
        ]}
      />
      {children}
    </Content>
  );
};

export default Contents;
