import java.io.*;

public class Main {

    public static int[] arr;
    public static int N, answer;

    public static void nQueen(int depth) {
        if (depth == N) {
            answer++;
            return;
        }
        for (int i = 0; i < N; i++) {
            arr[depth] = i;
            if (isPossible(depth)) {
                nQueen(depth + 1);
            }
        }
    }

    public static boolean isPossible(int depth) {

        for (int i = 0; i < depth; i++) {
            if (arr[i] == arr[depth]) {
                //같은 행에 있는 지 검사
                return false;
            } else if (Math.abs(depth - i) == Math.abs(arr[depth] - arr[i])) {
                //대각선 검사
                return false;
            }
        }

        return true;
    }

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));

        N = Integer.parseInt(br.readLine());
        arr = new int[N];

        nQueen(0);

        bw.write(answer + "\n");
        bw.flush();
    }
}