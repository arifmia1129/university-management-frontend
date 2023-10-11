"use client";

import Form from "@/components/Forms/Form";
import FormDatePicker from "@/components/Forms/FormDatePicker";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField from "@/components/Forms/FormSelectField";
import FormTextArea from "@/components/Forms/FormTextArea";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import Uploader from "@/components/ui/Uploader";
import { adminItems, superAdminItems } from "@/constants/breadCrumbItem";
import { bloodGroupOptions, genderOptions } from "@/constants/global";
import { useGetAcademicDepartmentQuery } from "@/redux/features/academicDepartment/academicDepartmentApi";
import { useGetAcademicFacultyQuery } from "@/redux/features/academicFaculty/academicFacultyApi";
import {
  useAddAdminMutation,
  useGetAdminQuery,
} from "@/redux/features/admin/adminApi";
import { useAddFacultyMutation } from "@/redux/features/faculty/facultyApi";
import { useGetManagementDepartmentQuery } from "@/redux/features/managementDepartment/managementDepartmentApi";
import { adminSchema } from "@/schema/admin";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Col, Row, message } from "antd";

const CreateFacultyPage = () => {
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

  const [addFaculty] = useAddFacultyMutation();

  const items = [
    ...adminItems,
    {
      label: `manage-faculty`,
      link: `admin/manage-faculty`,
    },
  ];

  const onSubmit = async (data: any) => {
    const file = data["file"];

    delete data["file"];

    const info = JSON.stringify(data);

    //console.log(data);

    const formData = new FormData();

    formData.append("file", file);
    formData.append("data", info);
    message.loading("Creating faculty...");
    try {
      const res = await addFaculty(formData);
      if (res.data.success) {
        message.success("Faculty created successfully!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <UMBreadCrumb items={items} />
      <Form submitHandler={onSubmit}>
        <div
          style={{
            border: "1px solid #d9d9d9",
            borderRadius: "10px",
            padding: "15px",
            margin: "20px 0",
          }}
        >
          <p style={{ fontSize: "20px", fontWeight: "bold" }}>
            Admin Information
          </p>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col style={{ margin: "15px 0" }} className="gutter-row" span={8}>
              <div>
                <FormInput
                  name="faculty.name.firstName"
                  type="text"
                  size="large"
                  label="First Name"
                  placeholder="Write first name"
                />
              </div>
            </Col>
            <Col style={{ margin: "15px 0" }} className="gutter-row" span={8}>
              <div>
                <FormInput
                  name="faculty.name.middleName"
                  type="text"
                  size="large"
                  label="Middle Name"
                  placeholder="Write middle name"
                />
              </div>
            </Col>
            <Col style={{ margin: "15px 0" }} className="gutter-row" span={8}>
              <div>
                <FormInput
                  name="faculty.name.lastName"
                  type="text"
                  size="large"
                  label="Last Name"
                  placeholder="Write last name"
                />
              </div>
            </Col>
            <Col style={{ margin: "15px 0" }} className="gutter-row" span={8}>
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
            <Col style={{ margin: "15px 0" }} className="gutter-row" span={8}>
              <div>
                <FormSelectField
                  name="faculty.gender"
                  size="large"
                  label="Gender"
                  items={genderOptions}
                />
              </div>
            </Col>
            <Col style={{ margin: "15px 0" }} className="gutter-row" span={8}>
              <div>
                <FormSelectField
                  name="faculty.academicDepartment"
                  size="large"
                  label="Academic Department"
                  items={academicDepartmentOptions}
                />
              </div>
            </Col>

            <Col style={{ margin: "15px 0" }} className="gutter-row" span={8}>
              <div>
                <FormSelectField
                  name="faculty.academicFaculty"
                  size="large"
                  label="Academic Faculty"
                  items={academicFacultyOptions}
                />
              </div>
            </Col>
            <Col style={{ margin: "15px 0" }} className="gutter-row" span={8}>
              <div>
                <Uploader name="file" />
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
            Basic Information
          </p>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col style={{ margin: "15px 0" }} className="gutter-row" span={8}>
              <div>
                <FormInput
                  name="faculty.email"
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
                  name="faculty.contactNo"
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
                  name="faculty.emergencyContactNo"
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
                  name="faculty.bloodGroup"
                  size="large"
                  label="Blood Group"
                  items={bloodGroupOptions}
                />
              </div>
            </Col>
            <Col style={{ margin: "15px 0" }} className="gutter-row" span={8}>
              <div>
                <FormInput
                  name="faculty.designation"
                  type="text"
                  size="large"
                  label="Designation"
                  placeholder="Write designation"
                />
              </div>
            </Col>
            <Col style={{ margin: "15px 0" }} className="gutter-row" span={8}>
              <div>
                <FormDatePicker
                  name="faculty.dateOfBirth"
                  size="large"
                  label="Date of Birth"
                  placeholder="Write date of birth"
                />
              </div>
            </Col>
            <Col style={{ margin: "15px 0" }} className="gutter-row" span={12}>
              <div>
                <FormTextArea
                  name="faculty.presentAddress"
                  size="large"
                  label="Present Address"
                  placeholder="Write present address"
                />
              </div>
            </Col>
            <Col style={{ margin: "15px 0" }} className="gutter-row" span={12}>
              <div>
                <FormTextArea
                  name="faculty.permanentAddress"
                  size="large"
                  label="Permanent Address"
                  placeholder="Write permanent address"
                />
              </div>
            </Col>
          </Row>
        </div>
        <Button type="primary" htmlType="submit">
          Create
        </Button>
      </Form>
    </div>
  );
};

export default CreateFacultyPage;
