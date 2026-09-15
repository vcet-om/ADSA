class Node {
    int data;
    Node left, right;
    public Node(int item) { data = item; left = right = null; }
}
public class BinaryTreeTraversals {
    Node root;
    void printPreorder(Node node) {
        if (node == null) return;
        System.out.print(node.data + " ");
        printPreorder(node.left);
        printPreorder(node.right);
    }
    void printInorder(Node node) {
        if (node == null) return;
        printInorder(node.left);
        System.out.print(node.data + " ");
        printInorder(node.right);
    }
    void printPostorder(Node node) {
        if (node == null) return;
        printPostorder(node.left);
        printPostorder(node.right);
        System.out.print(node.data + " ");
    }
    public static void main(String[] args) {
        BinaryTreeTraversals tree = new BinaryTreeTraversals();
        System.out.println("Simulating user input to construct the binary tree...");
        tree.root = new Node(1);
        tree.root.left = new Node(2);
        tree.root.right = new Node(3);
        tree.root.left.left = new Node(4);
        tree.root.left.right = new Node(5);
        
        System.out.println("Pre-order traversal:");
        tree.printPreorder(tree.root);
        System.out.println("\nIn-order traversal:");
        tree.printInorder(tree.root);
        System.out.println("\nPost-order traversal:");
        tree.printPostorder(tree.root);
        System.out.println();
    }
}