import java.io.*;
import java.util.Arrays;

public class Main {

    public static int N;
    public static int[][] arr;
    public static int[] members;
    public static boolean[] visited;
    public static int result;
    public static int[] start;
    public static int[] link;

    public static int calculate() {

        int startScore = 0;
        int linkScore = 0;

        for (int i = 0; i < N / 2; i++) {
            for (int j = 0; j < N / 2; j++) {
                if (i == j) {
                    continue;
                }
                startScore += arr[start[i]][start[j]];
                linkScore += arr[link[i]][link[j]];
            }
        }
        return Math.abs(startScore - linkScore);
    }

    public static void dfs(int depth, int last) {
        if (depth == N/2) {
            int startIdx = 0;
            int linkIdx = 0;
            for (int i = 0; i < N; i++) {
                if (visited[i]) {
                    start[startIdx] = members[i];
                    startIdx += 1;
                } else {
                    link[linkIdx] = members[i];
                    linkIdx += 1;
                }
            }
            int cal = calculate();
            if (cal < result) {
                result = cal;
            }
            return;
        }
        for (int i = 0; i < N; i++) {
            if (visited[i]) {
                continue;
            }
            if (members[i] >= last) {
                visited[i] = true;
                last = members[i];
                dfs(depth + 1, last);
                visited[i] = false;
            }
        }
    }

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));

        N = Integer.parseInt(br.readLine());
        arr = new int[N][N];
        members = new int[N];
        for (int i = 0; i < N; i++) {
            String[] inputArr = br.readLine().split(" ");
            members[i] = i;
            for (int j = 0; j < N; j++) {
                arr[i][j] = Integer.parseInt(inputArr[j]);
            }
        }

        visited = new boolean[N];
        start = new int[N/2];
        link = new int[N/2];
        result = Integer.MAX_VALUE;

        dfs(0, 0);

        bw.write(result + "\n");
        bw.flush();
    }
}
