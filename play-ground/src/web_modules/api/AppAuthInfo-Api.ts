import * as sdk from './fetch'

import isMock from './mock-util'
const controllerName = 'AppAuthInfo-Api'

/**
 *
 * 新增AppAuthInfo
 *
 */
async function saveAppAuthInfo(authInfoReq: ISaveAppAuthInfoAuthInfoReqReq): Promise<unknown> {
  let result = await sdk.post<unknown>(
    '/mg/authinfo',

    {
      ...authInfoReq
    }
  )
  return result.info
}

/**
 *
 * 更新AppAuthInfo
 *
 */
async function updateAppAuthInfo(authInfoReq: IUpdateAppAuthInfoAuthInfoReqReq): Promise<unknown> {
  let result = await sdk.put<unknown>(
    '/mg/authinfo',

    {
      ...authInfoReq
    }
  )
  return result.info
}

/**
 *
 * 根据menuId查询单个AppAuthInfo
 *
 */
async function queryAppAuthInfoByMenuId(
  menuId: IQueryAppAuthInfoByMenuIdMenuIdReq
): Promise<AppAuthInfoResp> {
  let result = await sdk.get<AppAuthInfoResp>(
    '/mg/authinfo/bymenu/{menuId}'.replace('{menuId}', menuId + ''),

    {}
  )
  return result.info
}

/**
 *
 * 查询单个AppAuthInfo
 *
 */
async function queryAppAuthInfoById(id: IQueryAppAuthInfoByIdIdReq): Promise<AppAuthInfoResp> {
  let result = await sdk.get<AppAuthInfoResp>(
    '/mg/authinfo/{id}'.replace('{id}', id + ''),

    {}
  )
  return result.info
}

/**
 *
 * 查询所有AppAuthInfo
 *
 */
async function queryAppAuthInfos(): Promise<unknown> {
  let result = await sdk.get<unknown>(
    '/mg/authinfos',

    {}
  )
  return result.info
}

export default {
  saveAppAuthInfo,

  updateAppAuthInfo,

  queryAppAuthInfoByMenuId,

  queryAppAuthInfoById,

  queryAppAuthInfos
}

/**
 * menuId
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IQueryAppAuthInfoByMenuIdMenuIdReq".
 */
export type IQueryAppAuthInfoByMenuIdMenuIdReq = number
/**
 * id
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IQueryAppAuthInfoByIdIdReq".
 */
export type IQueryAppAuthInfoByIdIdReq = number

export interface IgnoreType {
  [k: string]: any
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "AppAuthInfoReq".
 */
export interface AppAuthInfoReq {
  /**
   * 认证信息，加密存储
   */
  authInfo?: string
  /**
   * 创建时间
   */
  createTime?: string
  /**
   * 创建人 钉钉用户ID
   */
  createUser?: number
  /**
   * 应用描述
   */
  description?: string
  /**
   * id
   */
  id?: number
  /**
   * 删除标记(0:正常，1:删除)
   */
  isDeleted?: number
  /**
   * 菜单ID
   */
  menuId?: number
  /**
   * 加密盐
   */
  salt?: string
  /**
   * 修改时间
   */
  updateTime?: string
  /**
   * 修改人 钉钉用户ID
   */
  updateUser?: number
  /**
   * 钉钉用户ID
   */
  userId?: number
  [k: string]: any
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "Response".
 */
export interface Response {
  /**
   * 响应编码成功：0
   */
  code: string
  info?: {
    [k: string]: any
  }
  /**
   * 错误描述，成功：OK
   */
  msg?: string
  [k: string]: any
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "Response«AppAuthInfoResp»".
 */
export interface ResponseAppAuthInfoResp {
  /**
   * 响应编码成功：0
   */
  code: string
  info?: AppAuthInfoResp
  /**
   * 错误描述，成功：OK
   */
  msg?: string
  [k: string]: any
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "AppAuthInfoResp".
 */
export interface AppAuthInfoResp {
  /**
   * 认证信息，加密存储
   */
  authInfo?: string
  /**
   * 创建时间
   */
  createTime?: string
  /**
   * 创建人 钉钉用户ID
   */
  createUser?: number
  /**
   * 应用描述
   */
  description?: string
  /**
   * id
   */
  id?: number
  /**
   * 删除标记(0:正常，1:删除)
   */
  isDeleted?: number
  /**
   * 菜单ID
   */
  menuId?: number
  /**
   * 加密盐
   */
  salt?: string
  /**
   * 修改时间
   */
  updateTime?: string
  /**
   * 修改人 钉钉用户ID
   */
  updateUser?: number
  /**
   * 钉钉用户ID
   */
  userId?: number
  [k: string]: any
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ISaveAppAuthInfoAuthInfoReqReq".
 */
export interface ISaveAppAuthInfoAuthInfoReqReq {
  /**
   * 认证信息，加密存储
   */
  authInfo?: string
  /**
   * 创建时间
   */
  createTime?: string
  /**
   * 创建人 钉钉用户ID
   */
  createUser?: number
  /**
   * 应用描述
   */
  description?: string
  /**
   * id
   */
  id?: number
  /**
   * 删除标记(0:正常，1:删除)
   */
  isDeleted?: number
  /**
   * 菜单ID
   */
  menuId?: number
  /**
   * 加密盐
   */
  salt?: string
  /**
   * 修改时间
   */
  updateTime?: string
  /**
   * 修改人 钉钉用户ID
   */
  updateUser?: number
  /**
   * 钉钉用户ID
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
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IUpdateAppAuthInfoAuthInfoReqReq".
 */
export interface IUpdateAppAuthInfoAuthInfoReqReq {
  /**
   * 认证信息，加密存储
   */
  authInfo?: string
  /**
   * 创建时间
   */
  createTime?: string
  /**
   * 创建人 钉钉用户ID
   */
  createUser?: number
  /**
   * 应用描述
   */
  description?: string
  /**
   * id
   */
  id?: number
  /**
   * 删除标记(0:正常，1:删除)
   */
  isDeleted?: number
  /**
   * 菜单ID
   */
  menuId?: number
  /**
   * 加密盐
   */
  salt?: string
  /**
   * 修改时间
   */
  updateTime?: string
  /**
   * 修改人 钉钉用户ID
   */
  updateUser?: number
  /**
   * 钉钉用户ID
   */
  userId?: number
  [k: string]: any
}

//create by moon https://github.com/creasy2010/moon
