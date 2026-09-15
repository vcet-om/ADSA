# Question 6

**Task:** Perform BFS and DFS from A, Write Adjacency List, State Time Complexity

## Output

```text
Adjacency List:
A -> [B, C, D]
B -> [E, F]
C -> [G]
D -> [H]
E -> []
F -> [I, J]
G -> []
H -> []
I -> []
J -> []

BFS Traversal starting from A:
A B C D E F G H I J 

DFS Traversal starting from A:
A B E F I J C G D H 

Time Complexity for both traversals: O(V + E) where V is vertices and E is edges.

```

## Code Explanation

The code is implemented in `GraphTraversalsQ6.java`. The graph is represented using an Adjacency List (`TreeMap` to maintain alphabetical order). It prints the Adjacency List, then executes BFS (using a queue) and DFS (using recursion). The time complexity is clearly indicated as O(V + E) for both traversals.