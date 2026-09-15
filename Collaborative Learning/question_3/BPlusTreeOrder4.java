import java.util.*;

class BPlusTree {
    private int order;
    private Node root;

    public BPlusTree(int order) {
        this.order = order;
        this.root = new Node(true);
    }

    class Node {
        List<Integer> keys;
        List<Node> children;
        boolean leaf;
        Node next; 

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

        if (y.leaf) {
            int keyUp = y.keys.get(mid);
            for (int j = mid; j < y.keys.size(); j++) {
                z.keys.add(y.keys.get(j));
            }
            y.keys.subList(mid, y.keys.size()).clear();
            z.next = y.next;
            y.next = z;
            x.children.add(i + 1, z);
            x.keys.add(i, keyUp);
        } else {
            int keyUp = y.keys.get(mid);
            for (int j = mid + 1; j < y.keys.size(); j++) {
                z.keys.add(y.keys.get(j));
            }
            for (int j = mid + 1; j < y.children.size(); j++) {
                z.children.add(y.children.get(j));
            }
            y.keys.subList(mid, y.keys.size()).clear();
            y.children.subList(mid + 1, y.children.size()).clear();
            x.children.add(i + 1, z);
            x.keys.add(i, keyUp);
        }
    }

    private void insertNonFull(Node x, int key) {
        int i = x.keys.size() - 1;
        if (x.leaf) {
            x.keys.add(0);
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

    public void printLeaves() {
        Node curr = root;
        while (!curr.leaf) {
            curr = curr.children.get(0);
        }
        System.out.print("Leaf nodes (linked list): ");
        while (curr != null) {
            System.out.print(curr.keys + " -> ");
            curr = curr.next;
        }
        System.out.println("null");
    }

    public void printTree(Node x, int level) {
        System.out.print("Level " + level + ": ");
        System.out.println(x.keys);
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

public class BPlusTreeOrder4 {
    public static void main(String[] args) {
        BPlusTree tree = new BPlusTree(4);
        int[] keys = {15, 25, 35, 45, 55, 65, 75, 85};
        for(int k : keys) {
            tree.insert(k);
        }
        System.out.println("B+ Tree of order 4 after inserting elements:");
        tree.print();
        tree.printLeaves();
    }
}
