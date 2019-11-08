import * as sdk from './fetch'

import isMock from './mock-util'
const controllerName = 'User-Api'

/**
 *
 * 查询单个钉钉用户
 *
 */
async function getDingUser(userId: IGetDingUserUserIdReq): Promise<unknown> {
  let result = await sdk.get<unknown>(
    '/biz/dinguser',

    {
      userId
    }
  )
  return result.info
}

/**
 *
 * 查询所有的钉钉用户
 *
 */
async function getDingUsers(): Promise<unknown> {
  let result = await sdk.get<unknown>(
    '/biz/dingusers',

    {}
  )
  return result.info
}

/**
 *
 * 分页查询钉钉用户
 *
 */
async function getDingUsersPage(
  name: IGetDingUsersPageNameReq,
  pageNum: IGetDingUsersPagePageNumReq,
  pageSize: IGetDingUsersPagePageSizeReq
): Promise<unknown> {
  let result = await sdk.get<unknown>(
    '/biz/dingusers/page',

    {
      name,

      pageNum,

      pageSize
    }
  )
  return result.info
}

export default {
  getDingUser,

  getDingUsers,

  getDingUsersPage
}

/**
 * userId
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IGetDingUserUserIdReq".
 */
export type IGetDingUserUserIdReq = string
/**
 * name
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IGetDingUsersPageNameReq".
 */
export type IGetDingUsersPageNameReq = string
/**
 * pageNum
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IGetDingUsersPagePageNumReq".
 */
export type IGetDingUsersPagePageNumReq = number
/**
 * pageSize
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IGetDingUsersPagePageSizeReq".
 */
export type IGetDingUsersPagePageSizeReq = number

export interface IgnoreType {
  [k: string]: any
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "Response".
 */
export interface Response {
  code?: number
  info?: {
    [k: string]: any
  }
  msg?: string
  [k: string]: any
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "undefined".
 */
export interface Undefined {
  [k: string]: any
}

//create by moon https://github.com/creasy2010/moon
