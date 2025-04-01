import { useLoading } from "@sa/hooks";
import { flatten } from "lodash-es";

import {
  getIsLogin,
  selectRoleBtns,
  setRoleBtns,
  setRoles,
} from "@/features/auth/authStore";
import { usePreviousRoute, useRouter } from "@/features/router";
import {
  fetchGetUserInfo,
  fetchLogin,
  fetchSystemMenuInfo,
} from "@/service/api";
import { getFieldValuesByObject } from "@/utils/common";
import { localStg } from "@/utils/storage";

import { useCacheTabs } from "../tab/tabHooks";

import {
  resetAuth as resetAuthAction,
  setToken,
  setUserInfo,
} from "./authStore";
import { clearAuthStorage } from "./shared";

export function useAuth() {
  const roleBtns = useAppSelector(selectRoleBtns);

  const isLogin = useAppSelector(getIsLogin);

  function hasAuth(codes: string | string[]) {
    if (!isLogin) {
      return false;
    }

    if (typeof codes === "string") {
      return roleBtns.includes(codes);
    }

    return codes.some((code) => roleBtns.includes(code));
  }

  return {
    hasAuth,
  };
}

export function useInitAuth() {
  const { endLoading, loading, startLoading } = useLoading();

  const [searchParams] = useSearchParams();

  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const { navigate } = useRouter();

  const redirectUrl = searchParams.get("redirect");

  async function toLogin(
    { password, userName }: { password: string; userName: string },
    redirect = true,
  ) {
    if (loading) return;

    startLoading();
    // 正常login接口应该返回token
    // 现有接口没有返回token, token在cookie里，使用number字段作为token
    const { data: loginToken, error } = await fetchLogin(userName, password);

    if (!error) {
      localStg.set("token", loginToken.number);
      localStg.set("refreshToken", loginToken.number);

      // 获取用户信息
      const { data: info, error: userInfoError } = await fetchGetUserInfo();

      if (!userInfoError) {
        localStg.set("userInfo", info);

        dispatch(setToken(loginToken.number));
        dispatch(setUserInfo(info));

        getAndSaveSystemInfo();

        if (redirect) {
          if (redirectUrl) {
            navigate(redirectUrl);
          } else {
            navigate("/");
          }
        }

        window.$notification?.success({
          description: t("page.login.common.welcomeBack", {
            userName: info.name,
          }),
          message: t("page.login.common.loginSuccess"),
        });
      }
    }

    endLoading();
  }

  // 获取权限信息，相关菜单key 作为role
  async function getAndSaveSystemInfo() {
    const { data: systemMenuInfo } = await fetchSystemMenuInfo("she-in");

    const roles = getFieldValuesByObject(
      systemMenuInfo as Api.Auth.SystemMenuInfo[],
      "key",
      {
        childrenField: "child",
      },
    );
    const roleBtnsResult = getFieldValuesByObject(
      systemMenuInfo as Api.Auth.SystemMenuInfo[],
      "btns",
      {
        childrenField: "child",
      },
    );
    const roleBtns = flatten(roleBtnsResult);
    localStg.set("roles", roles);
    localStg.set("roleBtns", roleBtns);

    dispatch(setRoles(roles));
    dispatch(setRoleBtns(roleBtns));
  }

  return {
    loading,
    toLogin,
    getAndSaveSystemInfo,
  };
}

export function useResetAuth() {
  const dispatch = useAppDispatch();

  const previousRoute = usePreviousRoute();

  const cacheTabs = useCacheTabs();

  const { navigate, push, resetRoutes } = useRouter();

  function resetAuth() {
    clearAuthStorage();

    dispatch(resetAuthAction());

    resetRoutes();

    cacheTabs();

    if (!previousRoute?.handle?.constant) {
      if (previousRoute?.fullPath) {
        push("/login", { redirect: previousRoute.fullPath }, null, true);
      } else {
        navigate("/login", { replace: true });
      }
    }
  }

  return resetAuth;
}
