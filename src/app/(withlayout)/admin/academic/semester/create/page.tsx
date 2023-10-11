"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField from "@/components/Forms/FormSelectField";
import FormYearPicker from "@/components/Forms/FormYearPicker";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { adminItems, superAdminItems } from "@/constants/breadCrumbItem";
import {
  genderOptions,
  monthOptions,
  semesterOptions,
} from "@/constants/global";
import { useAddAcademicDepartmentMutation } from "@/redux/features/academicDepartment/academicDepartmentApi";
import { useGetAcademicFacultyQuery } from "@/redux/features/academicFaculty/academicFacultyApi";
import { useAddAcademicSemesterMutation } from "@/redux/features/academicSemester/academicSemesterApi";
import { manageDepartmentSchema } from "@/schema/managementDepartmentSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Col, Row, message } from "antd";

const CreateAcademicSemester = () => {
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
      label: `semesters`,
      link: `admin/academic/semester`,
    },
  ];
  const [addAcademicSemester] = useAddAcademicSemesterMutation();

  const onSubmit = async (data: any) => {
    if (data.title === "Autumn") {
      data.code = "01";
    } else if (data.title === "Summer") {
      data.code = "02";
    } else {
      data.code = "03";
    }

    data.year = parseInt(data.year);

    message.loading("Creating...");

    try {
      const res = await addAcademicSemester(data);
      if (!!res) {
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
                <FormSelectField
                  name="title"
                  size="large"
                  label="Title"
                  items={semesterOptions}
                />
              </div>
            </Col>
            <Col style={{ margin: "15px 0" }} className="gutter-row" span={24}>
              <div style={{ maxWidth: "300px" }}>
                <FormSelectField
                  name="startMonth"
                  size="large"
                  label="Start Month"
                  items={monthOptions}
                />
              </div>
            </Col>
            <Col style={{ margin: "15px 0" }} className="gutter-row" span={24}>
              <div style={{ maxWidth: "300px" }}>
                <FormSelectField
                  name="endMonth"
                  size="large"
                  label="End Month"
                  items={monthOptions}
                />
              </div>
            </Col>
            <Col style={{ margin: "15px 0" }} className="gutter-row" span={24}>
              <div style={{ maxWidth: "300px" }}>
                <FormYearPicker
                  name="year"
                  size="large"
                  label="Year"
                  placeholder="Select Year"
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

export default CreateAcademicSemester;
