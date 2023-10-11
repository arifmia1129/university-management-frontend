"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormMultiSelectField from "@/components/Forms/FormMultiSelectField";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { adminItems, superAdminItems } from "@/constants/breadCrumbItem";
import { useAddBuildingMutation } from "@/redux/features/building/buildingApi";
import {
  useAddCourseMutation,
  useGetCourseQuery,
} from "@/redux/features/course/courseApi";

import { useAddManagementDepartmentMutation } from "@/redux/features/managementDepartment/managementDepartmentApi";
import { manageDepartmentSchema } from "@/schema/managementDepartmentSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Col, Row, message } from "antd";

const CreateCoursePage = () => {
  const items = [
    ...adminItems,
    {
      label: `courses`,
      link: `admin/course`,
    },
  ];

  const { data, isLoading } = useGetCourseQuery();

  const courseOptions =
    data &&
    data?.Course?.map((course: any) => {
      return {
        label: course.title,
        value: course.id,
      };
    });

  const [addCourse] = useAddCourseMutation();

  const onSubmit = async (data: any) => {
    data.credits = parseInt(data.credits);

    data.preRequisiteCourses = data?.preRequisiteCourses?.map((id: string) => {
      return {
        courseId: id,
      };
    });

    message.loading("Creating...");
    try {
      const res = await addCourse(data);
      if (res?.data?.success) {
        message.success("Successfully created");
      }
    } catch (error: any) {
      message.error(error?.message);
    }
  };

  return (
    <div>
      <UMBreadCrumb items={items} />
      <Form
        submitHandler={onSubmit}
        // resolver={yupResolver(manageDepartmentSchema)}
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
            <Col style={{ margin: "15px 0" }} className="gutter-row" span={8}>
              <div>
                <FormInput
                  name="code"
                  type="text"
                  size="large"
                  label="Code name"
                  placeholder="Write code"
                />
              </div>
            </Col>
            <Col style={{ margin: "15px 0" }} className="gutter-row" span={8}>
              <div>
                <FormInput
                  name="credits"
                  type="number"
                  size="large"
                  label="Credits"
                  placeholder="Write credits"
                />
              </div>
            </Col>
            <Col style={{ margin: "15px 0" }} className="gutter-row" span={8}>
              <div>
                <FormMultiSelectField
                  name="preRequisiteCourses"
                  size="large"
                  label="Prerequisite Courses"
                  items={courseOptions}
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

export default CreateCoursePage;
