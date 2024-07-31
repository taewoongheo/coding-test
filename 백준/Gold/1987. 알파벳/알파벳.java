import java.io.*;

public class Main {

    public static int R, C;
    public static char[][] arr;
    public static boolean[][] v;
    public static boolean[] alphabet;
    public static int[][] m = {{0, 1}, {1, 0}, {0, -1}, {-1, 0}};
    public static int answer = Integer.MIN_VALUE;

    public static void bt(int row, int col, int cnt) {
        answer = Math.max(answer, cnt);
        for (int i = 0; i < 4; i++) {
            int nr = row + m[i][0];
            int nc = col + m[i][1];
            if (nr >= 0 && nr < R && nc >= 0 && nc < C && !v[nr][nc] && isPromise(arr[nr][nc])) {
                char ch = arr[nr][nc];
                alphabet[ch - 65] = true;
                v[nr][nc] = true;
                bt(nr, nc, cnt + 1);
                alphabet[ch - 65] = false;
                v[nr][nc] = false;
            }
        }
    }

    public static boolean isPromise(char ch) {
        for (int i = 0; i < 26; i++) {
            if (alphabet[ch - 65]) {
                return false;
            }
        }
        return true;
    }

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));
        String[] line = br.readLine().split(" ");
        R = Integer.parseInt(line[0]);
        C = Integer.parseInt(line[1]);

        arr = new char[R][C];
        v = new boolean[R][C];
        for (int i = 0; i < R; i++) {
            String lines = br.readLine();
            for (int j = 0; j < C; j++) {
                arr[i][j] = lines.charAt(j);
            }
        }

        alphabet = new boolean[26];
        v[0][0] = true;
        alphabet[arr[0][0] - 65] = true;
        bt(0, 0, 1);

        bw.write(answer + "\n");
        bw.flush();
    }
}