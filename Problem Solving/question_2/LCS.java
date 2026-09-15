public class LCS {
    public static void main(String[] args) {
        String s1 = "AGGTAB";
        String s2 = "GXTXAYB";
        
        char[] X = s1.toCharArray();
        char[] Y = s2.toCharArray();
        int m = X.length;
        int n = Y.length;
        
        int[][] L = new int[m+1][n+1];
        
        for (int i = 0; i <= m; i++) {
            for (int j = 0; j <= n; j++) {
                if (i == 0 || j == 0)
                    L[i][j] = 0;
                else if (X[i-1] == Y[j-1])
                    L[i][j] = L[i-1][j-1] + 1;
                else
                    L[i][j] = Math.max(L[i-1][j], L[i][j-1]);
            }
        }
        
        System.out.println("LCS DP Table:");
        for(int i = 0; i <= m; i++) {
            for(int j = 0; j <= n; j++) {
                System.out.print(L[i][j] + " ");
            }
            System.out.println();
        }
        
        int index = L[m][n];
        int temp = index;
        
        char[] lcs = new char[index+1];
        lcs[index] = '\0'; 
        
        int i = m, j = n;
        while (i > 0 && j > 0) {
            if (X[i-1] == Y[j-1]) {
                lcs[index-1] = X[i-1];
                i--; j--; index--;
            }
            else if (L[i-1][j] > L[i][j-1])
                i--;
            else
                j--;
        }
        
        System.out.print("\nLongest Common Subsequence is: ");
        for(int k=0;k<temp;k++)
            System.out.print(lcs[k]);
        System.out.println("\nLCS Length is: " + temp);
    }
}
