import java.io.*;
import java.util.*;

public class Main {

    public static class Pos {
        int row, col, wall, cnt, time;
        public Pos (int row, int col, int wall, int cnt, int isDay) {
            this.row = row;
            this.col = col;
            this.wall = wall;
            this.cnt = cnt;
            this.time = isDay; //0 = 낮, 1 = 밤
        }
    }

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));

        String[] line = br.readLine().split(" ");
        int N = Integer.parseInt(line[0]);
        int M = Integer.parseInt(line[1]);
        int K = Integer.parseInt(line[2]);
        int[][] map = new int[N][M];
        for (int i = 0; i < N; i++) {
            String input = br.readLine();
            for (int j = 0; j < M; j++) {
                map[i][j] = input.charAt(j) - '0';
            }
        }

        int[][] m = {{1, 0}, {0, 1}, {-1, 0}, {0, -1}};

        //bfs
        Queue<Pos> q = new LinkedList<>();
        q.add(new Pos(0, 0, K, 1, 0));
        boolean[][][][] stateMap = new boolean[N][M][K + 1][2];
        stateMap[0][0][0][0] = true;
        int ans = -1;

        while (!q.isEmpty()) {
            Pos p = q.poll();
            int r = p.row;
            int c = p.col;
            int cnt = p.cnt;
            int w = p.wall;
            int time = p.time;
            int reverseTime = time == 0 ? 1 : 0;
//            System.out.println("row: " + r + ", col: " + c + ", cnt: " + cnt + ", w: " + w + ", time: " + time + ", reverseTime: " + reverseTime);
            if (r == N - 1 && c == M - 1) {
                ans = cnt;
                break;
            }
            if (!stateMap[r][c][w][reverseTime]) {
                stateMap[r][c][w][reverseTime] = true;
                q.add(new Pos(r, c, w, cnt + 1, reverseTime));
            }
            for (int i = 0; i < 4; i++) {
                int nr = r + m[i][0];
                int nc = c + m[i][1];
                if (nr < 0 || nr >= N || nc < 0 || nc >= M) {
                    continue;
                }
                if (map[nr][nc] == 0) {
                    if (!stateMap[nr][nc][w][reverseTime]) {
                        stateMap[nr][nc][w][reverseTime] = true;
                        q.add(new Pos(nr, nc, w, cnt + 1, reverseTime));
                    }
                } else {
                    if (w >= 1 && time == 0 && !stateMap[nr][nc][w - 1][1]) {
                        stateMap[nr][nc][w - 1][1] = true;
                        q.add(new Pos(nr, nc, w - 1, cnt + 1, 1));
                    }
                }
            }
        }

        bw.write(ans + "\n");
        bw.flush();
    }
}