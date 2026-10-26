# Experiment 2: Implementation of a hash function

## Output
```
Inserting keys: 15, 11, 27, 8, 12, 21, 14
Hash Table (Chaining):
Bucket 0: 21 -> 14 -> null
Bucket 1: 15 -> 8 -> null
Bucket 2: null
Bucket 3: null
Bucket 4: 11 -> null
Bucket 5: 12 -> null
Bucket 6: 27 -> null
```

## Experiment Details

### Problem Statement
Implement a hash table for integer keys and resolve collisions using chaining.

### Aim and Objectives
To understand hash functions, bucket indexing, insertion, and collision handling.

### Theory and Concept
The hash function maps a key to a bucket using `key % capacity`. When multiple keys map to the same bucket, a linked list stores all keys in that bucket. This is called separate chaining.

### Algorithm
1. Create a table containing one linked list for each bucket.
2. Compute `key % capacity` for every key.
3. Insert the key at the corresponding linked list.
4. Display all buckets and their chained keys.

### Complexity Analysis
- Average insertion time: `O(1)`.
- Worst-case insertion and search time: `O(n)` when many keys collide.
- Space complexity: `O(n + m)`, where `n` is the number of keys and `m` is the number of buckets.

### How to Run
```bash
javac HashFunction.java
java HashFunction
```

### Explanation
Keys such as `15` and `8` are placed in the same bucket because they have the same remainder when divided by the table capacity. The linked lists preserve every inserted key.
