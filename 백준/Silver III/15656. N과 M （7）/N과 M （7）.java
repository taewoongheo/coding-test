import java.io.*;
import java.util.ArrayList;
import java.util.Arrays;

public class Main {

    public static int[] intArr;
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
            arr[depth] = intArr[i];
            bt(depth + 1, arr);
            arr[depth] = 0;
        }
    }

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        bw = new BufferedWriter(new OutputStreamWriter(System.out));

        String[] inputNM = br.readLine().split(" ");
        String[] inputArr = br.readLine().split(" ");
        N = Integer.parseInt(inputNM[0]);
        M = Integer.parseInt(inputNM[1]);
        intArr = new int[N];
        for (int i = 0; i < N; i++) {
            intArr[i] = Integer.parseInt(inputArr[i]);
        }
        Arrays.sort(intArr);

        for (int i = 0; i < N; i++) {
            int[] arr = new int[M];
            arr[0] = intArr[i];
            bt(1, arr);
        }
        bw.flush();
    }
}
