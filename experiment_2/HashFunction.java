import java.util.LinkedList;
public class HashFunction {
    int capacity;
    LinkedList<Integer>[] table;
    
    @SuppressWarnings("unchecked")
    public HashFunction(int capacity) {
        this.capacity = capacity;
        table = new LinkedList[capacity];
        for (int i = 0; i < capacity; i++) table[i] = new LinkedList<>();
    }
    public void insert(int key) {
        int index = key % capacity;
        table[index].add(key);
    }
    public void display() {
        for (int i = 0; i < capacity; i++) {
            System.out.print("Bucket " + i + ": ");
            for (Integer key : table[i]) System.out.print(key + " -> ");
            System.out.println("null");
        }
    }
    public static void main(String[] args) {
        HashFunction hf = new HashFunction(7);
        int[] keys = {15, 11, 27, 8, 12, 21, 14};
        System.out.println("Inserting keys: 15, 11, 27, 8, 12, 21, 14");
        for (int key : keys) hf.insert(key);
        System.out.println("Hash Table (Chaining):");
        hf.display();
    }
}