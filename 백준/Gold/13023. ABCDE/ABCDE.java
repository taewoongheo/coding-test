import java.io.*;
import java.util.ArrayList;

public class Main {

    public static int N, M;
    public static ArrayList<Integer>[] arr;
    public static boolean[] visited;

    public static void dfs(int connect, int node) {
        if (connect == 4) {
            System.out.println("1");
            System.exit(0);
        }
        for (Integer i : arr[node]) {
            if (visited[i]) {
                continue;
            }
            visited[i] = true;
            dfs(connect + 1, i);
            visited[i] = false;
        }
    }

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String[] NM = br.readLine().split(" ");
        N = Integer.parseInt(NM[0]);
        M = Integer.parseInt(NM[1]);

        arr = new ArrayList[N];
        for (int i = 0; i < N; i++) {
            arr[i] = new ArrayList<>();
        }

        for (int i = 0; i < M; i++) {
            String[] intArr = br.readLine().split(" ");
            int front = Integer.parseInt(intArr[0]);
            int back = Integer.parseInt(intArr[1]);
            arr[front].add(back);
            arr[back].add(front);
        }

        visited = new boolean[N];
        for (int i = 0; i < N; i++) {
            visited[i] = true;
            dfs(0, i);
            visited[i] = false;
        }
        System.out.println("0");
    }
}