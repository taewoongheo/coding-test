import java.io.*;
import java.util.ArrayList;

public class Main {

    public static void push(ArrayList<Integer> stack, int num) {
        stack.add(num);
    }

    public static void top(ArrayList<Integer> stack) {
        int size = size(stack);
        if (size == 0) {
            System.out.println("-1");
        } else {
            size -= 1;
            System.out.println(stack.get(size));
        }
    }

    public static int size(ArrayList<Integer> stack) {
        return stack.size();
    }

    public static void empty(ArrayList<Integer> stack) {
        int size = size(stack);
        if (size == 0) {
            System.out.println("1");
        } else {
            System.out.println("0");
        }
    }

    public static void pop(ArrayList<Integer> stack) {
        int size = size(stack);
        if (size == 0) {
            System.out.println("-1");
        } else {
            size -= 1;
            int popNum = stack.remove(size);
            System.out.println(popNum);
        }
    }

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        ArrayList<Integer> stack = new ArrayList<>();

        int N = Integer.parseInt(br.readLine());
        int count = 0;

        while (count < N) {
            count += 1;
            String input = br.readLine();
            if (input.contains("push")) {
                int num = Integer.parseInt(String.valueOf(input.substring(5)));
                push(stack, num);
            } else if (input.contains("top")) {
                top(stack);
            } else if (input.contains("size")) {
                System.out.println(size(stack));
            } else if (input.contains("empty")) {
                empty(stack);
            } else if (input.contains("pop")) {
                pop(stack);
            }
        }
    }
}

