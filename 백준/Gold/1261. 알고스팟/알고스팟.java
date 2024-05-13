import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.*;

public class Main {

    public static int N, M;
    public static int[][] arr;
    public static boolean[][] v;
    public static int[][] m = {{-1, 0}, {0, 1}, {1, 0}, {0, -1}};

    public static class Point implements Comparable<Point> {
        int x, y, cnt;

        public Point(int x, int y, int cnt) {
            this.x = x;
            this.y = y;
            this.cnt = cnt;
        }

        @Override
        public int compareTo(Point o) {
            return this.cnt - o.cnt;
        }
    }

    public static void bfs() {
        v = new boolean[M + 1][N + 1];
        PriorityQueue<Point> pq = new PriorityQueue<>();

        pq.offer(new Point(1, 1, 0));
        v[1][1] = true;

        while(!pq.isEmpty()) {
            Point p = pq.poll();
            if(p.x == M && p.y == N) {
                System.out.println(p.cnt);
                return;
            }
            for (int i = 0; i < 4; i++) {
                int nx = p.x + m[i][0];
                int ny = p.y + m[i][1];
                if (nx < 1 || nx > M || ny < 1 || ny > N) {
                    continue;
                }
                if(arr[nx][ny] == 0 && !v[nx][ny]) {
                    v[nx][ny] = true;
                    pq.offer(new Point(nx, ny, p.cnt));
                }
                if(arr[nx][ny] == 1 && !v[nx][ny]) {
                    v[nx][ny] = true;
                    pq.offer(new Point(nx, ny, p.cnt + 1));
                }
            }
        }

    }

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String[] NM = br.readLine().split(" ");
        N = Integer.parseInt(NM[0]);
        M = Integer.parseInt(NM[1]);
        arr = new int[M+1][N+1];
        v = new boolean[M+1][N+1];
        for (int i = 1; i <= M; i++) {
            String line = br.readLine();
            for (int j = 1; j <= N; j++) {
                arr[i][j] = line.charAt(j - 1) - '0';
            }
        }

        bfs();
    }
}