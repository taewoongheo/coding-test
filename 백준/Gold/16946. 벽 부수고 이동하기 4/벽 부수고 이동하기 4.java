import java.io.*;
import java.util.*;

public class Main {

    public static int N, M;
    public static int[][] arr, ans, zone, m = {{1, 0}, {0, 1}, {-1, 0}, {0, -1}};

    public static void bfs(int row, int col, int zoneNum) {
        ArrayList<int[]> locArr = new ArrayList<>();
        Queue<int[]> q = new LinkedList<>();
        q.add(new int[]{row, col});
        locArr.add(new int[]{row, col});
        int cnt = 1;
        arr[row][col] = cnt;
        zone[row][col] = zoneNum;

        while (!q.isEmpty()) {
            int[] loc = q.poll();
            int r = loc[0];
            int c = loc[1];
            for (int i = 0; i < 4; i++) {
                int nr = r + m[i][0];
                int nc = c + m[i][1];
                if (nr >= 0 && nr < N && nc >= 0 && nc < M && arr[nr][nc] == 0) {
                    arr[nr][nc] = cnt;
                    zone[nr][nc] = zoneNum;
                    cnt += 1;
                    q.add(new int[]{nr, nc});
                    locArr.add(new int[]{nr, nc});
                }
            }
        }

        for (int[] loc : locArr) {
            arr[loc[0]][loc[1]] = cnt;
        }
    }

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));

        String[] line = br.readLine().split(" ");
        N = Integer.parseInt(line[0]);
        M = Integer.parseInt(line[1]);

        ans = new int[N][M]; //정답을 완성하는 배열
        arr = new int[N][M]; //0 의 개수를 채우는 배열
        zone = new int[N][M]; //구역 구분

        for (int i = 0; i < N; i++) {
            String input = br.readLine();
            for (int j = 0; j < M; j++) {
                String cell = String.valueOf(input.charAt(j));
                ans[i][j] = Integer.parseInt(cell);
                if (cell.equals("1")) {
                    cell = "-1";
                }
                arr[i][j] = Integer.parseInt(cell);
            }
        }

        int zoneNum = 1;
        for (int i = 0; i < N; i++) {
            for (int j = 0; j < M; j++) {
                if (arr[i][j] == 0) {
                    bfs(i, j, zoneNum);
                    zoneNum += 1;
                }
            }
        }

        for (int i = 0; i < N; i++) {
            for (int j = 0; j < M; j++) {
                if (ans[i][j] == 1) {
                    int num = 1;
                    ArrayList<Integer> zoneArr = new ArrayList<>();
                    for (int k = 0; k < 4; k++) {
                        int ni = i + m[k][0];
                        int nj = j + m[k][1];
                        if (ni >= 0 && ni < N && nj >= 0 && nj < M && arr[ni][nj] != -1 && !zoneArr.contains(zone[ni][nj])) {
                            zoneArr.add(zone[ni][nj]);
                            num += arr[ni][nj];
                        }
                    }
                    ans[i][j] = num % 10;
                }
                bw.write(ans[i][j]+"");
            }
            bw.write("\n");
        }
        bw.flush();
    }
}