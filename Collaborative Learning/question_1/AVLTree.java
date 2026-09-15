class Node {
    int key, height;
    Node left, right;
    Node(int d) { key = d; height = 1; }
}
public class AVLTree {
    Node root;
    int height(Node N) { return (N == null) ? 0 : N.height; }
    int max(int a, int b) { return (a > b) ? a : b; }
    Node rightRotate(Node y) {
        Node x = y.left;
        Node T2 = x.right;
        x.right = y;
        y.left = T2;
        y.height = max(height(y.left), height(y.right)) + 1;
        x.height = max(height(x.left), height(x.right)) + 1;
        return x;
    }
    Node leftRotate(Node x) {
        Node y = x.right;
        Node T2 = y.left;
        y.left = x;
        x.right = T2;
        x.height = max(height(x.left), height(x.right)) + 1;
        y.height = max(height(y.left), height(y.right)) + 1;
        return y;
    }
    int getBalance(Node N) { return (N == null) ? 0 : height(N.left) - height(N.right); }
    Node insert(Node node, int key) {
        if (node == null) return (new Node(key));
        if (key < node.key) node.left = insert(node.left, key);
        else if (key > node.key) node.right = insert(node.right, key);
        else return node;
        node.height = 1 + max(height(node.left), height(node.right));
        int balance = getBalance(node);
        if (balance > 1 && key < node.left.key) return rightRotate(node);
        if (balance < -1 && key > node.right.key) return leftRotate(node);
        if (balance > 1 && key > node.left.key) {
            node.left = leftRotate(node.left);
            return rightRotate(node);
        }
        if (balance < -1 && key < node.right.key) {
            node.right = rightRotate(node.right);
            return leftRotate(node);
        }
        return node;
    }
    void preOrder(Node node) {
        if (node != null) {
            System.out.print(node.key + " ");
            preOrder(node.left);
            preOrder(node.right);
        }
    }
    public static void main(String[] args) {
        AVLTree tree = new AVLTree();
        int[] keys = {50, 20, 70, 10, 30, 60, 80, 25};
        for (int key : keys) {
            tree.root = tree.insert(tree.root, key);
        }
        System.out.println("Preorder traversal of constructed AVL tree:");
        tree.preOrder(tree.root);
        System.out.println();
    }
}
