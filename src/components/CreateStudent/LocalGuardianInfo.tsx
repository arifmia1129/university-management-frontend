"use client";

import { Col, Row } from "antd";
import FormInput from "../Forms/FormInput";

const LocalGuardianInfo = () => {
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
              name="guardiant.localGuardian.name"
              type="text"
              size="large"
              label="Name"
              placeholder="Write local guardian name"
            />
          </div>
        </Col>
        <Col style={{ margin: "15px 0" }} className="gutter-row" span={6}>
          <div>
            <FormInput
              name="guardiant.localGuardian.occupation"
              type="text"
              size="large"
              label="Occupation"
              placeholder="Write local guardian occupation"
            />
          </div>
        </Col>
        <Col style={{ margin: "15px 0" }} className="gutter-row" span={6}>
          <div>
            <FormInput
              name="guardiant.localGuardian.contactNo"
              type="text"
              size="large"
              label="Contact Number"
              placeholder="Write local guardian contact number"
            />
          </div>
        </Col>
        <Col style={{ margin: "15px 0" }} className="gutter-row" span={6}>
          <div>
            <FormInput
              name="guardiant.localGuardian.address"
              type="text"
              size="large"
              label="Address"
              placeholder="Write local guardian address"
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default LocalGuardianInfo;
