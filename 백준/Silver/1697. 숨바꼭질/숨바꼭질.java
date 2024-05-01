import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.LinkedList;
import java.util.Queue;

public class Main {

    public static int N, K;
    public static int[] v;
    public static Queue<Integer> bfsQueue = new LinkedList<>();


    public static void bfs() {

        bfsQueue.add(N);
        v[N] = 1;
        while (!bfsQueue.isEmpty()) {
            int cur = bfsQueue.remove();
            if (cur == K) {
                System.out.println(v[cur]-1);
                return;
            }
            if (cur+1 <= 100000 && v[cur + 1] == 0) {
                v[cur + 1] = v[cur] + 1;
                bfsQueue.add(cur + 1);
            }
            if (cur-1 >= 0 && v[cur - 1] == 0) {
                v[cur - 1] = v[cur] + 1;
                bfsQueue.add(cur - 1);
            }
            if (cur*2 <= 100000 && v[cur * 2] == 0) {
                v[cur * 2] = v[cur] + 1;
                bfsQueue.add(cur * 2);
            }
        }
    }

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String[] line = br.readLine().split(" ");
        N = Integer.parseInt(line[0]);
        K = Integer.parseInt(line[1]);
        v = new int[100001];

        bfs();
    }
}