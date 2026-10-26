# Experiment 6: Implement the Optimal Storage on Tape algorithm

## Output
```
Original Program Lengths: [5, 10, 3, 2, 8]
Optimal Storage Order: [2, 3, 5, 8, 10]
Total Retrieval Time: 63.0
Mean Retrieval Time (MRT): 12.6
```

## Experiment Details

### Problem Statement
Arrange programs on a tape so that the mean retrieval time is minimized.

### Aim and Objectives
To apply a greedy strategy to the optimal storage problem and calculate total and mean retrieval times.

### Theory and Concept
Shorter programs should be stored first because every later program includes the retrieval time of all programs before it. Sorting program lengths in nondecreasing order minimizes the sum of cumulative retrieval times.

### Algorithm
1. Sort all program lengths in ascending order.
2. Add each length to a running cumulative sum.
3. Add every cumulative sum to the total retrieval time.
4. Divide the total by the number of programs to obtain the MRT.

### Complexity Analysis
- Time complexity: `O(n log n)` because of sorting.
- Space complexity: `O(1)` auxiliary space apart from the sorting implementation.

### How to Run
```bash
javac OptimalStorageOnTape.java
java OptimalStorageOnTape
```

### Explanation
The order `[2, 3, 5, 8, 10]` gives cumulative retrieval times `2, 5, 10, 18, 28`, whose total is `63` and mean is `12.6`.
