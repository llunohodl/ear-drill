const SCALE_PATTERNS = {
  // diatonic
  major: [0, 2, 4, 5, 7, 9, 11],
  dorian: [0, 2, 3, 5, 7, 9, 10],
  phrygian: [0, 1, 3, 5, 7, 8, 10],
  lydian: [0, 2, 4, 6, 7, 9, 11],
  mixollydian: [0, 2, 4, 5, 7, 9, 10],
  minor: [0, 2, 3, 5, 7, 8, 10],
  locrian: [0, 1, 3, 5, 6, 8, 10],
  // pentatonic
  pentatonic_major: [0, 2, 4, 7, 9],
  pentatonic_minor: [0, 3, 5, 7, 10],
  pentatonic_melodic_minor: [0, 2, 3, 7, 9],
  pentatonic_suspended: [0, 2, 5, 7, 10],
  pentatonic_dominant: [0, 2, 4, 7, 10],
  pentatonic_major_7th: [0, 2, 4, 7, 11],
  pentatonic_minmaj_7th: [0, 3, 5, 7, 11],
  pentatonic_halfdim_b2: [0, 1, 3, 5, 10],
  pentatonic_halfdim_maj2: [0, 2, 3, 6, 10],
  // blues
  blues: [0, 3, 5, 6, 7, 10],
  blues_minor_ext: [0, 2, 3, 5, 6, 7, 8, 10],
  blues_major: [0, 2, 3, 4, 7, 9],
  blues_major_ext: [0, 2, 3, 4, 5, 6, 7, 9, 10],
  blues_BB_King: [0, 2, 3, 5, 7, 9],
  // harmonic minor
  harmonic_minor: [0, 2, 3, 5, 7, 8, 11],
  locrian_6: [0, 1, 3, 5, 6, 9, 10],
  ionian_D5: [0, 2, 4, 5, 8, 9, 11],
  dorian_D4: [0, 2, 3, 6, 7, 9, 10],
  phrigian_dominant: [0, 1, 4, 5, 7, 8, 10],
  lydian_D2: [0, 3, 4, 6, 7, 9, 11],
  locrian_b4_bb7: [0, 1, 3, 4, 6, 8, 9],
  // harmonic major
  harmonic_major: [0, 2, 4, 5, 7, 8, 11],
  dorian_b5: [0, 2, 3, 5, 6, 9, 10],
  phrygian_b4: [0, 1, 3, 4, 7, 8, 10],
  lydian_b3: [0, 2, 3, 6, 7, 9, 11],
  mixollydian_b2: [0, 1, 4, 5, 7, 9, 10],
  lydian_augmented_D2: [0, 3, 4, 6, 8, 9, 11],
  locrian_bb7: [0, 1, 3, 5, 6, 8, 9],
  // melodic minor
  jazz_melodic_minor: [0, 2, 3, 5, 7, 9, 11],
  phrygian_D6: [0, 1, 3, 5, 7, 9, 10],
  lydian_augmented: [0, 2, 4, 6, 8, 9, 11],
  lydian_dominant: [0, 2, 4, 6, 7, 9, 10],
  mixollydian_b6: [0, 2, 4, 5, 7, 8, 10],
  locrian_D2: [0, 2, 3, 5, 6, 8, 10],
  altered: [0, 1, 3, 4, 6, 8, 10],
  // double harmonic
  gypsy_major: [0, 1, 4, 5, 7, 8, 11],
  lydian_D2_D6: [0, 3, 4, 6, 7, 10, 11],
  ultraphrygian: [0, 1, 3, 4, 6, 7, 8],
  gypsy_minor: [0, 2, 3, 6, 7, 8, 11],
  oriental: [0, 1, 4, 5, 6, 9, 10],
  ionian_D2_D5: [0, 3, 4, 5, 8, 9, 11],
  locrian_bb3_bb7: [0, 1, 2, 5, 6, 8, 9],
  // bebop
  bebop_minor: [0, 2, 3, 5, 7, 9, 10, 11],
  bebop_major: [0, 2, 4, 5, 7, 8, 9, 11],
  bebop_dominant: [0, 2, 4, 5, 7, 9, 10, 11],
  // other
  whole_tone: [0, 2, 4, 6, 8, 10],
  whole_half_diminished: [0, 2, 3, 5, 6, 8, 9, 11],
  half_whole_diminished: [0, 1, 3, 4, 6, 7, 9, 10],
  hungarian_major: [0, 3, 4, 6, 7, 9, 10],
  eight_tone_spanish: [0, 1, 3, 4, 5, 6, 8, 10],
  hungarian_gypsy: [0, 2, 3, 6, 7, 8, 10],
  indian: [0, 4, 5, 7, 10],
  chinese: [0, 4, 6, 5, 11],
  japanese: [0, 1, 5, 7, 8],
  hirsjoshi: [0, 2, 3, 7, 8],
  iwato: [0, 1, 5, 6, 10],
  persian: [0, 1, 3, 4, 5, 7, 11],
  arabian: [0, 2, 4, 5, 6, 8, 10],
};

