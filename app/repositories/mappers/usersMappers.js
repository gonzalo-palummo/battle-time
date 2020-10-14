export function userMapper(user) {
  return {
    id: user?.id,
    name: user?.name,
    lastName: user?.lastname,
    nickname: user?.nickname,
    email: user?.email,
    avatar: user?.avatar,
    points: user?.points,
    biography: user?.biography,
    country: {
      id: user?.country?.id,
      name: user?.country?.name,
    },
    level: {
      name: user?.level?.name,
    },
    profile: {
      id: user?.profile?.id,
      name: user?.profile?.name,
    },
    googleId: user?.google_id,
    facebookId: user?.facebook_id,
    battleViews: user?.viewsBattles,
    won: user?.countWon,
    losses: user?.countLosses,
    trophies: user?.trophies,
    shells: user?.shells,
    tournamentUser: {
      position: user?.tournament_user?.position,
    },
  };
}

export function usersMapper(users) {
  const usersArray = [];
  users.forEach(user => {
    usersArray.push(userMapper(user));
  });
  return usersArray;
}

function profileMapper(profile) {
  return {
    id: profile.id,
    name: profile.name,
  };
}

export function profilesMapper(profiles) {
  const profilesArray = [];
  profiles.forEach(profile => {
    profilesArray.push(profileMapper(profile));
  });
  return profilesArray;
}
