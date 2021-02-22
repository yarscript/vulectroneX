import request from "@/utils/request";
import { mapTrackPlayableStatus } from "@/utils/common";

/**
 * @param {number} id
 */
export function getAlbum(id) {
  return request({
    url: "/album",
    method: "get",
    params: {
      id,
    },
  }).then((data) => {
    data.songs = mapTrackPlayableStatus(data.songs);
    return data;
  });
}

/**
 * @param {Object} params
 * @param {number} params.limit
 * @param {number=} params.offset
 * @param {string} params.area
 */
export function newAlbums(params) {
  return request({
    url: "/album/new",
    method: "get",
    params,
  });
}

/**
 * @param {number} id
 */
export function albumDynamicDetail(id) {
  return request({
    url: "/album/detail/dynamic",
    method: "get",
    params: { id, timestamp: new Date().getTime() },
  });
}

/**
 * @param {Object} params
 * @param {number} params.id
 * @param {number} params.t
 */
export function likeAAlbum(params) {
  return request({
    url: "/album/sub",
    method: "post",
    params,
  });
}
