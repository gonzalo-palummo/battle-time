import AuthRepository from './authRepository';
import UsersRepository from './usersRepository';
import BattlesRepository from './battlesRepository';
import TournamentsRepository from './tournamentsRepository';
import BeatsRepository from './beatsRepository';

const repositories = {
  auth: AuthRepository,
  users: UsersRepository,
  battles: BattlesRepository,
  tournaments: TournamentsRepository,
  beats: BeatsRepository,
};

export const RepositoryFactory = {
  get: name => repositories[name],
};
