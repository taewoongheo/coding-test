import java.io.*;
import java.util.Arrays;

public class Main {

    public static BufferedWriter bw;
    public static int[] arr;
    public static int N, sNumIdx, bNumIdx;

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        bw = new BufferedWriter(new OutputStreamWriter(System.out));

        N = Integer.parseInt(br.readLine());
        String[] inputArr = br.readLine().split(" ");

        arr = new int[N];
        for (int i = 0; i < N; i++) {
            arr[i] = Integer.parseInt(inputArr[i]);
        }

        int lastNum = arr[N-1];
        boolean find = false;
        for (int i = N-2; i > -1; i--) {
            if (lastNum > arr[i]) {
                sNumIdx = i;
                find = true;
                break;
            }
            lastNum = arr[i];
        }
        for (int i = N-1; i > sNumIdx; i--) {
            if (arr[i] > arr[sNumIdx]) {
                bNumIdx = i;
                break;
            }
        }
        int save = arr[bNumIdx];
        arr[bNumIdx] = arr[sNumIdx];
        arr[sNumIdx] = save;

        int size = N - 1 - sNumIdx;
        int[] reverseArr = new int[size];
        int idx = 1;
        for (int i = sNumIdx+1; i < N; i++) {
            reverseArr[size-idx] = arr[i];
            idx++;
        }
        idx = 0;
        for (int i = sNumIdx+1; i < N; i++) {
            arr[i] = reverseArr[idx];
            idx++;
        }
        if (!find) {
            bw.write("-1\n");
        } else {
            for (int i = 0; i < N; i++) {
                bw.write(arr[i] + " ");
            }
        }
        bw.write("\n");
        bw.flush();
    }
}