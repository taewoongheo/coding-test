import java.io.*;

public class Main {

    public static int maxValue;
    public static int N;
    public static int[] arr;
    public static int[] resultArr;
    public static boolean[] boolArr;

    public static void bt(int depth) {
        if (depth == N) {
            int result = 0;
            for (int i = 1; i < N; i++) {
                result += Math.abs(resultArr[i] - resultArr[i - 1]);
            }
            if (result > maxValue) {
                maxValue = result;
            }
        } else {
            for (int i = 0; i < N; i++) {
                if (boolArr[i]) {
                    continue;
                }
                resultArr[depth] = arr[i];
                boolArr[i] = true;
                bt(depth + 1);
                boolArr[i] = false;
            }
        }
    }

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));

        N = Integer.parseInt(br.readLine());
        String[] inputArr = br.readLine().split(" ");

        arr = new int[N];
        for (int i = 0; i < N; i++) {
            arr[i] = Integer.parseInt(inputArr[i]);
        }

        maxValue = 0;
        boolArr = new boolean[N];
        for (int i = 0; i < N; i++) {
            resultArr = new int[N];
            resultArr[0] = arr[i];
            boolArr[i] = true;
            bt(1);
            boolArr[i] = false;
        }

        bw.write(maxValue + "\n");
        bw.flush();
    }
}