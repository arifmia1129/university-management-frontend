"use client";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { Button, Input } from "antd";
import Link from "next/link";
import { ReloadOutlined } from "@ant-design/icons";
import { useState } from "react";
import UMTable from "@/components/ui/UMTable";
import { useDebounced } from "@/utils/hooks";
import {
  useGetFacultyCourseQuery,
  useGetFacultyCourseStudentQuery,
} from "@/redux/features/faculty/facultyApi";
import ActionBar from "@/components/ui/ActionBar/ActionBar";

const FacultyCourseStudentPage = ({ searchParams }: Record<string, any>) => {
  const query: Record<string, any> = {};

  const { courseId, offeredCourseSectionId } = searchParams;

  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;
  query["courseId"] = courseId;
  query["offeredCourseSectionId"] = offeredCourseSectionId;

  //   const debouncedSearchTerm = useDebounced( searchQuery: searchTerm,
  //     delay: 600,);

  //   if (!!debouncedSearchTerm) {
  //     query["searchTerm"] = debouncedSearchTerm;
  //   }
  const { data, isLoading } = useGetFacultyCourseStudentQuery({ ...query });
  console.log(data);
  const myCourses = data?.myCourses;
  const meta = data?.meta;

  // console.log(myCourses);

  const columns = [
    {
      title: "Student Name",
      render: function (data: any) {
        return (
          <>
            {data?.firstName}
            {data?.middleName}
            {data?.LastName}
          </>
        );
      },
    },
    {
      title: "Student ID",
      dataIndex: "studentId",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Contact No",
      dataIndex: "contactNo",
    },

    {
      title: "Action",
      render: function (data: any) {
        return (
          <div key="1" style={{ margin: "20px 0px" }}>
            <Link
              href={`/faculty/student-result?studentId=${data.id}&courseId=${courseId}&offeredCourseSectionId=${offeredCourseSectionId}`}
            >
              <Button type="primary">View Marks</Button>
            </Link>
          </div>
        );
      },
    },
  ];
  const onPaginationChange = (page: number, pageSize: number) => {
    console.log("Page:", page, "PageSize:", pageSize);
    setPage(page);
    setSize(pageSize);
  };
  const onTableChange = (pagination: any, filter: any, sorter: any) => {
    const { order, field } = sorter;
    // console.log(order, field);
    setSortBy(field as string);
    setSortOrder(order === "ascend" ? "asc" : "desc");
  };

  const resetFilters = () => {
    setSortBy("");
    setSortOrder("");
    setSearchTerm("");
  };

  const handleChangePaginationOptions = (page: number, size: number): void => {
    //console.log("page:", page, "size:", size);
    // setPage(page);
    // setSize(size);
  };

  const paginationOptions = {
    pageSize: 10,
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
    // const { order, field } = sorter;
    // setSortBy(field);
    // setSortOrder(order === "ascend" ? "asc" : "desc");
  };
  return (
    <div>
      <UMBreadCrumb
        items={[
          {
            label: "faculty",
            link: "/faculty",
          },
        ]}
      />
      <ActionBar title="My Courses">
        <Input
          size="large"
          placeholder="Search"
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: "20%",
          }}
        />
        <div>
          {(!!sortBy || !!sortOrder || !!searchTerm) && (
            <Button
              style={{ margin: "0px 5px" }}
              type="primary"
              onClick={resetFilters}
            >
              <ReloadOutlined />
            </Button>
          )}
        </div>
      </ActionBar>

      <UMTable
        loading={isLoading}
        columns={columns}
        dataSource={data?.student}
        paginationOptions={paginationOptions}
        handleChangeTableOptions={handleChangeTableOptions}
        showPagination={true}
      />
    </div>
  );
};

export default FacultyCourseStudentPage;
