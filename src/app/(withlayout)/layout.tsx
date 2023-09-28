"use client";
import React, { useState, useEffect } from "react";
import Contents from "@/components/ui/Contents";
import Sidebar from "@/components/ui/Sidebar";
import { isLoggedIn } from "@/services/auth.service";
import { Layout } from "antd";
import { useRouter } from "next/navigation";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const isUserLoggedIn = isLoggedIn();
  const router = useRouter();

  useEffect(() => {
    if (!isUserLoggedIn) {
      router.push("/login");
      setIsLoading(true);
    }
  }, [isUserLoggedIn]);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <Layout style={{ minHeight: "100vh" }} hasSider>
      <Sidebar />
      <Contents>{children}</Contents>
    </Layout>
  );
};

export default DashboardLayout;
