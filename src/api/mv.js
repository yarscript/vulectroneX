import request from "@/utils/request";

/**
 * @param {number} mvid
 */
export function mvDetail(mvid) {
  return request({
    url: "/mv/detail",
    method: "get",
    params: {
      mvid,
      timestamp: new Date().getTime(),
    },
  });
}

/**
 * @param {Object} params
 * @param {number} params.id
 * @param {number=} params.r
 */
export function mvUrl(params) {
  return request({
    url: "/mv/url",
    method: "get",
    params,
  });
}

/**
 * @param {number} mvid
 */
export function simiMv(mvid) {
  return request({
    url: "/simi/mv",
    method: "get",
    params: { mvid },
  });
}

/**
 * @param {Object} params
 * @param {number} params.mvid
 * @param {number=} params.t
 */

export function likeAMV(params) {
  params.timestamp = new Date().getTime();
  return request({
    url: "/mv/sub",
    method: "post",
    params,
  });
}
