import java.io.*;
import java.util.*;

public class Main {

    public static int V, E;
    public static ArrayList<int[]>[] g;
    public static int[] dis;
    public static int INF = Integer.MAX_VALUE;

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));

        String[] line = br.readLine().split(" ");
        V = Integer.parseInt(line[0]);
        E = Integer.parseInt(line[1]);
        int sNode = Integer.parseInt(br.readLine());

        g = new ArrayList[V + 1];
        for (int i = 1; i <= V; i++) {
            g[i] = new ArrayList<>();
        }

        for (int i = 0; i < E; i++) {
            line = br.readLine().split(" ");
            int node1 = Integer.parseInt(line[0]);
            int node2 = Integer.parseInt(line[1]);
            int weight = Integer.parseInt(line[2]);
            g[node1].add(new int[]{node2, weight});
        }

        //dijkstra
        dis = new int[V + 1]; //최소거리 배열
        for (int i = 1; i <= V; i++) {
            dis[i] = INF; //모든 노드와의 거리를 무한으로 설정
        }
        dis[sNode] = 0; //시작노드 거리는 0 으로 초기화

        PriorityQueue<int[]> pq = new PriorityQueue<>((int[] node1, int[] node2) -> node1[1] - node2[1]);
        //다음에 갈 노드를 담는 큐. weight 이 작을수록 우선순위를 가짐
        pq.add(new int[]{sNode, 0});

        while (!pq.isEmpty()) {
            int[] current = pq.poll(); // 현재 노드, 가중치
            int currentNode = current[0];
            int currentWeight = current[1];

            // 현재 노드에 대한 거리가 이미 갱신된 것보다 큰 경우, 스킵 (이미 더 좋은 경로를 찾음)
            if (currentWeight > dis[currentNode]) continue;

            // 현재 노드와 인접한 노드들에 대해 거리 갱신
            for (int[] node : g[currentNode]) {
                int nNode = node[0];
                int nNodeWeight = node[1];

                // 더 짧은 경로를 찾은 경우
                if (dis[nNode] > dis[currentNode] + nNodeWeight) {
                    dis[nNode] = dis[currentNode] + nNodeWeight;
                    pq.offer(new int[]{nNode, dis[nNode]});
                }
            }
        }

        for (int i = 1; i <= V; i++) {
            bw.write(dis[i] == INF ? "INF\n" : dis[i] + "\n");
        }
        bw.flush();
    }
}