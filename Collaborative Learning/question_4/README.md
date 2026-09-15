# Question 4

**Task:** Perform Breadth-First Search (BFS) starting from vertex A.

## Output

```text
BFS Traversal starting from A:
A B C D E F 

```

## Code Explanation

The code is implemented in `BFSGraph.java`. The graph is modeled using an Adjacency List (a `Map` of strings to lists). The program performs Breadth-First Search (BFS) using a Queue and a Visited Set. It starts at vertex A, dequeues a node, prints it, and enqueues all its unvisited neighbors, continuing until the queue is empty.