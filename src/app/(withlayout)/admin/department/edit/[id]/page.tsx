"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import ActionBar from "@/components/ui/ActionBar/ActionBar";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { superAdminItems } from "@/constants/breadCrumbItem";
import {
  useGetManagementDepartmentByIdQuery,
  useUpdateManagementDepartmentMutation,
} from "@/redux/features/managementDepartment/managementDepartmentApi";
import { manageDepartmentSchema } from "@/schema/managementDepartmentSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Col, Row, message } from "antd";

export default function DepartmentEditPage({ params }: { params: any }) {
  const { id } = params;

  const { data, isLoading } = useGetManagementDepartmentByIdQuery(id);
  const [updateDepartment] = useUpdateManagementDepartmentMutation();

  const items = [
    ...superAdminItems,
    {
      label: `departments`,
      link: `super_admin/department`,
    },
  ];

  const onSubmit = async (data: any) => {
    message.loading("Updating...");

    try {
      await updateDepartment({
        data: {
          title: data.title,
        },
        id,
      });
      message.success("Successfully updated department");
    } catch (error: any) {
      message.error(error?.message);
    }
  };
  return (
    <div>
      <UMBreadCrumb items={items} />
      <ActionBar title="Edit Department"></ActionBar>
      <Form
        submitHandler={onSubmit}
        resolver={yupResolver(manageDepartmentSchema)}
        defaultValues={data}
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
          Update
        </Button>
      </Form>
    </div>
  );
}
