import java.io.*;
import java.util.ArrayList;
import java.util.LinkedList;
import java.util.Queue;

public class Main {

    public static int N, M, notRipeTomato;
    public static int[][] t;
    public static boolean[][] v;
    public static Queue<int[]> q = new LinkedList<>();
    public static int[][] m = new int[][]{{-1, 0}, {1, 0}, {0, -1}, {0, 1}};
    public static int out = 0;
    public static int dayPlus; //하루가 plus 되는 기준 == 0 이 되어야 함.
    public static int temp;

    public static void bfs() {
        while (!q.isEmpty()) {
            if (notRipeTomato == 0) {
                break;
            }
            if (dayPlus == 0) {
                dayPlus = temp;
                temp = 0;
                out += 1;
            }
            int[] pop = q.poll();
            dayPlus -= 1;
            int px = pop[0];
            int py = pop[1];
            for (int i = 0; i < 4; i++) {
                int nx = px + m[i][0];
                int ny = py + m[i][1];
                if ((nx >= 0) && (ny >= 0) && (nx <= M - 1) && (ny <= N - 1) && (!v[nx][ny]) && (t[nx][ny] == 0)) {
                    notRipeTomato -= 1;
                    v[nx][ny] = true;
                    temp += 1;
                    q.add(new int[]{nx, ny});
                }
            }
        }
    }

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        String[] NM = br.readLine().split(" ");
        N = Integer.parseInt(NM[0]);
        M = Integer.parseInt(NM[1]);

        t = new int[M][N];
        v = new boolean[M][N];
        for (int i = 0; i < M; i++) {
            String[] input = br.readLine().split(" ");
            for (int j = 0; j < N; j++) {
                t[i][j] = Integer.parseInt(input[j]);
                v[i][j] = true;
                if (input[j].equals("1")) { //토마토가 익은 경우 바로 큐에 추가
                    temp += 1;
                    q.add(new int[]{i, j});
                } else if (input[j].equals("0")) { //익지 않은 토마토 개수 세기
                    notRipeTomato += 1;
                    v[i][j] = false;
                }
            }
        }

        bfs();
        if (notRipeTomato != 0) {
            bw.write("-1\n");
        } else {
            bw.write(out + "\n");
        }
        bw.flush();
    }
}