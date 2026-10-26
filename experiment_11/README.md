# Experiment 11: N-queens on an NxN chessboard

## Output
```
One valid configuration for 4x4 board:
 .  .  Q  . 
 Q  .  .  . 
 .  .  .  Q 
 .  Q  .  .
```

## Experiment Details

### Problem Statement
Place `N` queens on an `N x N` chessboard so that no two queens attack each other.

### Aim and Objectives
To solve a constraint-satisfaction problem using backtracking.

### Theory and Concept
Queens cannot share a row, column, or diagonal. The program places one queen per column, checks whether the row and both diagonals are safe, and removes the queen when a later placement cannot be completed.

### Algorithm
1. Start with the first column.
2. Try each row in the current column.
3. Place a queen only when the row and diagonals are safe.
4. Recursively solve the next column.
5. Backtrack and try another row if no solution is possible.

### Complexity Analysis
- Worst-case time complexity: `O(N!)`.
- Space complexity: `O(N^2)` for the board and `O(N)` recursion depth.

### How to Run
```bash
javac NQueens.java
java NQueens
```

### Explanation
The displayed 4x4 arrangement contains one queen in every row and column, with no pair sharing a diagonal.
