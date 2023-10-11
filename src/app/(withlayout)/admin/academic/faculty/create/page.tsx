"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { adminItems, superAdminItems } from "@/constants/breadCrumbItem";
import { useAddAcademicFacultyMutation } from "@/redux/features/academicFaculty/academicFacultyApi";
import { manageDepartmentSchema } from "@/schema/managementDepartmentSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Col, Row, message } from "antd";

const CreateAcademicFaculty = () => {
  const items = [
    ...adminItems,
    {
      label: `faculties`,
      link: `admin/academic/faculty`,
    },
  ];
  const [addAcademicFaculty] = useAddAcademicFacultyMutation();

  const onSubmit = async (data: any) => {
    message.loading("Creating...");
    try {
      addAcademicFaculty(data);
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
    </div>
  );
};

export default CreateAcademicFaculty;
