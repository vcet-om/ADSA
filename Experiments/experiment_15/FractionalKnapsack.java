import java.util.Arrays;
import java.util.Comparator;

class Item {
    int value, weight;
    Item(int value, int weight) { this.value = value; this.weight = weight; }
}

public class FractionalKnapsack {
    public static double getMaxValue(Item[] items, int capacity) {
        Arrays.sort(items, new Comparator<Item>() {
            @Override
            public int compare(Item i1, Item i2) {
                double cpr1 = (double) i1.value / i1.weight;
                double cpr2 = (double) i2.value / i2.weight;
                return Double.compare(cpr2, cpr1);
            }
        });

        double totalValue = 0d;
        for (Item i : items) {
            if (capacity - i.weight >= 0) {
                capacity -= i.weight;
                totalValue += i.value;
                System.out.println("Taking full item (V:" + i.value + ", W:" + i.weight + ")");
            } else {
                double fraction = ((double) capacity / i.weight);
                totalValue += (i.value * fraction);
                System.out.println("Taking fraction " + String.format("%.2f", fraction) + " of item (V:" + i.value + ", W:" + i.weight + ")");
                break;
            }
        }
        return totalValue;
    }

    public static void main(String[] args) {
        Item[] items = { new Item(60, 10), new Item(100, 20), new Item(120, 30) };
        int capacity = 50;
        System.out.println("Knapsack Capacity: " + capacity);
        double maxValue = getMaxValue(items, capacity);
        System.out.println("Maximum value we can obtain = " + maxValue);
    }
}
