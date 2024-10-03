import java.io.*;
import java.util.*;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));

        int N = Integer.parseInt(br.readLine());
        Map<Integer, ArrayList<Integer>> g = new HashMap<>();
        for (int i = 1; i <= N; i++) {
            g.put(i, new ArrayList<>());
        }
        for (int i = 0; i < N - 1; i++) {
            String[] line = br.readLine().split(" ");
            int node1 = Integer.parseInt(line[0]);
            int node2 = Integer.parseInt(line[1]);
            g.get(node1).add(node2);
            g.get(node2).add(node1);
        }
        int[] arr = new int[N + 1];
        String[] line = br.readLine().split(" ");
        for (int i = 1; i <= N; i++) {
            arr[i] = Integer.parseInt(line[i - 1]);
        }

        Queue<Integer> q = new LinkedList<>();
        boolean[] v = new boolean[N + 1];
        boolean possible = arr[1] == 1;
        q.add(1);
        v[1] = true;
        int idx = 2;
        while (!q.isEmpty()) {
            if (!possible) {
                break;
            }
            int cNode = q.poll();
            int cnt = 0;
            for (Integer node : g.get(cNode)) {
                if (!v[node]) {
                    v[node] = true;
                    cnt += 1;
                }
            }
            for (int i = idx; i < idx + cnt; i++) {
                if (v[arr[i]]) {
                    q.offer(arr[i]);
                } else {
                    possible = false;
                }
            }
            idx += cnt;
        }

        bw.write((possible ? "1" : "0") + "\n");
        bw.flush();
    }
}