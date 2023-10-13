"use client";

import { Collapse } from "antd";
import React from "react";

const { Panel } = Collapse;

export type Item = {
  key: string;
  label: string;
  children: React.ReactNode | React.ReactElement;
  isTaken?: boolean;
};

type IProps = {
  items: Item[];
  onChange: (event: string | string[]) => void;
};

export default function UMCollapse({ items, onChange }: IProps) {
  return (
    <>
      <Collapse defaultActiveKey={["1"]} onChange={onChange}>
        {items?.map((item) => (
          <Panel header={item.label} key={item.key}>
            {item.children}
          </Panel>
        ))}
      </Collapse>
      ;
    </>
  );
}
