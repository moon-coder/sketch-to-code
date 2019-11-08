import * as sdk from './fetch'

import isMock from './mock-util'
const controllerName = 'AppLog-Api'

/**
 *
 * 新增AppLog
 *
 */
async function saveAppLog(applogReq: ISaveAppLogApplogReqReq): Promise<unknown> {
  let result = await sdk.post<unknown>(
    '/mg/applog',

    {
      ...applogReq
    }
  )
  return result.info
}

/**
 *
 * 查询单个AppLog
 *
 */
async function queryAppLogById(id: IQueryAppLogByIdIdReq): Promise<AppLogResp> {
  let result = await sdk.get<AppLogResp>(
    '/mg/applog/{id}'.replace('{id}', id + ''),

    {}
  )
  return result.info
}

/**
 *
 * 根据appId查询所有AppLog
 *
 */
async function queryByPage(
  appId: IQueryByPageAppIdReq,
  pageNum: IQueryByPagePageNumReq,
  pageSize: IQueryByPagePageSizeReq
): Promise<unknown> {
  let result = await sdk.get<unknown>(
    '/mg/applogs',

    {
      appId,

      pageNum,

      pageSize
    }
  )
  return result.info
}

export default {
  saveAppLog,

  queryAppLogById,

  queryByPage
}

/**
 * id
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IQueryAppLogByIdIdReq".
 */
export type IQueryAppLogByIdIdReq = number
/**
 * appId
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IQueryByPageAppIdReq".
 */
export type IQueryByPageAppIdReq = string
/**
 * pageNum
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IQueryByPagePageNumReq".
 */
export type IQueryByPagePageNumReq = string
/**
 * pageSize
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IQueryByPagePageSizeReq".
 */
export type IQueryByPagePageSizeReq = string

export interface IgnoreType {
  [k: string]: any
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "AppLogReq".
 */
export interface AppLogReq {
  /**
   * 应用ID
   */
  applicationId?: number
  /**
   * 日志内容
   */
  content?: string
  /**
   * 创建时间
   */
  createTime?: string
  /**
   * 创建人 钉钉用户ID
   */
  createUser?: number
  /**
   * id
   */
  id?: number
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
 * via the `definition` "Response«AppLogResp»".
 */
export interface ResponseAppLogResp {
  /**
   * 响应编码成功：0
   */
  code: string
  info?: AppLogResp
  /**
   * 错误描述，成功：OK
   */
  msg?: string
  [k: string]: any
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "AppLogResp".
 */
export interface AppLogResp {
  /**
   * 应用ID
   */
  applicationId?: number
  /**
   * 日志内容
   */
  content?: string
  /**
   * 创建时间
   */
  createTime?: string
  /**
   * 创建人 钉钉用户ID
   */
  createUser?: number
  /**
   * id
   */
  id?: number
  /**
   * 钉钉用户ID
   */
  userId?: number
  [k: string]: any
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ISaveAppLogApplogReqReq".
 */
export interface ISaveAppLogApplogReqReq {
  /**
   * 应用ID
   */
  applicationId?: number
  /**
   * 日志内容
   */
  content?: string
  /**
   * 创建时间
   */
  createTime?: string
  /**
   * 创建人 钉钉用户ID
   */
  createUser?: number
  /**
   * id
   */
  id?: number
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

//create by moon https://github.com/creasy2010/moon
