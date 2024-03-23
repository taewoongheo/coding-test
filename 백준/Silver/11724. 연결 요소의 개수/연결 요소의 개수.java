import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;

public class Main {

    public static int[][] graph;
    public static boolean[] visited;
    public static int result;

    public static void dfs(int cur) {
        for (int[] nodeInfo : graph) {
            if ((nodeInfo[0] == cur) && (!visited[nodeInfo[1]-1])) {
                visited[nodeInfo[1]-1] = true;
                dfs(nodeInfo[1]);
            }
            if ((nodeInfo[1] == cur) && (!visited[nodeInfo[0]-1])) {
                visited[nodeInfo[0]-1] = true;
                dfs(nodeInfo[0]);
            }
        }
    }

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String[] NM = br.readLine().split(" ");
        int N = Integer.parseInt(NM[0]);
        int M = Integer.parseInt(NM[1]);

        graph = new int[M][2];
        for(int i = 0; i < M; i++) {
            String[] input = br.readLine().split(" ");
            graph[i][0] = Integer.parseInt(input[0]);
            graph[i][1] = Integer.parseInt(input[1]);
        }

        visited = new boolean[N];
        for(int i = 0; i < N; i++) {
            if (!visited[i]) {
                visited[i] = true;
                dfs(i+1);
                result += 1;
            }
        }
        System.out.println(result);
    }
}