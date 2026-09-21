# Experiment 15: Fractional Knapsack Problem

## Output
```
Knapsack Capacity: 50
Taking full item (V:60, W:10)
Taking full item (V:100, W:20)
Taking fraction 0.67 of item (V:120, W:30)
Maximum value we can obtain = 240.0
```

## Explanation
The Fractional Knapsack problem uses a greedy approach. It sorts items by their value-to-weight ratio in descending order and greedily picks items. If an item cannot be fully picked, a fraction of it is taken to maximize total value.
