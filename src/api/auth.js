import request from "@/utils/request";

/**
 * @param {Object} params
 * @param {string} params.phone
 * @param {string} params.password
 * @param {string=} params.countrycode
 * @param {string=} params.md5_password
 */
export function loginWithPhone(params) {
  return request({
    url: "/login/cellphone",
    method: "post",
    params,
  });
}
/**
 * @param {Object} params
 * @param {string} params.email
 * @param {string} params.password
 * @param {string=} params.md5_password
 */
export function loginWithEmail(params) {
  return request({
    url: "/login",
    method: "post",
    params,
  });
}

/**
 * - /login/refresh
 */
export function refreshCookie() {
  return request({
    url: "/login/refresh",
    method: "post",
  });
}

/**
 *
 */
export function logout() {
  return request({
    url: "/logout",
    method: "post",
  });
}
