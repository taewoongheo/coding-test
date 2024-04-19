import java.io.*;
import java.util.*;

public class Main {

    public static int N, idx;
    public static ArrayList<HashSet<Integer>> m;
    public static int[] inputArr;
    public static boolean[] v;
    public static Queue<Integer> q;

    public static void bfs() {
        v[1] = true;
        q.offer(1);
        idx = 2;
        while (!q.isEmpty()) {
            int cur = q.poll();
            int neighborCnt = 0;
            for (int node : m.get(cur)) {
                if(!v[node]) {
                    v[node] = true;
                    neighborCnt += 1;
                }
            }

            for(int i = idx; i < idx + neighborCnt; i++) { //해당 부분만 검사
                if (!v[inputArr[i]]) {
                    System.out.println("0");
                    return;
                } else {
                    q.offer(inputArr[i]);
                }
            }
            idx += neighborCnt;
        }
        System.out.println("1");
    }

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        N = Integer.parseInt(br.readLine());
        m = new ArrayList<>();
        for (int i = 0; i <= N; i++) {
            m.add(new HashSet<>());
        }
        String[] line;
        for (int i = 0; i < N - 1; i++) {
            line = br.readLine().split(" ");
            int x = Integer.parseInt(line[0]);
            int y = Integer.parseInt(line[1]);
            m.get(x).add(y);
            m.get(y).add(x);
        }
        line = br.readLine().split(" ");
        inputArr = new int[N + 1];
        for (int i = 0; i < N; i++) {
            inputArr[i+1] = Integer.parseInt(line[i]);
        }

        if (inputArr[1] != 1) {
            System.out.println("0");
            System.exit(0);
        }

        v = new boolean[N + 1];
        q = new LinkedList<>();
        bfs();
    }
}