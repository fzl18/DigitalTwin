import fetch from "@/utils/request";
// import { tokenName } from "@/config";

let request = fetch();
export async function login(data) {
  return request({
    url: "/auth/home",
    method: "get",
    data,
  });
}

export async function ssoLogin() {
  return request({
    url: "/auth/login",
    method: "post",
  });
}

// export function getUserInfo(accessToken) {
//   //此处为了兼容mock.js使用data传递accessToken，如果使用mock可以走headers
//   return request({
//     url: "/userInfo",
//     method: "post",
//     data: {
//       [tokenName]: accessToken,
//     },
//   });
// }

export function logout() {
  return request({
    url: "/auth/logout",
    method: "get",
  });
}

export function register() {
  return request({
    url: "/register",
    method: "post",
  });
}
