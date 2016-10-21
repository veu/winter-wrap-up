//)                                    __   __ _ __  _ _____ ___ ___
//)                                    \ \./ /| |  \| |_   _| -_|  _|
//)                                     \_._/ |_|_|\__| |_| |___|_|
//) 
//)                                             __   __ ___ ____ ___
//)                                             \ \./ /|  _| _  | _ |
//)                   __  __                     \_._/ |_| |__._|  _|
//)                ,-´  `´  )_                                  |_|
//)               (  /\---.   `--._                          _ _ ___
//)             __\ (' ,-. `,-._   )                        | | | _ |
//)     ,--.   (_   )  \_O) )   `-´                         |___|  _|
//)    (   .\,---(_)     _.__)           .-------------.        |_|
//)    (   _)          ,´               /               \
//)---(   )-(         |----------------/                 \----------------
//)   /`_/  /  )----\  \              /                   \  (%)
//)   |/   /  /      \  \            '---------------------'  |´   (%)
//)        '-´        `-´       (%)                                `|
//)                              |´
//)///////////////////////////////////////////////////////////////////////
//)
//) Before spring can start winter has to be cleaned up.
//) It’s your job to move the remaining snow piles to spots of grass
//) that have died during winter.
//)
//)// Controls ///////////////////////////////////////////////////////////
//)
//) * Use arrow keys to walk around and push snow piles
//) * Press space to undo the last action
//) * Reload to generate a new level
//)
//)// Features ///////////////////////////////////////////////////////////
//)
//) * Infinite random levels
//) * Audible snow moving
//) * Last move can be undone
//) * Resizes to window size

document.querySelector('meta').setAttribute('content', `width=device-width,initial-scale=${s = 1 / window.devicePixelRatio},maximum-scale=${s},user-scalable=no`);

downX = 0;
onclick = e => {
  /// Undo last move (if snow was moved)
  movedSnow && (
    // Restore player’s position
    moved && (playerX -= dx, playerY -= dy),
    // Restore source square
    board[sSource] += movedSnow,
    // Restore destination square
    board[sDest] -= movedSnow,
    // Make sure that undo can’t be invoked twice
    movedSnow = 0
  )
}
ontouchstart = e => {
  e = e.changedTouches.item(0);
  downX = e.pageX;
  downY = e.pageY
};
ontouchend = e => {
  e = e.changedTouches.item(0);
  downX && ((s = e.pageX - downX) | (t = e.pageY - downY)
    ? onkeydown({which:abs(s) > abs(t) ? s<0?37:39 : t<0?38:40})
    : onclick(e))
};
ontouchmove = e => e.preventDefault();

// Board (0..63 - snow piles, 64..127 - targets)
board =
// Unencoded track ([] + '' -> '')
track = [];

/// Generate sound effect. It’s 1/4 of a second of random
/// samples scaled by a sine function to avoid clicking.
for(i=11e3; i--;)
  track += String.fromCharCode(sin(i/3501)*random()*6 + 128);

/// Initialize game state
for(i=64; i--;)
  // Player’s position
  playerX = playerY =
  // Amount of snow moved in last action
  movedSnow =
  // Whether player moved in last action
  moved =
  // Current step in 32-frame animation
  animStep =
  // Snow pile height
  board[i] =
  // Player’s orientation
  dx = 0, dy = 1;

/// Generate dirt/target squares
for(i=10; i--;)
  // Place dirt if square is free (3 is the index of brown)
  board[k = random()*64|64] ? i++ : board[k] = 3;

/// Generate snow (only in the center to avoid impossible levels)
for(i=40; i--;)
  // Add snow if pile height is less than 4
  board[k = random()*6+1<<3|random()*6+1]&4 ? i++ : board[k]++;

/// Draw a circle
drawArc = (e, f, s, t) => {
  beginPath(),
  fillStyle = '#' + '694e57fbd742fffeeedddccc'.substr(s*3, 3),
  arc(e+16, f+16, t, 0, 7),
  fill()
},

/// Draw a circle as part of player
drawP = (e, f, s, t) => {
  // Add e and f to x or y depending on the orientation and animate
  drawArc(playerX*32 - dy*f - (e+moved*animStep)*dx,
          playerY*32 + dx*f - (e+moved*animStep)*dy, k*3||s, t/2+k/4)
},

/// Handle input
onkeydown = e => {
  // Do nothing if game is over
  active && (
    /// Move player (if key is in 37..40)
    // Normalize key code.
    (k = e.which - 37) >> 2 ||    
      // Calculate movement from key and positions
      // of source and destination squares
      (e = (dx = --k%2) + (s = playerX + dx),
       f = (dy = --k%2) + (t = playerY + dy),

      // Move player only if source square is inside the board
       s|t)>>3 || (
        movedSnow = 0,
        // Calculate source index and remember for undo
        i = sSource = s<<3|t,
        // Move snow only if destination is inside the board
        (e|f)>>3 || (
          /// Move snow and remember destination
          movedSnow = min(4 - board[sDest=e<<3|f], board[i]),
          board[i] -= movedSnow,
          board[sDest] += movedSnow,
          // Encode track, add header and play sound. The last byte in the header is the first sample
          // of the track. It’s included to make the header length divisible by 3.
          movedSnow && new Audio('data:audio/wav;base64,UklGRh0rAABXQVZFZm10IBAAAAABAAEARKwAAESsAAABAAgAZGF0YfkqAACA' + btoa(track)).play()
        ),
        // Reset animation
        animStep = 32,
        // Move player if the source square is empty
        (moved = !board[i]) && (playerX = s, playerY = t)
      )
  )
},

/// Update game
setInterval(s = e => {
  // Update canvas size
  c.height = (s = c.width = min(innerWidth, innerHeight * .85)) / .85;
  // Advance animation and draw background
  drawArc(animStep = animStep && animStep - 2, active = 0, 0, s * 2),
  // Scale board to canvas size
  scale(s /= 256, s);
  fillStyle = '#' + '000';
  fillRect(0, 256, 256, 200);
  fillStyle = '#' + 'fff';
  fillText('Move all snow to brown spots. Keys or drag to move.', 9, 268);
  fillText('Tap to undo.', 9, 280);

  /// Check for objective
  // The game is inactive
  for(i=64; i--;)
    // ...unless one square has snow on it but isn’t a target
    active |= board[i] && !board[i|64];

  /// Draw board
  for(i=64; i--;)
    drawArc(e = i/8<<5, f = i%8*32, active&&board[i|64], i%3+14);

  /// Draw snow piles or flowers
  for(k=4; k--;)
    for(i=64; i--;)
      // Draw until snow height is reached
      board[i]>k && (
        e = i/8<<5, f = i%8*32,
        // Remove snow after game is over
        animStep>k<<3 || active
          // Draw snow
          ? drawArc(e - (s = k < movedSnow && i==sDest)*dx*animStep,
                    k*2 + f - s*dy*animStep + 2 - board[i]*2, k+4, k*2+6)
          // Draw flowers
          : drawArc(e, f+i%7, 3-k, k*2+i%2+1)
      );

  /// Draw player
  for(k=2;k--;)
    // Tail
    drawP(animStep?9:8, 0, 1, 5),
    // Head
    drawP(-7, 0, 2, 12);
  for(k=2;k--;)
    /// Body
    for(i=8; i--;)
      drawP(4-i, 0, 2, 9);
  for(k=2;k--;)
    for(i=4; i--;)
      // Eyes
      drawP(i%2/2-12, i%2*3+3-i*3, i%2+3, 1+i%2/2),
      // Mane
      drawP(3-i*3, 2-i%2*3, 1, i*2+5)
}, 20)
