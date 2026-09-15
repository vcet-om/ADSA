class Node {
    int data;
    Node left, right;
    public Node(int item) { data = item; left = right = null; }
}
public class BinaryTreeSearch {
    Node root;
    void printInorder(Node node) {
        if (node == null) return;
        printInorder(node.left);
        System.out.print(node.data + " ");
        printInorder(node.right);
    }
    boolean search(Node node, int key) {
        if (node == null) return false;
        if (node.data == key) return true;
        return search(node.left, key) || search(node.right, key);
    }
    public static void main(String[] args) {
        BinaryTreeSearch tree = new BinaryTreeSearch();
        tree.root = new Node(10);
        tree.root.left = new Node(20);
        tree.root.right = new Node(30);
        tree.root.left.left = new Node(40);
        tree.root.left.right = new Node(50);
        
        System.out.println("In-order traversal:");
        tree.printInorder(tree.root);
        
        int key1 = 30;
        int key2 = 60;
        System.out.println("\n\nSearching for key " + key1 + ": " + (tree.search(tree.root, key1) ? "Found" : "Not Found"));
        System.out.println("Searching for key " + key2 + ": " + (tree.search(tree.root, key2) ? "Found" : "Not Found"));
    }
}