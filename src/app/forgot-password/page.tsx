"use client";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import { useForgotPasswordMutation } from "@/redux/features/auth/authApi";
import { Button, message } from "antd";

function ForgotPasswordPage() {
  const [forgotPassword] = useForgotPasswordMutation();
  const onSubmit = async (values: { userId: string }) => {
    try {
      await forgotPassword(values);
      message.success("Reset link has been sent to your email");
    } catch (error) {}
  };
  return (
    <>
      <div
        style={{ margin: "100px 0", display: "flex", justifyContent: "center" }}
      >
        <Form submitHandler={onSubmit}>
          <h3 style={{ margin: "5px 0" }}>Forget Password</h3>
          <div style={{ margin: "5px 0" }}>
            <FormInput name="userId" placeholder="Enter Your UserId" />
          </div>
          <Button htmlType="submit" type="primary">
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
}

export default ForgotPasswordPage;
