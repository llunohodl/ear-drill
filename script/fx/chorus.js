// My 10 Favourite Ways to Use a Chorus Pedal by Michael Banfield
// https://www.youtube.com/watch?v=fy3eMpN6CM4&t=318s
//
// Chorus Effect Chain Modes Configuration
const CHORUS_CHAINS = {
  subtle_thickening: {
    depth: Math.random() * 0.3 + 0.2, // 0.2 - 0.5
    rate: Math.random() * 1.0 + 0.4, // 0.4 - 1.4Hz
    mix: Math.random() * 0.2, // 0 - 20%
  },

  "80s_shimmer": {
    depth: Math.random() * 0.5 + 0.4, // 0.4 - 0.9 (high)
    rate: Math.random() * 2.0 + 1.5, // 1.5 - 3.5Hz (faster)
    mix: Math.random() * 0.4 + 0.2, // 20% - 60%
  },

  dual_stacked: {
    primary: {
      depth: Math.random() * 0.3 + 0.15,
      rate: Math.random() * 1.5 + 0.7,
      mix: 0.12,
    },
    secondary: {
      depth: Math.random() * 0.4 + 0.2,
      rate: Math.random() * 2.5 + 1.0, // Different rate for complexity
      mix: 0.1,
    },
    series: true,
  },

  stereo_3d: {
    depth: Math.random() * 0.4 + 0.25,
    rate: Math.random() * 1.8 + 0.9,
    mix: 0.25,
    panDelay: true,
    feedback: 0.3 + Math.random() * 0.3,
  },

  dim2_style: {
    depth: Math.random() * 0.2 + 0.15, // Very subtle
    rate: Math.random() * 1.2 + 0.8, // Subtle brightness
    mix: Math.random() * 0.12 + 0.05, // 5% - 17%
    brightness: 1.3 + Math.random() * 0.4,
  },

  classic_rollins: {
    depth: Math.random() * 0.5 + 0.35,
    rate: Math.random() * 1.2 + 0.65,
    mix: Math.random() * 0.4 + 0.15,
    lowpassFreq: 4000 + Math.random() * 3000,
    lowpassQ: 0.7 + Math.random() * 0.5,
  },
};

// Create chorus effect chain (returns Tone signal chain)
function getChorusChain() {
  const mode = getRandomElement(Object.keys(CHORUS_CHAINS));
  if (mode === "dual_stacked") return getDualChorusChain();
  if (mode === "stereo_3d") return getStereoChorusChain();
  if (mode === "dim2_style") return getDim2ChorusChain();
  if (mode === "classic_rollins") return getRollinsChorusChain();

  // subtle_thickening and 80s_shimmer

  const config = CHORUS_CHAINS[mode] || CHORUS_CHAINS.subtle_thickening;

  // Main chorus with doubled depth for better effect
  const chorus = new Tone.Chorus(config.depth * 2, config.rate);

  if (config.mix) {
    const gain = new Tone.Gain(config.mix);
    return [chorus, gain];
  }

  return [chorus];
}

// Create dual/stacked chorus chains
function getDualChorusChain() {
  const primaryConfig = CHORUS_CHAINS.dual_stacked.primary;
  const secondaryConfig = CHORUS_CHAINS.dual_stacked.secondary;

  const primary = new Tone.Chorus(primaryConfig.depth * 2, primaryConfig.rate);
  secondary = new Tone.Chorus(secondaryConfig.depth * 2, secondaryConfig.rate);

  return [primary, secondary];
}

// Create stereo 3D chorus with panning
function getStereoChorusChain(feedback = 0.4) {
  const depth = Math.random() * 0.4 + 0.25;
  const rate = Math.random() * 1.8 + 0.9;

  const left = new Tone.Chorus(depth * 2, rate);
  right = new Tone.Chorus(depth * 2, rate);

  const leftDelay = new Tone.FeedbackDelay("8n", feedback);
  rightDelay = new Tone.FeedbackDelay("8n", feedback);

  return [left, leftDelay, right, rightDelay];
}

// Create Dim-2 style subtle shimmer chain
function getDim2ChorusChain() {
  const depth = Math.random() * 0.2 + 0.15;
  const rate = Math.random() * 1.2 + 0.8;

  const chorus = new Tone.Chorus(depth * 2, rate);
  return [chorus];
}

// Create classic Rollins-style chain with filter
function getRollinsChorusChain() {
  const depth = Math.random() * 0.5 + 0.35;
  const rate = Math.random() * 1.2 + 0.65;

  const chorus = new Tone.Chorus(depth * 2, rate);

  // Add low-pass filter for vintage character
  const filter = new Tone.Filter({
    type: "lowpass",
    frequency: CHORUS_CHAINS.classic_rollins.lowpassFreq,
    Q: CHORUS_CHAINS.classic_rollins.lowpassQ,
  });

  return [chorus, filter];
}
