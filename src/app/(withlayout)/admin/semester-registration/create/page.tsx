"use client";

import Form from "@/components/Forms/Form";
import FormDatePicker from "@/components/Forms/FormDatePicker";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField from "@/components/Forms/FormSelectField";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { adminItems, superAdminItems } from "@/constants/breadCrumbItem";
import { useGetAcademicSemesterQuery } from "@/redux/features/academicSemester/academicSemesterApi";
import { useAddBuildingMutation } from "@/redux/features/building/buildingApi";

import { useAddManagementDepartmentMutation } from "@/redux/features/managementDepartment/managementDepartmentApi";
import { useAddSemesterRegistrationMutation } from "@/redux/features/semesterRegistration/semesterRegistrationApi";
import { manageDepartmentSchema } from "@/schema/managementDepartmentSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Col, Row, message } from "antd";

const CreateSemesterRegistration = () => {
  const { data } = useGetAcademicSemesterQuery();

  const { semester: academicSemester } = data || {};

  const academicSemesterOptions = academicSemester?.map((semester: any) => {
    return {
      label: semester.title + " " + semester.year,
      value: semester.id,
    };
  });

  const items = [
    ...adminItems,
    {
      label: `semester registrations`,
      link: `admin/semester-registration`,
    },
  ];
  const [addSemesterRegistration] = useAddSemesterRegistrationMutation();

  const onSubmit = async (data: any) => {
    data.minCredit = parseInt(data.minCredit);
    data.maxCredit = parseInt(data.maxCredit);
    message.loading("Creating...");
    try {
      const res = await addSemesterRegistration(data);
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
                <FormDatePicker
                  name="startDate"
                  size="large"
                  label="Start Date"
                  placeholder="Select start date"
                />
              </div>
            </Col>
            <Col style={{ margin: "15px 0" }} className="gutter-row" span={8}>
              <div>
                <FormDatePicker
                  name="endDate"
                  size="large"
                  label="End Date"
                  placeholder="Select end date"
                />
              </div>
            </Col>
            <Col style={{ margin: "15px 0" }} className="gutter-row" span={8}>
              <div>
                <FormInput
                  name="minCredit"
                  type="text"
                  size="large"
                  label="Minimum Credit"
                  placeholder="Write minimum credit"
                />
              </div>
            </Col>
            <Col style={{ margin: "15px 0" }} className="gutter-row" span={8}>
              <div>
                <FormInput
                  name="maxCredit"
                  type="text"
                  size="large"
                  label="Maximum Credit"
                  placeholder="Write maximum credit"
                />
              </div>
            </Col>
            <Col style={{ margin: "15px 0" }} className="gutter-row" span={8}>
              <div>
                <FormSelectField
                  name="academicSemesterId"
                  size="large"
                  label="Academic Semester"
                  items={academicSemesterOptions}
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

export default CreateSemesterRegistration;
