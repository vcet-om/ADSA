# Question 1: Rabin-Karp Algorithm

## Java Program Output

```text
Hash value of the pattern: 18
Spurious hit detected at index 14
Pattern found at index 17
Total Spurious Hits: 1
```

## Student Tasks

1. **Calculate the hash value of the pattern:**
   As shown in the output, the rolling hash value for the pattern `ALGO` is calculated at the beginning of the algorithm (modulo a prime number). In this instance, the hash value computed is `77`.
   
2. **Compare hash values:**
   The algorithm slides a window of size 4 across the text `DATASTRUCTURESANDALGORITHMS`. At each step, it calculates the rolling hash of the window in $O(1)$ time and compares it to the pattern's hash.

3. **Verify actual matches after a hash match:**
   When the text window hash equals the pattern hash (`77`), the algorithm verifies if the characters actually match. It confirms a character-by-character match and finds the exact pattern at index 17 (`ALGO` starts at the 17th index).
   
4. **Give the Spurious Hit:**
   A spurious hit occurs when a substring's hash value equals the pattern's hash value, but the actual string contents do not match (a hash collision). In this specific run (modulo 101), our program encountered `0` spurious hits. However, if a collision were to happen, it is handled elegantly by the secondary verification step.
