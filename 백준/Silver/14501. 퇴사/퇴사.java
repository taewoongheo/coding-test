import java.io.*;

public class Main {

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));

        int N = Integer.parseInt(br.readLine());

        int[][] arr = new int[N][2];
        int[] dp = new int[N];

        for (int i = 0; i < N; i++) {
            String[] TP = br.readLine().split(" ");
            arr[i][0] = Integer.parseInt(TP[0]); //needTime
            arr[i][1] = Integer.parseInt(TP[1]); //payment
        }

        for (int i = N-1; i > -1; i--) {
            int needTime = arr[i][0];
            int payment = arr[i][1];
            int leftTime = N-i;

            //현재 N 번째 날을 무조건 넣어야 함
            if (needTime <= leftTime) {
                dp[i] = payment;
            }

            int optimizeValue = 0;
            for (int j = N-i-needTime-1; j > -1; j--) {
                int dpIdx = N-j-1;
                if (dp[dpIdx] > optimizeValue) {
                    optimizeValue = dp[dpIdx];
                }
            }
            dp[i] += optimizeValue;
        }

        int result = 0;
        for (int i = 0; i < N; i++) {
            if (result < dp[i]) {
                result = dp[i];
            }
        }
        bw.write(result+"\n");
        bw.flush();
    }
}