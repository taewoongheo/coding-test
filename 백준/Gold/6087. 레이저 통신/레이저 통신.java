import java.io.*;
import java.util.*;

public class Main {
    static char[][] map;
    static int[][][] visited;
    static int[] xMove = {-1, 0, 1, 0};
    static int[] yMove = {0, -1, 0, 1};
    static point[] cPoint;
    static int W, H, ANSWER = 100000;
    static PriorityQueue<point> queue = new PriorityQueue<>();

    public static void main(String[] args) throws Exception {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        String[] split = br.readLine().split(" ");
        W = Integer.parseInt(split[0]);
        H = Integer.parseInt(split[1]);

        map = new char[H][W];
        visited = new int[H][W][4];
        cPoint = new point[2];

        for (int i = 0, idx = 0; i < H; i++) {
            String line = br.readLine();
            map[i] = line.toCharArray();
            for (int j = 0; j < W; j++) {
            	// bfs 알고리즘 도중
                // 0, 1, 2, 3 범위에 들어가지 않도록 방향을 -5로 지정
                if (map[i][j] == 'C') cPoint[idx++] = new point(i, j, -5, -1);
            }
        }

        bfs(cPoint[0]);

        System.out.println(ANSWER);
        br.close();
    }

    public static void bfs(point start) {
        point c = cPoint[1];
        queue.add(start);

        for (int i = 0; i < H; i++) {
            for (int j = 0; j < W; j++) {
                Arrays.fill(visited[i][j], Integer.MAX_VALUE);
            }
        }

        while (!queue.isEmpty()) {
            point current = queue.poll();

            if (current.x == c.x && current.y == c.y) {
                ANSWER = Math.min(ANSWER, current.mirrors);
                continue;
            }

            for (int i = 0; i < 4; i++) {
                int newX = current.x + xMove[i];
                int newY = current.y + yMove[i];


                if (newX < 0 || newY < 0 || newX >= H || newY >= W) continue;

                if (map[newX][newY] == '*') continue;


                // 180 회전이라면 갈 수 없는 구조이므로 패스
                if (Math.abs(i - current.dir) == 2) continue;

                // 90 회전을 해야 한다면 거울의 갯수 +1
                int nextMirror = (current.dir == i) ? current.mirrors : current.mirrors + 1;

                // 현재 방향에서 다음 newX, newY 위치로 갈때 사용한 미러의 갯수가
                // 더 적은 거울로 도달할 수 있는 경우가 생긴다면
                if (visited[newX][newY][i] > nextMirror) {
                    visited[newX][newY][i] = nextMirror;
                    queue.add(new point(newX, newY, i, nextMirror));
                }
            }
        }
    }

    public static class point implements Comparable<point> {
        int x, y, dir, mirrors;

        public point(int x, int y, int dir, int mirrors) {
            this.x = x;
            this.y = y;
            this.dir = dir;
            this.mirrors = mirrors;
        }

        @Override
        public int compareTo(point o) {
            return this.mirrors - o.mirrors;
        }
    }
}