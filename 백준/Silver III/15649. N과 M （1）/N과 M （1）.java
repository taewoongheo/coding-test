import java.io.*;
import java.util.ArrayList;

public class Main {

    public static void bt(int depth, int N, int M, ArrayList<Integer> arr) {
        if (depth == M) {
            for (int i = 0; i < M; i++) {
                System.out.print(arr.get(i)+" ");
            }
            System.out.println();
            return;
        }
        for (int i = 0; i < N; i++) {
            Integer num = i+1;
            if (arr.contains(num)) {
                continue;
            }
            arr.add(num);
            bt(depth + 1, N, M, arr);
            arr.remove(num);
        }
    }

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        String[] inputArr = br.readLine().split(" ");
        int N = Integer.parseInt(inputArr[0]);
        int M = Integer.parseInt(inputArr[1]);

        for (int i = 0; i < N; i++) {
            ArrayList<Integer> arr = new ArrayList<>();
            arr.add(i + 1);
            bt(1, N, M, arr);
        }
    }
}
