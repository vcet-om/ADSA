# Experiment 19: Bellman-Ford Algorithm

## Output
```
Vertex Distance from Source
0		0
1		-1
2		2
3		-2
4		1
```

## Explanation
The Bellman-Ford algorithm finds the shortest path from a single source vertex to all other vertices in a weighted digraph. Unlike Dijkstra's, it can handle negative weight edges and detects negative weight cycles by relaxing all edges V-1 times.
