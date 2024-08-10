import java.io.*;
import java.util.*;

public class Main {

    public static int N;
    public static boolean[][] v;
    public static int ans = -1;
    public static int[] end;
    public static int[][] m = {{-2, -1}, {-2, 1}, {0, -2}, {0, 2}, {2, -1}, {2, 1}};

    public static void bfs(int row, int col) {
        Queue<int[]> q = new LinkedList<>();
        q.add(new int[]{row, col, 0});
        v[row][col] = true;
        while (!q.isEmpty()) {
            int[] loc = q.poll();
            int r = loc[0];
            int c = loc[1];
            int cnt = loc[2];
            if (r == end[0] && c == end[1]) {
                ans = cnt;
                return;
            }
            for (int i = 0; i < 6; i++) {
                int nr = r + m[i][0];
                int nc = c + m[i][1];
                if (nr >= 0 && nr < N && nc >= 0 && nc < N && !v[nr][nc]) {
                    v[nr][nc] = true;
                    q.add(new int[]{nr, nc, cnt + 1});
                }
            }
        }
    }

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));

        N = Integer.parseInt(br.readLine());
        String[] line = br.readLine().split(" ");
        int row = Integer.parseInt(line[0]);
        int col = Integer.parseInt(line[1]);
        end = new int[]{Integer.parseInt(line[2]), Integer.parseInt(line[3])};
        v = new boolean[N][N];

        bfs(row, col);

        bw.write(ans + "\n");
        bw.flush();
    }
}