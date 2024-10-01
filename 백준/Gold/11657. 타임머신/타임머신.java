import java.io.*;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));

        String[] line = br.readLine().split(" ");
        int N = Integer.parseInt(line[0]);
        int M = Integer.parseInt(line[1]);
        long[][] edges = new long[M][3];
        for (int i = 0; i < M; i++) {
            line = br.readLine().split(" ");
            long sNode = Long.parseLong(line[0]);
            long eNode =  Long.parseLong(line[1]);
            long cost = Long.parseLong(line[2]);
            edges[i] = new long[]{sNode, eNode, cost};
        }

        //bellman-ford
        long INF = Long.MAX_VALUE;
        long[] dist = new long[N + 1];
        for (int i = 1; i <= N; i++) {
            dist[i] = INF;
        }
        dist[1] = 0; //1번 도시 초기화

        boolean infinite = false; //음수 간선 순환 여부
        for (int i = 0; i < N; i++) {
            for (int j = 0; j < M; j++) {
                long[] edge = edges[j];
                long sNode = edge[0];
                long eNode = edge[1];
                long cost = edge[2];
                if (dist[(int) sNode] != INF && dist[(int) sNode] + cost < dist[(int) eNode]) {
                    dist[(int) eNode] = dist[(int) sNode] + cost;
                    if (i == N - 1) {
                        infinite = true;
                        break;
                    }
                }
            }
        }

        if (infinite) {
            bw.write("-1\n");
        } else {
            for (int i = 2; i <= N; i++) {
                bw.write((dist[i] != INF ? dist[i] : "-1") + "\n");
            }
        }
        bw.flush();
    }
}