import BaseLayout from "@/layouts/base-layout";
import { fetchSystemMenuInfo } from "@/service/api";
import { useLoaderData } from "react-router-dom";

const BlankLayout = () => {
  const systemMenuInfo = useLoaderData() as Api.Auth.SystemMenuInfo[];

  if (!systemMenuInfo) {
    return <Navigate to="login-out" />;
  }
  return <BaseLayout />;
};

export const loader = async () => {
  const { data: systemMenuInfo } = await fetchSystemMenuInfo("she-in");

  return systemMenuInfo;
};

export default BlankLayout;
