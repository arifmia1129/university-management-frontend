"use client";

import { Col, Row } from "antd";
import React from "react";
import FormInput from "../Forms/FormInput";
import FormSelectField from "../Forms/FormSelectField";
import { genderOptions } from "@/constants/global";
import Uploader from "../ui/Uploader";
import { useGetAcademicFacultyQuery } from "@/redux/features/academicFaculty/academicFacultyApi";
import { useGetAcademicDepartmentQuery } from "@/redux/features/academicDepartment/academicDepartmentApi";
import { useGetAcademicSemesterQuery } from "@/redux/features/academicSemester/academicSemesterApi";

const StudentInfo = () => {
  const { data: academicDepartment } = useGetAcademicDepartmentQuery();

  const academicDepartmentOptions = academicDepartment?.department?.map(
    (department: any) => {
      return {
        label: department.title,
        value: department.id,
      };
    }
  );

  const { data: academicFaculty } = useGetAcademicFacultyQuery();

  const academicFacultyOptions = academicFaculty?.faculty?.map(
    (faculty: any) => {
      return {
        label: faculty.title,
        value: faculty.id,
      };
    }
  );

  const { data: academicSemester } = useGetAcademicSemesterQuery();

  const academicSemesterOptions = academicSemester?.semester?.map(
    (semester: any) => {
      return {
        label: semester.title,
        value: semester.id,
      };
    }
  );

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
              name="student.name.firstName"
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
              name="student.name.middleName"
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
              name="student.name.lastName"
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
              name="student.academicSemester"
              size="large"
              label="Academic Semester"
              items={academicSemesterOptions}
            />
          </div>
        </Col>
        <Col style={{ margin: "15px 0" }} className="gutter-row" span={6}>
          <div>
            <FormSelectField
              name="student.academicDepartment"
              size="large"
              label="Academic Department"
              items={academicDepartmentOptions}
            />
          </div>
        </Col>
        <Col style={{ margin: "15px 0" }} className="gutter-row" span={6}>
          <div>
            <FormSelectField
              name="student.academicFaculty"
              size="large"
              label="Academic Faculty"
              items={academicFacultyOptions}
            />
          </div>
        </Col>
        <Col style={{ margin: "15px 0" }} className="gutter-row" span={6}>
          <div>
            <FormSelectField
              name="student.gender"
              size="large"
              label="Gender"
              items={genderOptions}
            />
          </div>
        </Col>
        <Col style={{ margin: "15px 0" }} className="gutter-row" span={6}>
          <div>
            <Uploader name="file" />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default StudentInfo;
