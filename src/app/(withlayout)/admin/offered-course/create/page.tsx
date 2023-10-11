"use client";

import Form from "@/components/Forms/Form";
import FormOfferedCourseSelect from "@/components/Forms/FormOfferedCourseSelect";
import FormSelectField from "@/components/Forms/FormSelectField";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { adminItems } from "@/constants/breadCrumbItem";
import { useGetAcademicDepartmentQuery } from "@/redux/features/academicDepartment/academicDepartmentApi";
import { useAddOfferedCourseMutation } from "@/redux/features/offeredCourse/offeredCourseApi";
import { useGetSemesterRegistrationQuery } from "@/redux/features/semesterRegistration/semesterRegistrationApi";
import { Button, Col, Row, message } from "antd";

const CreateOfferedCourse = () => {
  const { data: semesterRegistrationData } = useGetSemesterRegistrationQuery();

  const semesterRegistrationOptions =
    semesterRegistrationData?.semesterRegistration?.map((registration: any) => {
      return {
        label:
          registration.academicSemester.title +
          " " +
          registration.academicSemester.year,
        value: registration.id,
      };
    });

  const { data: academicDepartment } = useGetAcademicDepartmentQuery();

  const academicDepartmentOptions = academicDepartment?.department?.map(
    (department: any) => {
      return {
        label: department.title,
        value: department.id,
      };
    }
  );

  const items = [
    ...adminItems,
    {
      label: `offered-courses`,
      link: `admin/offered-course`,
    },
  ];
  const [addOfferedCourse] = useAddOfferedCourseMutation();

  const onSubmit = async (data: any) => {
    message.loading("Creating...");
    try {
      const res = await addOfferedCourse(data);

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
      <Form submitHandler={onSubmit}>
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
                <FormSelectField
                  name="semesterRegistrationId"
                  size="large"
                  label="Semester"
                  items={semesterRegistrationOptions}
                />
              </div>
            </Col>
            <Col style={{ margin: "15px 0" }} className="gutter-row" span={24}>
              <div style={{ maxWidth: "300px" }}>
                <FormOfferedCourseSelect name="courseIds" label="Courses" />
              </div>
            </Col>
            <Col style={{ margin: "15px 0" }} className="gutter-row" span={24}>
              <div style={{ maxWidth: "300px" }}>
                <FormSelectField
                  name="academicDepartmentId"
                  size="large"
                  label="Department"
                  items={academicDepartmentOptions}
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

export default CreateOfferedCourse;
