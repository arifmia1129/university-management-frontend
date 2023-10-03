import ActionBar from "@/components/ui/ActionBar/ActionBar";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { superAdminItems } from "@/constants/breadCrumbItem";
import { Button } from "antd";
import Link from "next/link";

const ManageAdminPage = () => {
  return (
    <div>
      <UMBreadCrumb items={superAdminItems} />
      <ActionBar title="Admin List">
        <Link href="/super_admin/admin/create">
          <Button type="primary">Create Admin</Button>
        </Link>
      </ActionBar>
    </div>
  );
};

export default ManageAdminPage;
