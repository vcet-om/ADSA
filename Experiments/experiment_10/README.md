# Experiment 10: Floyd-Warshall algorithm

## Output
```
The following matrix shows the shortest distances between every pair of vertices:
0   5   8   9   
INF 0   3   4   
INF INF 0   1   
INF INF INF 0
```

## Explanation
The Floyd-Warshall algorithm computes shortest paths between every pair of vertices in a directed weighted graph. It uses dynamic programming to iteratively improve the estimated shortest path between two vertices by checking if a path through an intermediate vertex is shorter.
