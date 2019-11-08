import * as sdk from './fetch'

import isMock from './mock-util'
const controllerName = 'Resource-Api'

/**
 *
 * 查询所有permission(网关用)
 *
 */
async function queryPermissions(): Promise<unknown> {
  let result = await sdk.get<unknown>(
    '/biz/permissions',

    {}
  )
  return result.info
}

/**
 *
 * 添加resource
 *
 */
async function addResource(resourceReq: IAddResourceResourceReqReq): Promise<unknown> {
  let result = await sdk.post<unknown>(
    '/biz/resource',

    {
      ...resourceReq
    }
  )
  return result.info
}

/**
 *
 * 查询所有resource
 *
 */
async function queryResources(): Promise<ResourceRespArray> {
  let result = await sdk.get<ResourceRespArray>(
    '/biz/resources',

    {}
  )
  return result.info
}

/**
 *
 * 查询某个用户所有的resource
 *
 */
async function queryUserResources(
  userId: IQueryUserResourcesUserIdReq
): Promise<ResourceRespArray> {
  let result = await sdk.get<ResourceRespArray>(
    '/biz/userresources',

    {
      userId
    }
  )
  return result.info
}

export default {
  queryPermissions,

  addResource,

  queryResources,

  queryUserResources
}

export type ResourceRespArray = ResourceResp[]
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ResourceRespArray".
 */
export type ResourceRespArray1 = ResourceResp[]
/**
 * userId
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IQueryUserResourcesUserIdReq".
 */
export type IQueryUserResourcesUserIdReq = number

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
 * via the `definition` "ResourceReq".
 */
export interface ResourceReq {
  delFlag?: number
  method?: string
  parentId?: number
  remark?: string
  resourceCode?: string
  resourceId?: number
  resourceName?: string
  resourceType?: number
  resourceUrl?: string
  status?: number
  [k: string]: any
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "Response«List«ResourceResp»»".
 */
export interface ResponseListResourceResp {
  code?: number
  info?: ResourceRespArray
  msg?: string
  [k: string]: any
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ResourceResp".
 */
export interface ResourceResp {
  appId?: number
  createTime?: string
  creator?: number
  dataCode?: string
  dataId?: number
  dataType?: string
  delFlag?: number
  method?: string
  operator?: number
  parentId?: number
  remark?: string
  resourceCode?: string
  resourceId?: number
  resourceName?: string
  resourceType?: number
  resourceUrl?: string
  status?: number
  updateTime?: string
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
 * via the `definition` "IAddResourceResourceReqReq".
 */
export interface IAddResourceResourceReqReq {
  delFlag?: number
  method?: string
  parentId?: number
  remark?: string
  resourceCode?: string
  resourceId?: number
  resourceName?: string
  resourceType?: number
  resourceUrl?: string
  status?: number
  [k: string]: any
}

//create by moon https://github.com/creasy2010/moon
