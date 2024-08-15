import java.io.*;
import java.util.*;

public class Main {

    public static int N, M;
    public static int[][] arr;
    public static int ans = -1;
    public static int[][] m = {{0, 1}, {1, 0}, {0, -1}, {-1, 0}};

    public static class Coordinate {
         int row, col, cnt;
         boolean wall;
         public Coordinate(int row, int col, int cnt, boolean wall) {
             this.row = row;
             this.col = col;
             this.cnt = cnt;
             this.wall = wall;
         }
    }

    public static void bfs() {
        Queue<Coordinate> q = new LinkedList<>();
        q.add(new Coordinate(0, 0, 1, false));
        while (!q.isEmpty()) {
            Coordinate loc = q.poll();
            int row = loc.row;
            int col = loc.col;
            int cnt = loc.cnt;
            if (row == N - 1 && col == M - 1) {
                ans = cnt;
                return;
            }
            for (int i = 0; i < 4; i++) {
                int nRow = row + m[i][0];
                int nCol = col + m[i][1];
                if (nRow >= 0 && nRow < N && nCol >= 0 && nCol < M && arr[nRow][nCol] != 2) {
                    //벽을 뚫은 탐색은 3, 아직 벽을 뚫지 않은 탐색은 2 로 처리
                    if (loc.wall && arr[nRow][nCol] == 0) {
                        //벽을 통과한 적이 있고, 다음 노드가 0 일 때만
                        arr[nRow][nCol] = 3;
                        q.add(new Coordinate(nRow, nCol, cnt + 1, true));
                    } else if (!loc.wall){
                        //벽을 통과한 적이 없음
                        boolean wall = arr[nRow][nCol] == 1;
                        arr[nRow][nCol] = 2;
                        q.add(new Coordinate(nRow, nCol, cnt + 1, wall));
                    }
                }
            }
        }
    }

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));

        String[] line = br.readLine().split(" ");
        N = Integer.parseInt(line[0]);
        M = Integer.parseInt(line[1]);

        arr = new int[N][M];

        for (int i = 0; i < N; i++) {
            String input = br.readLine();
            for (int j = 0; j < M; j++) {
                arr[i][j] = Integer.parseInt(String.valueOf(input.charAt(j)));
            }
        }

        bfs();

        if (ans == -1) {
            bw.write("-1" + "\n");
        } else {
            bw.write(ans + "\n");
        }
        bw.flush();
    }
}