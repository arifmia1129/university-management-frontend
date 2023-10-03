import ActionBar from "@/components/ui/ActionBar/ActionBar";
import { Button } from "antd";
import Link from "next/link";

const ManageUserPage = () => {
  return (
    <div>
      <ActionBar title="User List">
        <Link href="/super_admin/user/create">
          <Button type="primary">Create User</Button>
        </Link>
      </ActionBar>
    </div>
  );
};

export default ManageUserPage;
