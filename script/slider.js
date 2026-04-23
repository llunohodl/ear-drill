const tempoSlider = document.getElementById('tempo-slider');
const tempoDisplay = document.getElementById('tempo-display');
const startSlider = document.getElementById('loop-start');
const endSlider = document.getElementById('loop-end');
const loopDisplay = document.getElementById('loop-display');
const highlight = document.getElementById('slider-highlight');

function updateTempo() {
  tempoDisplay.textContent = `${tempoSlider.value} BPM`;
}

function updateLoopRange() {
  let start = parseInt(startSlider.value);
  let end = parseInt(endSlider.value);

  // Swap if crossed (feels natural to users)
  if (start > end) {
    [startSlider.value, endSlider.value] = [end, start];
    start = parseInt(startSlider.value);
    end = parseInt(endSlider.value);
  }

  // Map 0-15 to 0%-100%
  const maxIndex = 15;
  const leftPct = (start / maxIndex) * 100;
  const widthPct = ((end - start) / maxIndex) * 100;
  highlight.style.left = `${leftPct}%`;
  highlight.style.width = `${widthPct}%`;

  // Show 1-based indices for readability
  loopDisplay.textContent = `Notes ${start + 1}–${end + 1}`;
}

// Event listeners
tempoSlider.addEventListener('input', updateTempo);
startSlider.addEventListener('input', updateLoopRange);
endSlider.addEventListener('input', updateLoopRange);

// Initialize
updateTempo();
updateLoopRange();
