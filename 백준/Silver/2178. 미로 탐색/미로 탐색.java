import java.io.*;
import java.util.ArrayList;

public class Main {

    public static int N, M;
    public static int[][] m;
    public static boolean[][] v;
    public static int out = Integer.MAX_VALUE;
    public static int[][] r = new int[][]{{-1, 0}, {1, 0}, {0, -1}, {0, 1}};
    public static ArrayList<int[]> q = new ArrayList<>();

    public static void dfs(int x, int y) {
        v[x][y] = true;
        while (!q.isEmpty()) {
            int[] pop = q.remove(0);
            int px = pop[0];
            int py = pop[1];
            int cnt = pop[2];
            if ((px == N - 1) && (py == M - 1)) {
                if (cnt < out) {
                    out = cnt;
                }
            }
            for(int i = 0; i < 4; i++) {
                int nx = px + r[i][0];
                int ny = py + r[i][1];
                if ((nx >= 0) && (ny >= 0) && (nx <= N - 1) && (ny <= M - 1) && (!v[nx][ny]) && (m[nx][ny] == 1)) {
                    v[nx][ny] = true;
                    q.add(new int[]{nx, ny, cnt+1});
                }
            }
        }
    }

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        String[] NM = br.readLine().split(" ");
        N = Integer.parseInt(NM[0]);
        M = Integer.parseInt(NM[1]);

        m = new int[N][M];
        for(int i = 0; i < N; i++) {
            String mapInfo = br.readLine();
            for(int j = 0; j < M; j++) {
                m[i][j] = Integer.parseInt(String.valueOf(mapInfo.charAt(j)));
            }
        }

        v = new boolean[N][M];
        q.add(new int[]{0, 0, 1});
        dfs(0, 0);
        bw.write(out + "\n");
        bw.flush();
    }
}