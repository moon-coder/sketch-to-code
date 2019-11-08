import * as sdk from './fetch'

import isMock from './mock-util'
const controllerName = 'Menu-Api'

/**
 *
 * 新增Menu
 *
 */
async function saveMenu(menuReq: ISaveMenuMenuReqReq): Promise<unknown> {
  let result = await sdk.post<unknown>(
    '/mg/menu',

    {
      ...menuReq
    }
  )
  return result.info
}

/**
 *
 * 更新Menu
 *
 */
async function updateMenu(menuReq: IUpdateMenuMenuReqReq): Promise<unknown> {
  let result = await sdk.put<unknown>(
    '/mg/menu',

    {
      ...menuReq
    }
  )
  return result.info
}

/**
 *
 * 查询单个Menu
 *
 */
async function queryMenuById(id: IQueryMenuByIdIdReq): Promise<unknown> {
  let result = await sdk.get<unknown>(
    '/mg/menu/{id}'.replace('{id}', id + ''),

    {}
  )
  return result.info
}

/**
 *
 * 查询当前用户所授权的所有Menu
 *
 */
async function queryMenus(): Promise<unknown> {
  let result = await sdk.get<unknown>(
    '/mg/menus',

    {}
  )
  return result.info
}

/**
 *
 * 显示某个角色下的菜单树（包括全部菜单和已授权菜单）
 *
 */
async function queryRoleMenus(
  roleId: IQueryRoleMenusRoleIdReq
): Promise<unknown> {
  let result = await sdk.get<unknown>(
    '/mg/rolemenus',

    {
      roleId
    }
  )
  return result.info
}

export default {
  saveMenu,

  updateMenu,

  queryMenuById,

  queryMenus,

  queryRoleMenus
}

/**
 * id
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IQueryMenuByIdIdReq".
 */
export type IQueryMenuByIdIdReq = number
/**
 * roleId
 *
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "IQueryRoleMenusRoleIdReq".
 */
export type IQueryRoleMenusRoleIdReq = number

