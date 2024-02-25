import java.io.*;

public class Main {

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));

        int N = Integer.parseInt(br.readLine());
        String[] inputArr = br.readLine().split(" ");
        int[] arr = new int[N];
        for (int i = 0; i < N; i++) {
            arr[i] = Integer.parseInt(inputArr[i]);
        }

        int[][] dp = new int[N][2];

        dp[0][0] = arr[0];
        dp[0][1] = arr[0];
        if (N > 1) {
            dp[1][0] = Math.max(dp[0][0] + arr[1], arr[1]);
            dp[1][1] = arr[1];
        }

        for (int i = 2; i < N; i++) {
            dp[i][0] = Math.max(arr[i], arr[i] + dp[i - 1][0]);
            dp[i][1] = Math.max(arr[i] + dp[i - 1][1], arr[i] + dp[i - 2][0]);
        }

        int maxValue = Integer.MIN_VALUE;
        for (int i = 0; i < N; i++) {
            for (int j = 0; j < 2; j++) {
                if (maxValue < dp[i][j]) {
                    maxValue = dp[i][j];
                }
            }
        }

        bw.write(maxValue + "\n");

        bw.flush();
    }
}