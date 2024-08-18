import java.io.*;
import java.util.*;

public class Main {

    public static class Pos {
        int r, c, w, cnt;

        public Pos(int row, int col, int wall, int cnt) {
            this.r = row;
            this.c = col;
            this.w = wall;
            this.cnt = cnt;
        }
    }

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));

        String[] line = br.readLine().split(" ");
        int N = Integer.parseInt(line[0]);
        int M = Integer.parseInt(line[1]);
        int K = Integer.parseInt(line[2]);
        int[][] arr = new int[N][M];
        for (int i = 0; i < N; i++) {
            String input = br.readLine();
            for (int j = 0; j < M; j++) {
                arr[i][j] = input.charAt(j) - '0';
            }
        }

        //bfs
        Pos p = new Pos(0, 0, K, 1);
        boolean[][][] v = new boolean[N][M][K + 1];
        int[][] m = {{1, 0}, {0, 1}, {-1, 0}, {0, -1}};
        Queue<Pos> q = new LinkedList<>();
        q.add(p);
        v[0][0][0] = true;
        int ans = -1;
        while (!q.isEmpty()) {
            Pos pos = q.poll();
            int r = pos.r;
            int c = pos.c;
            int w = pos.w;
            int cnt = pos.cnt;
            if (r == N - 1 && c == M - 1) {
                ans = cnt;
                break;
            }
            for (int i = 0; i < 4; i++) {
                int nr = r + m[i][0];
                int nc = c + m[i][1];
                if (nr < 0 || nr >= N || nc < 0 || nc >= M || v[nr][nc][w]) {
                    continue;
                }
                if (arr[nr][nc] == 0) {
                    v[nr][nc][w] = true;
                    q.add(new Pos(nr, nc, w, cnt + 1));
                } else if (arr[nr][nc] == 1 && w >= 1) {
                    v[nr][nc][w] = true;
                    q.add(new Pos(nr, nc, w - 1, cnt + 1));
                }
            }
        }

        bw.write(ans + "\n");
        bw.flush();
    }
}