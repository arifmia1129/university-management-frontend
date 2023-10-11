"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormOfferedCourseSelect from "@/components/Forms/FormOfferedCourseSelect";
import FormSelectField from "@/components/Forms/FormSelectField";
import FormSingleOfferedCourseSelect from "@/components/Forms/FormSingleOfferedCourseSelect";
import FormDynamicFields from "@/components/ui/FormDynamicFields";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { adminItems } from "@/constants/breadCrumbItem";
import { useGetAcademicDepartmentQuery } from "@/redux/features/academicDepartment/academicDepartmentApi";
import { useAddOfferedCourseSectionMutation } from "@/redux/features/offeredCourseSection/offeredCourseSectionApi";
import { useGetSemesterRegistrationQuery } from "@/redux/features/semesterRegistration/semesterRegistrationApi";
import { Button, Col, Row, message } from "antd";
import { useState } from "react";

const CreateOfferedCourse = () => {
  const [semesterRegistrationId, setSemesterRegistrationId] =
    useState<string>("");
  const [academicDepartmentId, setAcademicDepartmentId] = useState<string>("");

  const query: Record<string, any> = {};

  if (semesterRegistrationId) {
    query.semesterRegistrationId = semesterRegistrationId;
  }
  if (academicDepartmentId) {
    query.academicDepartmentId = academicDepartmentId;
  }

  const { data: semesterRegistrationData } =
    useGetSemesterRegistrationQuery(query);

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
  const [addOfferedCourseSection] = useAddOfferedCourseSectionMutation();

  const onSubmit = async (data: any) => {
    data.maxCapacity = parseInt(data.maxCapacity);
    //console.log(data);
    message.loading("Creating...");
    try {
      const res = await addOfferedCourseSection(data);

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
          <Row>
            <Col>
              <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col
                  style={{ margin: "15px 0" }}
                  className="gutter-row"
                  span={24}
                >
                  <div style={{ maxWidth: "300px" }}>
                    <FormSelectField
                      name="semesterRegistrationId"
                      size="large"
                      label="Semester"
                      items={semesterRegistrationOptions}
                      handleOnChange={(e) => setSemesterRegistrationId(e)}
                    />
                  </div>
                </Col>
                <Col
                  style={{ margin: "15px 0" }}
                  className="gutter-row"
                  span={24}
                >
                  <div style={{ maxWidth: "300px" }}>
                    <FormSingleOfferedCourseSelect
                      name="offeredCourseId"
                      label="Offered Courses"
                    />
                  </div>
                </Col>
                <Col
                  style={{ margin: "15px 0" }}
                  className="gutter-row"
                  span={24}
                >
                  <div style={{ maxWidth: "300px" }}>
                    <FormSelectField
                      name="academicDepartmentId"
                      size="large"
                      label="Department"
                      items={academicDepartmentOptions}
                      handleOnChange={(e: any) => setAcademicDepartmentId(e)}
                    />
                  </div>
                </Col>
                <Col
                  style={{ margin: "15px 0" }}
                  className="gutter-row"
                  span={24}
                >
                  <div style={{ maxWidth: "300px" }}>
                    <FormInput
                      name="title"
                      type="text"
                      size="large"
                      label="Section name"
                      placeholder="Write section name"
                    />
                  </div>
                </Col>
                <Col
                  style={{ margin: "15px 0" }}
                  className="gutter-row"
                  span={24}
                >
                  <div style={{ maxWidth: "300px" }}>
                    <FormInput
                      name="maxCapacity"
                      type="text"
                      size="large"
                      label="Max Capacity"
                      placeholder="Write max"
                    />
                  </div>
                </Col>
              </Row>
            </Col>

            <Col style={{ margin: "15px 0" }} className="gutter-row" span={24}>
              <div style={{ maxWidth: "600px" }}>
                <FormDynamicFields />
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
