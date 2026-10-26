# Experiment 7: Implement Prim's Algorithm

## Output
```
Running Prim's Minimum Spanning Tree Algorithm:
Edge 	Weight
0 - 1	2
1 - 2	3
0 - 3	6
1 - 4	5
Total Cost: 16
```

## Experiment Details

### Problem Statement
Implement Prim's Algorithm to find a Minimum Spanning Tree (MST) of a connected, weighted, undirected graph represented by an adjacency matrix.

### Aim and Objectives
To use a greedy approach to connect all vertices with minimum total edge weight and no cycles.

### Theory and Concept
A spanning tree connects every vertex of a connected graph without cycles. An MST is the spanning tree with minimum total weight. Prim's Algorithm maintains a set of vertices already in the MST and repeatedly chooses the minimum-weight edge connecting that set to an outside vertex.

### Algorithm
1. Initialize all key values to infinity and set `key[0] = 0`.
2. Select the non-MST vertex with the smallest key.
3. Add it to the MST set.
4. For each adjacent non-MST vertex, update its key and parent when a lighter edge is found.
5. Print the parent edges and add their weights to obtain the total cost.

### Complexity Analysis
- Adjacency matrix implementation time complexity: `O(V^2)`.
- Auxiliary space complexity: `O(V)`.

### How to Run
```bash
javac PrimsAlgorithm.java
java PrimsAlgorithm
```

### Explanation
The selected edges connect all five vertices with total cost `2 + 3 + 6 + 5 = 16`, which is the minimum spanning tree cost for the supplied graph.
