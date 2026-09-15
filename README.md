# ADSA Practicals (NEP Scheme) - Semester 3

Welcome to the Advanced Data Structures and Algorithms (ADSA) Practicals repository. This repository contains solutions, Java implementations, and theoretical explanations for various ADSA practical assignments mapped to the NEP (National Education Policy) Scheme for Semester 3.

## Directory Structure

This repository is divided into three main activity modules:

### 1. Collaborative Learning
This folder contains fundamental data structures and graph algorithms:
* **Question 1:** AVL Tree Construction and Traversals.
* **Question 2:** B-Tree (Order 3) Implementation.
* **Question 3:** B+ Tree (Order 4) Implementation.
* **Question 4:** Graph Breadth-First Search (BFS) Traversal.
* **Question 5:** Graph BFS and DFS Traversals with Time Complexity analysis.
* **Question 6:** Adjacency List representation alongside BFS and DFS graph traversals.

### 2. Problem-Based Learning Activity
This folder focuses on applying algorithms to real-world scenarios:
* **Question 1 (Minimum Spanning Tree):** Connecting cities using optical fiber cables using Prim's and Kruskal's algorithms to minimize infrastructure cost.
* **Question 2 (Job Sequencing with Deadlines):** Using the Greedy approach to schedule client projects and maximize total company profit within limited time slots.

### 3. Problem Solving
This folder contains string matching and dynamic programming problems:
* **Question 1 (Rabin-Karp Algorithm):** Calculating rolling hash values to detect plagiarism and matching patterns while handling spurious hits.
* **Question 2 (Longest Common Subsequence):** Using Dynamic Programming to find the LCS of DNA sequences, highlighting its importance in bioinformatics.
* **Question 3 (Spam Email Detection):** Comparing the Naïve String Matching algorithm against the Rabin-Karp algorithm for efficient spam filtering on large datasets.

## How to Run

Each question is enclosed in its own folder (e.g., `question_1`). Inside each folder, you will find:
1. The **Java source code** (`.java`).
2. A **README.md** file detailing the problem's theoretical concepts, step-by-step student tasks, and the exact console output of the Java program.

To run any program locally:
```bash
# Navigate to the specific question folder
cd "Collaborative Learning/question_1"

# Compile the Java file
javac *.java

# Run the compiled Java class (e.g., java AVLTree)
java <ClassName>
```
