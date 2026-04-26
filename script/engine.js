const SCALE_PATTERNS = {
  diatonic_major: [0, 2, 4, 5, 7, 9, 11],
  diatonic_minor: [0, 2, 3, 5, 7, 8, 10],
  pentatonic_major: [0, 2, 4, 7, 9],
  pentatonic_minor: [0, 3, 5, 7, 10],
  blues: [0, 3, 5, 6, 7, 10],
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
  dist = new Tone.Distortion(Math.random() * 0.5);

  if (Math.random() >= 0.5) {
    modulation = new Tone.Chorus(
      Math.random() * 8 + 2,
      Math.random() * 2.5 + 0.5,
      0.5,
    ).start();
  } else {
    modulation = new Tone.Phaser({
      frequency: 5 + Math.random() * 20,
      octaves: 1 + Math.random() * 3,
      baseFrequency: 100 + Math.random() * 200,
    });
  }

  delay = new Tone.FeedbackDelay("8n", Math.random() * 0.4);

  if (Math.random() >= 0.5) {
    space = new Tone.Reverb(Math.random() * 9 + 1);
  } else {
    space = new Tone.JCReverb(Math.random() * 0.85 + 0.15).toDestination();
  }

  return synth.chain(dist, modulation, delay, space, Tone.Destination);
}

function getRandomSynth() {
  if (window.instruments) {
    const keys = Object.keys(instruments);
    const randomKey = keys[Math.floor(Math.random() * keys.length)];
    console.log(`selected instrument: ${randomKey}`);
    return getFxPath(instruments[randomKey]);
  }

  // Failback for html only
  const type =
    MOD_TYPES[Math.floor(Math.random() * MOD_TYPES.length)] +
    OSC_TYPES[Math.floor(Math.random() * OSC_TYPES.length)];

  const partials_factor = Math.random();
  const settings = {
    oscillator: {
      type: type,
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
  rootNote = NOTES[Math.floor(Math.random() * NOTES.length)];
  octaveNumber = OCTAVES[Math.floor(Math.random() * OCTAVES.length)];
  basePos = getGuitarPosition(rootNote + octaveNumber);

  if (!basePos) {
    // quick fix for A2 - D#2 (lower than open 6 string)
    rootNote = "E";
    basePos = getGuitarPosition(rootNote + octaveNumber);
  }

  //Random octave
  const scaleTypes = Object.keys(SCALE_PATTERNS);
  const selectedType =
    scaleTypes[Math.floor(Math.random() * scaleTypes.length)];
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

    console.log(`${note}  ${currentApplicature[note]}`);
  });
  return currentApplicature;
}

async function generateMelody() {
  const applicature = generateApplicature();

  window.notes = [];
  window.durations = [];
  window.currentPositions = [];
  window.synth = null;

  if (window.synth) window.synth.triggerRelease();

  const notes = Object.keys(applicature);
  let total_notes = 0;
  for (let t = 0; t < 3; t++) {
    let template =
      RHYTHMIC_TEMPLATES[Math.floor(Math.random() * RHYTHMIC_TEMPLATES.length)];
    for (let i = 0; i < template.length; i++) {
      const note = notes[Math.floor(Math.random() * notes.length)];
      let duration = template[i];
      let duration_length = duration.slice(0, -1);
      if (duration.endsWith("n")) {
        // note
        window.notes.push(note);
        window.currentPositions.push(`${applicature[note]}.${duration_length}`);
        total_notes++;
      } else {
        // pause
        window.notes.push(null);
        window.currentPositions.push(`r.${duration_length}`);
      }
      window.durations.push(duration.toLowerCase());
    }
    window.currentPositions.push("|"); // bar at alphatex
  }
}

async function playMelody(begin = null, end = null) {
  if (!window.synth) window.synth = getRandomSynth();
  else window.synth.triggerRelease();

  if (!begin) begin = 0;
  if (!end) end = window.notes.length - 1;

  Tone.Transport.bpm.value = Number(
    document.getElementById("tempo-slider").value,
  );
  await Tone.start();

  let now = Tone.now();
  for (let i = begin; i <= end; i++) {
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
    let tab = "\n" + window.currentPositions.join(" ");

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
