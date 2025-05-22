/**
 * Namespace Api
 *
 * All backend api type
 */
declare namespace Api {
  namespace Common {
    /** common params of paginating */
    interface PaginatingCommonParams {
      // 分页接口返回的页码
      pageNum: number;
      // 分页接口返回的每页数据条数
      pageSize: number;
      // 分页接口查询参数
      pn: number;
      // 分页接口查询参数
      ps: number;
      /** total count */
      total: number;
    }

    /** common params of paginating query list data */
    interface PaginatingQueryRecord<T = any> extends PaginatingCommonParams {
      list: T[];
    }

    type CommonSearchParams = Pick<Common.PaginatingCommonParams, 'pn' | 'ps'>;
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

    interface UserInfo {
      businessStatus: number;
      businessStatusName: string;
      createdTime: string;
      effectiveTime: string;
      email: string;
      externalUserId: string;
      id: number;
      name: string;
      number: string;
      phone: string;
      platform: string;
      roleIdList: number[];
      sex: number;
      sexName: string;
      status: number;
      statusName: string;
      uniqueId: string[];
    }

    type Info = {
      token: LoginToken['number'];
      userInfo: UserInfo;
    };
  }

  /**
   * namespace Route
   *
   * backend api module: "route"
   */
  namespace Route {
    type ElegantConstRoute = import('@soybean-react/vite-plugin-react-router').ElegantConstRoute;

    interface MenuRoute extends ElegantConstRoute {
      id: string;
    }

    interface UserRoute {
      home: import('@soybean-react/vite-plugin-react-router').LastLevelRouteKey;
      routes: string[];
    }
  }
}
