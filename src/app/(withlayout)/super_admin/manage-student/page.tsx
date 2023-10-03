"use client";
import ActionBar from "@/components/ui/ActionBar/ActionBar";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { superAdminItems } from "@/constants/breadCrumbItem";
import { Button } from "antd";
import Link from "next/link";

const ManageStudentPage = () => {
  return (
    <>
      <UMBreadCrumb items={superAdminItems} />
      <ActionBar title="Student List">
        <Link href="/super_admin/manage-student/create">
          <Button type="primary">Create Student</Button>
        </Link>
      </ActionBar>
    </>
  );
};

export default ManageStudentPage;
