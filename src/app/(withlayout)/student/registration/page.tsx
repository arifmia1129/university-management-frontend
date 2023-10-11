"use client";

import { CloseCircleOutlined } from "@ant-design/icons";
import { Button, Result, Typography } from "antd";

const { Paragraph, Text } = Typography;

import { useGetSemesterRegistrationQuery } from "@/redux/features/semesterRegistration/semesterRegistrationApi";

export default function StudentRegistrationPage() {
  const { data } = useGetSemesterRegistrationQuery();

  const isAvailable = data?.semesterRegistration?.find(
    (semester: any) => semester.status === "ONGOING"
  );

  console.log(isAvailable);

  return (
    <>
      {isAvailable ? (
        <Result
          status="error"
          title="Submission Failed"
          subTitle="Please check and modify the following information before resubmitting."
        >
          <div className="desc">
            <Paragraph>
              <Text
                strong
                style={{
                  fontSize: 16,
                }}
              >
                The content you submitted has the following error:
              </Text>
            </Paragraph>
            <Paragraph>
              <CloseCircleOutlined className="site-result-demo-error-icon" />{" "}
              Your account has been frozen. <a>Thaw immediately &gt;</a>
            </Paragraph>
            <Paragraph>
              <CloseCircleOutlined className="site-result-demo-error-icon" />{" "}
              Your account is not yet eligible to apply.{" "}
              <a>Apply Unlock &gt;</a>
            </Paragraph>
          </div>
        </Result>
      ) : null}
    </>
  );
}
