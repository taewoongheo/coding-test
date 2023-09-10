import java.io.*;
import java.util.ArrayList;

public class Main {

    public static ArrayList<Integer> queue = new ArrayList<>();

    public static int size;

    public static void push(int num) {
        queue.add(num);
    }

    public static void pop() {
        System.out.println(queue.get(0));
        queue.remove(0);
    }

    public static void size() {
        size = queue.size();
        System.out.println(size);
    }

    public static void empty() {
        if (!queue.isEmpty()) {
            System.out.println("0");
        } else {
            System.out.println("1");
        }
    }

    public static void front() {
        System.out.println(queue.get(0));
    }

    public static void back() {
        System.out.println(queue.get(queue.size()-1));
    }

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        int N = Integer.parseInt(br.readLine());
        while (N-- > 0) {
            String[] input = br.readLine().split(" ");
            switch (input[0]) {
                case "push":
                    push(Integer.parseInt(input[1]));
                    break;
                case "pop":
                    if (!queue.isEmpty()) {
                        pop();
                    } else {
                        System.out.println("-1");
                    }
                    break;
                case "size":
                    size();
                    break;
                case "empty":
                    empty();
                    break;
                case "front":
                    if (!queue.isEmpty()) {
                        front();
                    } else {
                        System.out.println("-1");
                    }
                    break;
                case "back":
                    if (!queue.isEmpty()) {
                        back();
                    } else {
                        System.out.println("-1");
                    }
                    break;
            }
        }
    }
}
