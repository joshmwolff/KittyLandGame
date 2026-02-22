const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const timerEl = document.getElementById('timer');
const scoreEl = document.getElementById('score');
const finalScoreEl = document.getElementById('finalScore');
const overlayEl = document.getElementById('overlay');
const startPanelEl = document.getElementById('startPanel');
const endPanelEl = document.getElementById('endPanel');
const startGameBtn = document.getElementById('startGame');
const playAgainBtn = document.getElementById('playAgain');

const WORLD = {
  width: canvas.width,
  height: canvas.height,
  padding: 8,
};

const GAME_LENGTH_SECONDS = 60;
const PHIL_SPAWN_MIN_SECONDS = 10;
const PHIL_SPAWN_MAX_SECONDS = 15;
const BOSS_TRIGGER_SECONDS = 10;
const BOSS_PENALTY_POINTS = 5;
const MUSIC_BPM = 120;
const MUSIC_BEAT_SECONDS = 60 / MUSIC_BPM;
const MUSIC_DURATION_SECONDS = GAME_LENGTH_SECONDS;
const MUSIC_TOTAL_BEATS = Math.floor(MUSIC_DURATION_SECONDS / MUSIC_BEAT_SECONDS);

let score = 0;
let timeLeft = GAME_LENGTH_SECONDS;
let gameOver = false;
let lastTimestamp = 0;
let countdownAccumulator = 0;
let roundStarted = false;

let audioContext = null;
let musicTimerId = null;
let musicBeatIndex = 0;
let musicPlaying = false;
let musicMode = 'whimsical';

const keys = Object.create(null);

const girls = [
  {
    id: 'sadie',
    name: 'Sadie',
    x: 180,
    y: 300,
    radius: 18,
    speed: 220,
    dressColor: '#f5b7d2',
    crownColor: '#f2d36a',
    hairColor: '#5b3d2b',
    controls: { up: 'ArrowUp', down: 'ArrowDown', left: 'ArrowLeft', right: 'ArrowRight' },
  },
  {
    id: 'lila',
    name: 'Lila',
    x: 260,
    y: 300,
    radius: 16,
    speed: 200,
    dressColor: '#d8c1ff',
    crownColor: '#f2d36a',
    hairColor: '#6a472f',
    controls: { up: 'KeyW', down: 'KeyS', left: 'KeyA', right: 'KeyD' },
  },
];

const obstacles = [
  { type: 'tree', x: 110, y: 130, width: 80, height: 86 },
  { type: 'tree', x: 760, y: 120, width: 86, height: 92 },
  { type: 'tree', x: 420, y: 70, width: 90, height: 88 },
  { type: 'tree', x: 180, y: 390, width: 86, height: 94 },
  { type: 'tree', x: 610, y: 400, width: 88, height: 96 },
  { type: 'rock', x: 340, y: 230, width: 72, height: 48 },
  { type: 'rock', x: 505, y: 320, width: 76, height: 52 },
  { type: 'rock', x: 720, y: 250, width: 68, height: 46 },
];

const cats = [
  {
    mode: 'boo',
    name: 'Boo',
    x: 640,
    y: 230,
    radius: 17,
    color: '#181818',
    accent: '#181818',
    speed: 118,
    directionX: 1,
    directionY: -0.2,
    jaggedTimer: 0,
    jaggedInterval: 0.2,
    formTimer: 0,
    formInterval: 7,
  },
  {
    mode: 'sully',
    name: 'Sully',
    x: 740,
    y: 350,
    radius: 17,
    color: '#181818',
    accent: '#f7f7f7',
    speed: 132,
    directionX: -1,
    directionY: 0.2,
    jaggedTimer: 0,
    jaggedInterval: 0.2,
    formTimer: 0,
    formInterval: 8,
  },
];

const phil = {
  name: 'Phil',
  x: WORLD.width * 0.5,
  y: -60,
  width: 34,
  height: 34,
  fallSpeed: 170,
  active: false,
  nextSpawnTimer: 0,
};

const boss = {
  name: 'Grumpy Dada',
  active: false,
  hasCompletedPass: false,
  touchingSadie: false,
  touchingLila: false,
  x: -80,
  y: WORLD.height * 0.42,
  width: 70,
  height: 92,
  speedX: 132,
  zigzagAmplitude: 75,
  zigzagFrequency: 0.91,
  baseY: WORLD.height * 0.42,
  phase: 0,
};

