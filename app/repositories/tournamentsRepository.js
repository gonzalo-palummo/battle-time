import Repository from './Repository';
import {tournamentsMapper} from './mappers/tournamentsMappers';
const resource = '/tournament';

export default {
  async getAvailable() {
    return tournamentsMapper(await Repository.get(`${resource}/available`));
  },
  async getRecent() {
    return tournamentsMapper(await Repository.get(`${resource}/latests`));
  },
  async join(tournamentId) {
    const DTO = {
      tournament_id: tournamentId,
    };
    return await Repository.get(`${resource}/join`, DTO);
  },
  async unjoin(tournamentId) {
    const DTO = {
      tournament_id: tournamentId,
    };
    return await Repository.get(`${resource}/unjoin`, DTO);
  },
  async getUserTournaments() {
    return tournamentsMapper(await Repository.get(`${resource}/user-tournaments`));
  },
};
