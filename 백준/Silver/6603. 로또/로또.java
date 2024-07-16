import java.io.*;
import java.util.Arrays;

public class Main {

    public static BufferedWriter bw;
    public static int[] arr;
    public static boolean[] visited;
    public static int k;
    public static int[] resultArr;

    public static void bt(int depth) throws IOException {
        if (depth == 6) {
            for (int i = 0; i < 6; i++) {
                bw.write(resultArr[i] + " ");
            }
            bw.write("\n");
            return;
        }
        for (int i = 0; i < k; i++) {
            if (visited[i]) {
                continue;
            }
            if (resultArr[depth - 1] < arr[i]) {
                visited[i] = true;
                resultArr[depth] = arr[i];
                bt(depth + 1);
                visited[i] = false;
            }
        }
    }

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        bw = new BufferedWriter(new OutputStreamWriter(System.out));

        while (true) {
            String[] inputArr = br.readLine().split(" ");
            k = Integer.parseInt(inputArr[0]);
            if (k == 0) {
                break;
            }

            arr = new int[k];
            int idx = 0;
            for (int i = 1; i < k+1; i++) {
                arr[idx] = Integer.parseInt(inputArr[i]);
                idx += 1;
            }

            visited = new boolean[k];
            resultArr = new int[6];
            for (int i = 0; i < k; i++) {
                visited[i] = true;
                resultArr[0] = arr[i];
                bt(1);
                visited[i] = false;
            }
            bw.write("\n");
        }

        bw.flush();
    }
}