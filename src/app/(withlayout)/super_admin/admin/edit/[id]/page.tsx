"use client";

import Form from "@/components/Forms/Form";
import FormDatePicker from "@/components/Forms/FormDatePicker";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField from "@/components/Forms/FormSelectField";
import FormTextArea from "@/components/Forms/FormTextArea";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import Uploader from "@/components/ui/Uploader";
import { superAdminItems } from "@/constants/breadCrumbItem";
import { bloodGroupOptions, genderOptions } from "@/constants/global";
import {
  useAddAdminMutation,
  useGetAdminByIdQuery,
  useGetAdminQuery,
} from "@/redux/features/admin/adminApi";
import { useGetManagementDepartmentQuery } from "@/redux/features/managementDepartment/managementDepartmentApi";
import { adminSchema } from "@/schema/admin";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Col, Row, message } from "antd";

const CreateAdminPage = ({ params }: any) => {
  const { data: adminData } = useGetAdminByIdQuery(params.id);

  console.log(adminData);

  const { data, isLoading } = useGetManagementDepartmentQuery({});

  const [addAdmin] = useAddAdminMutation();

  const manageDepartmentOptions = data?.department?.map((department: any) => {
    return {
      label: department.title,
      value: department._id,
    };
  });

  const items = [
    ...superAdminItems,
    {
      label: `manage-admin`,
      link: `super_admin/admin`,
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
    message.loading("Creating ..");
    try {
      addAdmin(formData);
      message.success("Admin created successfully!");
    } catch (error) {
      console.error(error);
    }
  };

  const defaultValues = {
    name: {
      firstName: adminData?.name?.firstName || "",
      lastName: adminData?.name?.lastName || "",
      middleName: adminData?.name?.middleName || "",
    },
    dateOfBirth: adminData?.dateOfBirth || "",
    email: adminData?.email || "",
    designation: adminData?.designation || "",
    contactNo: adminData?.contactNo || "",
    emergencyContactNo: adminData?.emergencyContactNo || "",
    permanentAddress: adminData?.permanentAddress || "",
    presentAddress: adminData?.presentAddress || "",
    bloodGroup: adminData?.bloodGroup || "",
    gender: adminData?.gender || "",
    managementDepartment: adminData?.managementDepartment?.id || "",
  };

  return (
    <div>
      <UMBreadCrumb items={items} />
      <Form defaultValues={defaultValues} submitHandler={onSubmit}>
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
                  name="name.firstName"
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
                  name="name.middleName"
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
                  name="name.lastName"
                  type="text"
                  size="large"
                  label="Last Name"
                  placeholder="Write last name"
                />
              </div>
            </Col>

            <Col style={{ margin: "15px 0" }} className="gutter-row" span={8}>
              <div>
                <FormSelectField
                  name="gender"
                  size="large"
                  label="Gender"
                  items={genderOptions}
                />
              </div>
            </Col>
            <Col style={{ margin: "15px 0" }} className="gutter-row" span={8}>
              <div>
                <FormSelectField
                  name="managementDepartment"
                  size="large"
                  label="Manage Department"
                  items={manageDepartmentOptions}
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
            Basic Information
          </p>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col style={{ margin: "15px 0" }} className="gutter-row" span={8}>
              <div>
                <FormInput
                  name="email"
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
                  name="contactNo"
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
                  name="emergencyContactNo"
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
                  name="bloodGroup"
                  size="large"
                  label="Blood Group"
                  items={bloodGroupOptions}
                />
              </div>
            </Col>
            <Col style={{ margin: "15px 0" }} className="gutter-row" span={8}>
              <div>
                <FormInput
                  name="designation"
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
                  name="dateOfBirth"
                  size="large"
                  label="Date of Birth"
                  placeholder="Write date of birth"
                />
              </div>
            </Col>
            <Col style={{ margin: "15px 0" }} className="gutter-row" span={12}>
              <div>
                <FormTextArea
                  name="presentAddress"
                  size="large"
                  label="Present Address"
                  placeholder="Write present address"
                />
              </div>
            </Col>
            <Col style={{ margin: "15px 0" }} className="gutter-row" span={12}>
              <div>
                <FormTextArea
                  name="permanentAddress"
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

export default CreateAdminPage;
