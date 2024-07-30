import java.io.*;

public class Main {

    public static BufferedWriter bw;
    public static int N;
    public static int[][] arr;
    public static boolean[][] visited;
    public static boolean flag;
    public static int[][] m = {{1, 0}, {0, 1}};
    public static int cnt = 1;

    public static void dfs(int idx) throws IOException {
        if (idx == 81) {
            bw.write("Puzzle " + cnt + "\n");
            for (int i = 0; i < 9; i++) {
                for (int j = 0; j < 9; j++) {
                    bw.write(arr[i][j]+"");
                }
                bw.write("\n");
            }
            cnt++;
            flag = true;
            return;
        }
        if (flag) {
            return;
        }
        int row = idx / 9;
        int col = idx % 9;
        if (arr[row][col] != 0) {
            dfs(idx + 1);
            return;
        }
        for (int i = 1; i <= 9; i++) {
            if (isPromise(row, col, i)) {
                for (int j = 0; j < 2; j++) {
                    int nRow = row + m[j][0];
                    int nCol = col + m[j][1];

                    if (nRow >= 9 || nCol >= 9 || arr[nRow][nCol] != 0) {
                        continue;
                    }

                    for (int k = 1; k <= 9; k++) {
                        if (i != k && !visited[i][k] && isPromise(nRow, nCol, k)) {
                            arr[row][col] = i;
                            arr[nRow][nCol] = k;
                            visited[i][k] = true;
                            visited[k][i] = true;
                            dfs(idx + 1);
                            arr[row][col] = 0;
                            arr[nRow][nCol] = 0;
                            visited[i][k] = false;
                            visited[k][i] = false;
                        }
                    }
                }
            }
        }
    }

    public static boolean isPromise(int row, int col, int num) {
        for (int i = 0; i < 9; i++) {
            if (arr[row][i] == num) {
                return false;
            }
            if (arr[i][col] == num) {
                return false;
            }
        }

        int setRow = (row / 3) * 3;
        int setCol = (col / 3) * 3;

        for (int i = setRow; i < setRow + 3; i++) {
            for (int j = setCol; j < setCol + 3; j++) {
                if (arr[i][j] == num) {
                    return false;
                }
            }
        }

        return true;
    }

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        bw = new BufferedWriter(new OutputStreamWriter(System.out));

        while (true) {
            N = Integer.parseInt(br.readLine());
            if (N == 0) break;
            arr = new int[9][9];
            visited = new boolean[10][10];
            flag = false;
            for (int i = 0; i < N; i++) {
                String[] line = br.readLine().split(" ");
                int u = Integer.parseInt(line[0]);
                char[] lu = line[1].toCharArray();
                int v = Integer.parseInt(line[2]);
                char[] lv = line[3].toCharArray();
                arr[lu[0] - 65][Character.getNumericValue(lu[1]) - 1] = u;
                arr[lv[0] - 65][Character.getNumericValue(lv[1]) - 1] = v;
                visited[u][v] = true;
                visited[v][u] = true;
            }
            String[] line = br.readLine().split(" ");
            for (int i = 0; i < 9; i++) {
                char[] loc = line[i].toCharArray();
                arr[loc[0] - 65][Character.getNumericValue(loc[1]) - 1] = i + 1;
            }
            dfs(0);
        }
        bw.flush();
    }
}