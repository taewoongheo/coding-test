import java.io.*;
import java.util.ArrayList;
import java.util.Stack;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));

        int N = Integer.parseInt(br.readLine());
        ArrayList<String> result = new ArrayList<>();
        Stack<Integer> stack = new Stack<>();
        int stackNum = 0;
        Boolean resultSwitch = true;
        loop: for (int i = 0; i < N; i++) {
            int inputNum = Integer.parseInt(br.readLine());
            if(stackNum < inputNum) {
                while (stackNum != inputNum) {
                    stackNum+=1;
                    stack.push(stackNum);
                    result.add("+");
                }
            }
            if (stackNum == inputNum) {
                stack.pop();
                result.add("-");
            } else if(stackNum > inputNum) {
                while (!stack.isEmpty()) {
                    int top = stack.peek();
                    stack.pop();
                    result.add("-");
                    if (top == inputNum) {
                        continue loop;
                    }
                }
                if (stack.isEmpty()) {
                    resultSwitch=false;
                }
            }
        }
        if (resultSwitch) {
            for (int i = 0; i < result.size(); i++) {
                bw.write(result.get(i)+"\n");
            }
            bw.flush();
        } else {
            System.out.println("NO");
        }
    }
}
