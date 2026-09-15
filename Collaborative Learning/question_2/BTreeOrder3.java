import java.util.*;

class BTree {
    private int order;
    private Node root;

    public BTree(int order) {
        this.order = order;
        this.root = new Node(true);
    }

    class Node {
        List<Integer> keys;
        List<Node> children;
        boolean leaf;

        Node(boolean leaf) {
            this.leaf = leaf;
            keys = new ArrayList<>();
            children = new ArrayList<>();
        }
    }

    public void insert(int key) {
        Node r = root;
        if (r.keys.size() == order - 1) {
            Node s = new Node(false);
            root = s;
            s.children.add(r);
            splitChild(s, 0, r);
            insertNonFull(s, key);
        } else {
            insertNonFull(r, key);
        }
    }

    private void splitChild(Node x, int i, Node y) {
        Node z = new Node(y.leaf);
        int mid = (order - 1) / 2;
        int keyUp = y.keys.get(mid);

        for (int j = mid + 1; j < y.keys.size(); j++) {
            z.keys.add(y.keys.get(j));
        }
        if (!y.leaf) {
            for (int j = mid + 1; j < y.children.size(); j++) {
                z.children.add(y.children.get(j));
            }
        }

        y.keys.subList(mid, y.keys.size()).clear();
        if (!y.leaf) {
            y.children.subList(mid + 1, y.children.size()).clear();
        }

        x.children.add(i + 1, z);
        x.keys.add(i, keyUp);
    }

    private void insertNonFull(Node x, int key) {
        int i = x.keys.size() - 1;
        if (x.leaf) {
            x.keys.add(0); // placeholder
            while (i >= 0 && x.keys.get(i) > key) {
                x.keys.set(i + 1, x.keys.get(i));
                i--;
            }
            x.keys.set(i + 1, key);
        } else {
            while (i >= 0 && x.keys.get(i) > key) {
                i--;
            }
            i++;
            if (x.children.get(i).keys.size() == order - 1) {
                splitChild(x, i, x.children.get(i));
                if (key > x.keys.get(i)) {
                    i++;
                }
            }
            insertNonFull(x.children.get(i), key);
        }
    }

    public void printTree(Node x, int level) {
        System.out.print("Level " + level + ": ");
        for (int k : x.keys) {
            System.out.print(k + " ");
        }
        System.out.println();
        if (!x.leaf) {
            for (Node c : x.children) {
                printTree(c, level + 1);
            }
        }
    }
    
    public void print() {
        printTree(root, 0);
    }
}

public class BTreeOrder3 {
    public static void main(String[] args) {
        BTree tree = new BTree(3);
        int[] keys = {10, 20, 5, 6, 12, 30, 7, 17};
        for(int k : keys) {
            tree.insert(k);
        }
        System.out.println("B-Tree of order 3 after inserting elements:");
        tree.print();
    }
}
