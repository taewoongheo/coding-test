import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.*;

public class Main {

    public static HashMap<String, Node> nodeMap;

    public static class Node {
        public String data, right, left;

        public Node(String data, String right, String left) {
            this.data = data;
            this.left = left;
            this.right = right;
        }

        @Override
        public String toString() {
            return data+" "+left+" "+right;
        }
    }

    public static void preOrder(Node node) {
        System.out.print(node.data);
        if (!node.left.equals(".")) {
            preOrder(nodeMap.get(node.left));
        }
        if (!node.right.equals(".")) {
            preOrder(nodeMap.get(node.right));
        }
    }

    public static void inOrder(Node node) {
        if(!node.left.equals(".")) {
            inOrder(nodeMap.get(node.left));
        }
        System.out.print(node.data);
        if(!node.right.equals(".")) {
            inOrder(nodeMap.get(node.right));
        }
    }

    public static void postOrder(Node node) {
        if(!node.left.equals(".")) {
            postOrder(nodeMap.get(node.left));
        }
        if(!node.right.equals(".")) {
            postOrder(nodeMap.get(node.right));
        }
        System.out.print(node.data);
    }

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int N = Integer.parseInt(br.readLine());
        nodeMap = new HashMap<>();

        for (int i = 0; i < N; i++) {
            String data = String.valueOf((char)(65+i));
            nodeMap.put(data, new Node(data, ".", "."));
        }

        Node root = new Node(".", ".", ".");
        for (int i = 0; i < N; i++) {
            String[] line = br.readLine().split(" ");
            Node node = nodeMap.get(line[0]);
            if (!line[1].equals(".")) {
                node.left = nodeMap.get(line[1]).data;
            }
            if(!line[2].equals(".")) {
                node.right = nodeMap.get(line[2]).data;
            }
            if (line[0].equals("A")) {
                root = node;
            }
        }
        
        preOrder(root);
        System.out.println();
        inOrder(root);
        System.out.println();
        postOrder(root);
        System.out.println();
    }
}