// Two bar rock rhytms
// https://www.drumbarossa.com/level-1---drum-kit/two-bar-rock-rhythms
const RHYTHMIC_TEMPLATES = [
  ["4n", "4n", "8n", "8n", "4n"],
  ["4n", "8n", "8n", "4n", "4n"],
  ["4n", "4n", "4n", "8n", "8n"],
  ["8n", "8n", "4n", "4N", "8n", "8n"],
  ["4n", "4n", "4N", "4n"],
  ["4n", "8n", "8n", "8N", "8n", "4n"],
  ["4n", "8n", "8n", "4n", "8n", "8n"],
  ["4N", "8n", "8n", "4n", "4n"],
  ["4n", "4n", "8n", "8n", "8n", "8n"],
  ["8N", "8n", "4n", "8n", "8n", "4n"],
  ["4n", "8n", "8n", "8N", "8n", "4n"],
  ["8n", "8n", "8n", "8n", "8N", "8n", "8n", "8n"],
  ["8N", "8n", "8n", "8n", "8N", "8n", "4n"],
  ["4n", "8n", "8n", "8N", "8n", "4n"],
  ["8N", "8n", "8n", "8n", "8N", "8n", "4n"],
  ["4n", "4n", "8N", "8n", "4n"],
  ["8N", "8n", "8n", "8n", "4n", "4n"],
  ["8n", "8n", "8n", "8n", "4N", "8n", "8n"],
  ["4N", "8n", "8n", "8N", "8n", "4n"],
  ["8n", "8n", "8n", "8n", "8N", "8n", "8n", "8n"],
  ["8N", "8n", "4n", "8n", "8n", "4n"],
];

const NOTES = ["E", "F", "F#", "G", "G#", "A", "A#", "B", "C", "C#", "D", "D#"];
const OCTAVES = ["2", "3", "4", "5"];

const OSC_TYPES = ["sine", "square", "sawtooth", "triangle"];
const MOD_TYPES = ["am", "fm", "fat"];

function getFxPath(synth) {
  const dist = new Tone.Distortion(Math.random() * 0.5);
  const chorusChain = getChorusChain(); // [effect1, effect2, ...]

  let signal = synth;

  // Chain distortion (optional)
  if (Math.random() > 0.3) {
    signal = signal.chain(dist);
  }

  // Chain chorus effects
  for (const effect of chorusChain) {
    signal = signal.chain(effect);
  }

  // Add modulation/distortion to destination
  return signal.chain(
    new Tone.Distortion(Math.random() * 0.3),
    new Tone.FeedbackDelay("8n", Math.random() * 0.3),
    Tone.Destination,
  );
}

function getRandomSynth() {
  if (window.instruments) {
    window.instrument_name = getRandomInstrument();
    return getFxPath(instruments[window.instrument_name]);
  }

  // Failback for html only
  window.instrument_name =
    getRandomElement(MOD_TYPES) + getRandomElement(OSC_TYPES);

  const partials_factor = Math.random();
  const settings = {
    oscillator: {
      type: window.instrument_name,
      partials: [
        1.0,
        partials_factor * 0.25,
        partials_factor * 0.05,
        partials_factor * 0.01,
      ],
    },
    envelope: {
      attack: Math.random() * 0.1,
      decay: 0.2,
      sustain: Math.random() * 0.5,
      release: Math.random() * 2 + 0.5,
    },
  };

  synth = new Tone.PolySynth(Tone.Synth, settings);
  return getFxPath(synth);
}

function generateApplicature() {
  //Random root
  rootNote = getRandomElement(NOTES);
  octaveNumber = getRandomElement(OCTAVES);
  basePos = getGuitarPosition(rootNote + octaveNumber);

  if (!basePos) {
    // quick fix for A2 - D#2 (lower than open 6 string)
    rootNote = "E";
    basePos = getGuitarPosition(rootNote + octaveNumber);
  }

  //Random octave
  const selectedType = getRandomElement(Object.keys(SCALE_PATTERNS));
  window.sacle_name = (rootNote + " " + selectedType)
    .replaceAll("_", " ")
    .replaceAll("D", "#");
  window.scale_notes = [];

  //Random scale
  const pattern = SCALE_PATTERNS[selectedType];
  let currentApplicature = {};

  //Form applictaure as a map
  // key - note name (i.e. A4)
  // value - tab position (i.e. [A4] = 5.1 )
  let firstPos = basePos.fret; // First position for current string
  pattern.forEach((interval) => {
    let note = Tone.Frequency(rootNote + octaveNumber)
      .transpose(interval)
      .toNote();
    if (basePos.fret + interval - firstPos > 4 && basePos.string > 1) {
      newFret = basePos.fret - (basePos.string == 3 ? 4 : 5);
      if (newFret + interval > 0) {
        basePos.fret = newFret;
        firstPos = newFret + interval;
        basePos.string--;
      } else
        console.warn(
          `Could not jump to lower string from string ${basePos.string} fret ${basePos.fret} for interval ${interval}`,
        );
    }
    currentApplicature[note] = `${basePos.fret + interval}.${basePos.string}`;
    window.scale_notes.push(note);
  });
  return currentApplicature;
}

