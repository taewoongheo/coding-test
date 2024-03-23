import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;

public class Main {

    public static int N, M;
    public static boolean[][] graph;
    public static boolean[] visited;
    public static int result;

    public static void dfs(int cur) {
        if (visited[cur-1]) {
            return;
        }

        visited[cur-1] = true;
        for(int i = 0; i < N; i++) {
            if (graph[cur-1][i]) {
                dfs(i + 1);
            }
        }
    }

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String[] NM = br.readLine().split(" ");
        N = Integer.parseInt(NM[0]);
        M = Integer.parseInt(NM[1]);

        graph = new boolean[N][N];
        for(int i = 0; i < M; i++) {
            String[] input = br.readLine().split(" ");
            int x = Integer.parseInt(input[0]);
            int y = Integer.parseInt(input[1]);
            graph[x-1][y-1] = true;
            graph[y-1][x-1] = true;
        }

        visited = new boolean[N];
        for(int i = 0; i < N; i++) {
            if (!visited[i]) {
                dfs(i+1);
                result += 1;
            }
        }
        System.out.println(result);
    }
}