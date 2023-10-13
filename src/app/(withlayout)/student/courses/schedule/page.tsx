"use client";
import ActionBar from "@/components/ui/ActionBar/ActionBar";
import ClassSchedule from "@/components/ui/ClassSchedule";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import UMTable from "@/components/ui/UMTable";
import { useGetStudentCourseScheduleQuery } from "@/redux/features/student/studentApi";

const MyCourseSchedulePage = () => {
  const { data, isLoading } = useGetStudentCourseScheduleQuery({});
  const myCourseSchedules = data?.myCourseSchedules;

  const columns = [
    {
      title: "Course name",
      dataIndex: "offeredCourse",
      render: function (data: any) {
        return <>{data?.course?.title}</>;
      },
    },
    {
      title: "Credit",
      dataIndex: "offeredCourse",
      render: function (data: any) {
        return <>{data?.course.credits}</>;
      },
    },
    {
      title: "Section",
      dataIndex: "offeredCourseSection",
      render: function (data: any) {
        return <>{data?.title}</>;
      },
    },
    {
      title: "Class Schedules",
      dataIndex: "offeredCourseSection",
      render: function (data: any) {
        return (
          <>
            <ClassSchedule data={data?.offeredCourseClassSchedules as any[]} />
          </>
        );
      },
    },
  ];
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
    <>
      <UMBreadCrumb
        items={[
          { label: `student`, link: `/student` },
          { label: `courses`, link: `/student/courses` },
        ]}
      />

      <ActionBar title="My course schedules"></ActionBar>

      <UMTable
        loading={isLoading}
        columns={columns}
        dataSource={data?.schedules}
        paginationOptions={paginationOptions}
        handleChangeTableOptions={handleChangeTableOptions}
        showPagination={true}
      />
    </>
  );
};

export default MyCourseSchedulePage;
