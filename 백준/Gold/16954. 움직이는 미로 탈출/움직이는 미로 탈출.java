import java.io.*;
import java.util.*;

public class Main {

    public static class Pos {
        int r, c, cnt;

        public Pos(int r, int c, int cnt) {
            this.r = r;
            this.c = c;
            this.cnt = cnt;
        }
    }

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));

        int maxRow = 100;
        int[][] map = new int[maxRow][8];
        for (int i = 0; i < 8; i++) {
            String line = br.readLine();
            for (int j = 0; j < 8; j++) {
                char input = line.charAt(j);
                int elem = 0;
                if (input == '#') {
                    elem = 1;
                }
                map[maxRow - 8 + i][j] = elem;
            }
        }

        //bfs
        Queue<Pos> q = new LinkedList<>();
        boolean[][][] v = new boolean[maxRow][8][maxRow];
        v[maxRow - 1][0][0] = true;
        q.add(new Pos(maxRow - 1, 0, 0));
        int[][] m = {{1, 0}, {0, 1}, {-1, 0}, {0, -1}, {1, 1}, {1, -1}, {-1, -1}, {-1, 1}, {0, 0}};
        int ans = 0;

        while (!q.isEmpty()) {
            Pos p = q.poll();
            int r = p.r;
            int c = p.c;
            int cnt = p.cnt;
//            System.out.println("r: " + r + ", c: " + c + ", cnt: " + cnt);
            if (r == maxRow - 7 - cnt && c == 7) {
                ans = 1;
                break;
            }
            for (int i = 0; i < 9; i++) {
                int nr = r + m[i][0];
                int nc = c + m[i][1];
                if (nr < maxRow - 7 - cnt || nr >= maxRow - cnt || nc < 0 || nc >= 8 || map[nr][nc] == 1) {
                    continue;
                }
                nr -= 1; //미로 내려옴
                if (nr <= 1) {
                    continue;
                }
                if (map[nr][nc] != 1 && !v[nr][nc][cnt + 1]) {
                    v[nr][nc][cnt + 1] = true;
                    q.add(new Pos(nr, nc, cnt + 1));
                }
            }
        }

        bw.write(ans + "\n");
        bw.flush();
    }
}