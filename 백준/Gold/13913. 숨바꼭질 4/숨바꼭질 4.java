import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.LinkedList;
import java.util.Queue;

public class Main {

    public static int N, K;
    public static int[] v;
    public static int[] parent;
    public static Queue<int[]> bfsQueue = new LinkedList<>();

    public static void bfs() {

        bfsQueue.add(new int[]{N, N});
        parent[N] = N;
        v[N] = 1;
        while (!bfsQueue.isEmpty()) {
            int[] cur = bfsQueue.remove();
            if (cur[0] == K) {
                return;
            }
            if (cur[0]+1 <= 100000 && v[cur[0] + 1] == 0) {
                v[cur[0] + 1] = v[cur[0]] + 1;
                parent[cur[0] + 1] = cur[0];
                bfsQueue.add(new int[]{cur[0]+1, cur[0]});
            }
            if (cur[0]-1 >= 0 && v[cur[0] - 1] == 0) {
                v[cur[0] - 1] = v[cur[0]] + 1;
                parent[cur[0] - 1] = cur[0];
                bfsQueue.add(new int[]{cur[0] - 1, cur[0]});
            }
            if (cur[0]*2 <= 100000 && v[cur[0] * 2] == 0) {
                v[cur[0] * 2] = v[cur[0]] + 1;
                parent[cur[0] * 2] = cur[0];
                bfsQueue.add(new int[]{cur[0] * 2, cur[0]});
            }
        }
    }

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String[] line = br.readLine().split(" ");
        N = Integer.parseInt(line[0]);
        K = Integer.parseInt(line[1]);
        v = new int[100001];
        parent = new int[100001];

        bfs();

        System.out.println(v[K]-1);
        ArrayList<Integer> out = new ArrayList<>();

        int item = parent[K];
        if (N != K) {
            out.add(K);
        }
        while (item != N) {
            out.add(item);
            item = parent[item];
        }
        
        System.out.print(N + " ");
        for(int i = 1; i <= out.size(); i++) {
            System.out.print(out.get(out.size() - i) + " ");
        }
    }
}