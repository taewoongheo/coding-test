import java.io.*;

public class Main {

    public static int N, M;
    public static int[][] arr;
    public static boolean[][] v;
    public static int result = Integer.MIN_VALUE;
    public static int[][] m = {{-1, 0}, {0, 1}, {1, 0}, {0, -1}};

    public static void dfs(int i, int j, int sum, int cnt) {
        if (cnt == 4) {
            result = Math.max(result, sum);
            return;
        }
        for (int k = 0; k < 4; k++) {
            int nx = i + m[k][0];
            int ny = j + m[k][1];
            if (nx < 0 || nx >= N || ny < 0 || ny >= M) {
                continue;
            }
            if (!v[nx][ny]) {
                if (cnt == 2) {
                    v[nx][ny] = true;
                    dfs(i, j, sum + arr[nx][ny], cnt + 1);
                    v[nx][ny] = false;
                }
                v[nx][ny] = true;
                dfs(nx, ny, sum + arr[nx][ny], cnt + 1);
                v[nx][ny] = false;
            }
        }
    }

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));

        String[] line = br.readLine().split(" ");
        N = Integer.parseInt(line[0]);
        M = Integer.parseInt(line[1]);
        arr = new int[N][M];
        v = new boolean[N][M];
        for (int i = 0; i < N; i++) {
            line = br.readLine().split(" ");
            for (int j = 0; j < M; j++) {
                arr[i][j] = Integer.parseInt(line[j]);
            }
        }

        for (int i = 0; i < N; i++) {
            for (int j = 0; j < M; j++) {
                v[i][j] = true;
                dfs(i, j, arr[i][j], 1);
                v[i][j] = false;
            }
        }

        bw.write(result + "\n");
        bw.flush();
    }
}