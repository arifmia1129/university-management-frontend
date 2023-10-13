"use client";

import GuardianInfo from "@/components/CreateStudent/GuardianInfo";
import LocalGuardianInfo from "@/components/CreateStudent/LocalGuardianInfo";
import StudentBasicInfo from "@/components/CreateStudent/StudentBasicInfo";
import StudentInfo from "@/components/CreateStudent/StudentInfo";
import StepperForm from "@/components/ui/StepperForm/StepperForm";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { superAdminItems } from "@/constants/breadCrumbItem";
import { useAddStudentMutation } from "@/redux/features/student/studentApi";
import { message } from "antd";
import React from "react";
import { SubmitHandler } from "react-hook-form";

const CreateStudentPage = () => {
  const items = [
    ...superAdminItems,
    {
      label: `manage-student`,
      link: `super_admin/manage-student`,
    },
  ];

  const steps = [
    {
      title: "Student Information",
      content: <StudentInfo />,
    },
    {
      title: "Basic Information",
      content: <StudentBasicInfo />,
    },
    {
      title: "Guardian Information",
      content: <GuardianInfo />,
    },
    {
      title: "Local Guardian Information",
      content: <LocalGuardianInfo />,
    },
  ];
  const [addStudent] = useAddStudentMutation();
  const handleStudentInfo = async (data: any) => {
    const file = data["file"];

    delete data["file"];

    const info = JSON.stringify(data);

    const formData = new FormData();

    formData.append("file", file);
    formData.append("data", info);
    message.loading("Creating student...");
    try {
      const res = await addStudent(formData);
      if (res.data.success) {
        message.success("Student created successfully!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <UMBreadCrumb items={items} />
      <StepperForm
        persistKey="student-form-info"
        submitHander={(value) => handleStudentInfo(value)}
        steps={steps}
      />
    </div>
  );
};

export default CreateStudentPage;
