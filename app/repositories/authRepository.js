import Repository from './Repository';
const resource = '/auth';

export default {
  getTokenWithGoogle(token) {
    const DTO = {
      token,
      method: 'google',
    };
    return Repository.post('/auth_method', DTO);
  },
  getTokenWithFacebook(token) {
    const DTO = {
      token,
      method: 'facebook',
    };
    return Repository.post('/auth_method', DTO);
  },
  async signIn(DTO) {
    return await Repository.post(`${resource}`, DTO);
  },
};
