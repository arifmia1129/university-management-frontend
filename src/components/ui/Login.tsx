"use client";

import { Button, Col, Row, message } from "antd";
import Image from "next/image";
import React, { useEffect } from "react";
import loginImg from "../../assets/login.png";
import Form from "@/components/Forms/Form";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import FormInput from "@/components/Forms/FormInput";
import { useUserLoginMutation } from "@/redux/features/auth/authApi";
import { getUserInfo, isLoggedIn, storeToken } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "@/schema/login";
import Link from "next/link";

type FormValues = {
  id: string;
  password: string;
};

const Login = () => {
  const router = useRouter();
  const [userLogin] = useUserLoginMutation();

  const isUserLoggedIn = isLoggedIn();

  useEffect(() => {
    if (isUserLoggedIn) {
      router.push("/profile");
    }
  }, [isUserLoggedIn]);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const res = await userLogin(data);
      if ("data" in res && res.data.data.accessToken) {
        storeToken(res?.data?.data?.accessToken);
        router.push("/profile");
        message.success("Successfully logged in");
      }
    } catch (error: any) {
      //console.log(error.response.data.message);
      message.error(error?.message || "Something went wrong");
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
          <Form submitHandler={onSubmit} resolver={yupResolver(loginSchema)}>
            <div>
              <FormInput
                required
                name="id"
                type="text"
                size="large"
                label="User ID"
              />
            </div>
            <div
              style={{
                margin: "15px 0",
              }}
            >
              <FormInput
                required
                name="password"
                type="password"
                size="large"
                label="User Password"
              />
            </div>
            <Link href="/forgot-password">
              <p style={{ margin: 10, textAlign: "end" }}>
                <small>Forgot password?</small>
              </p>
            </Link>
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
