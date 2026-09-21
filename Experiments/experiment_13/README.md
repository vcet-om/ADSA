# Experiment 13: Red-Black Tree Insertion

## Output
```
Inserted 10: 10(B) 
Inserted 18: 10(B) 18(R) 
Inserted 7: 7(R) 10(B) 18(R) 
Inserted 15: 7(B) 10(B) 15(R) 18(B) 
Inserted 16: 7(B) 10(B) 15(R) 16(B) 18(R) 
Inserted 30: 7(B) 10(B) 15(B) 16(R) 18(B) 30(R) 
Inserted 25: 7(B) 10(B) 15(B) 16(R) 18(R) 25(B) 30(R) 
Inserted 40: 7(B) 10(R) 15(B) 16(B) 18(B) 25(R) 30(B) 40(R)
```

## Explanation
A Red-Black Tree is a self-balancing binary search tree. Each node has an extra bit for color (Red or Black) used to ensure the tree remains approximately balanced during insertions and deletions. The balancing is maintained through operations like recoloring and rotations.
