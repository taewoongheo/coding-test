import java.io.*;

public class Main {

    public static int N;
    public static String[][] arr;
    public static int[] sequence;
    public static int[] dp;

    public static boolean check(int depth, int num) {
        boolean result = true;
        if (depth == 0) {
            dp = new int[N];
        }
        loop: for (int i = 0; i < depth+1; i++) {
            //검사할 행 - i
            String sign = arr[i][depth];
            if (sign.equals("+")) {
                if (dp[i] + num <= 0) {
                    result = false;
                    break loop;
                }
            } else if (sign.equals("-")) {
                if (dp[i] + num >= 0) {
                    result = false;
                    break loop;
                }
            } else if (sign.equals("0")) {
                if (dp[i] + num != 0) {
                    result = false;
                    break loop;
                }
            }
        }
        return result;
    }

    public static void bt(int depth) {
        if (depth == N) {
            for (int i = 0; i < N; i++) {
                System.out.print(sequence[i] + " ");
            }
            System.out.println();
            System.exit(0);
            return;
        }
        for (int i = -10; i <= 10; i++) {
            if (check(depth, i)) {
                sequence[depth] = i;
                for (int j = 0; j < depth+1; j++) {
                    dp[j] += i;
                }
                bt(depth + 1);
                for (int j = 0; j < depth+1; j++) {
                    dp[j] -= i;
                }
            }
        }
    }

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        N = Integer.parseInt(br.readLine());
        String input = br.readLine();
        int size = input.length();

        String[] inputArr = new String[size];
        for (int i = 0; i < size; i++) {
            inputArr[i] = String.valueOf(input.charAt(i));
        }

        arr = new String[N][N];
        int idx = 0;
        for (int i = 0; i < N; i++) {
            for (int j = i; j < N; j++) {
                arr[i][j] = inputArr[idx];
                idx += 1;
            }
        }

        sequence = new int[N];
        dp = new int[N];

        bt(0);
    }
}
