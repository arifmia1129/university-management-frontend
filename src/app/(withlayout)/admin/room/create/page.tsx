"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormSelectField from "@/components/Forms/FormSelectField";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { adminItems, superAdminItems } from "@/constants/breadCrumbItem";
import { genderOptions } from "@/constants/global";
import { useAddAcademicDepartmentMutation } from "@/redux/features/academicDepartment/academicDepartmentApi";
import { useGetAcademicFacultyQuery } from "@/redux/features/academicFaculty/academicFacultyApi";
import { useGetBuildingQuery } from "@/redux/features/building/buildingApi";
import { useAddRoomMutation } from "@/redux/features/room/roomApi";
import { createRoomSchema } from "@/schema/room";

import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Col, Row, message } from "antd";

const CreateRoomPage = () => {
  const { data } = useGetBuildingQuery();

  const { building } = data || {};

  const buildingOptions = building?.map((option: any) => {
    return {
      label: option.title,
      value: option.id,
    };
  });

  const items = [
    ...adminItems,
    {
      label: `rooms`,
      link: `admin/room`,
    },
  ];
  const [addRoom] = useAddRoomMutation();

  const onSubmit = async (data: any) => {
    message.loading("Creating...");
    try {
      const res = await addRoom(data);

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
      <Form submitHandler={onSubmit} resolver={yupResolver(createRoomSchema)}>
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
                  name="roomNumber"
                  type="text"
                  size="large"
                  label="Room Number"
                  placeholder="Write room number"
                />
              </div>
            </Col>
            <Col style={{ margin: "15px 0" }} className="gutter-row" span={24}>
              <div style={{ maxWidth: "300px" }}>
                <FormInput
                  name="floor"
                  type="text"
                  size="large"
                  label="Floor name"
                  placeholder="Write floor name"
                />
              </div>
            </Col>
            <Col style={{ margin: "15px 0" }} className="gutter-row" span={24}>
              <div style={{ maxWidth: "300px" }}>
                <FormSelectField
                  name="buildingId"
                  size="large"
                  label="Building Name"
                  items={buildingOptions}
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

export default CreateRoomPage;
