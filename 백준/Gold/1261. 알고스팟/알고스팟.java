import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.Queue;
import java.util.Stack;

public class Main {

    public static int N, M;
    public static int[][] arr;
    public static boolean[][] v;
    public static int[][] m = {{-1, 0}, {0, 1}, {1, 0}, {0, -1}};

    public static void bfs() {

        Queue<int[]> q = new LinkedList<>();
        q.add(new int[]{1, 1, 0});
        v[1][1] = true;

        while (true) {

            ArrayList<int[]> temp = new ArrayList<>();
            while (!q.isEmpty()) {
                int[] cur = q.poll();
                int x = cur[0];
                int y = cur[1];

                if(x==M && y==N) {
                    System.out.println(cur[2]);
                    return;
                }

                for (int i = 0; i < 4; i++) {
                    int nx = cur[0] + m[i][0];
                    int ny = cur[1] + m[i][1];
                    if (nx > 0 && nx <= M && ny > 0 && ny <= N && !v[nx][ny]) {
                        if (arr[nx][ny] == 1) {
                            temp.add(new int[]{nx, ny, cur[2] + 1});
                        } else {
                            q.offer(new int[]{nx, ny, cur[2]});
                        }
                        v[nx][ny] = true;
                    }
                }
            }

            for (int i = 0; i < temp.size(); i++) {
                q.offer(temp.get(i));
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