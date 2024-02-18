import java.io.*;
import java.util.Arrays;

public class Main {

    public static int[] arr;
    public static int[] intArr;
    public static BufferedWriter bw;
    public static int N, M;

    public static void dfs(int depth, int lastIdxNum) throws IOException {
        if (M == depth) {
            for (int i = 0; i < M; i++) {
                bw.write(arr[i] + " ");
            }
            bw.write("\n");
        } else {
            int before = 0;
            for (int i = 0; i < N; i++) {
                if (before != intArr[i]) {
                    arr[depth] = intArr[i];
                    before = intArr[i];
                    lastIdxNum = intArr[i];
                    dfs(depth + 1, lastIdxNum);
                }
            }
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
        arr = new int[M];
        Arrays.sort(intArr);

        dfs(0, 0);

        bw.flush();
    }
}