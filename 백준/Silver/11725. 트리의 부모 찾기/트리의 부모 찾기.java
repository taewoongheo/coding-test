import java.io.*;
import java.util.*;

public class Main {

    public static int N;
    public static HashMap<Integer, ArrayList<Integer>> nodeInfo;
    public static int[] v;

    public static void bfs() {
        Queue<Integer> q = new LinkedList<>();
        q.add(1);
        v[1] = 1;
        while (!q.isEmpty()) {
            int node = q.poll();
            ArrayList<Integer> children = nodeInfo.get(node);
            for(Integer child : children) {
                if(v[child] == 0) {
                    v[child] = node;
                    q.add(child);
                }
            }
        }
    }

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));

        N = Integer.parseInt(br.readLine());
        nodeInfo = new HashMap<>();
        for (int i = 1; i <= N; i++) {
            nodeInfo.put(i, new ArrayList<>());
        }

        for (int i = 1; i < N; i++) {
            String[] line = br.readLine().split(" ");
            nodeInfo.get(Integer.parseInt(line[0])).add(Integer.parseInt(line[1]));
            nodeInfo.get(Integer.parseInt(line[1])).add(Integer.parseInt(line[0]));
        }

        v = new int[N + 1];
        bfs();

        for (int i = 2; i <= N; i++) {
            bw.write(v[i] + "\n");
        }
        bw.flush();
    }
}
