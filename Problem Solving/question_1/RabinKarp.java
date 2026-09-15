public class RabinKarp {
    public static final int d = 256;
    
    public static void search(String pat, String txt, int q) {
        int M = pat.length();
        int N = txt.length();
        int i, j;
        int p = 0; 
        int t = 0; 
        int h = 1;
        int spuriousHits = 0;
        
        for (i = 0; i < M - 1; i++)
            h = (h * d) % q;
        
        for (i = 0; i < M; i++) {
            p = (d * p + pat.charAt(i)) % q;
            t = (d * t + txt.charAt(i)) % q;
        }
        
        System.out.println("Hash value of the pattern: " + p);
        
        for (i = 0; i <= N - M; i++) {
            if (p == t) {
                for (j = 0; j < M; j++) {
                    if (txt.charAt(i + j) != pat.charAt(j))
                        break;
                }
                if (j == M)
                    System.out.println("Pattern found at index " + i);
                else {
                    spuriousHits++;
                    System.out.println("Spurious hit detected at index " + i);
                }
            }
            if (i < N - M) {
                t = (d * (t - txt.charAt(i) * h) + txt.charAt(i + M)) % q;
                if (t < 0)
                    t = (t + q);
            }
        }
        System.out.println("Total Spurious Hits: " + spuriousHits);
    }
    
    public static void main(String[] args) {
        String txt = "DATASTRUCTURESANDALGORITHMS";
        String pat = "ALGO";
        int q = 101; 
        search(pat, txt, q);
    }
}
