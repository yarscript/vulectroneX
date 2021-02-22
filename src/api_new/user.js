// import request from "@/utils/request";
//
// export class User
// {
//     /**
//      *
//      */
//     constructor() {
//         this.request = request;
//     }
//
//     userDetail(uid) {
//         return this.request({
//             url   : "/user/detail",
//             method: "get",
//             params: {
//                 uid,
//             },
//         });
//     }
//
//     me() {
//         return request({
//             url   : '/me',
//             method: 'get',
//         })
//     }
//
//     /**
//      * @param {Object} params
//      * @param {number} params.uid
//      * @param {number} params.limit
//      * @param {number=} params.offset
//      */
//     userPlaylist(params) {
//         return request({
//             url   : "/user/playlist",
//             method: "get",
//             params,
//         });
//     }
//
//     /**
//      * @param {number} uid
//      */
//     userLikedSongsIDs(uid) {
//         return request({
//             url   : "/likelist",
//             method: "get",
//             params: {
//                 uid,
//                 timestamp: new Date().getTime(),
//             },
//         });
//     }
//
//     /**
//      * @param {number} type
//      */
//     dailySignin(type = 0) {
//         return request({
//             url   : "/daily_signin",
//             method: "post",
//             params: {
//                 type,
//                 timestamp: new Date().getTime(),
//             },
//         });
//     }
//
//
//     /**
//      *
//      */
//     likedAlbums() {
//         return request({
//             url   : "/album/sublist",
//             method: "get",
//             params: {
//                 timestamp: new Date().getTime(),
//             },
//         });
//     }
//
//     /**
//      *
//      */
//     likedArtists() {
//         return request({
//             url   : "/artist/sublist",
//             method: "get",
//             params: {
//                 timestamp: new Date().getTime(),
//             },
//         });
//     }
//
//     /**
//      *
//      */
//     likedMVs() {
//         return request({
//             url   : "/mv/sublist",
//             method: "get",
//             params: {
//                 timestamp: new Date().getTime(),
//             },
//         });
//     }
// }
//
// export default new User();
