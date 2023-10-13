"use client";

import { CloseCircleOutlined } from "@ant-design/icons";
import { Button, Result, Typography } from "antd";

const { Paragraph, Text } = Typography;

import { useGetSemesterRegistrationQuery } from "@/redux/features/semesterRegistration/semesterRegistrationApi";
import Link from "next/link";

export default function StudentRegistrationPage() {
  const { data } = useGetSemesterRegistrationQuery();

  const isAvailable = data?.semesterRegistration?.find(
    (semester: any) => semester.status === "ONGOING"
  );

  console.log(isAvailable);

  return (
    <>
      {!isAvailable ? (
        <Result
          status="error"
          title="No Semester Registration Available Now"
          subTitle="Please wait until authority start a new semester registration"
        />
      ) : (
        <Result
          status="success"
          title="Semester Registration Available Now"
          subTitle="As soon as confirm your semster registration"
          extra={[
            <Link href="/student/pre-registration">
              <Button type="primary">Go</Button>
            </Link>,
          ]}
        />
      )}
    </>
  );
}
