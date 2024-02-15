import java.io.*;
import java.util.ArrayList;

public class Main {

    public static void bt(int N, int M, int depth, ArrayList<Integer> arr) {
        if (depth == M) {
            for (int i = 0; i < M; i++) {
                System.out.print(arr.get(i)+" ");
            }
            System.out.println();
            return;
        }
        for (int i = 1; i < N+1; i++) {
            Integer num = Integer.parseInt(String.valueOf(i));
            if (arr.get(arr.size()-1) < i) {
                arr.add(num);
                bt(N, M, depth + 1, arr);
                arr.remove(num);
            }
        }
    }

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        String[] inputArr = br.readLine().split(" ");
        int N = Integer.parseInt(inputArr[0]);
        int M = Integer.parseInt(inputArr[1]);

        for (int i = 0; i < N; i++) {
            ArrayList<Integer> arr = new ArrayList<>();
            arr.add(i+1);
            bt(N, M, 1, arr);
        }
    }
}
