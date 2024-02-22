import java.io.*;

public class Main {

    public static BufferedWriter bw;
    public static int N;
    public static int[] arr;
    public static boolean[] boolArr;

    public static void bt(int depth) throws IOException {
        if (depth == N) {
            for (int i = 0; i < N; i++) {
                bw.write(arr[i] + " ");
            }
            bw.write("\n");
        } else {
            for (int i = 0; i < N; i++) {
                if (boolArr[i] == true) {
                    continue;
                }
                boolArr[i] = true;
                arr[depth] = i+1;
                bt(depth + 1);
                boolArr[i] = false;
            }
        }
    }

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        bw = new BufferedWriter(new OutputStreamWriter(System.out));

        N = Integer.parseInt(br.readLine());

        arr = new int[N];
        boolArr = new boolean[N];
        bt(0);

        bw.flush();
    }
}