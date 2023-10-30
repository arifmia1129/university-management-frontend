"use client";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import { LOCAL_STORAGE_KEYS } from "@/constants/localStorageKeys";
import { useResetPasswordMutation } from "@/redux/features/auth/authApi";
import { storeToken } from "@/services/auth.service";
import { removeFromLocalStorage } from "@/utils/local-store";
import { Button, message } from "antd";
import { useRouter } from "next/navigation";

import React, { useEffect } from "react";

type FormData = {
  id: string | string[] | undefined;
  token: string | string[] | undefined;
};

function ResetPassword({ searchParams }: any) {
  const { token } = searchParams;
  const [resetPassword] = useResetPasswordMutation();
  const router = useRouter();

  useEffect(() => {
    storeToken(token);
  }, []);

  const onSubmit = async (values: FormData) => {
    try {
      const res = await resetPassword(values).unwrap();
      if (res.success) {
        message.success(res.message);
        router.push("/login");
        removeFromLocalStorage(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);
      }
    } catch (error) {}
  };

  return (
    <div
      style={{ margin: "100px 0", display: "flex", justifyContent: "center" }}
    >
      <Form submitHandler={onSubmit}>
        <h3>Reset Password</h3>

        <div style={{ margin: "5px 0" }}>
          <FormInput type="password" name="newPassword" label="New password" />
        </div>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default ResetPassword;
