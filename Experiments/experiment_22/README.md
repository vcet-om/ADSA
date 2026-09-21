# Experiment 22: Knuth-Morris-Pratt (KMP) Algorithm

## Output
```
Text: ABABDABACDABABCABAB
Pattern: ABABCABAB
Found pattern at index 10
```

## Explanation
The Knuth-Morris-Pratt (KMP) string matching algorithm searches for occurrences of a pattern within a text. It uses a Longest Proper Prefix which is also Suffix (LPS) array to avoid redundant character comparisons, achieving linear time complexity O(N+M).
