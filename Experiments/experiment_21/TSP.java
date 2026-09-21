public class TSP {
    static int n = 4;
    static int[][] dist = {
        {0, 10, 15, 20},
        {10, 0, 35, 25},
        {15, 35, 0, 30},
        {20, 25, 30, 0}
    };
    static int VISITED_ALL = (1 << n) - 1;
    static int[][] memo = new int[n][1 << n];

    static int tsp(int mask, int pos) {
        if (mask == VISITED_ALL) return dist[pos][0];
        if (memo[pos][mask] != 0) return memo[pos][mask];

        int ans = Integer.MAX_VALUE;
        for (int city = 0; city < n; city++) {
            if ((mask & (1 << city)) == 0) {
                int newAns = dist[pos][city] + tsp(mask | (1 << city), city);
                ans = Math.min(ans, newAns);
            }
        }
        return memo[pos][mask] = ans;
    }

    public static void main(String[] args) {
        for (int i = 0; i < n; i++)
            for (int j = 0; j < (1 << n); j++)
                memo[i][j] = 0;
                
        System.out.println("TSP Graph distance matrix:");
        for(int[] row : dist) {
            for(int val : row) System.out.print(val + " ");
            System.out.println();
        }
        System.out.println("Minimum weight Hamiltonian Cycle (TSP): " + tsp(1, 0));
    }
}
