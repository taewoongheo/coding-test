import java.io.*;

public class Main {

    public static BufferedWriter bw;
    public static int N, M;

    public static void bt(int depth, int[] arr) throws IOException {
        if (depth == M) {
            for (int i = 0; i < M; i++) {
                bw.write(arr[i] + " ");
            }
            bw.write("\n");
            return;
        }
        for (int i = 0; i < N; i++) {
            if (arr[depth - 1] <= i+1) {
                arr[depth] = i+1;
                bt(depth + 1, arr);
                arr[depth] = 0;
            }
        }
    }

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        bw = new BufferedWriter(new OutputStreamWriter(System.out));

        String[] inputArr = br.readLine().split(" ");
        N = Integer.parseInt(inputArr[0]);
        M = Integer.parseInt(inputArr[1]);

        for (int i = 0; i < N; i++) {
            int[] arr = new int[M];
            int depth = 0;
            arr[depth] = i+1;
            bt(1, arr);
        }
        bw.flush();
    }
}
