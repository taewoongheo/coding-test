import java.io.*;
import java.util.*;

public class Main {

    public static class Laser {
        int r, c, mirror, prevDir;

        public Laser(int r, int c, int mirror, int prevDir) {
            this.r = r;
            this.c = c;
            this.mirror = mirror;
            this.prevDir = prevDir;
        }
    }

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));

        String[] line = br.readLine().split(" ");
        int W = Integer.parseInt(line[0]);
        int H = Integer.parseInt(line[1]);
        char[][] map = new char[H][W];
        int[][] arr = new int[H][W];
        boolean[][][] v = new boolean[H][W][4];
        int[] start = new int[2];
        boolean s = false;
        int[] end = new int[2];
        for (int r = 0; r < H; r++) {
            String input = br.readLine();
            for (int c = 0; c < W; c++) {
                if (input.charAt(c) == 'C') {
                    if (!s) {
                        start = new int[]{r, c};
                        s = true;
                    } else {
                        end = new int[]{r, c};
                    }
                }
                map[r][c] = input.charAt(c);
            }
        }

        //bfs
        Queue<Laser> q = new LinkedList<>();
        int[][] m = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};
        q.offer(new Laser(start[0], start[1], 0, -1));
        int ans = Integer.MAX_VALUE;
        HashMap<Integer, Integer> reverseDir = new HashMap<>();
        reverseDir.put(0, 1);
        reverseDir.put(1, 0);
        reverseDir.put(2, 3);
        reverseDir.put(3, 2);
        for (int i = 0; i < 4; i++) {
            v[start[0]][start[1]][i] = true;
        }
        arr[start[0]][start[1]] = 0;
        while (!q.isEmpty()) {
            Laser l = q.poll();
            int r = l.r;
            int c = l.c;
            if (r == end[0] && c == end[1]) {
                if (l.mirror < ans) {
                    ans = l.mirror;
                }
                continue;
            }
            for (int i = 0; i < 4; i++) {
                int mirror = l.mirror;
                int prevDir = l.prevDir;
                int nr = r + m[i][0];
                int nc = c + m[i][1];
                if (nr < 0 || nr >= H || nc < 0 || nc >= W || map[nr][nc] == '*') {
                    continue;
                }
                if (prevDir == -1) {
                    prevDir = i;
                }
                if (prevDir != i) {
                    mirror += 1;
                    prevDir = i;
                }
                if (!v[nr][nc][i] || mirror < arr[nr][nc]) {
                    v[nr][nc][i] = true;
                    int reverse = reverseDir.get(i);
                    v[r][c][reverse] = true;
                    arr[nr][nc] = mirror;
                    q.offer(new Laser(nr, nc, mirror, prevDir));
                }
            }
        }

        bw.write(ans + "\n");
        bw.flush();
    }
}