import java.io.*;
import java.util.Objects;

public class Main {

    public static int N;
    public static String[] inequalityArr;
    public static StringBuilder maxSb;
    public static StringBuilder minSb;
    public static int[] numArr;
    public static boolean[] visited;
    public static Long[] result;
    public static Long maxValue;
    public static Long minValue;

    public static boolean correct(int idx, int lastIdx, int depth) {
        if (Objects.equals(inequalityArr[depth - 1], "<")) {
            if (numArr[idx] > numArr[lastIdx]) {
                return true;
            }
            return false;
        } else {
            if (numArr[idx] < numArr[lastIdx]) {
                return true;
            }
            return false;
        }
    }

    public static void bt(int depth, int lastIdx) {

        if (depth == N+1) {
            double num = result[N];
            for (int i = N-1; i > -1; i--) {
                num += result[i] * Math.pow(10, N-i);
            }
            if (num > maxValue) {
                maxValue = (long) num;
                maxSb = new StringBuilder();
                for (Long i : result) {
                    maxSb.append(i);
                }
            }
            if (num < minValue) {
                minValue = (long) num;
                minSb = new StringBuilder();
                for (Long i : result) {
                    minSb.append(i);
                }
            }
            return;
        }
        for (int i = 0; i < 10; i++) {
            if (visited[i]) {
                continue;
            }
            if (correct(i, lastIdx, depth)) {
                visited[i] = true;
                result[depth] = (long) i;
                bt(depth + 1, i);
                visited[i] = false;
            }
        }
    }

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));

        N = Integer.parseInt(br.readLine());
        inequalityArr = br.readLine().split(" ");

        maxValue = Long.MIN_VALUE;
        minValue = Long.MAX_VALUE;

        numArr = new int[10];
        visited = new boolean[10];
        result = new Long[N + 1];

        for (int i = 0; i < 10; i++) {
            numArr[i] = i;
        }

        for (int i = 0; i < 10; i++) {
            visited[i] = true;
            result[0] = (long) i;
            bt(1, i);
            visited[i] = false;
        }

        bw.write(maxSb + "\n");
        bw.write(minSb + "\n");

        bw.flush();
    }
}
