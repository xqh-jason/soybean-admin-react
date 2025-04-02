/**
 * Namespace Api
 *
 * All backend api type
 */
declare namespace Api {
  namespace Common {
    /** common params of paginating */
    interface PaginatingCommonParams {
      /** current page number */
      pn: number;
      /** page size */
      ps: number;
      /** total count */
      total: number;
    }

    /** common params of paginating query list data */
    interface PaginatingQueryRecord<T = any> extends PaginatingCommonParams {
      list: T[];
    }

    type CommonSearchParams = Pick<Common.PaginatingCommonParams, "pn" | "ps">;

    /**
     * enable status
     *
     * - "1": enabled
     * - "2": disabled
     */
    type EnableStatus = "1" | "2";

    /** common record */
    type CommonRecord<T = any> = {
      /** record creator */
      createBy: string;
      /** record create time */
      createTime: string;
      /** record id */
      id: number;
      /** record status */
      status: EnableStatus | null;
      /** record updater */
      updateBy: string;
      /** record update time */
      updateTime: string;
    } & T;
  }

  /**
   * namespace Auth
   *
   * backend api module: "auth"
   */
  namespace Auth {
    interface LoginToken {
      id: string;
      name: string;
      number: string;
      platform: string;
      reSet: string;
    }

    interface GroupList {
      id: number;
      name: string;
    }

    export interface SystemMenuInfo {
      btns: string[];
      child: SystemMenuInfoChild[];
      id: number;
      key: string;
      name: string;
      parentId: number;
      path: string;
      priority: number;
      type: number;
    }

    export interface SystemMenuInfoChild {
      btns: string[];
      child: any[];
      id: number;
      key: string;
      name: string;
      parentId: number;
      path: string;
      priority: number;
      type: number;
    }

    interface RoleList {
      createdTime: any;
      creator: any;
      id: number;
      name: string;
      remarks: any;
      status: any;
      statusStr: string;
      type: number;
      updatedTime: any;
      updater: any;
    }

    interface UserInfo {
      btns: any[];
      businessStatus: number;
      businessStatusName: string;
      createdTime: string;
      effectiveTime: string;
      email: string;
      externalUserId: string;
      groupList: GroupList[];
      id: number;
      menus: any[];
      name: string;
      number: string;
      organizationList: any[];
      phone: string;
      platform: string;
      positionList: any[];
      roleIdList: number[];
      roleList: RoleList[];
      sex: number;
      sexName: string;
      status: number;
      statusName: string;
      uniqueId: string[];
      validIp: string;
    }

    type Info = {
      token: LoginToken["number"];
      userInfo: UserInfo;
    };
  }

  /**
   * namespace Route
   *
   * backend api module: "route"
   */
  namespace Route {
    type ElegantConstRoute =
      import("@soybean-react/vite-plugin-react-router").ElegantConstRoute;

    interface MenuRoute extends ElegantConstRoute {
      id: string;
    }

    interface UserRoute {
      home: import("@soybean-react/vite-plugin-react-router").LastLevelRouteKey;
      routes: string[];
    }
  }

  /**
   * namespace SystemManage
   *
   * backend api module: "systemManage"
   */
  namespace SystemManage {
    type CommonSearchParams = Pick<Common.PaginatingCommonParams, "pn" | "ps">;

    /** role */
    type Role = Common.CommonRecord<{
      /** role code */
      roleCode: string;
      /** role description */
      roleDesc: string;
      /** role name */
      roleName: string;
    }>;

    /** role search params */
    type RoleSearchParams = CommonType.RecordNullable<
      Pick<Api.SystemManage.Role, "roleCode" | "roleName" | "status"> &
        CommonSearchParams
    >;

    /** role list */
    type RoleList = Common.PaginatingQueryRecord<Role>;

    /** all role */
    type AllRole = Pick<Role, "id" | "roleCode" | "roleName">;

    /**
     * user gender
     *
     * - "1": "male"
     * - "2": "female"
     */
    type UserGender = "1" | "2";

    /** user */
    type User = Common.CommonRecord<{
      /** user nick name */
      nickName: string;
      /** user email */
      userEmail: string;
      /** user gender */
      userGender: UserGender | null;
      /** user name */
      userName: string;
      /** user phone */
      userPhone: string;
      /** user role code collection */
      userRoles: string[];
    }>;

    /** user search params */
    type UserSearchParams = CommonType.RecordNullable<
      Pick<
        Api.SystemManage.User,
        | "nickName"
        | "status"
        | "userEmail"
        | "userGender"
        | "userName"
        | "userPhone"
      > &
        CommonSearchParams
    >;

    /** user list */
    type UserList = Common.PaginatingQueryRecord<User>;

    /**
     * menu type
     *
     * - "1": directory
     * - "2": menu
     */
    type MenuType = "1" | "2";

    type MenuButton = {
      /**
       * button code
       *
       * it can be used to control the button permission
       */
      code: string;
      /** button description */
      desc: string;
    };

    /**
     * icon type
     *
     * - "1": iconify icon
     * - "2": local icon
     */
    type IconType = "1" | "2";

    type MenuPropsOfRoute = Pick<
      import("@soybean-react/vite-plugin-react-router").RouteMeta,
      | "activeMenu"
      | "constant"
      | "fixedIndexInTab"
      | "hideInMenu"
      | "href"
      | "i18nKey"
      | "keepAlive"
      | "multiTab"
      | "order"
      | "query"
    >;

    type Menu = Common.CommonRecord<{
      /** buttons */
      buttons?: MenuButton[] | null;
      /** children menu */
      children?: Menu[] | null;
      /** component */
      component?: string;
      /** iconify icon name or local icon name */
      icon: string;
      /** icon type */
      iconType: IconType;
      /** menu name */
      menuName: string;
      /** menu type */
      menuType: MenuType;
      /** parent menu id */
      parentId: number;
      /** route name */
      routeName: string;
      /** route path */
      routePath: string;
    }> &
      MenuPropsOfRoute;

    /** menu list */
    type MenuList = Common.PaginatingQueryRecord<Menu>;

    type MenuTree = {
      children?: MenuTree[];
      id: number;
      label: string;
      pId: number;
    };
  }
}
