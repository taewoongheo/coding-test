import java.io.*;
import java.util.ArrayList;
import java.util.Arrays;

public class Main {

    public static int[] intArr;
    public static BufferedWriter bw;
    public static int N, M;

    public static void bt(int depth, ArrayList<Integer> arr) throws IOException {
        if (depth == M) {
            for (int i = 0; i < M; i++) {
                bw.write(arr.get(i) + " ");
            }
            bw.write("\n");
            return;
        }
        for (int i = 0; i < N; i++) {
            Integer num = Integer.parseInt(String.valueOf(intArr[i]));
            if (!arr.contains(num)) {
                arr.add(num);
                bt(depth + 1, arr);
                arr.remove(num);
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
        Arrays.sort(intArr);

        for (int i = 0; i < N; i++) {
            ArrayList<Integer> arr = new ArrayList<>();
            arr.add(intArr[i]);
            bt(1, arr);
        }
        bw.flush();
    }
}
