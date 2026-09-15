# Question 2: Job Sequencing with Deadlines

## Output from Java Program

```text
Jobs sorted by descending profit:
Job a: Profit=100, Deadline=2
Job c: Profit=27, Deadline=2
Job d: Profit=25, Deadline=1
Job b: Profit=19, Deadline=1
Job e: Profit=15, Deadline=3

Final Scheduled Jobs:
c a e 

Maximum Profit: 142
```

## 1. Arrange jobs in descending order of profit
As shown in the output, the algorithm first sorts the given jobs by their profit in descending order to maximize potential earnings early on.
1. Job **a**: Profit=100, Deadline=2
2. Job **c**: Profit=27, Deadline=2
3. Job **d**: Profit=25, Deadline=1
4. Job **b**: Profit=19, Deadline=1
5. Job **e**: Profit=15, Deadline=3

## 2. Allocate jobs to available time slots
The greedy algorithm allocates each job to the latest possible free time slot before its deadline.
* **Job a** (Deadline 2): Assigned to Slot 2.
* **Job c** (Deadline 2): Slot 2 is taken, so it checks Slot 1. Assigned to Slot 1.
* **Job d** (Deadline 1): Slot 1 is taken, no available slots before deadline. Dropped.
* **Job b** (Deadline 1): Slot 1 is taken. Dropped.
* **Job e** (Deadline 3): Assigned to Slot 3.

## 3. Draw the final schedule
| Time Slot | 0 - 1 | 1 - 2 | 2 - 3 |
|-----------|-------|-------|-------|
| **Job**   | c     | a     | e     |

Final execution sequence: **c -> a -> e**

## 4. Calculate the maximum profit
The total maximized profit is:
Profit(c) + Profit(a) + Profit(e) = 27 + 100 + 15 = **142**

## 5. Explain why the greedy approach gives an optimal solution
The greedy approach is optimal here because by considering the most profitable jobs first and scheduling them as late as possible (closest to their deadline), we leave earlier time slots open for other high-value jobs that have tighter deadlines. This ensures that the maximum number of highly profitable jobs can be accommodated without causing conflicts.

## 6. Suggest applications of job sequencing in industry
* **Cloud Computing & Server Task Scheduling**: Allocating CPU resources to high-priority client tasks before their deadlines expire.
* **Manufacturing**: Scheduling production orders on assembly lines where each order has a delivery deadline and different revenue values.
* **Logistics & Delivery**: Assigning delivery trucks for high-value priority shipments that must arrive by a certain time.
