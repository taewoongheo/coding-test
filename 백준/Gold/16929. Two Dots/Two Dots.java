import java.io.*;

public class Main {

    public static int N, M;
    public static boolean[][] v;
    public static String[][] m;
    public static int[][] move = new int[][]{{-1, 0}, {1, 0}, {0, -1}, {0, 1}};

    public static void dfs(int x, int y, int prevX, int prevY) {
        if (v[x][y]) {
            System.out.println("Yes");
            System.exit(0);
        }
        v[x][y] = true;
        for (int i = 0; i < 4; i++) {
            int nx = x + move[i][0];
            int ny = y + move[i][1];
            if ((prevX == nx) && (prevY == ny)) {
                continue;
            }
            if((nx >= 0) && (ny >= 0) && (nx < N) && (ny < M) && (m[nx][ny].equals(m[x][y]))) {
                dfs(nx, ny, x, y);
                v[nx][ny] = false;
            }
        }
    }

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String[] NM = br.readLine().split(" ");
        N = Integer.parseInt(NM[0]);
        M = Integer.parseInt(NM[1]);
        v = new boolean[N][M];
        m = new String[N][M];
        for (int i = 0; i < N; i++) {
            String input = br.readLine();
            for (int j = 0; j < M; j++) {
                m[i][j] = String.valueOf(input.charAt(j));
            }
        }

        for (int i = 0; i < N; i++) {
            for (int j = 0; j < M; j++) {
                dfs(i, j, -1, -1);
                v[i][j] = false;
            }
        }
        System.out.println("No");
    }
}