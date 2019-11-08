/**
 * @desc
 * @使用场景
 * @company qianmi.com
 * @Date    2019/6/5
 **/

//@ts-ignore
let mockApiInfo=__ApiMock__;

/**
 * 判断此api是否需要mock
 * @param {string} controller
 * @param {string} method
 * @returns {boolean}
 */
export default function isMockApi(controller:string,method:string){

  if(!mockApiInfo || !mockApiInfo[controller]){
    return false;
  }

  if(mockApiInfo[controller].includes(method)){
    console.warn(`调用mock接口${controller}.${method}`);
    return true;
  }else{
    return false;
  }
}