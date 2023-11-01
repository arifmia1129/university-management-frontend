"use client";
import dayjs from "dayjs";
import { useState } from "react";
import { Button, Input, Tag, Tooltip } from "antd";
import { ReloadOutlined } from "@ant-design/icons";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { useRouter } from "next/navigation";
import { useDebounced } from "@/utils/hooks";
import {
  useInitialPaymentMutation,
  useMyPaymentsQuery,
} from "@/redux/features/payment/paymentApi";
import { PaymentStatus, PaymentType } from "@/constants/global";
import ActionBar from "@/components/ui/ActionBar/ActionBar";
import UMTable from "@/components/ui/UMTable";

const ViewMyPayment = () => {
  const [paymentType, setPaymentType] = useState<string>("");
  const [academicSemesterId, setAcademicSemesterId] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [size, setSize] = useState<number>(10);
  const [sortBy, setSortBy] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const router = useRouter();
  const query: any = {};
  query["limit"] = size;
  query["page"] = page;
  query["sortBy"] = sortBy;
  query["sortOrder"] = sortOrder;

  const debouncedSearchTerm = useDebounced(searchTerm, 600);

  if (!!debouncedSearchTerm) {
    query["searchTerm"] = debouncedSearchTerm;
  }

  const { data: payments, isLoading } = useMyPaymentsQuery({ ...query });

  const [initialPayment] = useInitialPaymentMutation();

  const handleInitialPayment = async (data: any) => {
    // console.log(data);
    try {
      const res = (await initialPayment(data).unwrap()) as any;
      router.push(res?.data);
    } catch (error) {}
  };

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

  const handleChangePaginationOptions = (page: number, size: number): void => {
    //console.log("page:", page, "size:", size);
    setPage(page);
    setSize(size);
  };

  const paginationOptions = {
    pageSize: size,
    total: 0,
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
  const columns = [
    {
      title: "Student info",
      dataIndex: "student",
      render: function (data: any) {
        return (
          <table
            style={{
              border: "1px solid #d9d9d9",
              borderRadius: "5px",
              padding: "10px",
            }}
          >
            <tr style={{ margin: "0px 0px" }}>
              <td
                style={{
                  fontWeight: 700,
                  marginRight: "10px",
                  textTransform: "capitalize",
                  textAlign: "left",
                }}
              >
                name
              </td>
              <td style={{ textAlign: "left", padding: "5px 15px" }}>
                <span style={{ marginLeft: "10px", textAlign: "right" }}>
                  {data?.firstName} {data?.middleName} {data?.lastName}
                </span>
              </td>
            </tr>

            <tr style={{ margin: "0px 0px" }}>
              <td
                style={{
                  fontWeight: 700,
                  marginRight: "10px",
                  textTransform: "capitalize",
                  textAlign: "left",
                }}
              >
                Student id
              </td>
              <td style={{ textAlign: "left", padding: "5px 15px" }}>
                <span style={{ marginLeft: "10px", textAlign: "right" }}>
                  {data?.studentId}
                </span>
              </td>
            </tr>
          </table>
        );
      },
    },
    {
      title: "Semester",
      dataIndex: "academicSemester",
      render: function (data: any) {
        return (
          <>
            {data?.title} - {data?.year}
          </>
        );
      },
    },
    {
      title: "Full Payment Amount",
      render: function (data: any) {
        return (
          <table
            style={{
              border: "1px solid #d9d9d9",
              borderRadius: "5px",
              padding: "10px",
            }}
          >
            <tr style={{ margin: "0px 0px" }}>
              <td
                style={{
                  fontWeight: 700,
                  marginRight: "10px",
                  textTransform: "capitalize",
                  textAlign: "left",
                }}
              >
                full payment amount
              </td>
              <td style={{ textAlign: "left", padding: "5px 15px" }}>
                <span style={{ marginLeft: "10px" }}>
                  {data.fullPaymentAmount} Tk
                </span>
              </td>
            </tr>

            <tr style={{ margin: "0px 0px" }}>
              <td
                style={{
                  fontWeight: 700,
                  marginRight: "10px",
                  textTransform: "capitalize",
                  textAlign: "left",
                }}
              >
                partial payment amount
              </td>
              <td style={{ textAlign: "left", padding: "5px 15px" }}>
                <span style={{ marginLeft: "10px" }}>
                  {data.partialPaymentAmount} Tk
                </span>
              </td>
            </tr>

            <tr style={{ margin: "0px 0px" }}>
              <td
                style={{
                  fontWeight: 700,
                  marginRight: "10px",
                  textTransform: "capitalize",
                  textAlign: "left",
                }}
              >
                total due amount
              </td>
              <td style={{ textAlign: "left", padding: "5px 15px" }}>
                <span style={{ marginLeft: "10px" }}>
                  {data.totalDueAmount} Tk
                </span>
              </td>
            </tr>

            <tr style={{ margin: "0px 0px" }}>
              <td
                style={{
                  fontWeight: 700,
                  marginRight: "10px",
                  textTransform: "capitalize",
                  textAlign: "left",
                }}
              >
                total paid amount
              </td>
              <td style={{ textAlign: "left", padding: "5px 15px" }}>
                <span style={{ marginLeft: "10px" }}>
                  {data.totalPaidAmount} Tk
                </span>
              </td>
            </tr>
          </table>
        );
      },
    },
    {
      title: "Payment Status",
      dataIndex: "paymentStatus",
      render: function (data: string) {
        return (
          <div style={{ textAlign: "center" }}>
            {data === PaymentStatus.PENDING.toString() && (
              <Tag color="yellow">Pending</Tag>
            )}

            {data === PaymentStatus.FULL_PAID.toString() && (
              <Tag color="green">Paid</Tag>
            )}

            {data === PaymentStatus.PARTIAL_PAID.toString() && (
              <Tag color="orange">Partial Paid</Tag>
            )}
          </div>
        );
      },
    },
    {
      title: "Created at",
      dataIndex: "createdAt",
      render: function (data: any) {
        return data && dayjs(data).format("MMM D, YYYY hh:mm A");
      },
      sorter: true,
    },
    {
      title: "Action",
      render: function (data: any) {
        return (
          <>
            {data.paymentStatus === PaymentStatus.PENDING && (
              <>
                <Button type="primary" onClick={handleInitialPayment}>
                  Pay Partial
                </Button>
                <Button
                  type="primary"
                  onClick={() => {
                    setAcademicSemesterId(data?.academicSemesterId);
                    setOpen(true);
                    setPaymentType(PaymentType.FULL);
                  }}
                  style={{ marginLeft: "3px" }}
                >
                  Pay Full
                </Button>
              </>
            )}

            {data.paymentStatus === PaymentStatus.PARTIAL_PAID && (
              <>
                <Button type="primary" onClick={handleInitialPayment}>
                  full payment
                </Button>
              </>
            )}
          </>
        );
      },
    },
  ];

  const resetFilters = () => {
    setSortBy("");
    setSortOrder("");
    setSearchTerm("");
  };

  return (
    <>
      <UMBreadCrumb items={[{ label: "student", link: "/student" }]} />
      <ActionBar title="My Payment List">
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

      {/* <UMTable
        loading={isLoading}
        columns={columns}
        dataSource={payments?.data}
        paginationOptions={paginationOptions}
        handleChangeTableOptions={handleChangeTableOptions}
        showPagination={true}
      /> */}
    </>
  );
};

export default ViewMyPayment;
