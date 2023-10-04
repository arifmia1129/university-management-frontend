"use client";

import GuardianInfo from "@/components/CreateStudent/GuardianInfo";
import LocalGuardianInfo from "@/components/CreateStudent/LocalGuardianInfo";
import StudentBasicInfo from "@/components/CreateStudent/StudentBasicInfo";
import StudentInfo from "@/components/CreateStudent/StudentInfo";
import StepperForm from "@/components/ui/StepperForm/StepperForm";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { superAdminItems } from "@/constants/breadCrumbItem";
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

  const handleStudentInfo = (data: any) => {
    try {
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <UMBreadCrumb items={items} />
      <StepperForm
        submitHander={(value) => handleStudentInfo(value)}
        steps={steps}
      />
    </div>
  );
};

export default CreateStudentPage;
