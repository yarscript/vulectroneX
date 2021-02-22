import request from "@/utils/request";
import { mapTrackPlayableStatus } from "@/utils/common";

/**
 * @param {number} id
 */
export function getArtist(id) {
  return request({
    url: "/artists",
    method: "get",
    params: {
      id,
      timestamp: new Date().getTime(),
    },
  }).then((data) => {
    data.hotSongs = mapTrackPlayableStatus(data.hotSongs);
    return data;
  });
}

/**
 * @param {Object} params
 * @param {number} params.id
 * @param {number=} params.limit
 * @param {number=} params.offset
 */
export function getArtistAlbum(params) {
  return request({
    url: "/artist/album",
    method: "get",
    params,
  });
}

/**
 * @param {number=} type
 */
export function toplistOfArtists(type = null) {
  return request({
    url: "/toplist/artist",
    method: "get",
    params: {
      type,
    },
  });
}
/**
 * @param {number} params.id
 * @param {number} params.offset
 * @param {number} params.limit
 */
export function artistMv(params) {
  return request({
    url: "/artist/mv",
    method: "get",
    params,
  });
}

/**
 * @param {Object} params
 * @param {number} params.id
 * @param {number} params.t
 */
export function followAArtist(params) {
  return request({
    url: "/artist/sub",
    method: "post",
    params,
  });
}

/**
 * - id: id
 * @param {number} id
 */
export function similarArtists(id) {
  return request({
    url: "/simi/artist",
    method: "post",
    params: { id },
  });
}
