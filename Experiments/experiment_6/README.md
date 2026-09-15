# Experiment 6: Implement the Optimal Storage on Tape algorithm

## Output
```
Original Program Lengths: [5, 10, 3, 2, 8]
Optimal Storage Order: [2, 3, 5, 8, 10]
Total Retrieval Time: 63.0
Mean Retrieval Time (MRT): 12.6
```

## Explanation
The Optimal Storage on Tape algorithm is a greedy approach. To minimize the Mean Retrieval Time (MRT), the programs must be stored in increasing order of their lengths. Sorting the lengths before computing the cumulative sums guarantees the minimal retrieval time.
