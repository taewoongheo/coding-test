import java.io.*;
import java.util.*;

public class Main {

    public static int N, M;
    public static int[][] map;
    public static boolean[][] v;
    public static ArrayList<int[]> virus;
    public static int ans = Integer.MIN_VALUE;
    public static int[][] m = {{0, 1}, {1, 0}, {0, -1}, {-1, 0}};

    public static void makeWall(int row, int cnt) {
        if (cnt == 3) {
            int[][] nMap = new int[N][M];
            for (int i = 0; i < N; i++) {
                for (int j = 0; j < M; j++) {
                    nMap[i][j] = map[i][j];
                }
            }
            bfs(nMap);
            return;
        }
        for (int i = row; i < N; i++) {
            for (int j = 0; j < M; j++) {
                if (map[i][j] == 0 && !v[i][j]) {
                    v[i][j] = true;
                    map[i][j] = 1;
                    makeWall(i, cnt + 1);
                    v[i][j] = false;
                    map[i][j] = 0;
                }
            }
        }
    }

    public static void bfs(int[][] nMap) {
        Queue<int[]> q = new LinkedList<>();
        for (int[] v : virus) {
            q.add(v);
        }
        while (!q.isEmpty()) {
            int[] v = q.poll();
            int row = v[0];
            int col = v[1];
            for (int i = 0; i < 4; i++) {
                int nr = row + m[i][0];
                int nc = col + m[i][1];
                if (nr >= 0 && nr < N && nc >= 0 && nc < M && nMap[nr][nc] == 0) {
                    nMap[nr][nc] = 2;
                    q.add(new int[]{nr, nc});
                }
            }
        }
        int temp = 0;
        for (int i = 0; i < N; i++) {
            for (int j = 0; j < M; j++) {
                if (nMap[i][j] == 0) {
                    temp += 1;
                }
            }
        }
        ans = Math.max(ans, temp);
    }

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));

        String[] line = br.readLine().split(" ");
        N = Integer.parseInt(line[0]);
        M = Integer.parseInt(line[1]);
        map = new int[N][M];
        v = new boolean[N][M];
        virus = new ArrayList<>();

        for (int i = 0; i < N; i++) {
            line = br.readLine().split(" ");
            for (int j = 0; j < M; j++) {
                if (line[j].equals("2")) {
                    virus.add(new int[]{i, j});
                }
                map[i][j] = Integer.parseInt(line[j]);
            }
        }

        makeWall(0, 0);

        bw.write(ans + "\n");
        bw.flush();
    }
}