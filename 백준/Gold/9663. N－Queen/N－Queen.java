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
            if (isPossible(i, depth)) {
                nQueen(depth + 1);
            }
        }
    }

    public static boolean isPossible(int cur, int depth) {
        //depth -> 현재 깊이 = 행
        //cur -> 열
        for (int i = 0; i < depth; i++) {
            if (cur == arr[i]) {
                //같은 열에 있으면 안됨
                return false;
            } else if (Math.abs(cur - arr[i]) == Math.abs(depth - i)) {
                //열의 차 = Math.abs(cur - arr[i])
                //행의 차 = Math.abs(depth - i);
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