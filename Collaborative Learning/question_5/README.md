# Question 5

**Task:** Perform both BFS and DFS starting from vertex 1, state time complexity.

## Output

```text
BFS Traversal starting from 1:
1 2 3 4 5 6 7 
DFS Traversal starting from 1:
1 2 5 3 6 4 7 

Time Complexity for both traversals: O(V + E) where V is vertices and E is edges.

```

## Code Explanation

The code is implemented in `GraphTraversalsQ5.java`. The program builds a graph using an Adjacency List representing vertices 1 through 7. The `bfs` method uses a queue to visit neighbors level by level, while the `dfs` method uses recursion (the call stack) to explore as deep as possible before backtracking. The time complexity of both traversals is O(V + E) where V is the number of vertices and E is the number of edges.