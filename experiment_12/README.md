# Experiment 12: Implementation of Hamiltonian Cycle

## Output
```
Solution Exists: Following is one Hamiltonian Cycle
 0  1  2  4  3  0
```

## Explanation
A Hamiltonian Cycle is a closed loop in a graph that visits every vertex exactly once. This solution uses Backtracking. It builds the path vertex by vertex, ensuring that there is an edge between consecutive vertices, and finally checks if the last vertex connects back to the start.
