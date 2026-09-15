import java.util.*;

class Job {
    char id;
    int deadline, profit;
    public Job(char id, int deadline, int profit) {
        this.id = id; this.deadline = deadline; this.profit = profit;
    }
}

public class JobSequencing {
    public static void main(String[] args) {
        List<Job> jobs = new ArrayList<>();
        jobs.add(new Job('a', 2, 100));
        jobs.add(new Job('b', 1, 19));
        jobs.add(new Job('c', 2, 27));
        jobs.add(new Job('d', 1, 25));
        jobs.add(new Job('e', 3, 15));
        
        int n = jobs.size();
        Collections.sort(jobs, (a, b) -> b.profit - a.profit);
        
        System.out.println("Jobs sorted by descending profit:");
        for(Job j : jobs) {
            System.out.println("Job " + j.id + ": Profit=" + j.profit + ", Deadline=" + j.deadline);
        }
        
        int maxDeadline = 0;
        for (Job j : jobs) {
            if (j.deadline > maxDeadline) maxDeadline = j.deadline;
        }
        
        char[] result = new char[maxDeadline];
        boolean[] slot = new boolean[maxDeadline];
        
        int totalProfit = 0;
        
        for (int i = 0; i < n; i++) {
            for (int j = Math.min(maxDeadline, jobs.get(i).deadline) - 1; j >= 0; j--) {
                if (!slot[j]) {
                    result[j] = jobs.get(i).id;
                    slot[j] = true;
                    totalProfit += jobs.get(i).profit;
                    break;
                }
            }
        }
        
        System.out.println("\nFinal Scheduled Jobs:");
        for (int i = 0; i < maxDeadline; i++) {
            if (slot[i]) {
                System.out.print(result[i] + " ");
            }
        }
        System.out.println("\n\nMaximum Profit: " + totalProfit);
    }
}
