import java.util.*;

public class GraphTraversalsQ6 {
    public static void main(String[] args) {
        Map<String, List<String>> adj = new TreeMap<>();
        adj.put("A", Arrays.asList("B", "C", "D"));
        adj.put("B", Arrays.asList("E", "F"));
        adj.put("C", Arrays.asList("G"));
        adj.put("D", Arrays.asList("H"));
        adj.put("E", new ArrayList<>());
        adj.put("F", Arrays.asList("I", "J"));
        adj.put("G", new ArrayList<>());
        adj.put("H", new ArrayList<>());
        adj.put("I", new ArrayList<>());
        adj.put("J", new ArrayList<>());

        System.out.println("Adjacency List:");
        for(String key : adj.keySet()) {
            System.out.println(key + " -> " + adj.get(key));
        }

        System.out.println("\nBFS Traversal starting from A:");
        bfs("A", adj);
        
        System.out.println("\n\nDFS Traversal starting from A:");
        Set<String> visited = new HashSet<>();
        dfs("A", adj, visited);
        
        System.out.println("\n\nTime Complexity for both traversals: O(V + E) where V is vertices and E is edges.");
    }

    static void bfs(String start, Map<String, List<String>> adj) {
        Queue<String> q = new LinkedList<>();
        Set<String> visited = new HashSet<>();
        q.add(start);
        visited.add(start);
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
    }

    static void dfs(String u, Map<String, List<String>> adj, Set<String> visited) {
        visited.add(u);
        System.out.print(u + " ");
        for(String v : adj.get(u)) {
            if(!visited.contains(v)) {
                dfs(v, adj, visited);
            }
        }
    }
}
