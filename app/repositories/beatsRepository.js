import Repository from './Repository';
import {beatsMapper} from './mappers/beatsMappers';
const resource = '/beats';

export default {
  async get() {
    return beatsMapper(await Repository.get(`${resource}`));
  },
};
