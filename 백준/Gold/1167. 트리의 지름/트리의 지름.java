import java.io.*;
import java.util.*;

public class Main {

    static ArrayList<Node>[] list;
    static boolean[] visited;
    static int max = 0;
    static int node;

    public static void main(String args[]) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        int n = Integer.parseInt(br.readLine());
        list = new ArrayList[n + 1];
        for (int i = 1; i < n + 1; i++) {
            list[i] = new ArrayList<>();
        }

        for (int i = 0; i < n; i++) {
            StringTokenizer st = new StringTokenizer(br.readLine());
            int s = Integer.parseInt(st.nextToken());
            while (true) {
                int e = Integer.parseInt(st.nextToken());
                if (e == -1) break;
                int cost = Integer.parseInt(st.nextToken());
                list[s].add(new Node(e, cost));
            }
        }

        // 임의의 노드(1)에서부터 가장 먼 노드를 찾는다. 이때 찾은 노드를 node에 저장한다.
        visited = new boolean[n + 1];
        bfs(1);

        // node에서부터 가장 먼 노드까지의 거리를 구한다.
        visited = new boolean[n + 1];
        bfs(node);

        System.out.println(max);
    }

    public static void bfs(int start) {
        Queue<int[]> q = new LinkedList<>();
        q.add(new int[]{start, 0});
        visited[start] = true;
        max = 0;

        while (!q.isEmpty()) {
            int[] current = q.poll();
            int curNode = current[0];
            int curDist = current[1];

            if (curDist > max) {
                max = curDist;
                node = curNode;
            }

            for (Node neighbor : list[curNode]) {
                if (!visited[neighbor.e]) {
                    visited[neighbor.e] = true;
                    q.add(new int[]{neighbor.e, curDist + neighbor.cost});
                }
            }
        }
    }

    public static class Node {
        int e;
        int cost;

        public Node(int e, int cost) {
            this.e = e;
            this.cost = cost;
        }
    }
}
