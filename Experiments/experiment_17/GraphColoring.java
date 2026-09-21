import java.util.Arrays;

public class GraphColoring {
    final int V = 4;
    int[] color;

    boolean isSafe(int v, int[][] graph, int[] color, int c) {
        for (int i = 0; i < V; i++) {
            if (graph[v][i] == 1 && c == color[i]) return false;
        }
        return true;
    }

    boolean graphColoringUtil(int[][] graph, int m, int[] color, int v) {
        if (v == V) return true;
        for (int c = 1; c <= m; c++) {
            if (isSafe(v, graph, color, c)) {
                color[v] = c;
                if (graphColoringUtil(graph, m, color, v + 1)) return true;
                color[v] = 0; // backtrack
            }
        }
        return false;
    }

    boolean graphColoring(int[][] graph, int m) {
        color = new int[V];
        Arrays.fill(color, 0);
        if (!graphColoringUtil(graph, m, color, 0)) {
            System.out.println("Solution does not exist");
            return false;
        }
        System.out.println("Solution exists. Assigned Colors:");
        for (int i = 0; i < V; i++) System.out.println("Vertex " + i + " -> Color " + color[i]);
        return true;
    }

    public static void main(String[] args) {
        GraphColoring gc = new GraphColoring();
        int[][] graph = {
            {0, 1, 1, 1},
            {1, 0, 1, 0},
            {1, 1, 0, 1},
            {1, 0, 1, 0}
        };
        int m = 3; // Number of colors
        System.out.println("Graph with 4 vertices, max colors: " + m);
        gc.graphColoring(graph, m);
    }
}
