import {userMapper} from './usersMappers';

export function battleMapper(battle) {
  const usersBattle = [];
  battle.users.forEach(user => {
    usersBattle.push(userMapper(user));
  });

  return {
    id: battle.id,
    urlMp4: battle.url_mp4,
    users: usersBattle,
    words: battle.words,
  };
}

export function battlesMapper(battles) {
  const battlesArray = [];
  if (battles.length) {
    battles.forEach(battle => {
      battlesArray.push(battleMapper(battle));
    });
  }

  return battlesArray;
}

export function wordsMapper(words) {
  const wordsArray = [];
  if (words.length) {
    words.forEach(word => {
      wordsArray.push(word.word);
    });
  }
  return wordsArray;
}
