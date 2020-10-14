import Repository from './Repository';
import {battlesMapper, wordsMapper} from './mappers/battlesMappers';
const resource = '/battle';

export default {
  async getRecent() {
    return battlesMapper(await Repository.get(`${resource}/latests`));
  },

  async saveView(battleId) {
    const DTO = {battle_id: battleId};
    return await Repository.post(`${resource}/views`, DTO);
  },

  async getWords() {
    return wordsMapper(await Repository.get('words'));
  },
};
