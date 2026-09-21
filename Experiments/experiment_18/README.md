# Experiment 18: Ford-Fulkerson Method (Max Flow)

## Output
```
Augmenting path flow: 12
Augmenting path flow: 4
Augmenting path flow: 7
The maximum possible flow is 23
```

## Explanation
The Ford-Fulkerson method calculates the maximum flow in a flow network. It uses BFS (Edmonds-Karp implementation) to find augmenting paths in a residual graph and iteratively adds the path flow to the total max flow until no more paths exist.
