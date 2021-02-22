import request from "@/utils/request";

/**
 *
 */
export function userDetail(uid) {
    return this.request({
        url   : "/user/detail",
        method: "get",
        params: {
            uid,
        },
    });
}

/**
 *
 */
export function me() {
    return request({
        url   : '/me',
        method: 'get',
    })
}

export function logout() {
    return request({
        url   : '/logout',
        method: 'get'
    })
}

/**
 * @param {Object} params
 * @param {number} params.uid
 * @param {number} params.limit
 * @param {number=} params.offset
 */
export function userPlaylist(params) {
    return request({
        url   : "/user/playlist",
        method: "get",
        params,
    });
}

/**
 * @param {number} uid
 */
export function userLikedSongsIDs(uid) {
    return request({
        url   : "/likelist",
        method: "get",
        params: {
            uid,
            timestamp: new Date().getTime(),
        },
    });
}

/**
 * @param {number} type
 */
export function dailySignin(type = 0) {
    return request({
        url   : "/daily_signin",
        method: "post",
        params: {
            type,
            timestamp: new Date().getTime(),
        },
    });
}


/**
 *
 */
export function likedAlbums() {
    return request({
        url   : "/album/sublist",
        method: "get",
        params: {
            timestamp: new Date().getTime(),
        },
    });
}

/**
 *
 */
export function likedArtists() {
    return request({
        url   : "/artist/sublist",
        method: "get",
        params: {
            timestamp: new Date().getTime(),
        },
    });
}

/**
 *
 */
export function likedMVs() {
    return request({
        url   : "/mv/sublist",
        method: "get",
        params: {
            timestamp: new Date().getTime(),
        },
    });
}
