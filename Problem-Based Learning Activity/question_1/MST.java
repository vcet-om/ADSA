import java.util.*;

class Edge implements Comparable<Edge> {
    int src, dest, weight;
    public Edge(int src, int dest, int weight) {
        this.src = src; this.dest = dest; this.weight = weight;
    }
    public int compareTo(Edge compareEdge) {
        return this.weight - compareEdge.weight;
    }
}

public class MST {
    public static void main(String[] args) {
        int V = 6;
        List<Edge> edges = new ArrayList<>();
        edges.add(new Edge(0, 1, 4));
        edges.add(new Edge(0, 2, 4));
        edges.add(new Edge(1, 2, 2));
        edges.add(new Edge(1, 3, 5));
        edges.add(new Edge(2, 3, 5));
        edges.add(new Edge(2, 4, 9));
        edges.add(new Edge(3, 4, 7));
        edges.add(new Edge(3, 5, 6));
        edges.add(new Edge(4, 5, 3));
        
        System.out.println("--- Prim's Algorithm ---");
        primMST(V, edges);
        
        System.out.println("\n--- Kruskal's Algorithm ---");
        kruskalMST(V, edges);
    }
    
    static void primMST(int V, List<Edge> edges) {
        int[][] graph = new int[V][V];
        for (Edge e : edges) {
            graph[e.src][e.dest] = e.weight;
            graph[e.dest][e.src] = e.weight;
        }
        int[] parent = new int[V];
        int[] key = new int[V];
        boolean[] mstSet = new boolean[V];
        
        Arrays.fill(key, Integer.MAX_VALUE);
        key[0] = 0;
        parent[0] = -1;
        
        for (int count = 0; count < V - 1; count++) {
            int u = minKey(key, mstSet, V);
            mstSet[u] = true;
            for (int v = 0; v < V; v++) {
                if (graph[u][v] != 0 && !mstSet[v] && graph[u][v] < key[v]) {
                    parent[v] = u;
                    key[v] = graph[u][v];
                }
            }
        }
        
        int totalCost = 0;
        System.out.println("Edge \tWeight");
        for (int i = 1; i < V; i++) {
            System.out.println((char)(parent[i]+'A') + " - " + (char)(i+'A') + "\t" + graph[i][parent[i]]);
            totalCost += graph[i][parent[i]];
        }
        System.out.println("Total Cost: " + totalCost);
    }
    
    static int minKey(int[] key, boolean[] mstSet, int V) {
        int min = Integer.MAX_VALUE, min_index = -1;
        for (int v = 0; v < V; v++)
            if (!mstSet[v] && key[v] < min) {
                min = key[v];
                min_index = v;
            }
        return min_index;
    }
    
    static class Subset { int parent, rank; }
    static int find(Subset[] subsets, int i) {
        if (subsets[i].parent != i)
            subsets[i].parent = find(subsets, subsets[i].parent);
        return subsets[i].parent;
    }
    static void Union(Subset[] subsets, int x, int y) {
        int xroot = find(subsets, x);
        int yroot = find(subsets, y);
        if (subsets[xroot].rank < subsets[yroot].rank)
            subsets[xroot].parent = yroot;
        else if (subsets[xroot].rank > subsets[yroot].rank)
            subsets[yroot].parent = xroot;
        else {
            subsets[yroot].parent = xroot;
            subsets[xroot].rank++;
        }
    }
    
    static void kruskalMST(int V, List<Edge> edges) {
        Edge[] result = new Edge[V];
        int e = 0;
        int i = 0;
        Collections.sort(edges);
        
        Subset[] subsets = new Subset[V];
        for (i = 0; i < V; ++i) {
            subsets[i] = new Subset();
            subsets[i].parent = i;
            subsets[i].rank = 0;
        }
        
        i = 0;
        while (e < V - 1 && i < edges.size()) {
            Edge next_edge = edges.get(i++);
            int x = find(subsets, next_edge.src);
            int y = find(subsets, next_edge.dest);
            if (x != y) {
                result[e++] = next_edge;
                Union(subsets, x, y);
            }
        }
        
        int totalCost = 0;
        System.out.println("Edge \tWeight");
        for (i = 0; i < e; ++i) {
            System.out.println((char)(result[i].src+'A') + " - " + (char)(result[i].dest+'A') + "\t" + result[i].weight);
            totalCost += result[i].weight;
        }
        System.out.println("Total Cost: " + totalCost);
    }
}
