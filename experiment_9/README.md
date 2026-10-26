# Experiment 9: Dijkstra's algorithm

## Output
```
Running Dijkstra's Algorithm from Source 0:
Vertex   Distance from Source
0 		 0
1 		 4
2 		 12
3 		 19
4 		 21
5 		 11
6 		 9
7 		 8
8 		 14
```

## Experiment Details

### Problem Statement
Find the shortest distances from one source vertex to every other vertex in a weighted graph.

### Aim and Objectives
To implement Dijkstra's single-source shortest-path algorithm for graphs with non-negative edge weights.

### Theory and Concept
Dijkstra's Algorithm repeatedly finalizes the unvisited vertex with the smallest tentative distance. It then relaxes that vertex's outgoing edges to improve distances to its neighbors.

### Algorithm
1. Set the source distance to `0` and all other distances to infinity.
2. Select the unvisited vertex with the smallest distance.
3. Mark it finalized and relax every adjacent vertex.
4. Repeat until all reachable vertices are finalized.

### Complexity Analysis
- Adjacency matrix implementation time complexity: `O(V^2)`.
- Space complexity: `O(V)`.

### How to Run
```bash
javac DijkstraAlgorithm.java
java DijkstraAlgorithm
```

### Explanation
The table reports the shortest distance from source vertex `0` to each vertex after all distance relaxations are complete.
