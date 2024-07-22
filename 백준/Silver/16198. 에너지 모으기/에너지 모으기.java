import java.io.*;
import java.util.ArrayList;

public class Main {

    public static int N, out = Integer.MIN_VALUE;
    public static ArrayList<Integer> arr;

    public static void dfs(int N, int sum, int idx, ArrayList<Integer> list) {
        sum += list.get(idx - 1) * list.get(idx + 1);
        list.remove(idx);
        N -= 1;
        if (N == 2) {
            out = Math.max(out, sum);
            return;
        }
        for (int i = 1; i < N - 1; i++) {
            ArrayList<Integer> temp = new ArrayList<>(list);
            dfs(N, sum, i, temp);
        }
    }

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));

        N = Integer.parseInt(br.readLine());
        arr = new ArrayList<>();
        String[] line = br.readLine().split(" ");
        for (int i = 0; i < N; i++) {
            arr.add(Integer.parseInt(line[i]));
        }

        for (int i = 1; i < N - 1; i++) {
            int total = N;
            ArrayList<Integer> list = new ArrayList<>(arr);
            dfs(total, 0, i, list);
        }

        bw.write(out + "\n");
        bw.flush();
    }
}