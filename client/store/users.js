import axios from 'axios';

const GET_USERS = 'GET_USERS';
const CHANGE_ADMIN_STATUS = 'CHANGE_ADMIN_STATUS';
const DELETE_USER = 'DELETE_USER';

const getUsers = users => ({ type: GET_USERS, users });
const changeStatus = user => ({ type: CHANGE_ADMIN_STATUS, user });
const deleteUser = id => ({ type: DELETE_USER, id });

export default function (users = [], action) {
  switch (action.type) {

    case GET_USERS:
      return action.users;

    case CHANGE_ADMIN_STATUS:
      return users.map(user => (
        action.user.id === user.id ? action.user : user
      ));

    case DELETE_USER:
      return users.filter(user => (
        action.id !== user.id
      ));

    default:
      return users;

  }
}

export const fetchUsers = () => (dispatch) => {
  return axios.get('/api/admin/users')
    .then(res => res.data)
    .then((users) => {
      dispatch(getUsers(users));
    })
    .catch(err => console.error('fetching users unsucessful', err));
};

export const changeAdminStatus = id => (dispatch) => {
  return axios.put(`/api/admin/users/${id}`)
    .then(res => res.data)
    .then((user) => {
      dispatch(changeStatus(user));
    })
    .catch(err => console.error('error changing status', err));
}

export const destroyUser = id => (dispatch) => {
  return axios.delete(`/api/admin/users/${id}`)
    .then(() => {
      console.log('HEERREE')
      dispatch(deleteUser(id));
    })
    .catch(err => console.error('Removing Users unsucessul', err));
}
