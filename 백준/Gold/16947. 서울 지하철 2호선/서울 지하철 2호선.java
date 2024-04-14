import java.io.*;
import java.util.Arrays;

public class Main {

    public static int N;
    public static boolean[][] m; //간선정보
    public static boolean[] v; //방문한 노드
    public static int[] out;
    public static boolean flag;
    public static int[] r;
    public static BufferedWriter bw;

    public static void ring(int cur, int last, int cnt) {
        if (flag) {
            return;
        }
        if (v[cur]) {
            for (int i = 1; i <= N; i++) {
                if (out[i] < out[cur]) {
                    r[i] = 0;
                } else {
                    r[i] = out[i];
                }
            }
            flag = true;
            return;
        }
        out[cur] = cnt;
        v[cur] = true;
        for (int i = 1; i <= N; i++) {
            if ((m[cur][i]) && (i != last)) {
                ring(i, cur, cnt + 1);
                v[i] = false;
                out[i] = 0;
            }
        }
    }

    public static void dfs(int cur, int cnt) {
        for (int i = 1; i <= N; i++) {
            if((m[cur][i]) && (!v[i])) {
                v[i] = true;
                r[i] = cnt;
                dfs(i, cnt + 1);
            }
        }
    }

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        bw = new BufferedWriter(new OutputStreamWriter(System.out));
        N = Integer.parseInt(br.readLine());
        m = new boolean[N+1][N+1];
        for (int i = 0; i < N; i++) {
            String[] line = br.readLine().split(" ");
            int x = Integer.parseInt(line[0]);
            int y = Integer.parseInt(line[1]);
            m[x][y] = true;
            m[y][x] = true; //양방향
        }

        //사이클 찾기
        v = new boolean[N + 1];
        r = new int[N + 1];
        out = new int[N + 1];
        ring(1, 0, 1);

        v = new boolean[N + 1];
        int[] check = new int[N + 1];
        for (int i = 1; i <= N; i++) {
            check[i] = r[i];
            if (r[i] != 0) {
                v[i] = true;
            }
        }

        for (int i = 1; i <= N; i++) {
            if (check[i] != 0) { //사이클에 포함된 노드
                r[i] = 0;
                dfs(i, 1);
            }
        }

        for (int i = 1; i <= N; i++) {
            bw.write(r[i] + " ");
        }
        bw.write("\n");
        bw.flush();
    }
}