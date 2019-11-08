// /**
//  * Base on umi-request
//  * See https://github.com/umijs/umi-request
//  */
// import { NewRequest } from '@lego/kit'
//
// const request = NewRequest()
//
// request.interceptors.request.use((url, options) => {
//   const { headers } = options
//   // @ts-ignore
//   headers['x-requested-with'] = 'XMLHttpRequest'
//
//   return {
//     url,
//     options: {
//       ...options,
//       headers
//     }
//   }
// })
//
// request.interceptors.response.use(response => {
//   const cloneResponse = response.clone()
//   const { status, headers } = cloneResponse
//   if (status === 403) {
//     const redirect = headers.get('redirect') || ''
//     window.location.href = redirect
//   }
//   return response
// })
//
// export default request
