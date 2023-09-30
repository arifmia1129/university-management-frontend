import { redirect } from "next/navigation";

const RootHome = () => {
  return redirect("/profile");
};

export default RootHome;
