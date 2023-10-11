"use client";

import { Col, Row } from "antd";
import React from "react";
import FormInput from "../Forms/FormInput";
import FormSelectField from "../Forms/FormSelectField";
import { bloodGroupOptions } from "@/constants/global";
import FormDatePicker from "../Forms/FormDatePicker";
import FormTextArea from "../Forms/FormTextArea";

const StudentBasicInfo = () => {
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
        <Col style={{ margin: "15px 0" }} className="gutter-row" span={8}>
          <div>
            <FormInput
              name="student.email"
              type="text"
              size="large"
              label="Email"
              placeholder="Write email"
            />
          </div>
        </Col>
        <Col style={{ margin: "15px 0" }} className="gutter-row" span={8}>
          <div>
            <FormInput
              name="student.contactNo"
              type="text"
              size="large"
              label="Contact Number"
              placeholder="Write contact number"
            />
          </div>
        </Col>
        <Col style={{ margin: "15px 0" }} className="gutter-row" span={8}>
          <div>
            <FormInput
              name="student.emergencyContactNo"
              type="text"
              size="large"
              label="Emergency Contact"
              placeholder="Write emergency contact number"
            />
          </div>
        </Col>
        <Col style={{ margin: "15px 0" }} className="gutter-row" span={8}>
          <div>
            <FormSelectField
              name="student.bloodGroup"
              size="large"
              label="Blood Group"
              items={bloodGroupOptions}
            />
          </div>
        </Col>

        <Col style={{ margin: "15px 0" }} className="gutter-row" span={8}>
          <div>
            <FormDatePicker
              name="student.dateOfBirth"
              size="large"
              label="Date of Birth"
              placeholder="Write date of birth"
            />
          </div>
        </Col>
        <Col style={{ margin: "15px 0" }} className="gutter-row" span={12}>
          <div>
            <FormTextArea
              name="student.presentAddress"
              size="large"
              label="Present Address"
              placeholder="Write present address"
            />
          </div>
        </Col>
        <Col style={{ margin: "15px 0" }} className="gutter-row" span={12}>
          <div>
            <FormTextArea
              name="student.permanentAddress"
              size="large"
              label="Permanent Address"
              placeholder="Write permanent address"
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default StudentBasicInfo;
