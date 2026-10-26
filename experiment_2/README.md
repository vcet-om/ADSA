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

## Explanation
This code implements a basic hash table using separate chaining for collision resolution. The hash function uses the modulo operator (`key % capacity`) to determine the bucket index for each key.
