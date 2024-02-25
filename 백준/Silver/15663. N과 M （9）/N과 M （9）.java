import java.io.*;
import java.util.Arrays;

public class Main {

    public static BufferedWriter bw;
    public static int N, M;
    public static int[] arr;
    public static int[] result;
    public static boolean[] visited;

    public static void dfs(int depth) throws IOException {
        if (depth == M) {
            for (int i = 0; i < M; i++) {
                bw.write(result[i] + " ");
            }
            bw.write("\n");
            return;
        }
        int before = 0;
        for (int i = 0; i < N; i++) {
            if (visited[i]) {
                continue;
            }
            if (before != arr[i]) {
                visited[i] = true;
                result[depth] = arr[i];
                before = arr[i];
                dfs(depth + 1);
                visited[i] = false;
            }
        }
    }

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        bw = new BufferedWriter(new OutputStreamWriter(System.out));

        String[] NM = br.readLine().split(" ");
        N = Integer.parseInt(NM[0]);
        M = Integer.parseInt(NM[1]);
        String[] inputArr = br.readLine().split(" ");
        arr = new int[N];
        for (int i = 0; i < N; i++) {
            arr[i] = Integer.parseInt(inputArr[i]);
        }

        Arrays.sort(arr);

        result = new int[M];
        visited = new boolean[N];
        dfs(0);

        bw.flush();
    }
}