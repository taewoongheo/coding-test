import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;

public class Main {

    public static ArrayList<Integer> deque = new ArrayList<>();

    public static int size;

    public static void push_front(int num) {
        ArrayList<Integer> front = new ArrayList<>();
        front.add(num);
        front.addAll(deque);
        deque = front;
    }

    public static void push_back(int num) {
        deque.add(num);
    }

    public static int pop_front() {
        if (!deque.isEmpty()) {
            return deque.remove(0);
        }
        return -1;
    }

    public static int pop_back() {
        if (!deque.isEmpty()) {
            return deque.remove(deque.size()-1);
        }
        return -1;
    }

    public static int size() {
        size = deque.size();
        return size;
    }

    public static int empty() {
        if (deque.isEmpty()) {
            return 1;
        } else {
            return 0;
        }
    }

    public static int front() {
        if (!deque.isEmpty()) {
            return deque.get(0);
        }
        return -1;
    }

    public static int back() {
        if (!deque.isEmpty()) {
            return deque.get(deque.size()-1);
        }
        return -1;
    }

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int N = Integer.parseInt(br.readLine());
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < N; i++) {
            String[] input = br.readLine().split(" ");
            String command = input[0];
            int num = 0;
            if (input.length > 1) {
                num = Integer.parseInt(input[1]);
            }
            switch (command) {
                case "push_front":
                    push_front(num);
                    break;
                case "push_back":
                    push_back(num);
                    break;
                case "pop_front":
                    sb.append(pop_front()+"\n");
                    break;
                case "pop_back":
                    sb.append(pop_back()+"\n");
                    break;
                case "size":
                    sb.append(size() + "\n");
                    break;
                case "empty":
                    sb.append(empty() + "\n");
                    break;
                case "front":
                    sb.append(front() + "\n");
                    break;
                case "back":
                    sb.append(back() + "\n");
                    break;
            }
        }
        System.out.println(sb);
    }
}
