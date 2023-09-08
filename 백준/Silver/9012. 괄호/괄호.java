import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Stack;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        int N = Integer.parseInt(br.readLine());
        loop: for (int i = 0; i < N; i++) {
            String input = br.readLine();
            int inputSize = input.length();
            Stack<String> stack = new Stack<>();
            for (int j = 0; j < inputSize; j++) {
                //연산시작
                String inputElem = String.valueOf(input.charAt(j));
                if (inputElem.equals("(")) {
                    stack.push(inputElem);
                } else if (inputElem.equals(")")) {
                    if (stack.isEmpty()) {
                        System.out.println("NO");
                        continue loop;
                    } else {
                        stack.pop();
                    }
                }
            }
            if (stack.isEmpty()) {
                System.out.println("YES");
            } else {
                System.out.println("NO");
            }
        }
    }
}
