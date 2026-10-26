# Experiment 3: Construct a binary tree from user inputs and perform Pre-order, In-order, and Post-order traversals

## Output
```
Simulating user input to construct the binary tree...
Pre-order traversal:
1 2 4 5 3 
In-order traversal:
4 2 5 1 3 
Post-order traversal:
4 5 2 3 1
```

## Experiment Details

### Problem Statement
Construct a binary tree and display its pre-order, in-order, and post-order traversals.

### Aim and Objectives
To implement the three standard recursive depth-first traversals of a binary tree.

### Theory and Concept
- Pre-order visits Root, Left, Right.
- In-order visits Left, Root, Right.
- Post-order visits Left, Right, Root.

Each traversal visits every node exactly once.

### Algorithm
1. If the current node is `null`, return.
2. Visit child nodes in the order required by the traversal.
3. Print the node when its position in that order is reached.

### Complexity Analysis
- Time complexity: `O(n)` for each traversal.
- Space complexity: `O(h)` for recursion, where `h` is the tree height.

### How to Run
```bash
javac BinaryTreeTraversals.java
java BinaryTreeTraversals
```

### Explanation
The same tree produces different sequences because each traversal prints the root at a different point relative to its left and right subtrees.
