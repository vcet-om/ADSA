import java.util.*;

public class GraphTraversalsQ5 {
    public static void main(String[] args) {
        Map<Integer, List<Integer>> adj = new HashMap<>();
        adj.put(1, Arrays.asList(2, 3, 4));
        adj.put(2, Arrays.asList(5));
        adj.put(3, Arrays.asList(6));
        adj.put(4, Arrays.asList(7));
        adj.put(5, new ArrayList<>());
        adj.put(6, new ArrayList<>());
        adj.put(7, new ArrayList<>());

        System.out.println("BFS Traversal starting from 1:");
        bfs(1, adj);
        
        System.out.println("\nDFS Traversal starting from 1:");
        Set<Integer> visited = new HashSet<>();
        dfs(1, adj, visited);
        
        System.out.println("\n\nTime Complexity for both traversals: O(V + E) where V is vertices and E is edges.");
    }

    static void bfs(int start, Map<Integer, List<Integer>> adj) {
        Queue<Integer> q = new LinkedList<>();
        Set<Integer> visited = new HashSet<>();
        q.add(start);
        visited.add(start);
        while(!q.isEmpty()) {
            int u = q.poll();
            System.out.print(u + " ");
            for(int v : adj.get(u)) {
                if(!visited.contains(v)) {
                    visited.add(v);
                    q.add(v);
                }
            }
        }
    }

    static void dfs(int u, Map<Integer, List<Integer>> adj, Set<Integer> visited) {
        visited.add(u);
        System.out.print(u + " ");
        for(int v : adj.get(u)) {
            if(!visited.contains(v)) {
                dfs(v, adj, visited);
            }
        }
    }
}
