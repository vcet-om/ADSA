# Question 2

**Task:** Construct a B-Tree of order 3 by inserting the following keys: 10, 20, 5, 6, 12, 30, 7, 17

## Output

```text
B-Tree of order 3 after inserting elements:
Level 0: 10 20 
Level 1: 6 
Level 2: 5 
Level 2: 7 
Level 1: 
Level 2: 12 17 
Level 1: 
Level 2: 30 

```

## Code Explanation

The code is implemented in `BTreeOrder3.java`. It implements a B-Tree of order 3. In a B-Tree of order 3 (also known as a 2-3 tree), a node can have at most 3 children and 2 keys. The code handles splitting a node when it becomes full (reaches 2 keys) and recursively inserts the new keys into the appropriate child node. Finally, it traverses the tree level by level to print the keys.