import java.util.*;

public class BFSGraph {
    public static void main(String[] args) {
        Map<String, List<String>> adj = new HashMap<>();
        adj.put("A", Arrays.asList("B", "C"));
        adj.put("B", Arrays.asList("D", "E"));
        adj.put("C", Arrays.asList("F"));
        adj.put("D", new ArrayList<>());
        adj.put("E", new ArrayList<>());
        adj.put("F", new ArrayList<>());
        
        System.out.println("BFS Traversal starting from A:");
        Queue<String> q = new LinkedList<>();
        Set<String> visited = new HashSet<>();
        q.add("A");
        visited.add("A");
        while(!q.isEmpty()) {
            String u = q.poll();
            System.out.print(u + " ");
            for(String v : adj.get(u)) {
                if(!visited.contains(v)) {
                    visited.add(v);
                    q.add(v);
                }
            }
        }
        System.out.println();
    }
}