async function generateMelody() {
  const applicature = generateApplicature(); // scale and note positions
  window.notes = []; //notes in melody, null for pause
  window.notes_map = []; // indexes of all sounds (all pauses skiped)
  window.durations = []; // note durations 1n,2n,4n,8n,16n ... etc.
  window.synth = null;

  if (window.synth) window.synth.triggerRelease();

  const notes = Object.keys(applicature);
  let note_index = 0;
  let tab_arr = [];
  for (let bar = 0; bar < 4; bar++) {
    let template = getRandomElement(RHYTHMIC_TEMPLATES);
    for (let i = 0; i < template.length; i++) {
      const note = getRandomElement(notes);
      let duration = template[i];
      let duration_length = duration.slice(0, -1);
      let pos = applicature[note];
      if (duration.endsWith("n")) {
        // note
        window.notes.push(note);
        tab_arr.push(`${pos}.${duration_length}`);
        window.notes_map.push(note_index);
      } else {
        // pause
        window.notes.push(null);
        tab_arr.push(`r.${duration_length}`);
      }
      note_index++;
      window.durations.push(duration.toLowerCase());
    }
    tab_arr.push("|"); // bar at alphatex
  }

  // Last bar with scale
  window.scale_notes.forEach((note) => {
    tab_arr.push(`${applicature[note]}.16`);
  });
  tab_arr.push("|");
  window.tab = tab_arr.join(" ");
  console.log(window.tab);
  // Update the loop end max value in slider.js
  const max_end = window.notes_map.length;
  document.getElementById("loop-end").max = max_end;
  document.getElementById("loop-start").max = max_end;
  window.updateLoopRange();
}

async function playMelody(begin = null, end = null) {
  if (!window.synth) window.synth = getRandomSynth();
  else window.synth.triggerRelease();
  const max_end = window.notes_map.length - 1;

  if (!begin) begin = 0;
  if (!end) end = max_end;
  if (end - begin <= 0) {
    if (end < max_end) {
      end++;
    } else {
      begin = begin > 0 ? begin - 1 : 0;
      end = brgin + 1;
    }
  }
  Tone.Transport.bpm.value = Number(
    document.getElementById("tempo-slider").value,
  );
  await Tone.start();

  let now = Tone.now();
  // play all selected notes with pauses between them
  for (let i = window.notes_map[begin]; i < window.notes_map[end]; i++) {
    console.log(`play ${window.notes[i]} ${window.durations[i]}`);
    if (window.notes[i]) {
      window.synth.triggerAttackRelease(
        window.notes[i],
        window.durations[i],
        now,
      );
    }
    const duration = Tone.Time(window.durations[i]).toSeconds();
    now += duration;
  }
}

async function playLoop() {
  let begin = Number(document.getElementById("loop-start").value);
  let end = Number(document.getElementById("loop-end").value);
  if (begin > end) {
    [begin, end] = [end, begin];
  }
  playMelody(begin, end);
}

