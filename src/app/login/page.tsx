"use client";

import { Button, Col, Row } from "antd";
import Image from "next/image";
import React from "react";
import loginImg from "../../assets/login.png";
import Form from "@/components/Forms/Form";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import FormInput from "@/components/Forms/FormInput";
import { useUserLoginMutation } from "@/redux/features/auth/authApi";
import { storeToken } from "@/services/auth.service";

type FormValues = {
  id: string;
  password: string;
};

const Login = () => {
  const [userLogin] = useUserLoginMutation();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const res = await userLogin(data).unwrap();
      storeToken(res?.data?.accessToken);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
      <Col sm={12} md={16} lg={10}>
        <Image src={loginImg} width={500} alt="login-image" />
      </Col>
      <Col sm={12} md={8} lg={8}>
        <h1
          style={{
            margin: "15px 0",
          }}
        >
          First login your account
        </h1>
        <div>
          <Form submitHandler={onSubmit}>
            <div>
              <FormInput name="id" type="text" size="large" label="User ID" />
            </div>
            <div
              style={{
                margin: "15px 0",
              }}
            >
              <FormInput
                name="password"
                type="password"
                size="large"
                label="User Password"
              />
            </div>
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form>
        </div>
      </Col>
    </Row>
  );
};

export default Login;
