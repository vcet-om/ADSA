# Experiment 12: Implementation of Hamiltonian Cycle

## Output
```
Solution Exists: Following is one Hamiltonian Cycle
 0  1  2  4  3  0
```

## Experiment Details

### Problem Statement
Find a Hamiltonian Cycle in a graph, if one exists.

### Aim and Objectives
To use backtracking to construct a cycle that visits every vertex exactly once and returns to the starting vertex.

### Theory and Concept
A Hamiltonian Cycle is a closed path containing every vertex exactly once. The algorithm fixes vertex `0` as the start and adds only unused vertices connected to the previous vertex. When all vertices are added, it checks the edge back to the start.

### Algorithm
1. Set vertex `0` as the first path vertex.
2. Try each unused vertex at the next path position.
3. Accept a vertex only if it is adjacent to the previous vertex.
4. Recursively continue until all vertices are in the path.
5. Check whether the last vertex connects to vertex `0`; otherwise backtrack.

### Complexity Analysis
- Worst-case time complexity: `O(V!)`.
- Space complexity: `O(V)` for the path and recursion.

### How to Run
```bash
javac HamiltonianCycle.java
java HamiltonianCycle
```

### Explanation
The output cycle `0 -> 1 -> 2 -> 4 -> 3 -> 0` visits all five vertices exactly once before returning to the start.
