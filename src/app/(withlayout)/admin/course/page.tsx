"use client";

import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import UMTable from "@/components/ui/UMTable";
import { adminItems, superAdminItems } from "@/constants/breadCrumbItem";

import {
  useDeleteManagementDepartmentMutation,
  useGetManagementDepartmentQuery,
} from "@/redux/features/managementDepartment/managementDepartmentApi";

import { Button, Col, Input, Row, message } from "antd";
import { useEffect, useState } from "react";
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import ActionBar from "@/components/ui/ActionBar/ActionBar";
import Link from "next/link";
import { useDebounced } from "@/utils/hooks";
import dayjs from "dayjs";
import DeleteModal from "@/components/Modal/DeleteModal";
import { useGetBuildingQuery } from "@/redux/features/building/buildingApi";
import { useGetRoomQuery } from "@/redux/features/room/roomApi";
import { useGetCourseQuery } from "@/redux/features/course/courseApi";

const AllCoursePage = () => {
  const fetchQuery: any = {};

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

  const { data, isLoading } = useGetCourseQuery({
    ...fetchQuery,
  });
  const [deleteDepartment, { isLoading: isDeleteing }] =
    useDeleteManagementDepartmentMutation();

  const debouncedSearchTerm = useDebounced(searchTerm, 600);

  useEffect(() => {
    if (debouncedSearchTerm) {
      fetchQuery["searchTerm"] = debouncedSearchTerm;
    }
  }, [debouncedSearchTerm]);

  const items = [...adminItems];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteDepartmentId, setDeleteDepartmentId] = useState("");

  const showModal: any = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    setIsModalOpen(false);
    await deleteDepartment(deleteDepartmentId);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Code",
      dataIndex: "code",
    },
    {
      title: "Credits",
      dataIndex: "credits",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      sorter: true,
      render: (data: any) => {
        return data && dayjs(data).format("D-MM-YYYY, hh:mm:ss A");
      },
    },

    {
      title: "Action",
      render: function (data: any) {
        return (
          <>
            <Link href={`/super_admin/department/edit/${data._id}`}>
              <Button style={{ margin: "0px 5px" }} type="primary">
                <EditOutlined />
              </Button>
            </Link>
            <Button
              onClick={() => {
                setDeleteDepartmentId(data._id);
                showModal();
              }}
              type="primary"
              danger
            >
              <DeleteOutlined />
            </Button>
          </>
        );
      },
    },
  ];

  const handleChangePaginationOptions = (page: number, size: number): void => {
    //console.log("page:", page, "size:", size);
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
      <ActionBar title="Manage Courses">
        <Input
          value={searchTerm}
          placeholder="Search anything..."
          style={{ maxWidth: "300px" }}
          type="text"
          size="large"
          onChange={(event: any) => setSearchTerm(event.target.value)}
        />
        <div>
          <Link href="/admin/course/create">
            <Button style={{ margin: "0 5px" }} type="primary">
              Create Course
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
          loading={isLoading || isDeleteing}
          columns={columns}
          dataSource={data?.Course}
          paginationOptions={paginationOptions}
          handleChangeTableOptions={handleChangeTableOptions}
          showPagination={true}
        />
      </div>
      {deleteDepartmentId ? (
        <DeleteModal
          showModal={showModal}
          handleOk={handleOk}
          handleCancel={handleCancel}
          isModalOpen={isModalOpen}
        />
      ) : null}
    </div>
  );
};

export default AllCoursePage;
