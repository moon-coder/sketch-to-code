import * as sdk from './fetch'

import isMock from './mock-util'
const controllerName = 'UserCustom-Api'

/**
 *
 * 新增UserCustom
 *
 */
async function saveUserCustom(userCustomReq: ISaveUserCustomUserCustomReqReq): Promise<unknown> {
  let result = await sdk.post<unknown>(
    '/mg/userCustom',

    {
      ...userCustomReq
    }
  )
  return result.info
}

/**
 *
 * 更新UserCustom
 *
 */
async function updateUserCustom(
  userCustomReq: IUpdateUserCustomUserCustomReqReq
): Promise<unknown> {
  let result = await sdk.put<unknown>(
    '/mg/userCustom',

    {
      ...userCustomReq
    }
  )
  return result.info
}

/**
 *
 * 根据userId查询用户自定义信息
 *
 */
async function queryByUserId(): Promise<UserCustom请求体> {
  let result = await sdk.get<UserCustom请求体>(
    '/mg/usercustom',

    {}
  )
  return result.info
}

export default {
  saveUserCustom,

  updateUserCustom,

  queryByUserId
}

export interface IgnoreType {
  [k: string]: any
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "UserCustom请求体".
 */
export interface UserCustom {
  /**
   * 其他属性
   */
  attributes?: string
  /**
   * 创建时间
   */
  createTime?: string
  /**
   * 创建人 钉钉用户ID
   */
  createUser?: number
  /**
   * 描述
   */
  description?: string
  /**
   * 用户收藏的菜单IDs
   */
  favMenuIds?: string
  /**
   * 用户收藏的菜单列表
   */
  favMenus?: Menu[]
  /**
   * 关注地区
   */
  focusArea?: string
  /**
   * id
   */
  id?: number
  /**
   * 删除标记(0:正常，1:删除)
   */
  isDeleted?: number
  /**
   * 主题
   */
  theme?: string
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
 * via the `definition` "Menu".
 */
export interface Menu {
  attributes?: string
  authType?: number
  checked?: boolean
  children?: Menu[]
  code?: string
  createTime?: string
  createUser?: number
  description?: string
  displayType?: number
  icon?: string
  id?: number
  isDeleted?: number
  name?: string
  orderId?: number
  parentId?: number
  resourceId?: number
  status?: number
  updateTime?: string
  updateUser?: number
  url?: string
  wikiUrl?: string
  [k: string]: any
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "Response«long»".
 */
export interface ResponseLong {
  /**
   * 响应编码成功：0
   */
  code: string
  info?: number
  /**
   * 错误描述，成功：OK
   */
  msg?: string
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
 * via the `definition` "Response«UserCustom请求体»".
 */
export interface ResponseUserCustom {
  /**
   * 响应编码成功：0
   */
  code: string
  info?: UserCustom
  /**
   * 错误描述，成功：OK
   */
  msg?: string
  [k: string]: any
}
/**
 * This interface was referenced by `IgnoreType`'s JSON-Schema
 * via the `definition` "ISaveUserCustomUserCustomReqReq".
 */
export interface ISaveUserCustomUserCustomReqReq {
  /**
   * 其他属性
   */
  attributes?: string
  /**
   * 创建时间
   */
  createTime?: string
  /**
   * 创建人 钉钉用户ID
   */
  createUser?: number
  /**
   * 描述
   */
  description?: string
  /**
   * 用户收藏的菜单IDs
   */
  favMenuIds?: string
  /**
   * 用户收藏的菜单列表
   */
  favMenus?: Menu[]
  /**
   * 关注地区
   */
  focusArea?: string
  /**
   * id
   */
  id?: number
  /**
   * 删除标记(0:正常，1:删除)
   */
  isDeleted?: number
  /**
   * 主题
   */
  theme?: string
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
 * via the `definition` "IUpdateUserCustomUserCustomReqReq".
 */
export interface IUpdateUserCustomUserCustomReqReq {
  /**
   * 其他属性
   */
  attributes?: string
  /**
   * 创建时间
   */
  createTime?: string
  /**
   * 创建人 钉钉用户ID
   */
  createUser?: number
  /**
   * 描述
   */
  description?: string
  /**
   * 用户收藏的菜单IDs
   */
  favMenuIds?: string
  /**
   * 用户收藏的菜单列表
   */
  favMenus?: Menu[]
  /**
   * 关注地区
   */
  focusArea?: string
  /**
   * id
   */
  id?: number
  /**
   * 删除标记(0:正常，1:删除)
   */
  isDeleted?: number
  /**
   * 主题
   */
  theme?: string
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
