import java.io.*;
import java.util.ArrayList;
import java.util.Collections;

public class Main {

    public static BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
    public static int N, M, start;
    public static ArrayList<Integer>[] arr;
    public static boolean[] visited;
    public static ArrayList<Integer> queue;

    public static void dfs(int idx) throws IOException {
        if (idx == arr.length) {
            return;
        }
        bw.write((idx + 1) + " ");
        visited[idx] = true;
        for (Integer i : arr[idx]) {
            if (visited[i]) {
                continue;
            }
            dfs(i);
        }
    }

    public static void bfs(int idx, int depth) throws IOException {
        visited[idx] = true;
        bw.write((idx + 1) + " ");
        for (Integer i : arr[idx]) {
            if (visited[i]) {
                continue;
            }
            visited[i] = true;
            queue.add(i);
        }
        if (queue.size() != 0) {
            bfs(queue.remove(0), depth + 1);
        }
    }

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String[] NM = br.readLine().split(" ");
        N = Integer.parseInt(NM[0]);
        M = Integer.parseInt(NM[1]);
        start = Integer.parseInt(NM[2]);

        arr = new ArrayList[N];
        for (int i = 0; i < N; i++) {
            arr[i] = new ArrayList<>();
        }

        for (int i = 0; i < M; i++) {
            String[] intArr = br.readLine().split(" ");
            int front = Integer.parseInt(intArr[0])-1;
            int back = Integer.parseInt(intArr[1])-1;
            arr[front].add(back);
            arr[back].add(front);
        }

        for (int i = 0; i < N; i++) {
            Collections.sort(arr[i]);
        }

        visited = new boolean[N];
        dfs(start-1);
        bw.write("\n");

        visited = new boolean[N];
        queue = new ArrayList<>();
        bfs(start - 1, 0);
        bw.flush();
    }
}