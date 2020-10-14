export function beatMapper(beat) {
  return {
    id: beat.id,
    name: beat.name,
    audioUrl: beat.audio_url,
    beatType: {
      id: beat.beat_type.id,
      name: beat.beat_type.name,
    },
  };
}

export function beatsMapper(beats) {
  const beatsArray = [];
  beats.forEach(beat => {
    beatsArray.push(beatMapper(beat));
  });
  return beatsArray;
}
