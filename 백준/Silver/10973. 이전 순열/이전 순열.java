import java.io.*;

public class Main {

    public static void swap(int [] arr, int i, int j) {
        int temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }

    public static boolean nextPermutation(int[] arr) {
        int i = arr.length-1;
        while (i > 0 && arr[i-1] <= arr[i]) {
            i -= 1;
        }

        if (i <= 0) {
            return false;
        }

        int j = arr.length-1;
        while (arr[j] >= arr[i-1]) {
            j -= 1;
        }

        swap(arr, i-1, j);

        j = arr.length-1;
        while (i < j) {
            swap(arr, i, j);
            i += 1;
            j -= 1;
        }
        return true;
    }

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));

        int N = Integer.parseInt(br.readLine());
        String[] inputArr = br.readLine().split(" ");

        int[] arr = new int[N];
        for (int i = 0; i < N; i++) {
            arr[i] = Integer.parseInt(inputArr[i]);
        }

        if (nextPermutation(arr)) {
            for (int i = 0; i < N; i++) {
                bw.write(arr[i] + " ");
            }
        } else {
            bw.write("-1");
        }

        bw.write("\n");
        bw.flush();
    }
}