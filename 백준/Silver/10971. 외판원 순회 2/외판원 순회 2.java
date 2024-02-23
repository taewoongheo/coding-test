import java.io.*;

public class Main {

    public static int result;
    public static int N;
    public static int[][] arr;
    public static boolean[] visited;
    public static int[] sumArr;
    public static int start;

    public static boolean allTrue(int start, int current) {
        return arr[current][start] != 0;
    }

    public static void dfs(int depth, int current) {
        if (depth == (N-1) && allTrue(start, current)) {
            int sum = 0;
            for (int i = 0; i < N; i++) {
                sum += sumArr[i];
            }
            sum += arr[current][start];
            if (sum < result) {
                result = sum;
            }
            return;
        }
        for (int i = 0; i < N; i++) {
            if (visited[i]) {
                continue;
            }
            if (arr[current][i] == 0) {
                return;
            }
            visited[i] = true;
            sumArr[depth] = arr[current][i];
            dfs(depth + 1, i);
            visited[i] = false;
        }
    }

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));

        N = Integer.parseInt(br.readLine());
        arr = new int[N][N];

        for (int i = 0; i < N; i++) {
            String[] inputArr = br.readLine().split(" ");
            for (int j = 0; j < N; j++) {
                arr[i][j] = Integer.parseInt(inputArr[j]);
            }
        }

        result = Integer.MAX_VALUE;
        visited = new boolean[N];
        sumArr = new int[N];

        for (int i = 0; i < N; i++) {
            start = i;
            visited[i] = true;
            dfs(0, i);
            visited[i] = false;
        }

        bw.write(result + "\n");
        bw.flush();
    }
}