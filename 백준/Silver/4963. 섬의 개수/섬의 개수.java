import java.io.*;
import java.util.ArrayList;

public class Main {

    public static int w, h;
    public static int[][] map;
    public static boolean[][] v;
    public static int cnt;
    public static ArrayList<int[]> q;
    public static int[][] m = new int[][]{{-1, 0}, {1, 0}, {0, -1}, {0, 1}, {-1, -1}, {1, -1}, {-1, 1}, {1, 1}};

    public static void bfs(int x, int y) {
        q.add(new int[]{x, y});
        v[x][y] = true;
        while (!q.isEmpty()) {
            int[] pos = q.remove(0);
            for (int i = 0; i < 8; i++) {
                int nx = m[i][0] + pos[0];
                int ny = m[i][1] + pos[1];
                if ((nx >= 0) && (ny >= 0) && (nx <= h - 1) && (ny <= w - 1) && (!v[nx][ny]) & (map[nx][ny] == 1)) {
                    v[nx][ny] = true;
                    q.add(new int[]{nx, ny});
                }
            }
        }
    }

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        while (true) {
            String[] wh = br.readLine().split(" ");
            w = Integer.parseInt(wh[0]);
            h = Integer.parseInt(wh[1]);
            if ((w == 0) && (h == 0)) {
                break;
            }

            map = new int[h][w];
            for(int i = 0; i < h; i++) {
                String[] input = br.readLine().split(" ");
                for(int j = 0; j < w; j++) {
                    map[i][j] = Integer.parseInt(input[j]);
                }
            }

            v = new boolean[h][w];
            q = new ArrayList<>();
            cnt = 0;
            for (int i = 0; i < h; i++) {
                for(int j = 0; j < w; j++) {
                    if ((map[i][j]==1) && (!v[i][j])) {
                        bfs(i, j);
                        cnt += 1;
                    }
                }
            }
            bw.write(cnt + "\n");
        }
        bw.flush();
    }
}