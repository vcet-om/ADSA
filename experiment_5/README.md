# Experiment 5: Implement Breadth First Search graph traversal

## Output
```
Following is Breadth First Traversal (starting from vertex 2):
2 0 3 1
```

## Experiment Details

### Problem Statement
Implement Breadth First Search (BFS) to traverse a graph from a specified starting vertex.

### Aim and Objectives
To traverse a graph level by level using a queue and a visited array.

### Theory and Concept
BFS first visits the source vertex, then all vertices at distance one, followed by vertices at distance two, and so on. Marking a vertex when it enters the queue prevents repeated processing.

### Algorithm
1. Mark the source as visited and enqueue it.
2. Remove the front vertex from the queue and print it.
3. Enqueue each unvisited adjacent vertex and mark it visited.
4. Continue until the queue is empty.

### Complexity Analysis
- With adjacency lists, time complexity is `O(V + E)`.
- Space complexity is `O(V)` for the queue and visited array.

### How to Run
```bash
javac BFS.java
java BFS
```

### Explanation
Starting from vertex `2`, the queue ensures vertices are printed in breadth-first order: the source, its neighbors, and then the next level.
