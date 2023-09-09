import java.io.*;
import java.util.Stack;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        String input = br.readLine();
        int N = Integer.parseInt(br.readLine());
        Stack<String> leftStack = new Stack<>();
        Stack<String> rightStack = new Stack<>();
        for (int i = 0; i < input.length(); i++) {
            leftStack.push(String.valueOf(input.charAt(i)));
        }
        for (int i = 0; i < N; i++) {
            String command = br.readLine();
            if (command.contains("L")) {
                if (!leftStack.isEmpty()) {
                    String item = leftStack.pop();
                    rightStack.push(item);
                }
            } else if (command.contains("D")) {
                if (!rightStack.isEmpty()) {
                    String item = rightStack.pop();
                    leftStack.push(item);
                }
            } else if (command.contains("B")) {
                if (!leftStack.isEmpty()) {
                    leftStack.pop();
                }
            } else if (command.contains("P")) {
                String item = command.substring(2);
                leftStack.push(item);
            }
        }
        int size = rightStack.size();
        for (int i = 0; i < size; i++) {
            leftStack.push(rightStack.pop());
        }
        StringBuilder sb = new StringBuilder();
        size = leftStack.size();
        for (int i = 0; i < size; i++) {
            sb.append(leftStack.pop());
        }
        bw.write(String.valueOf(sb.reverse()));
        bw.flush();
    }
}
