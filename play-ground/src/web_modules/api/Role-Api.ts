import * as sdk from './fetch'

import isMock from './mock-util'
const controllerName = 'Role-Api'

/**
 *
 * 查询单个Role value
 *
 */
async function queryRole(roleId: IQueryRoleRoleIdReq): Promise<RoleResp> {
  let result = await sdk.get<RoleResp>(
    '/biz/role',

    {
      roleId
    }
  )
  return result.info
}

/**
 *
 * 新增Role
 *
 */
async function addRole(roleReq: IAddRoleRoleReqReq): Promise<unknown> {
  let result = await sdk.post<unknown>(
    '/biz/role',

    {
      ...roleReq
    }
  )
  return result.info
}

/**
 *
 * 修改Role
 *
 */
async function updateRole(roleReq: IUpdateRoleRoleReqReq): Promise<unknown> {
  let result = await sdk.put<unknown>(
    '/biz/role',

    {
      ...roleReq
    }
  )
  return result.info
}

/**
 *
 * 删除Role
 *
 */
async function deleteRole_(roleId: IDeleteRole_RoleIdReq): Promise<unknown> {
  let result = await sdk.deleteF<unknown>(
    '/biz/role',

    {
      roleId
    }
  )
  return result.info
}

/**
 *
 * 查询所有Role
 *
 */
async function queryRoles(): Promise<RoleRespArray> {
  let result = await sdk.get<RoleRespArray>(
    '/biz/roles',

    {}
  )
  return result.info
}

export default {
  queryRole,

  addRole,

  updateRole,

  deleteRole_,

  queryRoles
}

export type RoleRespArray = RoleResp[]
/**
 * roleId
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IQueryRoleRoleIdReq".
 */
export type IQueryRoleRoleIdReq = number
/**
 * roleId
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IDeleteRole_RoleIdReq".
 */
export type IDeleteRole_RoleIdReq = number
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "RoleRespArray".
 */
export type RoleRespArray1 = RoleResp[]

export interface IgnoreType {
  [k: string]: any
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "Response«RoleResp»".
 */
export interface ResponseRoleResp {
  code?: number
  info?: RoleResp
  msg?: string
  [k: string]: any
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "RoleResp".
 */
export interface RoleResp {
  appId?: number
  appName?: string
  createTime?: string
  creator?: number
  delFlag?: number
  dept?: DeptResp
  operator?: number
  remark?: string
  resourceList?: ResourceResp[]
  roleCode?: string
  roleId?: number
  rolename?: string
  status?: number
  tenantId?: number
  tenantName?: string
  updateTime?: string
  [k: string]: any
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "DeptResp".
 */
export interface DeptResp {
  appId?: number
  appName?: string
  createTime?: string
  creator?: number
  delFlag?: number
  deptId?: number
  deptName?: string
  operator?: number
  parentId?: number
  remark?: string
  status?: number
  tenantId?: string
  tenantName?: string
  updateTime?: string
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
 * via the `definition` "RoleReq".
 */
export interface RoleReq {
  deptId?: number
  remark?: string
  resourceIds?: number[]
  roleCode?: string
  roleId?: number
  rolename?: string
  status?: number
  [k: string]: any
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "Response«long»".
 */
export interface ResponseLong {
  code?: number
  info?: number
  msg?: string
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
 * via the `definition` "Response«List«RoleResp»»".
 */
export interface ResponseListRoleResp {
  code?: number
  info?: RoleRespArray
  msg?: string
  [k: string]: any
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IAddRoleRoleReqReq".
 */
export interface IAddRoleRoleReqReq {
  deptId?: number
  remark?: string
  resourceIds?: number[]
  roleCode?: string
  roleId?: number
  rolename?: string
  status?: number
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
 * via the `definition` "IUpdateRoleRoleReqReq".
 */
export interface IUpdateRoleRoleReqReq {
  deptId?: number
  remark?: string
  resourceIds?: number[]
  roleCode?: string
  roleId?: number
  rolename?: string
  status?: number
  [k: string]: any
}

//create by moon https://github.com/creasy2010/moon
