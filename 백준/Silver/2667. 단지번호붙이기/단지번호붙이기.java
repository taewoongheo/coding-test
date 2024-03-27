import java.io.*;
import java.util.ArrayList;
import java.util.Collections;

public class Main {

    public static int N;
    public static int[][] map;
    public static boolean[][] visited;
    public static int count;
    public static int[][] m = {{0, -1}, {0, 1}, {-1, 0}, {1, 0}};
    public static ArrayList<int[]> q;

    public static void bfs(int x, int y) {
        visited[x][y] = true;
        while (!q.isEmpty()) {
            int[] pop = q.remove(0);
            int px = pop[0];
            int py = pop[1];
            for (int i = 0; i < 4; i++) {
                int nx = px + m[i][0];
                int ny = py + m[i][1];
                if ((0<=nx) && (nx<=N-1) && (0<=ny) && (ny<=N-1) && (map[nx][ny] == 1) && (!visited[nx][ny])) {
                    visited[nx][ny] = true;
                    q.add(new int[]{nx, ny});
                    count += 1;
                }
            }
        }
    }

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        N = Integer.parseInt(br.readLine());
        map = new int[N][N];
        visited = new boolean[N][N];
        for(int i = 0; i < N; i++) {
            String input = br.readLine();
            for(int j = 0; j < N; j++) {
                map[i][j] = Integer.parseInt(String.valueOf(input.charAt(j)));
            }
        }

        ArrayList<Integer> out = new ArrayList<>();
        q = new ArrayList<>();
        int housesCount = 0;
        for(int i = 0; i < N; i++) {
            for(int j = 0; j < N; j++) {
                if ((map[i][j] == 1) && (!visited[i][j])) {
                    count = 1;
                    housesCount += 1;
                    q.add(new int[]{i, j});
                    bfs(i, j);
                    out.add(count);
                }
            }
        }
        Collections.sort(out);
        bw.write(housesCount + "\n");
        for (int i = 0; i < out.size(); i++) {
            bw.write(out.get(i) + "\n");
        }
        bw.flush();
    }
}