function parseNoteString(noteStr) {
  const regex = /^([A-G])(#|b)?(\d+)$/;
  const match = noteStr.match(regex);
  if (!match) throw new Error(`Invalid note format: ${noteStr}`);

  const noteName = match[1];
  const accidental = match[2] || "";
  const octave = parseInt(match[3], 10);

  const pitchMap = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
  let pitch = pitchMap[noteName];

  if (accidental === "#") pitch += 1;
  if (accidental === "b") pitch -= 1;

  // Handle edge cases for pitch wrapping (e.g. E# is F, Cb is B)
  if (pitch < 0) {
    pitch += 12; /* octave -= 1; */
  }
  if (pitch > 11) {
    pitch -= 12; /* octave += 1; */
  }

  return { pitch, octave };
}

// HELPER: Calculate MIDI Value
// C-1 = 0, C0 = 12, C1 = 24, C2 = 36...
function getMidiValue(pitch, octave) {
  return (octave + 1) * 12 + pitch;
}

function getGuitarPosition(noteStr) {
  const { pitch, octave } = parseNoteString(noteStr);
  console.log(`${pitch} - ${octave}`);
  const noteMidi = getMidiValue(pitch, octave);

  // Standard Tuning MIDI Values
  // String 6 (Low E) to String 1 (High E)
  const tuning = [
    { string: 6, midi: 40 }, // E2
    { string: 5, midi: 45 }, // A2
    { string: 4, midi: 50 }, // D3
    { string: 3, midi: 55 }, // G3
    { string: 2, midi: 59 }, // B3
    { string: 1, midi: 64 }, // E4
  ];

  // Find the first string where the note is playable (fret >= 0)
  // We prefer lower strings (higher number) for lower notes
  for (let i = 0; i < tuning.length; i++) {
    const t = tuning[i];
    const f = noteMidi - t.midi;

    // Check if fret is within reasonable range (0 to 17)
    if (f >= 0 && f <= 17) {
      return { string: t.string, fret: f };
    }
  }

  return null;
}

async function renderTabs() {
  try {
    console.log(`Print: ${window.notes}`);
    // Process Notes
    let tab =
      `\\title "${window.sacle_name}"\n\\subtitle "${window.instrument_name}"\n.\n` +
      window.tab;

    if (!window.api) {
      const element = document.getElementById("tab-container");
      element.innerHTML = tab;
      const api = new alphaTab.AlphaTabApi(element, {
        tex: true,
      });
      window.api = api;
    } else {
      await window.api.tex(tab);
    }
  } catch (e) {
    console.error(e);
  }
}

// Expose chorus functions globally for HTML-only fallback
window.getChorusChain = getChorusChain;
window.getRandomChorusMode = () => getRandomElement(Object.keys(CHORUS_CHAINS));

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("./script/sw.js")
      .then((reg) => console.log("Service Worker registered!"))
      .catch((err) => console.log("Registration failed:", err));
  });

  window.instruments = SampleLibrary.load({
    ext: ".mp3",
    baseUrl: "assets/samples/",
  });
  Tone.loaded();
  console.log("Instruments loadaed");

  generateMelody(false);
  console.log("Melody geneated");
}

function getRandomElement(array) {
  if (!array) return null;
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomInstrument() {
  const instr = Object.keys(instruments);
  // Prefer guitar and piano
  weights = instr.map((name) => {
    if (name === "guitar-electric") return 240;
    if (name === "bass-electric") return 200;
    if (name.includes("guitar")) return 180;
    if (name === "phiano") return 120;
    if (name in ["violin", "cello", "contrabass"]) return 30;
    return 15;
  });

  const totalWeight = weights.reduce((a, b) => a + b, 0);

  let random = Math.random() * totalWeight;

  for (let i = 0; i < instr.length; i++) {
    if (random < weights[i]) {
      return instr[i];
    }
    random -= weights[i];
  }
  // failback
  return "guitar-electric";
}

window.addEventListener("keydown", (event) => {
  if (event.key === " ") {
    event.preventDefault(); // Stop page from scrolling
    playLoop();
  } else if (event.key >= "1" && event.key <= "9") {
    event.preventDefault();
    selectLoopRange(parseInt(event.key));
    playLoop();
  } else if (event.key === "ArrowLeft") {
    event.preventDefault();
    shiftLoopStart(-1);
  } else if (event.key === "ArrowRight") {
    event.preventDefault();
    shiftLoopStart(1);
  } else if (event.key === "ArrowUp") {
    event.preventDefault();
    adjustTempo(5);
  } else if (event.key === "ArrowDown") {
    event.preventDefault();
    adjustTempo(-5);
  } else if (event.key === "g") {
    event.preventDefault();
    generateMelody();
    playMelody();
  } else if (event.key === "Enter") {
    event.preventDefault();
    playMelody();
  } else if (event.key === "t") {
    event.preventDefault();
    renderTabs();
  }
});

function selectLoopRange(size) {
  const start = Number(document.getElementById("loop-start").value);
  const end = Math.min(start + size - 1, window.notes.length - 1);
  document.getElementById("loop-start").value = start;
  document.getElementById("loop-end").value = end;
  updateLoopRange();
}

function shiftLoopStart(delta) {
  const currentStart = Number(document.getElementById("loop-start").value);
  const currentEnd = Number(document.getElementById("loop-end").value);
  let newStart = currentStart + delta;
  let newEnd = currentEnd + delta;
  document.getElementById("loop-start").value = newStart;
  document.getElementById("loop-end").value = newEnd;
  updateLoopRange();
}

function adjustTempo(delta) {
  const slider = document.getElementById("tempo-slider");
  let currentBPM = Number(slider.value);
  const maxBPM = 220,
    minBPM = 10;

  let newBPM = Math.max(minBPM, Math.min(maxBPM, currentBPM + delta));
  slider.value = newBPM;
  document.getElementById("tempo-display").textContent = `${newBPM} BPM`;
}

function getSelectedLoopRange() {
  const start = Number(document.getElementById("loop-start").value);
  const end = Number(document.getElementById("loop-end").value);
  return { start, end };
}
