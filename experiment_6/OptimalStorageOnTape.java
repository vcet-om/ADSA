import java.util.Arrays;
public class OptimalStorageOnTape {
    public static void main(String[] args) {
        int[] programs = {5, 10, 3, 2, 8};
        System.out.println("Original Program Lengths: " + Arrays.toString(programs));
        
        // Sort programs in ascending order to minimize MRT
        Arrays.sort(programs);
        System.out.println("Optimal Storage Order: " + Arrays.toString(programs));
        
        double totalRetrievalTime = 0;
        int currentSum = 0;
        
        for (int i = 0; i < programs.length; i++) {
            currentSum += programs[i];
            totalRetrievalTime += currentSum;
        }
        
        double mrt = totalRetrievalTime / programs.length;
        System.out.println("Total Retrieval Time: " + totalRetrievalTime);
        System.out.println("Mean Retrieval Time (MRT): " + mrt);
    }
}