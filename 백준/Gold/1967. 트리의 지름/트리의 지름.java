import java.io.*;
import java.util.*;

public class Main {

    public static int N;
    public static HashMap<Integer, ArrayList<int[]>> nodeMap;
    public static int result = 0;
    public static int farNode;

    public static void bfs(int node) {
        boolean[] v = new boolean[N + 1];
        Queue<int[]> q = new LinkedList<>();
        q.add(new int[]{node, 0});
        v[node] = true;
        while (!q.isEmpty()) {
            int[] cur = q.poll();
            int curData = cur[0];
            int curDis = cur[1];
            if (curDis > result) {
                farNode = curData;
                result = curDis;
            }
            ArrayList<int[]> children = nodeMap.get(curData);
            for (int[] child : children) {
                if (!v[child[0]]) {
                    v[child[0]] = true;
                    q.add(new int[]{child[0], child[1] + curDis});
                }
            }
        }
    }

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));

        N = Integer.parseInt(br.readLine());
        nodeMap = new HashMap<>();
        for (int i = 1; i <= N; i++) {
            nodeMap.put(i, new ArrayList<>());
        }
        for (int i = 0; i < N - 1; i++) {
            String[] line = br.readLine().split(" ");
            nodeMap.get(Integer.parseInt(line[0])).add(new int[]{Integer.parseInt(line[1]), Integer.parseInt(line[2])});
            nodeMap.get(Integer.parseInt(line[1])).add(new int[]{Integer.parseInt(line[0]), Integer.parseInt(line[2])});
        }

        bfs(1);
        if (farNode != 0) {
            bfs(farNode);
        }

        bw.write(result + "\n");
        bw.flush();
    }
}
