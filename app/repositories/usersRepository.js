import Repository from './Repository';
import {userMapper, usersMapper, profilesMapper} from './mappers/usersMappers';
import axios from 'axios';
import {store} from 'app/store/index';
import {BaseSetting} from '@config';
const resource = '/users';

export default {
  async get() {
    return userMapper(await Repository.get(`${resource}/user`));
  },
  async getShells() {
    return await Repository.get('/user/shells');
  },
  async getRanking() {
    return usersMapper(await Repository.get(`${resource}/ranking`));
  },
  async getProfiles() {
    return profilesMapper(await Repository.get('/profiles'));
  },
  async edit(DTO) {
    return userMapper(await Repository.put(`${resource}/user`, DTO));
  },
  async editAvatar(avatar, type) {
    const data = new FormData();
    data.append('avatar', {uri: avatar, name: 'image.jpg', type});
    return await Repository.post('/user/avatar', data);
  },
  async signUp(DTO) {
    return await Repository.post(`/user/create`, DTO);
  },
  async newPassword(password, newPassword) {
    const DTO = {
      currentPassword: password,
      newPassword,
    };
    return await Repository.put(`/user/password`, DTO);
  },
  async resetPassword(email) {
    const DTO = {email};
    return await Repository.post(`/forgot_password`, DTO);
  },
};
