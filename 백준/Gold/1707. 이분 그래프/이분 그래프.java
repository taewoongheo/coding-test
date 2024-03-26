import java.io.*;
import java.util.ArrayList;

public class Main {

    public static int N, V;
    public static ArrayList<Integer> queue;
    public static ArrayList<Integer>[] g;
    public static boolean[] v;
    public static boolean[] c;
    public static boolean flag;

    public static boolean check(int node) {
        for (Integer connectNode : g[node]) {
            if ((v[connectNode]) && (c[connectNode] == c[node])) {
                flag = false;
                return false;
            }
        }
        return true;
    }

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        int k = Integer.parseInt(br.readLine());
        for(int i = 0; i < k; i++) {
            String[] graphInfo = br.readLine().split(" ");
            N = Integer.parseInt(graphInfo[0]); //노드의 수 1~N
            V = Integer.parseInt(graphInfo[1]); //간선의 수

            g = new ArrayList[N+1];
            for(int j = 0; j <= N; j++) {
                g[j] = new ArrayList<>();
            }

            for(int j = 0; j < V; j++) {
                String[] vertexInfo = br.readLine().split(" ");
                int x = Integer.parseInt(vertexInfo[0]);
                int y = Integer.parseInt(vertexInfo[1]);
                g[x].add(y);
                g[y].add(x);
            }

            v = new boolean[N + 1]; //노드 방문 유무
            c = new boolean[N + 1]; //노드 색상 지정
            flag = true;
            boolean color = true;
            queue = new ArrayList<>();

            queue.add(1);
            c[1] = color;
            v[1] = true;
            int cnt = 0; //방문한 정점의 개수
            if (N == 1) {
                flag = false;
            }

            while (cnt != N) {
                if (!(queue.isEmpty())) {
                    int node = queue.remove(0);
                    if (!check(node)) {
                        break;
                    }
                    color = !c[node];
                    for (Integer connectNode : g[node]) {
                        if (!v[connectNode]) {
                            queue.add(connectNode);
                            v[connectNode] = true;
                            c[connectNode] = color;
                        }
                    }
                } else {
                    for(int j = 1; j <= N; j++) {
                        if (!v[j]) {
                            queue.add(j);
                            v[j] = true;
                            c[j] = color;
                            break;
                        }
                    }
                }
                cnt++;
            }

            if(!flag) {
                bw.write("NO\n");
            } else {
                bw.write("YES\n");
            }
        }
        bw.flush();
    }
}