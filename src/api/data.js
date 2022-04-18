import * as api from './api.js';

export const login = api.login;
export const logout = api.logout;
export const register = api.register;

export async function getAllTheaters() {
    return api.get('/data/theaters?sortBy=_createdOn%20desc&distinct=title')
}
export async function getTheaterById(id) {
    return api.get(`/data/theaters/` + id)
}
export async function getMyTheaters(userId) {
    return api.get(`/data/theaters?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`)
}
export async function createTheater(data) {
    return api.post('/data/theaters', data)
}
export async function editTheater(id, data) {
    return api.put('/data/theaters/' + id, data)
}
export async function deleteTheater(id) {
    return api.del('/data/theaters/' + id)
}
// // za like-ovete
// export async function likeBook(bookId) {
//     return api.post('', {
//         bookId
//     });
// }
// export async function getLikesByBookId(bookId) {
//     return api.get(`/data/likes?where=bookId%3D%22${bookId}%22&distinct=_ownerId&count`)
// }
// export async function getMyLikeByBookId(bookId, userId) {
//     return api.get(`/data/likes?where=bookId%3D%22${bookId}%22%20and%20_ownerId%3D%22${userId}%22&count`)
// }
// window.likeBook = likeBook;
// window.getLikesByBookId = getLikesByBookId
// window.getMyLikeByBookId = getMyLikeByBookId;