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

        String[] line = br.readLine().split(" ");

        int R = Integer.parseInt(line[0]);
        int C = Integer.parseInt(line[1]);
        char[][] map = new char[R][C];
        Pos s = new Pos(0, 0, 0);
        int[] end = new int[2];
        Queue<int[]> water = new LinkedList<>();

        for (int i = 0; i < R; i++) {
            String input = br.readLine();
            for (int j = 0; j < C; j++) {
                if (input.charAt(j) == '*') {
                    water.add(new int[]{i, j});
                } else if (input.charAt(j) == 'S') {
                    s = new Pos(i, j, 0);
                } else if (input.charAt(j) == 'D') {
                    end = new int[]{i, j};
                }
                map[i][j] = input.charAt(j);
            }
        }

        //bfs
        Queue<Pos> q = new LinkedList<>();
        q.add(s);
        String ans = "KAKTUS";
        int[][] m = {{1, 0}, {0, 1}, {-1, 0}, {0, -1}};
        map[s.r][s.c] = 'o';

        while (!q.isEmpty()) {

            int qSize = q.size();
            for (int k = 0; k < qSize; k++) {
                Pos p = q.poll();
                int r = p.r;
                int c = p.c;
                int cnt = p.cnt;
                if (r == end[0] && c == end[1]) {
                    ans = String.valueOf(cnt);
                    break;
                }
                if (map[r][c] == '*') {
                    continue;
                }
                for (int i = 0; i < 4; i++) {
                    int nr = r + m[i][0];
                    int nc = c + m[i][1];
                    if (nr < 0 || nr >= R || nc < 0 || nc >= C || map[nr][nc] == 'o' || map[nr][nc] == '*' || map[nr][nc] == 'X') {
                        continue;
                    }
                    q.add(new Pos(nr, nc, cnt + 1));
                    map[nr][nc] = 'o';
                }
            }

            int waterQueueSize = water.size();
            for (int k = 0; k < waterQueueSize; k++) {
                int[] p = water.poll();
                int r = p[0];
                int c = p[1];
                for (int i = 0; i < 4; i++) {
                    int nr = r + m[i][0];
                    int nc = c + m[i][1];
                    if (nr < 0 || nr >= R || nc < 0 || nc >= C || map[nr][nc] == 'X' || map[nr][nc] == 'D' || map[nr][nc] == '*') {
                        continue;
                    }
                    water.add(new int[]{nr, nc});
                    map[nr][nc] = '*';
                }
            }
        }

        bw.write(ans + "\n");
        bw.flush();
    }
}