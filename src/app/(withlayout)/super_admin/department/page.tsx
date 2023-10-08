"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import UMTable from "@/components/ui/UMTable";
import { superAdminItems } from "@/constants/breadCrumbItem";

import {
  useAddManagementDepartmentMutation,
  useGetManagementDepartmentQuery,
} from "@/redux/features/managementDepartment/managementDepartmentApi";
import { manageDepartmentSchema } from "@/schema/managementDepartmentSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Col, Input, Row, message } from "antd";
import { useState } from "react";
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import ActionBar from "@/components/ui/ActionBar/ActionBar";
import Link from "next/link";

const ManagementDepartment = () => {
  const fetchQuery: Record<string, any> = {};

  const [size, setSize] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  fetchQuery["limit"] = size;
  fetchQuery["page"] = page;
  fetchQuery["sortBy"] = sortBy;
  fetchQuery["sortOrder"] = sortOrder;
  fetchQuery["searchTerm"] = searchTerm;

  const { data, isLoading } = useGetManagementDepartmentQuery({
    ...fetchQuery,
  });

  const items = [
    ...superAdminItems,
    {
      label: `manage-admin`,
      link: `super_admin/admin`,
    },
  ];
  const [addManagementDepartment] = useAddManagementDepartmentMutation();

  const onSubmit = async (data: any) => {
    console.log("hello");
    message.loading("Creating...");
    try {
      addManagementDepartment(data);
      message.success("Successfully created");
    } catch (error: any) {
      message.error(error?.message);
    }
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      sorter: true,
    },

    {
      title: "Action",
      render: function (data: any) {
        return (
          <>
            <Button onClick={() => console.log(data)} type="primary">
              <EyeOutlined />
            </Button>
            <Button
              style={{ margin: "0px 5px" }}
              onClick={() => console.log(data)}
              type="primary"
            >
              <EditOutlined />
            </Button>
            <Button onClick={() => console.log(data)} type="primary" danger>
              <DeleteOutlined />
            </Button>
          </>
        );
      },
    },
  ];

  const handleChangePaginationOptions = (page: number, size: number): void => {
    console.log("page:", page, "size:", size);
    setPage(page);
    setSize(size);
  };

  const paginationOptions = {
    pageSize: size,
    total: data?.meta?.total,
    pageSizeOptions: [5, 10, 20],
    showSizeChanger: true,
    onChange: handleChangePaginationOptions,
  };

  const handleChangeTableOptions = (
    pagination: any,
    filter: any,
    sorter: any
  ) => {
    const { order, field } = sorter;
    setSortBy(field);
    console.log(order);
    setSortOrder(order === "ascend" ? "asc" : "desc");
  };

  const handleResetQuery = () => {
    setSortOrder("");
    setSortBy("");
    setSearchTerm("");
  };

  return (
    <div>
      <UMBreadCrumb items={items} />
      <ActionBar title="Admin List">
        <Input
          value={searchTerm}
          placeholder="Search anything..."
          style={{ maxWidth: "300px" }}
          type="text"
          size="large"
          onChange={(event: any) => setSearchTerm(event.target.value)}
        />
        <div>
          <Link href="/super_admin/department/create">
            <Button style={{ margin: "0 5px" }} type="primary">
              Create Department
            </Button>
          </Link>
          {(searchTerm || sortBy || sortOrder) && (
            <Button onClick={handleResetQuery} type="primary">
              <ReloadOutlined />
            </Button>
          )}
        </div>
      </ActionBar>
      <div
        style={{
          margin: "10px 0",
        }}
      >
        <UMTable
          loading={isLoading}
          columns={columns}
          dataSource={data?.department}
          paginationOptions={paginationOptions}
          handleChangeTableOptions={handleChangeTableOptions}
          showPagination={true}
        />
      </div>
    </div>
  );
};

export default ManagementDepartment;
