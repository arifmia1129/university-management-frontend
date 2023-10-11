"use client";

import { Col, Row } from "antd";
import React from "react";
import FormInput from "../Forms/FormInput";
import FormSelectField from "../Forms/FormSelectField";
import {
  academicDepartmentOptions,
  academicFacultyOptions,
  academicSemesterOptions,
  genderOptions,
} from "@/constants/global";
import Uploader from "../ui/Uploader";

const GuardianInfo = () => {
  return (
    <>
      <div
        style={{
          border: "1px solid #d9d9d9",
          borderRadius: "10px",
          padding: "15px",
          margin: "20px 0",
        }}
      >
        <p style={{ fontSize: "20px", fontWeight: "bold" }}>
          Father Information
        </p>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col style={{ margin: "15px 0" }} className="gutter-row" span={8}>
            <div>
              <FormInput
                name="student.guardian.father.name"
                type="text"
                size="large"
                label="Name"
                placeholder="Write father name"
              />
            </div>
          </Col>
          <Col style={{ margin: "15px 0" }} className="gutter-row" span={8}>
            <div>
              <FormInput
                name="student.guardian.father.occupation"
                type="text"
                size="large"
                label="Occupation"
                placeholder="Write father occupation"
              />
            </div>
          </Col>
          <Col style={{ margin: "15px 0" }} className="gutter-row" span={8}>
            <div>
              <FormInput
                name="student.guardian.father.contactNo"
                type="text"
                size="large"
                label="Contact Number"
                placeholder="Write father contact number"
              />
            </div>
          </Col>
        </Row>
      </div>
      <div
        style={{
          border: "1px solid #d9d9d9",
          borderRadius: "10px",
          padding: "15px",
          margin: "20px 0",
        }}
      >
        <p style={{ fontSize: "20px", fontWeight: "bold" }}>
          Mother Information
        </p>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col style={{ margin: "15px 0" }} className="gutter-row" span={8}>
            <div>
              <FormInput
                name="student.guardian.mother.name"
                type="text"
                size="large"
                label="Name"
                placeholder="Write mother name"
              />
            </div>
          </Col>
          <Col style={{ margin: "15px 0" }} className="gutter-row" span={8}>
            <div>
              <FormInput
                name="student.guardian.mother.occupation"
                type="text"
                size="large"
                label="Occupation"
                placeholder="Write mother occupation"
              />
            </div>
          </Col>
          <Col style={{ margin: "15px 0" }} className="gutter-row" span={8}>
            <div>
              <FormInput
                name="student.guardian.mother.contactNo"
                type="text"
                size="large"
                label="Contact Number"
                placeholder="Write mother contact number"
              />
            </div>
          </Col>
        </Row>
      </div>
      <div
        style={{
          border: "1px solid #d9d9d9",
          borderRadius: "10px",
          padding: "15px",
          margin: "20px 0",
        }}
      >
        <p style={{ fontSize: "20px", fontWeight: "bold" }}>Address</p>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col style={{ margin: "15px 0" }} className="gutter-row" span={12}>
            <div>
              <FormInput
                name="student.guardian.address"
                type="text"
                size="large"
                label="Guardiant Address"
                placeholder="Write guardiant address"
              />
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default GuardianInfo;
