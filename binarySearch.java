class Node1 {
    int data;
    Node1 left, right;

    public Node1(int item) {
        data = item;
        left = right = null;
    }
}

class binarySearch {

    static void search(Node1 root, int data) {

        if (root == null) {
            System.out.println("Data not found");
            return;
        }
        if (root.data == data) {
            System.out.println("Data found ");
            return;
        }

        // value is greater
        if (root.data < data) {
            search(root.right, data);
        } else {
            search(root.left, data); // value is smaller
        }
    }

    public static void main(String[] args) {

        // creating tree
        Node1 root = new Node1(50);
        root.left = new Node1(30);
        root.right = new Node1(70);
        root.left.left = new Node1(20);
        root.left.right = new Node1(40);
        root.right.left = new Node1(60);
        root.right.right = new Node1(80);

        // searching for specific value
        search(root, 110);

        search(root, 80);

    }
}