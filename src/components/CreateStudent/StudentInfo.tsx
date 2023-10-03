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

const StudentInfo = () => {
  return (
    <div
      style={{
        border: "1px solid #d9d9d9",
        borderRadius: "10px",
        padding: "15px",
        margin: "20px 0",
      }}
    >
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col style={{ margin: "15px 0" }} className="gutter-row" span={6}>
          <div>
            <FormInput
              name="name.firstName"
              type="text"
              size="large"
              label="First Name"
              placeholder="Write first name"
            />
          </div>
        </Col>
        <Col style={{ margin: "15px 0" }} className="gutter-row" span={6}>
          <div>
            <FormInput
              name="name.middleName"
              type="text"
              size="large"
              label="Middle Name"
              placeholder="Write middle name"
            />
          </div>
        </Col>
        <Col style={{ margin: "15px 0" }} className="gutter-row" span={6}>
          <div>
            <FormInput
              name="name.lastName"
              type="text"
              size="large"
              label="Last Name"
              placeholder="Write last name"
            />
          </div>
        </Col>
        <Col style={{ margin: "15px 0" }} className="gutter-row" span={6}>
          <div>
            <FormInput
              name="password"
              type="password"
              size="large"
              label="Password"
              placeholder="Write password"
            />
          </div>
        </Col>
        <Col style={{ margin: "15px 0" }} className="gutter-row" span={6}>
          <div>
            <FormSelectField
              name="academicSemester"
              size="large"
              label="Academic Semester"
              items={academicSemesterOptions}
            />
          </div>
        </Col>
        <Col style={{ margin: "15px 0" }} className="gutter-row" span={6}>
          <div>
            <FormSelectField
              name="academicDepartment"
              size="large"
              label="Academic Department"
              items={academicDepartmentOptions}
            />
          </div>
        </Col>
        <Col style={{ margin: "15px 0" }} className="gutter-row" span={6}>
          <div>
            <FormSelectField
              name="academicFaculty"
              size="large"
              label="Academic Faculty"
              items={academicFacultyOptions}
            />
          </div>
        </Col>
        <Col style={{ margin: "15px 0" }} className="gutter-row" span={6}>
          <div>
            <FormSelectField
              name="gender"
              size="large"
              label="Gender"
              items={genderOptions}
            />
          </div>
        </Col>
        <Col style={{ margin: "15px 0" }} className="gutter-row" span={6}>
          <div>
            <Uploader />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default StudentInfo;
