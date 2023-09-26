import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Stack;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String inputWord = br.readLine();
        int[] laser = new int[100000];
        int idx = 0;
        int result = 0;
        Stack<String> stack = new Stack<>();
        for (int i = 0; i < inputWord.length(); i++) {
            String input = String.valueOf(inputWord.charAt(i));
            if (input.equals("(")) {
                stack.push(input);
                idx++;
            } else if (input.equals(")")) {
                String pop = stack.peek();
                stack.push(input);
                if (pop.equals("(")) {
                    idx--;
                    for (int j = 0; j < idx; j++) {
                        laser[j]++;
                    }
                } else {
                    result += laser[idx-1] + 1;
                    laser[idx-1] = 0;
                    idx--;
                }
            }
        }
        System.out.println(result);
    }
}
