# Question 3\n\n**Task:** Construct a B+ Tree of order 4 by inserting: 15, 25, 35, 45, 55, 65, 75, 85\n\n## Output\n\n```text\nB+ Tree of order 4 after inserting elements:
Level 0: [35]
Level 1: [25]
Level 2: [15]
Level 2: [25]
Level 1: [45, 55, 65]
Level 2: [35]
Level 2: [45]
Level 2: [55]
Level 2: [65, 75, 85]
Leaf nodes (linked list): [15] -> [25] -> [35] -> [45] -> [55] -> [65, 75, 85] -> null
\n```\n\n## Code Explanation\n\nThe code is implemented in `BPlusTreeOrder4.java`. It implements a B+ Tree of order 4. An order 4 B+ tree has at most 4 children and 3 keys per node. The keys are kept at the leaf nodes which form a linked list, while internal nodes only act as routers. When a node overflows, it is split, and the middle key is pushed up. Leaf node keys are retained and linked via the `next` pointer.