import java.io.*;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));

        String[] line = br.readLine().split(" ");
        int V = Integer.parseInt(line[0]);
        int E = Integer.parseInt(line[1]);

        long[][] edges = new long[E][3];
        for (int i = 0; i < E; i++) {
            line = br.readLine().split(" ");
            int node1 = Integer.parseInt(line[0]);
            int node2 = Integer.parseInt(line[1]);
            int cost = Integer.parseInt(line[2]);
            edges[i] = new long[]{node1, node2, cost};
        }

        long[] dist = new long[V + 1];
        long INF = Long.MAX_VALUE;
        for (int i = 1; i <= V; i++) {
            dist[i] = INF;
        }
        dist[1] = 0;
        boolean infinite = false;
        for (int i = 0; i < V; i++) {
            for (int j = 0; j < E; j++) {
                long[] edge = edges[j];
                long sNode = edge[0];
                long eNode = edge[1];
                long cost = edge[2];
                if (dist[(int) sNode] != INF && dist[(int) sNode] + cost < dist[(int) eNode]) {
                    dist[(int)eNode] = dist[(int) sNode] + cost;
                    if (i == V - 1) {
                        infinite = true;
                        break;
                    }
                }
            }
        }

        if (infinite) {
            bw.write("-1\n");
        } else {
            for (int i = 2; i <= V; i++) {
                bw.write((dist[i] == INF ? "-1" : dist[i]) + "\n");
            }
        }
        bw.flush();
    }
}