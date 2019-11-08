import * as sdk from './fetch'

import isMock from './mock-util'
const controllerName = 'UserRole-Api'

/**
 *
 * 添加或更新userRole
 *
 */
async function saveOrUpdateUserRole(req: ISaveOrUpdateUserRoleReqReq): Promise<unknown> {
  let result = await sdk.post<unknown>(
    '/biz/userrole',

    {
      ...req
    }
  )
  return result.info
}

/**
 *
 * 查询当前用户所有的Role
 *
 */
async function queryUserRoles(): Promise<unknown> {
  let result = await sdk.get<unknown>(
    '/biz/userroles',

    {}
  )
  return result.info
}

export default {
  saveOrUpdateUserRole,

  queryUserRoles
}

export interface IgnoreType {
  [k: string]: any
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "MGUserRolesReq".
 */
export interface MGUserRolesReq {
  /**
   * roleIds
   */
  roleIds?: number[]
  /**
   * userId
   */
  userId?: number
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
 * via the `definition` "ISaveOrUpdateUserRoleReqReq".
 */
export interface ISaveOrUpdateUserRoleReqReq {
  /**
   * roleIds
   */
  roleIds?: number[]
  /**
   * userId
   */
  userId?: number
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
