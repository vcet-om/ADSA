# Question 3: Spam Email Detection

## Java Program Output (Theoretical Performance Test)

```text
Comparing Algorithms for text: THIS IS A TEST TEXT FOR SPAM FILTERING WIN FREE OFFER WIN
Pattern: WIN

Naive Algorithm Execution Time (ns): 3875
Rabin-Karp Algorithm Execution Time (ns): 3458
```

## Student Tasks

1. **Compare the Naïve and Rabin–Karp algorithms for pattern matching:**
   * **Naïve Algorithm**: Checks every single character shift iteratively. Time complexity is $O(M \times N)$ in the worst case, making it very slow if the pattern and text have many repeating prefixes.
   * **Rabin-Karp Algorithm**: Uses a rolling hash function to generate a hash for a string window in $O(1)$ time. Instead of comparing strings character-by-character, it compares the hash integers. The average time complexity is much better at $O(N+M)$.

2. **Identify which algorithm is more efficient for searching multiple emails:**
   **The Rabin-Karp Algorithm** is significantly more efficient for searching through massive datasets like thousands of emails. 

3. **Justify your answer based on execution time:**
   The execution time overhead for computing the hash in Rabin-Karp is slightly higher for very short strings, but as the length of the text (emails) and the number of spam patterns ("WIN", "FREE", "OFFER") increases, Rabin-Karp completely outclasses the Naive algorithm. 
   
   More importantly, Rabin-Karp can be modified to search for **multiple patterns simultaneously** using a Bloom filter or hash set. While the Naïve algorithm would require $O(k \times N \times M)$ to search for $k$ different suspicious words, Rabin-Karp can compute the rolling hash of the email text just once and verify it against a set of spam hashes, making it exceptionally fast for email filtering.
