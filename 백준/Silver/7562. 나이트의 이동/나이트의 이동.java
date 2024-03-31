import java.io.*;
import java.util.LinkedList;
import java.util.Queue;

public class Main {

    public static int N, size, goalX, goalY;
    public static int[][] cntMap;
    public static boolean[][] v;
    public static int[][] m = new int[][]{{-2, -1}, {-2, 1}, {2, -1}, {2, 1}, {-1, -2}, {1, -2}, {1, 2}, {-1, 2}};

    public static void bfs(int x, int y, int count) {
        Queue<int[]> q = new LinkedList<>();
        v[x][y] = true;
        cntMap[x][y] = 0;
        q.add(new int[]{x, y, count});
        while (!q.isEmpty()) {
            int[] pop = q.poll();
            int px = pop[0];
            int py = pop[1];
            int pCnt = pop[2];
            for (int i = 0; i < 8; i++) {
                int nx = px + m[i][0];
                int ny = py + m[i][1];
                if((nx >= 0) && (ny >= 0) && (nx <= size-1) && (ny <= size-1) && (!v[nx][ny])) {
                    cntMap[nx][ny] = pCnt + 1;
                    v[nx][ny] = true;
                    q.add(new int[]{nx, ny, cntMap[nx][ny]});
                }
            }
        }
    }

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        N = Integer.parseInt(br.readLine());
        for (int i = 0; i < N; i++) {
            size = Integer.parseInt(br.readLine());
            cntMap = new int[size][size];
            v = new boolean[size][size];
            String[] cur = br.readLine().split(" ");
            String[] goal = br.readLine().split(" ");
            int curX = Integer.parseInt(cur[0]);
            int curY = Integer.parseInt(cur[1]);
            goalX = Integer.parseInt(goal[0]);
            goalY = Integer.parseInt(goal[1]);
            bfs(curX, curY, 0);
            bw.write(cntMap[goalX][goalY] + "\n");
        }
        bw.flush();
    }
}