import java.io.*;

public class Main {

    public static int N, answer = 0;
    public static boolean[][] arr;

    public static void bt(int depth) {
        if (depth == N) {
            answer += 1;
            return;
        }
        for (int i = 0; i < N; i++) {
            if (check(i, depth)) {
                arr[depth][i] = true;
                bt(depth + 1);
                arr[depth][i] = false;
            }
        }
    }

    public static boolean check(int x, int y) {

        //세로
        for (int i = 0; i < N; i++) {
            if (arr[i][x]) {
                return false;
            }
        }

        // 세로 대각선 검사
        for (int i = 1; x - i >= 0 && y - i >= 0; i++) {
            if (arr[y - i][x - i]) {
                return false;
            }
        }
        for (int i = 1; x + i < N && y - i >= 0; i++) {
            if (arr[y - i][x + i]) {
                return false;
            }
        }

        // 가로 대각선 검사
        for (int i = 1; x - i >= 0 && y - i >= 0; i++) {
            if (arr[y - i][x - i]) {
                return false;
            }
        }
        for (int i = 1; x + i < N && y - i >= 0; i++) {
            if (arr[y - i][x + i]) {
                return false;
            }
        }

        return true;
    }

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));

        N = Integer.parseInt(br.readLine());
        arr = new boolean[N][N];

        //가로기준검사하면서 세로로 나아감
        for (int i = 0; i < N; i++) {
            arr[0][i] = true;
            bt(1);
            arr[0][i] = false;
        }

        bw.write(answer + "\n");
        bw.flush();
    }
}