const chordProgression = [
  [60, 64, 67], // C
  [67, 71, 74], // G
  [69, 72, 76], // Am
  [65, 69, 72], // F
];

const bassProgression = [36, 43, 45, 41];
const melodyPattern = [72, 74, 76, 79, 76, 74, 72, null, 74, 76, 79, 81, 79, 76, 74, null];

const dramaticChordProgression = [
  [57, 60, 64], // Am
  [53, 57, 60], // F
  [55, 59, 62], // G
  [52, 55, 59], // Em
];
const dramaticBassProgression = [33, 29, 31, 28];
const dramaticMelodyPattern = [69, null, 72, 74, 72, null, 69, 67, 69, null, 72, 74, 76, 74, 72, null];

function randomRange(min, max) {
  return Math.random() * (max - min) + min;
}

function midiToFrequency(midi) {
  return 440 * 2 ** ((midi - 69) / 12);
}

function createAudioContext() {
  if (!audioContext) {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    audioContext = new Ctx();
  }
}

function playTone(frequency, startTime, duration, volume, type = 'triangle') {
  if (!audioContext) return;
  const osc = audioContext.createOscillator();
  const gain = audioContext.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(frequency, startTime);

  gain.gain.setValueAtTime(0.0001, startTime);
  gain.gain.exponentialRampToValueAtTime(Math.max(volume, 0.0001), startTime + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

  osc.connect(gain);
  gain.connect(audioContext.destination);

  osc.start(startTime);
  osc.stop(startTime + duration + 0.03);
}

function playChord(notes, startTime, duration) {
  notes.forEach((midiNote) => {
    playTone(midiToFrequency(midiNote), startTime, duration, 0.038, 'triangle');
  });
}

function stopMusic() {
  musicPlaying = false;
  if (musicTimerId !== null) {
    window.clearTimeout(musicTimerId);
    musicTimerId = null;
  }
}

function scheduleMusicBeat() {
  if (!musicPlaying || !audioContext) return;
  if (musicBeatIndex >= MUSIC_TOTAL_BEATS) {
    stopMusic();
    return;
  }

  const now = audioContext.currentTime;
  const startTime = now + 0.02;
  const dramatic = musicMode === 'dramatic';
  const activeChords = dramatic ? dramaticChordProgression : chordProgression;
  const activeBass = dramatic ? dramaticBassProgression : bassProgression;
  const activeMelody = dramatic ? dramaticMelodyPattern : melodyPattern;

  const progressionIndex = Math.floor(musicBeatIndex / 4) % activeChords.length;
  const beatInBar = musicBeatIndex % 4;

  if (beatInBar === 0) {
    playChord(activeChords[progressionIndex], startTime, MUSIC_BEAT_SECONDS * 1.8);
  }

  playTone(
    midiToFrequency(activeBass[progressionIndex]),
    startTime,
    MUSIC_BEAT_SECONDS * 0.48,
    dramatic ? 0.07 : 0.055,
    dramatic ? 'triangle' : 'sine'
  );

  const melodyMidi = activeMelody[musicBeatIndex % activeMelody.length];
  if (melodyMidi !== null) {
    playTone(
      midiToFrequency(melodyMidi),
      startTime,
      MUSIC_BEAT_SECONDS * (dramatic ? 0.82 : 0.7),
      dramatic ? 0.072 : 0.06,
      dramatic ? 'sawtooth' : 'square'
    );
  }

  musicBeatIndex += 1;
  musicTimerId = window.setTimeout(scheduleMusicBeat, MUSIC_BEAT_SECONDS * 1000);
}

function startMusic() {
  createAudioContext();
  if (!audioContext) return;
  stopMusic();
  musicBeatIndex = 0;
  musicPlaying = true;
  scheduleMusicBeat();
}

function startRoundIfNeeded() {
  if (gameOver) return;
  if (!roundStarted) {
    roundStarted = true;
    createAudioContext();
    if (audioContext && audioContext.state === 'suspended') {
      audioContext.resume().then(() => {
        if (!gameOver && roundStarted && !musicPlaying) {
          startMusic();
        }
      });
      return;
    }
    startMusic();
  }
}

function clampToWorld(entity) {
  entity.x = Math.max(WORLD.padding + entity.radius, Math.min(WORLD.width - WORLD.padding - entity.radius, entity.x));
  entity.y = Math.max(WORLD.padding + entity.radius, Math.min(WORLD.height - WORLD.padding - entity.radius, entity.y));
}

function circleIntersectsRect(circleX, circleY, circleRadius, rect) {
  const nearestX = Math.max(rect.x, Math.min(circleX, rect.x + rect.width));
  const nearestY = Math.max(rect.y, Math.min(circleY, rect.y + rect.height));
  const dx = circleX - nearestX;
  const dy = circleY - nearestY;
  return dx * dx + dy * dy < circleRadius * circleRadius;
}

function collidesWithObstacle(entity) {
  return obstacles.some((obstacle) => circleIntersectsRect(entity.x, entity.y, entity.radius, obstacle));
}

function randomizeDirection(catEntity) {
  const angle = randomRange(0, Math.PI * 2);
  catEntity.directionX = Math.cos(angle);
  catEntity.directionY = Math.sin(angle);
}

function schedulePhilSpawn() {
  phil.nextSpawnTimer = randomRange(PHIL_SPAWN_MIN_SECONDS, PHIL_SPAWN_MAX_SECONDS);
}

function spawnPhil() {
  phil.x = randomRange(phil.width * 0.5 + 12, WORLD.width - phil.width * 0.5 - 12);
  phil.y = -phil.height;
  phil.active = true;
}

function resetPhil() {
  phil.active = false;
  phil.y = -phil.height;
  schedulePhilSpawn();
}

function startBossPass() {
  boss.active = true;
  boss.x = -boss.width;
  boss.baseY = WORLD.height * 0.42;
  boss.phase = randomRange(0, Math.PI * 2);
  musicMode = 'dramatic';
  boss.touchingSadie = false;
  boss.touchingLila = false;
}

function resetBoss() {
  boss.active = false;
  boss.hasCompletedPass = false;
  boss.touchingSadie = false;
  boss.touchingLila = false;
  boss.x = -boss.width;
  boss.baseY = WORLD.height * 0.42;
  boss.phase = randomRange(0, Math.PI * 2);
  boss.y = boss.baseY;
}

function updateBoss(dt) {
  if (!boss.active && !boss.hasCompletedPass && timeLeft <= BOSS_TRIGGER_SECONDS) {
    startBossPass();
  }

  if (!boss.active) {
    return;
  }

  boss.x += boss.speedX * dt;
  boss.phase += dt * boss.zigzagFrequency;
  boss.y = boss.baseY + Math.sin(boss.phase * Math.PI * 2) * boss.zigzagAmplitude;

  if (boss.x - boss.width * 0.5 > WORLD.width + boss.width) {
    boss.active = false;
    boss.hasCompletedPass = true;
  }
}

function scheduleNextFormChange(catEntity) {
  catEntity.formTimer = 0;
  catEntity.formInterval = randomRange(5, 10);
}

function setCatMode(catEntity, newMode) {
  catEntity.mode = newMode;
  catEntity.name = newMode === 'boo' ? 'Boo' : 'Sully';
  catEntity.color = '#181818';
  catEntity.accent = newMode === 'boo' ? '#181818' : '#f7f7f7';
  catEntity.speed = newMode === 'boo' ? 118 : 132;
  scheduleNextFormChange(catEntity);
}

function teleportCat(catEntity) {
  catEntity.x = randomRange(50, WORLD.width - 50);
  catEntity.y = randomRange(50, WORLD.height - 50);
  randomizeDirection(catEntity);
  catEntity.jaggedTimer = 0;
  catEntity.jaggedInterval = randomRange(0.12, 0.3);
}

function getNearestGirl(catEntity) {
  const [first, second] = girls;
  const d1 = Math.hypot(first.x - catEntity.x, first.y - catEntity.y);
  const d2 = Math.hypot(second.x - catEntity.x, second.y - catEntity.y);
  return d1 <= d2 ? first : second;
}

function resetGame() {
  score = 0;
  timeLeft = GAME_LENGTH_SECONDS;
  gameOver = false;
  countdownAccumulator = 0;
  roundStarted = false;
  stopMusic();

  girls[0].x = 180;
  girls[0].y = 300;
  girls[1].x = 260;
  girls[1].y = 300;

  cats[0].x = 640;
  cats[0].y = 230;
  cats[1].x = 740;
  cats[1].y = 350;

  musicMode = 'whimsical';

  setCatMode(cats[0], 'boo');
  setCatMode(cats[1], 'sully');
  cats.forEach((catEntity) => {
    randomizeDirection(catEntity);
    catEntity.jaggedTimer = 0;
    catEntity.jaggedInterval = randomRange(0.12, 0.3);
  });
  resetPhil();
  resetBoss();

  updateHud();
  overlayEl.classList.add('hidden');
}

function showStartOverlay() {
  startPanelEl.classList.remove('hidden');
  endPanelEl.classList.add('hidden');
  overlayEl.classList.remove('hidden');
}

function showEndOverlay() {
  startPanelEl.classList.add('hidden');
  endPanelEl.classList.remove('hidden');
  overlayEl.classList.remove('hidden');
}

function updateHud() {
  timerEl.textContent = String(timeLeft);
  scoreEl.textContent = String(score);
}

function endGame() {
  gameOver = true;
  stopMusic();
  finalScoreEl.textContent = String(score);
  showEndOverlay();
}

function handleInput(player, dt) {
  let moveX = 0;
  let moveY = 0;
  if (keys[player.controls.up]) moveY -= player.speed * dt;
  if (keys[player.controls.down]) moveY += player.speed * dt;
  if (keys[player.controls.left]) moveX -= player.speed * dt;
  if (keys[player.controls.right]) moveX += player.speed * dt;

  const oldX = player.x;
  const oldY = player.y;

  player.x += moveX;
  clampToWorld(player);
  if (collidesWithObstacle(player)) {
    player.x = oldX;
  }

  player.y += moveY;
  clampToWorld(player);
  if (collidesWithObstacle(player)) {
    player.y = oldY;
  }
}

function moveCat(catEntity, dt) {
  const nearestGirl = getNearestGirl(catEntity);

  catEntity.formTimer += dt;
  if (catEntity.formTimer >= catEntity.formInterval) {
    const nextMode = catEntity.mode === 'boo' ? 'sully' : 'boo';
    setCatMode(catEntity, nextMode);
  }

  catEntity.jaggedTimer += dt;
  if (catEntity.jaggedTimer >= catEntity.jaggedInterval) {
    catEntity.jaggedTimer = 0;
    catEntity.jaggedInterval = randomRange(0.12, 0.3);

    const dx = nearestGirl.x - catEntity.x;
    const dy = nearestGirl.y - catEntity.y;
    const distance = Math.max(Math.hypot(dx, dy), 0.0001);

    // Boo flees the nearest girl, Sully hunts her.
    let baseX = dx / distance;
    let baseY = dy / distance;
    if (catEntity.mode === 'boo') {
      baseX *= -1;
      baseY *= -1;
    }

    const jitterX = randomRange(-0.7, 0.7);
    const jitterY = randomRange(-0.7, 0.7);
    const steerX = baseX + jitterX;
    const steerY = baseY + jitterY;
    const steerLength = Math.max(Math.hypot(steerX, steerY), 0.0001);

    catEntity.directionX = steerX / steerLength;
    catEntity.directionY = steerY / steerLength;
  }

  catEntity.x += catEntity.directionX * catEntity.speed * dt;
  catEntity.y += catEntity.directionY * catEntity.speed * dt;

  if (catEntity.x <= catEntity.radius || catEntity.x >= WORLD.width - catEntity.radius) {
    catEntity.directionX *= -1;
    catEntity.x = Math.max(catEntity.radius, Math.min(WORLD.width - catEntity.radius, catEntity.x));
  }
  if (catEntity.y <= catEntity.radius || catEntity.y >= WORLD.height - catEntity.radius) {
    catEntity.directionY *= -1;
    catEntity.y = Math.max(catEntity.radius, Math.min(WORLD.height - catEntity.radius, catEntity.y));
  }
}

function checkCollisions() {
  for (const catEntity of cats) {
    for (const girl of girls) {
      const dx = girl.x - catEntity.x;
      const dy = girl.y - catEntity.y;
      const distance = Math.hypot(dx, dy);

      if (distance < girl.radius + catEntity.radius) {
        if (catEntity.mode === 'boo') {
          score += 1;
        } else {
          score -= 1;
          setCatMode(catEntity, 'boo');
        }

        teleportCat(catEntity);
        updateHud();
        break;
      }
    }
  }

  if (phil.active) {
    for (const girl of girls) {
      const dx = girl.x - phil.x;
      const dy = girl.y - phil.y;
      const catchDistance = girl.radius + Math.max(phil.width, phil.height) * 0.42;
      if (Math.hypot(dx, dy) < catchDistance) {
        score += 3;
        phil.active = false;
        schedulePhilSpawn();
        updateHud();
        break;
      }
    }
  }

  if (boss.active) {
    const bossRect = {
      x: boss.x - boss.width * 0.5,
      y: boss.y - boss.height * 0.5,
      width: boss.width,
      height: boss.height,
    };

    const touchingSadieNow = circleIntersectsRect(girls[0].x, girls[0].y, girls[0].radius, bossRect);
    const touchingLilaNow = circleIntersectsRect(girls[1].x, girls[1].y, girls[1].radius, bossRect);

    if (touchingSadieNow && !boss.touchingSadie) {
      score -= BOSS_PENALTY_POINTS;
      updateHud();
    }

    if (touchingLilaNow && !boss.touchingLila) {
      score -= BOSS_PENALTY_POINTS;
      updateHud();
    }

    boss.touchingSadie = touchingSadieNow;
    boss.touchingLila = touchingLilaNow;
  }
}

function updatePhil(dt) {
  if (!phil.active) {
    phil.nextSpawnTimer -= dt;
    if (phil.nextSpawnTimer <= 0) {
      spawnPhil();
    }
    return;
  }

  phil.y += phil.fallSpeed * dt;
  if (phil.y - phil.height * 0.5 > WORLD.height) {
    phil.active = false;
    schedulePhilSpawn();
  }
}

function drawGardenBackground() {
  ctx.clearRect(0, 0, WORLD.width, WORLD.height);

  // Forest sky
  ctx.fillStyle = '#bfdff1';
  ctx.fillRect(0, 0, WORLD.width, WORLD.height * 0.24);

  // Forest floor
  ctx.fillStyle = '#9dc98a';
  ctx.fillRect(0, WORLD.height * 0.24, WORLD.width, WORLD.height * 0.76);

  // Dirt path winding through the forest
  ctx.fillStyle = '#b99c78';
  ctx.beginPath();
  ctx.moveTo(0, 360);
  ctx.bezierCurveTo(220, 300, 330, 430, 560, 360);
  ctx.bezierCurveTo(700, 320, 820, 410, WORLD.width, 355);
  ctx.lineTo(WORLD.width, WORLD.height);
  ctx.lineTo(0, WORLD.height);
  ctx.closePath();
  ctx.fill();

  // Background tree silhouettes
  const distantTrees = [
    { x: 45, y: 120, s: 1.1 },
    { x: 210, y: 105, s: 0.95 },
    { x: 330, y: 118, s: 1.05 },
    { x: 540, y: 108, s: 1 },
    { x: 680, y: 112, s: 0.98 },
    { x: 845, y: 122, s: 1.08 },
  ];

  distantTrees.forEach((tree) => {
    const trunkW = 10 * tree.s;
    const trunkH = 26 * tree.s;
    ctx.fillStyle = '#6d4a34';
    ctx.fillRect(tree.x - trunkW / 2, 148, trunkW, trunkH);

    ctx.fillStyle = '#5f9f5b';
    ctx.beginPath();
    ctx.arc(tree.x, 145, 24 * tree.s, 0, Math.PI * 2);
    ctx.arc(tree.x - 15 * tree.s, 152, 18 * tree.s, 0, Math.PI * 2);
    ctx.arc(tree.x + 15 * tree.s, 151, 18 * tree.s, 0, Math.PI * 2);
    ctx.fill();
  });
}

function drawObstacles() {
  obstacles.forEach((obstacle) => {
    if (obstacle.type === 'tree') {
      const centerX = obstacle.x + obstacle.width / 2;
      const crownY = obstacle.y + obstacle.height * 0.38;

      ctx.fillStyle = '#6f4a32';
      ctx.fillRect(centerX - 9, obstacle.y + obstacle.height * 0.52, 18, obstacle.height * 0.5);

      ctx.fillStyle = '#3f8744';
      ctx.beginPath();
      ctx.arc(centerX, crownY, obstacle.width * 0.34, 0, Math.PI * 2);
      ctx.arc(centerX - obstacle.width * 0.22, crownY + 8, obstacle.width * 0.28, 0, Math.PI * 2);
      ctx.arc(centerX + obstacle.width * 0.22, crownY + 8, obstacle.width * 0.28, 0, Math.PI * 2);
      ctx.fill();
    } else {
      const centerX = obstacle.x + obstacle.width / 2;
      const centerY = obstacle.y + obstacle.height / 2;
      ctx.fillStyle = '#89939d';
      ctx.beginPath();
      ctx.ellipse(centerX, centerY, obstacle.width * 0.5, obstacle.height * 0.5, -0.15, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#717a84';
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  });
}

function drawPrincess(player) {
  const { x, y, radius, dressColor, crownColor, hairColor, name } = player;

  // Dress (simple triangle like the reference)
  ctx.fillStyle = dressColor;
  ctx.beginPath();
  ctx.moveTo(x, y + radius + 22);
  ctx.lineTo(x - radius - 14, y + radius - 4);
  ctx.lineTo(x + radius + 14, y + radius - 4);
  ctx.closePath();
  ctx.fill();

  // Hair: only top + side locks, with bottom ending above chin level
  ctx.fillStyle = hairColor;
  ctx.beginPath();
  ctx.arc(x, y - 6, radius * 0.88, Math.PI, 0);
  ctx.fill();

  ctx.beginPath();
  ctx.ellipse(x - radius * 0.52, y + 1, radius * 0.34, radius * 0.52, 0, 0, Math.PI * 2);
  ctx.ellipse(x + radius * 0.52, y + 1, radius * 0.34, radius * 0.52, 0, 0, Math.PI * 2);
  ctx.fill();

  // Face
  ctx.fillStyle = '#f8d8bf';
  ctx.beginPath();
  ctx.arc(x, y - 2, radius * 0.62, 0, Math.PI * 2);
  ctx.fill();

  // Eyes + smile
  ctx.fillStyle = '#222';
  ctx.beginPath();
  ctx.arc(x - 4, y - 4, 1.5, 0, Math.PI * 2);
  ctx.arc(x + 4, y - 4, 1.5, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = '#754f3c';
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.arc(x, y + 2, 4, 0.2, Math.PI - 0.2);
  ctx.stroke();

  // Crown
  ctx.fillStyle = crownColor;
  ctx.beginPath();
  ctx.moveTo(x - 10, y - radius - 2);
  ctx.lineTo(x - 5, y - radius - 12);
  ctx.lineTo(x, y - radius - 4);
  ctx.lineTo(x + 5, y - radius - 12);
  ctx.lineTo(x + 10, y - radius - 2);
  ctx.closePath();
  ctx.fill();

  // Wand
  ctx.strokeStyle = '#8a6f4f';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(x + radius * 0.66, y + radius * 0.22);
  ctx.lineTo(x + radius * 1.4, y - radius * 0.5);
  ctx.stroke();

  const wandX = x + radius * 1.4;
  const wandY = y - radius * 0.5;
  ctx.fillStyle = '#ffd66e';
  ctx.beginPath();
  ctx.moveTo(wandX, wandY - 4);
  ctx.lineTo(wandX + 1.8, wandY - 1.4);
  ctx.lineTo(wandX + 5, wandY - 1.2);
  ctx.lineTo(wandX + 2.4, wandY + 1.2);
  ctx.lineTo(wandX + 3.2, wandY + 4);
  ctx.lineTo(wandX, wandY + 2.3);
  ctx.lineTo(wandX - 3.2, wandY + 4);
  ctx.lineTo(wandX - 2.4, wandY + 1.2);
  ctx.lineTo(wandX - 5, wandY - 1.2);
  ctx.lineTo(wandX - 1.8, wandY - 1.4);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#000000';
  ctx.font = '12px Trebuchet MS';
  ctx.textAlign = 'center';
  ctx.fillText(name, x, y + radius + 38);
}

function drawCat(cat) {
  const { x, y, radius, color, accent, name } = cat;

  ctx.fillStyle = color;

  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(x - radius * 0.65, y - radius * 0.5);
  ctx.lineTo(x - radius * 0.2, y - radius * 1.3);
  ctx.lineTo(x - radius * 0.02, y - radius * 0.45);
  ctx.closePath();
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(x + radius * 0.65, y - radius * 0.5);
  ctx.lineTo(x + radius * 0.2, y - radius * 1.3);
  ctx.lineTo(x + radius * 0.02, y - radius * 0.45);
  ctx.closePath();
  ctx.fill();

  if (cat.mode === 'sully') {
    ctx.fillStyle = accent;
    ctx.beginPath();
    ctx.ellipse(x, y + 4, radius * 0.38, radius * 0.48, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(x - radius * 0.48, y + radius * 0.58, radius * 0.2, 0, Math.PI * 2);
    ctx.arc(x + radius * 0.48, y + radius * 0.58, radius * 0.2, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.fillStyle = '#fff';
  ctx.beginPath();
  ctx.arc(x - 5, y - 2, 2.2, 0, Math.PI * 2);
  ctx.arc(x + 5, y - 2, 2.2, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#222';
  ctx.beginPath();
  ctx.arc(x - 5, y - 2, 1, 0, Math.PI * 2);
  ctx.arc(x + 5, y - 2, 1, 0, Math.PI * 2);
  ctx.fill();

  ctx.strokeStyle = '#ff94bf';
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.arc(x, y + 4, 3.2, 0.3, Math.PI - 0.3);
  ctx.stroke();

  ctx.fillStyle = '#000000';
  ctx.font = '12px Trebuchet MS';
  ctx.textAlign = 'center';
  ctx.fillText(name, x, y + radius + 18);
}

function drawPhil() {
  if (!phil.active) return;

  const x = phil.x;
  const y = phil.y;
  const w = phil.width;
  const h = phil.height;

  ctx.fillStyle = '#f7f1d6';
  ctx.fillRect(x - w * 0.5, y - h * 0.5, w, h);
  ctx.strokeStyle = '#d9cfa4';
  ctx.lineWidth = 2;
  ctx.strokeRect(x - w * 0.5, y - h * 0.5, w, h);

  ctx.fillStyle = '#e5ddb8';
  ctx.fillRect(x - w * 0.45, y - h * 0.18, w * 0.9, h * 0.14);

  ctx.fillStyle = '#000000';
  ctx.font = '11px Trebuchet MS';
  ctx.textAlign = 'center';
  ctx.fillText('Phil', x, y + h * 0.95);
}

function drawBoss() {
  if (!boss.active) return;

  const x = boss.x;
  const y = boss.y;
  const w = boss.width;
  const h = boss.height;

  // Shirt (heather gray like the photo)
  ctx.fillStyle = '#8a8b8f';
  ctx.beginPath();
  ctx.moveTo(x - w * 0.46, y + h * 0.28);
  ctx.lineTo(x + w * 0.46, y + h * 0.28);
  ctx.lineTo(x + w * 0.34, y - h * 0.02);
  ctx.lineTo(x - w * 0.34, y - h * 0.02);
  ctx.closePath();
  ctx.fill();

  // Neck
  ctx.fillStyle = '#dfb396';
  ctx.fillRect(x - w * 0.08, y - h * 0.1, w * 0.16, h * 0.15);

  // Head (slightly oval)
  ctx.fillStyle = '#e7b89b';
  ctx.beginPath();
  ctx.ellipse(x, y - h * 0.33, w * 0.29, h * 0.25, 0, 0, Math.PI * 2);
  ctx.fill();

  // Short dark textured hair, photo-inspired
  ctx.fillStyle = '#242424';
  ctx.beginPath();
  ctx.ellipse(x, y - h * 0.46, w * 0.31, h * 0.13, 0, Math.PI, 0);
  ctx.fill();

  // Slightly spiky top silhouette
  ctx.beginPath();
  ctx.moveTo(x - w * 0.2, y - h * 0.51);
  ctx.lineTo(x - w * 0.12, y - h * 0.57);
  ctx.lineTo(x - w * 0.05, y - h * 0.52);
  ctx.lineTo(x + w * 0.04, y - h * 0.59);
  ctx.lineTo(x + w * 0.14, y - h * 0.53);
  ctx.lineTo(x + w * 0.23, y - h * 0.56);
  ctx.lineTo(x + w * 0.2, y - h * 0.47);
  ctx.closePath();
  ctx.fill();

  // Eyes
  ctx.fillStyle = '#1f1f1f';
  ctx.beginPath();
  ctx.arc(x - 7, y - h * 0.35, 1.5, 0, Math.PI * 2);
  ctx.arc(x + 7, y - h * 0.35, 1.5, 0, Math.PI * 2);
  ctx.fill();

  // Smile lines / cheek marks to match the photo vibe
  ctx.strokeStyle = '#c28f78';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(x - 15, y - h * 0.3);
  ctx.lineTo(x - 21, y - h * 0.26);
  ctx.moveTo(x + 15, y - h * 0.3);
  ctx.lineTo(x + 21, y - h * 0.26);
  ctx.stroke();

  // Grumpy-but-playful mouth (boss mood)
  ctx.strokeStyle = '#6a3434';
  ctx.lineWidth = 1.9;
  ctx.beginPath();
  ctx.arc(x, y - h * 0.24, 5.6, Math.PI + 0.2, Math.PI * 2 - 0.2);
  ctx.stroke();

  // Speech bubble
  const bubbleW = 116;
  const bubbleH = 30;
  const bx = x - bubbleW * 0.5;
  const by = y - h * 0.92;
  ctx.fillStyle = '#fffdf9';
  ctx.strokeStyle = '#7f7065';
  ctx.lineWidth = 2;
  ctx.fillRect(bx, by, bubbleW, bubbleH);
  ctx.strokeRect(bx, by, bubbleW, bubbleH);
  ctx.beginPath();
  ctx.moveTo(x - 8, by + bubbleH);
  ctx.lineTo(x + 3, by + bubbleH);
  ctx.lineTo(x - 2, by + bubbleH + 10);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#222';
  ctx.font = 'bold 14px Trebuchet MS';
  ctx.textAlign = 'center';
  ctx.fillText("It's Bedtime!", x, by + 20);
}

function draw() {
  drawGardenBackground();
  drawObstacles();
  drawPhil();
  cats.forEach(drawCat);
  drawBoss();
  girls.forEach(drawPrincess);
}

function update(dt) {
  if (!roundStarted) {
    return;
  }

  girls.forEach((player) => handleInput(player, dt));
  cats.forEach((catEntity) => moveCat(catEntity, dt));
  updatePhil(dt);
  updateBoss(dt);
  checkCollisions();

  countdownAccumulator += dt;
  if (countdownAccumulator >= 1) {
    countdownAccumulator -= 1;
    timeLeft -= 1;
    updateHud();

    if (timeLeft <= 0) {
      timeLeft = 0;
      updateHud();
      endGame();
    }
  }
}

function gameLoop(timestamp) {
  if (!lastTimestamp) {
    lastTimestamp = timestamp;
  }

  const dt = Math.min((timestamp - lastTimestamp) / 1000, 0.05);
  lastTimestamp = timestamp;

  if (!gameOver) {
    update(dt);
  }

  draw();
  requestAnimationFrame(gameLoop);
}

window.addEventListener('keydown', (event) => {
  if (event.code in keys || event.code.startsWith('Arrow') || event.code.startsWith('Key')) {
    keys[event.code] = true;
  }

  if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'].includes(event.code)) {
    event.preventDefault();
  }
});

window.addEventListener('keyup', (event) => {
  keys[event.code] = false;
});

startGameBtn.addEventListener('click', () => {
  overlayEl.classList.add('hidden');
  startRoundIfNeeded();
});

playAgainBtn.addEventListener('click', () => {
  resetGame();
  startRoundIfNeeded();
});

resetGame();
showStartOverlay();
requestAnimationFrame(gameLoop);
