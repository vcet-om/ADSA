# Experiment 11: N-queens on an NxN chessboard

## Output
```
One valid configuration for 4x4 board:
 .  .  Q  . 
 Q  .  .  . 
 .  .  .  Q 
 .  Q  .  .
```

## Explanation
The N-Queens problem asks to place N queens on an NxN chessboard so that no two queens attack each other. This implementation uses Backtracking. It places a queen column by column, checking for safety. If a placement leads to a dead end, it backtracks to try a different row.
