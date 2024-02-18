import java.io.*;
import java.util.ArrayList;
import java.util.Arrays;

public class Main {

    public static ArrayList<int[]> resultArr;
    public static int[] intArr;
    public static BufferedWriter bw;
    public static int N, M;

    public static void bt(int depth, int[] arr, Boolean[] boolArr) {
        if (depth == M) {
            int[] copy = arr.clone();
            resultArr.add(copy);
            return;
        }
        for (int i = 0; i < N; i++) {
            if (!boolArr[i]) {
                boolArr[i] = true;
                arr[depth] = intArr[i];
                bt(depth + 1, arr, boolArr);
                boolArr[i] = false;
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

        resultArr = new ArrayList<>();
        Boolean[] boolArr = new Boolean[N];
        for (int j = 0; j < N; j++) {
            boolArr[j] = false;
        }
        for (int i = 0; i < N; i++) {
            int[] arr = new int[M];
            boolArr[i] = true;
            arr[0] = intArr[i];
            bt(1, arr, boolArr);
            boolArr[i] = false;
        }

        //print resultArr
        int[] lastArr = new int[M];
        for (int i = 0; i < M; i++) {
            lastArr[i] = 0;
        }

        for (int i = 0; i < resultArr.size(); i++) {
            boolean isDupli = false;
            for (int j = i+1; j < resultArr.size(); j++) {
                if (Arrays.equals(resultArr.get(i), resultArr.get(j))) {
                    isDupli = true;
                    break;
                }
            }
            if (!isDupli) {
                for (int l = 0; l < M; l++) {
                    bw.write(resultArr.get(i)[l] + " ");
                }
                bw.write("\n");
            }
        }
        bw.flush();
    }
}