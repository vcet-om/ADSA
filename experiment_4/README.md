# Experiment 4: Construct a Binary Tree and perform Traversals of the constructed binary tree also search for the given key

## Output
```
In-order traversal:
40 20 50 10 30 

Searching for key 30: Found
Searching for key 60: Not Found
```

## Experiment Details

### Problem Statement
Construct a binary tree, display its in-order traversal, and search for specified keys.

### Aim and Objectives
To combine binary-tree traversal with recursive element searching.

### Theory and Concept
The search checks the current node and then recursively checks the left and right subtrees. Since this is a general binary tree rather than a binary search tree, both subtrees may need to be visited.

### Algorithm
1. Perform an in-order traversal to display the tree.
2. Compare the search key with the current node.
3. If it does not match, recursively search both subtrees.
4. Return `Found` if either subtree contains the key; otherwise return `Not Found`.

### Complexity Analysis
- Traversal time: `O(n)`.
- Search time: `O(n)` in the worst case.
- Space complexity: `O(h)` for recursion.

### How to Run
```bash
javac BinaryTreeSearch.java
java BinaryTreeSearch
```

### Explanation
Key `30` exists at the root's right child, while key `60` is absent, so the two searches produce different results.
