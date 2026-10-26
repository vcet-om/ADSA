# Experiment 10: Floyd-Warshall algorithm

## Output
```
The following matrix shows the shortest distances between every pair of vertices:
0   5   8   9   
INF 0   3   4   
INF INF 0   1   
INF INF INF 0
```

## Experiment Details

### Problem Statement
Compute shortest paths between every pair of vertices in a weighted directed graph.

### Aim and Objectives
To use dynamic programming to calculate an all-pairs shortest-path matrix.

### Theory and Concept
The algorithm considers each vertex as an intermediate vertex. For every pair `(i, j)`, it replaces the current distance with `dist[i][k] + dist[k][j]` when that route is shorter.

### Algorithm
1. Copy the input adjacency matrix to a distance matrix.
2. Select each vertex `k` as an intermediate vertex.
3. Update every pair `(i, j)` through `k` if the route is shorter.
4. Print the final distance matrix.

### Complexity Analysis
- Time complexity: `O(V^3)`.
- Space complexity: `O(V^2)`.

### How to Run
```bash
javac FloydWarshall.java
java FloydWarshall
```

### Explanation
The final matrix contains the shortest known distance for every ordered pair. `INF` indicates that no path exists between the corresponding vertices.
