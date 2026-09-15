public class StringMatchingCompare {
    public static void main(String[] args) {
        String text = "THIS IS A TEST TEXT FOR SPAM FILTERING WIN FREE OFFER WIN";
        String pattern = "WIN";
        
        System.out.println("Comparing Algorithms for text: " + text);
        System.out.println("Pattern: " + pattern);
        
        long start = System.nanoTime();
        naiveSearch(pattern, text);
        long naiveTime = System.nanoTime() - start;
        
        start = System.nanoTime();
        rabinKarp(pattern, text, 101);
        long rkTime = System.nanoTime() - start;
        
        System.out.println("\nNaive Algorithm Execution Time (ns): " + naiveTime);
        System.out.println("Rabin-Karp Algorithm Execution Time (ns): " + rkTime);
    }
    
    static void naiveSearch(String pat, String txt) {
        int M = pat.length();
        int N = txt.length();
        for (int i = 0; i <= N - M; i++) {
            int j;
            for (j = 0; j < M; j++)
                if (txt.charAt(i + j) != pat.charAt(j))
                    break;
        }
    }
    
    static void rabinKarp(String pat, String txt, int q) {
        int d = 256;
        int M = pat.length();
        int N = txt.length();
        int i, j, p = 0, t = 0, h = 1;
        
        for (i = 0; i < M - 1; i++) h = (h * d) % q;
        for (i = 0; i < M; i++) {
            p = (d * p + pat.charAt(i)) % q;
            t = (d * t + txt.charAt(i)) % q;
        }
        
        for (i = 0; i <= N - M; i++) {
            if (p == t) {
                for (j = 0; j < M; j++) {
                    if (txt.charAt(i + j) != pat.charAt(j)) break;
                }
            }
            if (i < N - M) {
                t = (d * (t - txt.charAt(i) * h) + txt.charAt(i + M)) % q;
                if (t < 0) t = (t + q);
            }
        }
    }
}
