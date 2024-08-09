import java.io.*;
import java.util.*;

public class Main {

    public static int[] snakesAndLadders, arr;
    public static int ans;

    public static void bfs() {
        Queue<int[]> q = new LinkedList<>();
        boolean[] v = new boolean[101];

        q.add(new int[]{1, 0});
        v[1] = true;
        
        while (!q.isEmpty()) {
            int[] loc = q.poll();
            int num = loc[0];
            int cnt = loc[1];
            if (num == 100) {
                ans = cnt;
                return;
            }
            for (int i = 1; i <= 6; i++) {
                int nNum = num + i;
                if (nNum <= 100) {
                    if (snakesAndLadders[nNum] != 0) {
                        nNum = snakesAndLadders[nNum];
                    }
                    if (!v[nNum]) {
                        v[nNum] = true;
                        q.add(new int[]{nNum, cnt + 1});
                    }
                }
            }
        }
    }

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));

        snakesAndLadders = new int[101];
        arr = new int[101];

        String[] line = br.readLine().split(" ");
        int N = Integer.parseInt(line[0]);
        int M = Integer.parseInt(line[1]);
        for (int i = 0; i < N + M; i++) {
            line = br.readLine().split(" ");
            snakesAndLadders[Integer.parseInt(line[0])] = Integer.parseInt(line[1]);
        }

        bfs();

        bw.write(ans + "\n");
        bw.flush();
    }
}