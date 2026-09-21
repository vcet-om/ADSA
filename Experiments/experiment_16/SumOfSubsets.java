public class SumOfSubsets {
    static void subsetSum(int[] set, int[] subset, int subsetSize, int total, int nodeCount, int target) {
        if (total == target) {
            System.out.print("Subset found: [ ");
            for (int i = 0; i < subsetSize; i++) System.out.print(subset[i] + " ");
            System.out.println("]");
            return;
        }
        for (int i = nodeCount; i < set.length; i++) {
            subset[subsetSize] = set[i];
            subsetSum(set, subset, subsetSize + 1, total + set[i], i + 1, target);
        }
    }

    public static void main(String[] args) {
        int[] set = {10, 7, 5, 18, 12, 20, 15};
        int[] subset = new int[set.length];
        int target = 35;
        System.out.println("Set: {10, 7, 5, 18, 12, 20, 15}, Target: " + target);
        subsetSum(set, subset, 0, 0, 0, target);
    }
}