export interface IgnoreType {
  [k: string]: any
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "Menu请求体".
 */
export interface Menu {
  /**
   * 菜单属性
   */
  attributes?: string
  /**
   * 认证方式：0: sso token cookie（默认，域名相同）; 1: sso token request param（域名不同）; 2:account&password (第三方应用，配合application_account)
   */
  authType?: number
  /**
   * 编码
   */
  code?: string
  /**
   * 创建时间
   */
  createTime?: string
  /**
   * 创建人 钉钉用户ID
   */
  createUser?: number
  /**
   * 菜单描述
   */
  description?: string
  /**
   * 0：应用内显示；1：iframe；2：弹窗；3：新页签
   */
  displayType?: number
  /**
   * icon
   */
  icon?: string
  /**
   * id
   */
  id?: number
  /**
   * 删除标记(0:正常，1:删除)
   */
  isDeleted?: number
  /**
   * 菜单名称
   */
  name?: string
  /**
   * 排序
   */
  orderId?: number
  /**
   * 父级菜单ID，没有即为0
   */
  parentId?: number
  /**
   * 状态
   */
  status?: number
  /**
   * 修改时间
   */
  updateTime?: string
  /**
   * 修改人 钉钉用户ID
   */
  updateUser?: number
  /**
   * 应用url
   */
  url?: string
  /**
   * wiki url
   */
  wikiUrl?: string
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
 * via the `definition` "Response«Menu响应体»".
 */
export interface ResponseMenu {
  /**
   * 响应编码成功：0
   */
  code: string
  info?: Menu1
  /**
   * 错误描述，成功：OK
   */
  msg?: string
  [k: string]: any
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "Menu响应体".
 */
export interface Menu1 {
  /**
   * 菜单属性
   */
  attributes?: string
  /**
   * 认证方式：0: sso token cookie（默认，域名相同）; 1: sso token request param（域名不同）; 2:account&password (第三方应用，配合application_account)
   */
  authType?: number
  /**
   * 编码
   */
  code?: string
  /**
   * 创建时间
   */
  createTime?: string
  /**
   * 创建人 钉钉用户ID
   */
  createUser?: number
  /**
   * 菜单描述
   */
  description?: string
  /**
   * 0：应用内显示；1：iframe；2：弹窗；3：新页签
   */
  displayType?: number
  /**
   * icon
   */
  icon?: string
  /**
   * id
   */
  id?: number
  /**
   * 删除标记(0:正常，1:删除)
   */
  isDeleted?: number
  /**
   * 菜单名称
   */
  name?: string
  /**
   * 排序
   */
  orderId?: number
  /**
   * 父级菜单ID，没有即为0
   */
  parentId?: number
  /**
   * 状态
   */
  status?: number
  /**
   * 修改时间
   */
  updateTime?: string
  /**
   * 修改人 钉钉用户ID
   */
  updateUser?: number
  /**
   * 应用url
   */
  url?: string
  /**
   * wiki url
   */
  wikiUrl?: string
  [k: string]: any
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ISaveMenuMenuReqReq".
 */
export interface ISaveMenuMenuReqReq {
  /**
   * 菜单属性
   */
  attributes?: string
  /**
   * 认证方式：0: sso token cookie（默认，域名相同）; 1: sso token request param（域名不同）; 2:account&password (第三方应用，配合application_account)
   */
  authType?: number
  /**
   * 编码
   */
  code?: string
  /**
   * 创建时间
   */
  createTime?: string
  /**
   * 创建人 钉钉用户ID
   */
  createUser?: number
  /**
   * 菜单描述
   */
  description?: string
  /**
   * 0：应用内显示；1：iframe；2：弹窗；3：新页签
   */
  displayType?: number
  /**
   * icon
   */
  icon?: string
  /**
   * id
   */
  id?: number
  /**
   * 删除标记(0:正常，1:删除)
   */
  isDeleted?: number
  /**
   * 菜单名称
   */
  name?: string
  /**
   * 排序
   */
  orderId?: number
  /**
   * 父级菜单ID，没有即为0
   */
  parentId?: number
  /**
   * 状态
   */
  status?: number
  /**
   * 修改时间
   */
  updateTime?: string
  /**
   * 修改人 钉钉用户ID
   */
  updateUser?: number
  /**
   * 应用url
   */
  url?: string
  /**
   * wiki url
   */
  wikiUrl?: string
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
 * via the `definition` "IUpdateMenuMenuReqReq".
 */
export interface IUpdateMenuMenuReqReq {
  /**
   * 菜单属性
   */
  attributes?: string
  /**
   * 认证方式：0: sso token cookie（默认，域名相同）; 1: sso token request param（域名不同）; 2:account&password (第三方应用，配合application_account)
   */
  authType?: number
  /**
   * 编码
   */
  code?: string
  /**
   * 创建时间
   */
  createTime?: string
  /**
   * 创建人 钉钉用户ID
   */
  createUser?: number
  /**
   * 菜单描述
   */
  description?: string
  /**
   * 0：应用内显示；1：iframe；2：弹窗；3：新页签
   */
  displayType?: number
  /**
   * icon
   */
  icon?: string
  /**
   * id
   */
  id?: number
  /**
   * 删除标记(0:正常，1:删除)
   */
  isDeleted?: number
  /**
   * 菜单名称
   */
  name?: string
  /**
   * 排序
   */
  orderId?: number
  /**
   * 父级菜单ID，没有即为0
   */
  parentId?: number
  /**
   * 状态
   */
  status?: number
  /**
   * 修改时间
   */
  updateTime?: string
  /**
   * 修改人 钉钉用户ID
   */
  updateUser?: number
  /**
   * 应用url
   */
  url?: string
  /**
   * wiki url
   */
  wikiUrl?: string
  [k: string]: any
}

//create by moon https://github.com/creasy2010/moon
