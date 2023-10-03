"use client";

import React, { useEffect, useState } from "react";
import { Button, message, Steps, theme } from "antd";
import { FormProvider, useForm } from "react-hook-form";
import { getFromLocalStorage, storeToLocalStorage } from "@/utils/local-store";

interface IStep {
  title: string;
  content: React.ReactElement | React.ReactNode;
}

const StepperForm = ({
  steps,
  submitHander,
}: {
  steps: IStep[];
  submitHander: (el: any) => void;
}) => {
  const [current, setCurrent] = useState(
    !!getFromLocalStorage("step")
      ? Number(JSON.parse(getFromLocalStorage("step") as any)?.step)
      : 0
  );

  useEffect(() => {
    storeToLocalStorage("step", JSON.stringify({ step: current }));
  }, [current]);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  const methods = useForm();

  const { handleSubmit, reset } = methods;

  const handleStudentInfoSubmit = (data: any) => {
    submitHander(data);
    reset();
    storeToLocalStorage("step", JSON.stringify({ step: 0 }));
    setCurrent(0);
  };

  return (
    <>
      <Steps current={current} items={items} />
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handleStudentInfoSubmit)}>
          <div>{steps[current].content}</div>
          <div style={{ marginTop: 24 }}>
            {current < steps.length - 1 && (
              <Button type="primary" onClick={() => next()}>
                Next
              </Button>
            )}
            {current === steps.length - 1 && (
              <Button
                type="primary"
                htmlType="submit"
                onClick={() => message.success("Processing complete!")}
              >
                Done
              </Button>
            )}
            {current > 0 && (
              <Button style={{ margin: "0 8px" }} onClick={() => prev()}>
                Previous
              </Button>
            )}
          </div>
        </form>
      </FormProvider>
    </>
  );
};

export default StepperForm;
