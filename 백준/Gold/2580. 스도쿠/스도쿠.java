import java.io.*;

public class Main {

    public static int N;
    public static BufferedWriter bw;
    public static int[][] arr, colArr, cellArr;

    public static void bt(int cnt) throws IOException {
        if (cnt == N) {
            for (int i = 0; i < 9; i++) {
                for (int j = 0; j < 9; j++) {
                    bw.write(arr[i][j] + " ");
                }
                bw.write("\n");
            }
            bw.flush();
            System.exit(0);
        }
        int row = cellArr[cnt][0];
        int col = cellArr[cnt][1];
        for (int k = 1; k <= 9; k++) {
            if (isPromise(row, col, k)) {
                arr[row][col] = k;
                colArr[col][row] = k;
                bt(cnt + 1);
                arr[row][col] = 0;
                colArr[col][row] = 0;
            }
        }
    }

    public static boolean isPromise(int row, int col, int num) {
        boolean ret = true;
        arr[row][col] = num;
        colArr[col][row] = num;

        for (int i = 0; i < 9; i++) {
            if (arr[row][i] == num && i != col) {
                ret = false;
            }
            if (colArr[col][i] == num && i != row) {
                ret = false;
            }
        }

        if (ret) {
            int[] rowRange = new int[2];
            int[] colRange = new int[2];

            if (row <= 2) {
                rowRange = new int[]{0, 2};
            } else if (row <= 5) {
                rowRange = new int[]{3, 5};
            } else if (row <= 8) {
                rowRange = new int[]{6, 8};
            }

            if (col <= 2) {
                colRange = new int[]{0, 2};
            } else if (col <= 5) {
                colRange = new int[]{3, 5};
            } else if (col <= 8) {
                colRange = new int[]{6, 8};
            }

            ret = squareCheck(rowRange, colRange);
        }

        arr[row][col] = 0;
        colArr[col][row] = 0;
        return ret;
    }

    public static boolean squareCheck(int[] rowRange, int[] colRange) {
        boolean[] v = new boolean[9];
        for (int i = rowRange[0]; i <= rowRange[1]; i++) {
            for (int j = colRange[0]; j <= colRange[1]; j++) {
                int idx = arr[i][j];
                if (idx == 0) {
                    continue;
                } else {
                    if (!v[idx - 1]) {
                        v[idx - 1] = true;
                    } else {
                        return false;
                    }
                }
            }
        }
        return true;
    }

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        bw = new BufferedWriter(new OutputStreamWriter(System.out));

        arr = new int[9][9];
        colArr = new int[9][9];
        cellArr = new int[81][2];
        N = 0;
        for (int i = 0; i < 9; i++) {
            String[] line = br.readLine().split(" ");
            for (int j = 0; j < 9; j++) {
                if (line[j].equals("0")) {
                    cellArr[N] = new int[]{i, j};
                    N++;
                }
                arr[i][j] = Integer.parseInt(line[j]);
            }
        }

        for (int i = 0; i < 9; i++) {
            for (int j = 0; j < 9; j++) {
                colArr[i][j] = arr[j][i];
            }
        }

        bt(0);
    }
}