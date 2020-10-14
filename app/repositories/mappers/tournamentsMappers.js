import {userMapper} from './usersMappers';

function phasesMapper(phases) {
  const phasesArray = [];
  phases.forEach(phase => {
    phasesArray.push({
      time: phase.time,
      name: phase.name,
    });
  });
  return phasesArray;
}

export function tournamentsMapper(tournaments) {
  const tournamentsArray = [];

  if (tournaments.length) {
    tournaments.forEach(tournament => {
      const usersTournament = [];
      tournament.users.forEach(user => {
        usersTournament.push(userMapper(user));
      });
      tournamentsArray.push({
        id: tournament.id,
        name: tournament.name,
        image: tournament.image_url,
        description: tournament.description,
        users: usersTournament,
        entryShells: tournament.entry_shells,
        prize: tournament.award,
        minLevel: tournament.min_level,
        maxLevel: tournament.max_level,
        date: tournament.date,
        time: tournament.time,
        phases: phasesMapper(tournament.phases),
      });
    });
  }

  return tournamentsArray;
}
