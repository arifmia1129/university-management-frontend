"use client";

import ActionBar from "@/components/ui/ActionBar/ActionBar";
import Loading from "@/components/ui/Loading";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { superAdminItems } from "@/constants/breadCrumbItem";
import { useGetAdminByIdQuery } from "@/redux/features/admin/adminApi";
import { Descriptions, Card, Avatar, Divider, Row } from "antd";

export default function AdminDetails({
  params,
}: {
  params: Record<string, any>;
}) {
  const { data: admin, isLoading } = useGetAdminByIdQuery(params?.id);
  // //console.log(data);
  const items = [...superAdminItems];

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div>
      <UMBreadCrumb items={items} />
      <ActionBar title="Admin Details"></ActionBar>
      <Card title="Admin Details">
        <Row
          style={{
            margin: "5px",
          }}
          justify={"center"}
          align={"middle"}
        >
          <Avatar size={128} src={admin?.profileImage} />
        </Row>

        <Descriptions layout="vertical" bordered>
          <Descriptions.Item label="Name">
            {`${admin?.name?.firstName} ${admin?.name?.middleName} ${admin?.name?.lastName}`}
          </Descriptions.Item>
          <Descriptions.Item label="Email">{admin?.email}</Descriptions.Item>
          <Descriptions.Item label="Contact No">
            {admin?.contactNo}
          </Descriptions.Item>
          <Descriptions.Item label="Emergency Contact No">
            {admin?.emergencyContactNo}
          </Descriptions.Item>
          <Descriptions.Item label="Gender">{admin?.gender}</Descriptions.Item>
          <Descriptions.Item label="Date of Birth">
            {admin?.dateOfBirth}
          </Descriptions.Item>
          <Descriptions.Item label="Blood Group">
            {admin?.bloodGroup}
          </Descriptions.Item>
          <Descriptions.Item label="Designation">
            {admin?.designation}
          </Descriptions.Item>
          <Descriptions.Item label="Management Department">
            {admin?.managementDepartment.title}
          </Descriptions.Item>
          <Descriptions.Item label="Present Address">
            {admin?.presentAddress}
          </Descriptions.Item>
          <Descriptions.Item label="Permanent Address">
            {admin?.permanentAddress}
          </Descriptions.Item>
          <Descriptions.Item label="Created At">
            {admin?.createdAt}
          </Descriptions.Item>
          <Descriptions.Item label="Updated At">
            {admin?.updatedAt}
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </div>
  );
}
