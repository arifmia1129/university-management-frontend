"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField from "@/components/Forms/FormSelectField";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { adminItems, superAdminItems } from "@/constants/breadCrumbItem";
import { genderOptions } from "@/constants/global";
import { useAddAcademicDepartmentMutation } from "@/redux/features/academicDepartment/academicDepartmentApi";
import { useGetAcademicFacultyQuery } from "@/redux/features/academicFaculty/academicFacultyApi";
import { manageDepartmentSchema } from "@/schema/managementDepartmentSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Col, Row, message } from "antd";

const CreateAcademicDepartment = () => {
  const { data } = useGetAcademicFacultyQuery();

  const { faculty } = data || {};

  const facutlyOptions = faculty?.map((option: any) => {
    return {
      label: option.title,
      value: option.id,
    };
  });

  const items = [
    ...adminItems,
    {
      label: `departments`,
      link: `admin/academic/department`,
    },
  ];
  const [addAcademicDepartment] = useAddAcademicDepartmentMutation();

  const onSubmit = async (data: any) => {
    message.loading("Creating...");
    try {
      addAcademicDepartment(data);
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
            <Col style={{ margin: "15px 0" }} className="gutter-row" span={24}>
              <div style={{ maxWidth: "300px" }}>
                <FormInput
                  name="title"
                  type="text"
                  size="large"
                  label="Title name"
                  placeholder="Write title name"
                />
              </div>
            </Col>
            <Col style={{ margin: "15px 0" }} className="gutter-row" span={24}>
              <div style={{ maxWidth: "300px" }}>
                <FormSelectField
                  name="academicFacultyId"
                  size="large"
                  label="Academic Faculty"
                  items={facutlyOptions}
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

export default CreateAcademicDepartment;
