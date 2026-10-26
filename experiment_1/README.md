# Experiment 1: Implementation of Merge Sort

## Output
```
Original array:
12 11 13 5 6 7 
Sorted array:
5 6 7 11 12 13
```

## Experiment Details

### Problem Statement
Implement Merge Sort to arrange an array of integers in ascending order.

### Aim and Objectives
To implement and understand a stable divide-and-conquer sorting algorithm.

### Theory and Concept
Merge Sort recursively divides the array into two halves until each subarray has one element. It then merges adjacent sorted subarrays. The merge operation compares the first remaining element of each half and places the smaller value in the result.

### Algorithm
1. Divide the array at its midpoint.
2. Recursively sort the left and right halves.
3. Merge the two sorted halves.
4. Repeat until the complete array is sorted.

### Complexity Analysis
- Time complexity: `O(n log n)` in the best, average, and worst cases.
- Space complexity: `O(n)` for the temporary arrays used during merging.

### How to Run
```bash
javac MergeSort.java
java MergeSort
```

### Explanation
The output shows the original array followed by the sorted array after the recursive divide-and-merge process.
