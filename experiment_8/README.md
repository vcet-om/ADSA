# Experiment 8: Implement the Longest Common Subsequence (LCS) algorithm

## Output
```
S1 : ACADB
S2 : CBDA
LCS: CB
Length: 2
```

## Experiment Details

### Problem Statement
Find the longest subsequence common to two strings without changing the order of their characters.

### Aim and Objectives
To implement LCS using dynamic programming and reconstruct the resulting subsequence.

### Theory and Concept
For matching characters, the LCS length increases from the diagonal subproblem. For different characters, it is the maximum of the values from the top and left subproblems. Backtracking through the table reconstructs one valid LCS.

### Algorithm
1. Create a table for prefixes of both strings.
2. Fill the table using the matching and non-matching character rules.
3. Start at the bottom-right cell.
4. Follow diagonal matches while backtracking to build the LCS.

### Complexity Analysis
- Time complexity: `O(mn)`.
- Space complexity: `O(mn)`, where `m` and `n` are the string lengths.

### How to Run
```bash
javac LCS.java
java LCS
```

### Explanation
For `ACADB` and `CBDA`, the program reconstructs `CB`, whose length is `2`.
