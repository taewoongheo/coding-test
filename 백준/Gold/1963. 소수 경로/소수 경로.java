import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));

        int T = Integer.parseInt(br.readLine());
        ArrayList<int[]> testCase = new ArrayList<>();
        for (int i = 0; i < T; i++) {
            String[] line = br.readLine().split(" ");
            int num1 = Integer.parseInt(line[0]);
            int num2 = Integer.parseInt(line[1]);
            testCase.add(new int[]{num1, num2});
        }

        boolean[] isPrime = new boolean[10000];
        for (int i = 2; i < 10000; i++) {
            if (!isPrime[i]) {
                int j = 2;
                while (i * j < 10000) {
                    isPrime[i * j] = true;
                    j++;
                }
            }
        }

        //bfs
        for (int t = 0; t < T; t++) {

            int[] input = testCase.get(t);
            int sNum = input[0];
            int eNum = input[1];

            Queue<int[]> q = new LinkedList<>();
            boolean[] v = new boolean[10000];

            q.add(new int[]{sNum, 0});
            v[sNum] = true;

            String ans = "Impossible";

            while (!q.isEmpty()) {
                int[] numCnt = q.poll();
                int num = numCnt[0];
                int cnt = numCnt[1];
                if (num == eNum) {
                    ans = String.valueOf(cnt);
                    break;
                }

                int four = num / 1000;
                int three = num / 100 % 10;
                int ln;

                ln = num % 1000;
                for (int i = 1; i <= 9; i++) {
                    int n = (i * 1000) + ln;
                    if (!isPrime[n] && !v[n]) {
                        v[n] = true;
                        q.add(new int[]{n, cnt + 1});
                    }
                }

                ln = num % 100;
                for (int i = 0; i <= 9; i++) {
                    int n = (four * 1000) + (i * 100) + ln;
                    if (!isPrime[n] && !v[n]) {
                        v[n] = true;
                        q.add(new int[]{n, cnt + 1});
                    }
                }

                ln = num % 10;
                for (int i = 0; i <= 9; i++) {
                    int n = (four * 1000) + (three * 100) + (i * 10) + ln;
                    if (!isPrime[n] && !v[n]) {
                        v[n] = true;
                        q.add(new int[]{n, cnt + 1});
                    }
                }


                ln = num / 10 * 10;
                for (int i = 0; i <= 9; i++) {
                    int n = ln + i;
                    if (!isPrime[n] && !v[n]) {
                        v[n] = true;
                        q.add(new int[]{n, cnt + 1});
                    }
                }
            }
            bw.write(ans + "\n");
        }
        bw.flush();
    }
}