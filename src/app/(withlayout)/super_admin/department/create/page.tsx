"use client";

import Form from "@/components/Forms/Form";
import FormDatePicker from "@/components/Forms/FormDatePicker";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField from "@/components/Forms/FormSelectField";
import FormTextArea from "@/components/Forms/FormTextArea";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import UMTable from "@/components/ui/UMTable";
import Uploader from "@/components/ui/Uploader";
import { superAdminItems } from "@/constants/breadCrumbItem";
import {
  bloodGroupOptions,
  genderOptions,
  manageDepartmentOptions,
} from "@/constants/global";
import { useAddManagementDepartmentMutation } from "@/redux/features/managementDepartment/managementDepartmentApi";
import { adminSchema } from "@/schema/admin";
import { manageDepartmentSchema } from "@/schema/managementDepartmentSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Col, Row, message } from "antd";

const CreateManagementDepartment = () => {
  const items = [
    ...superAdminItems,
    {
      label: `manage-admin`,
      link: `super_admin/admin`,
    },
  ];
  const [addManagementDepartment] = useAddManagementDepartmentMutation();

  const onSubmit = async (data: any) => {
    console.log("hello");
    message.loading("Creating...");
    try {
      addManagementDepartment(data);
      message.success("Successfully created");
    } catch (error: any) {
      message.error(error?.message);
    }
  };

  return (
    <div>
      <UMBreadCrumb items={items} />
      <Form
        submitHandler={onSubmit}
        resolver={yupResolver(manageDepartmentSchema)}
      >
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
                  name="title"
                  type="text"
                  size="large"
                  label="Title name"
                  placeholder="Write title name"
                />
              </div>
            </Col>
          </Row>
        </div>
        <Button type="primary" htmlType="submit">
          Create
        </Button>
      </Form>
      <div
        style={{
          margin: "10px 0",
        }}
      >
        <UMTable />
      </div>
    </div>
  );
};

export default CreateManagementDepartment;
