import store from "@/store";
import request from "@/utils/request";
import { mapTrackPlayableStatus } from "@/utils/common";
/**
 * @param {string} id
 */
export function getMP3(id) {
  let br =
    store.state.settings?.musicQuality !== undefined
      ? store.state.settings.musicQuality
      : 320000;
  return request({
    url: "/song/url",
    method: "get",
    params: {
      id,
      br,
    },
  });
}
/**
 * @param {string} ids
 */
export function getTrackDetail(ids) {
  return request({
    url: "/song/detail",
    method: "get",
    params: {
      ids,
    },
  }).then((data) => {
    data.songs = mapTrackPlayableStatus(data.songs, data.privileges);
    return data;
  });
}
/**
 * 获取歌词
 * 说明 : 调用此接口 , 传入音乐 id 可获得对应音乐的歌词 ( 不需要登录 )
 * @param {number} id - 音乐 id
 */

export function getLyric(id) {
  return request({
    url: "/lyric",
    method: "get",
    params: {
      id,
    },
  });
}
/**
 * 新歌速递
 * 说明 : 调用此接口 , 可获取新歌速递
 * @param {number} type - 地区类型 id, 对应以下: 全部:0 华语:7 欧美:96 日本:8 韩国:16
 */
export function topSong(type) {
  return request({
    url: "/top/song",
    method: "get",
    params: {
      type,
    },
  });
}
/**
 * 喜欢音乐
 * 说明 : 调用此接口 , 传入音乐 id, 可喜欢该音乐
 * - id - 歌曲 id
 * - like - 默认为 true 即喜欢 , 若传 false, 则取消喜欢
 * @param {Object} params
 * @param {number} params.id
 * @param {boolean=} [params.like]
 */
export function likeATrack(params) {
  params.timestamp = new Date().getTime();
  return request({
    url: "/like",
    method: "get",
    params,
  });
}

/**
 * 听歌打卡
 * 说明 : 调用此接口 , 传入音乐 id, 来源 id，歌曲时间 time，更新听歌排行数据
 * - id - 歌曲 id
 * - sourceid - 歌单或专辑 id
 * - time - 歌曲播放时间,单位为秒
 * @param {Object} params
 * @param {number} params.id
 * @param {number} params.sourceid
 * @param {number=} params.time
 */
export function scrobble(params) {
  params.timestamp = new Date().getTime();
  return request({
    url: "/scrobble",
    method: "get",
    params,
  });
}
