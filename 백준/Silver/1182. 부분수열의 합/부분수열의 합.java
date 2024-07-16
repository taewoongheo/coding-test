import java.io.*;

public class Main {

    public static int N, S, cnt = 0;
    public static int[] arr;

    public static void dfs(int depth, int cal, boolean add) {
        if (S == cal && add) {
            cnt += 1;
        }
        if (depth == N) {
            return;
        }

        dfs(depth + 1, cal + arr[depth], true);
        dfs(depth + 1, cal, false);
    }

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));

        String[] line = br.readLine().split(" ");
        N = Integer.parseInt(line[0]);
        S = Integer.parseInt(line[1]);
        arr = new int[N];
        line = br.readLine().split(" ");
        for (int i = 0; i < N; i++) {
            arr[i] = Integer.parseInt(line[i]);
        }

        for (int i = 0; i < N; i++) {
            dfs(i + 1, arr[i], true);
        }

        bw.write(cnt + "\n");
        bw.flush();
    }
}