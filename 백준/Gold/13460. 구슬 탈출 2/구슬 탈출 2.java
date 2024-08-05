import java.io.*;

public class Main {

    public static int N, M;
    public static String[][] map;
    public static int ans = -1;
    public static int[][] m = {{1, 0}, {0, 1}, {-1, 0}, {0, -1}};
    public static int[] hole;

    public static void dfs(int cnt, int[] redLoc, int[] blueLoc) throws IOException {
        if (redLoc[0] < 0 && redLoc[1] >= N && blueLoc[0] < 0 && blueLoc[1] >= M) {
            return;
        }
        if (cnt == 11) {
            return;
        }
        for (int i = 0; i < 4; i++) {
            boolean cantMove = false;
            boolean isRedInHole = false;
            boolean isBlueInHole = false;
            int moved = 0;
            int[] dir = m[i];
            int redRow = redLoc[0];
            int redCol = redLoc[1];
            int blueRow = blueLoc[0];
            int blueCol = blueLoc[1];
            while (true) {
                redRow += dir[0];
                redCol += dir[1];
                blueRow += dir[0];
                blueCol += dir[1];
                moved += 1;
                if (!isWall(redRow, redCol)) {
                    if (redRow == hole[0] && redCol == hole[1]) {
                        isRedInHole = true;
                    }
                    if (isWall(blueRow, blueCol)) {
                        blueRow -= dir[0];
                        blueCol -= dir[1];
                        if (redRow == blueRow && redCol == blueCol) {
                            //파 바로 옆에 빨이 붙음. 더 이상 움직일 수 없음.
                            redRow -= dir[0];
                            redCol -= dir[1];
                            break;
                        }
                    }
                } else {
                    redRow -= dir[0];
                    redCol -= dir[1];

                    if (isRedInHole) {
                        if (blueRow == hole[0] && blueCol == hole[1]) {
                            isBlueInHole = true;
                            cantMove = true;
                        }
                    }

                    if (moved == 1) {
                        if (isWall(blueRow, blueCol)) {
                            cantMove = true;
                            break;
                        }
                    }

                    if (isWall(blueRow, blueCol)) {
                        blueRow -= dir[0];
                        blueCol -= dir[1];
                        break;
                    }

                    if (redRow == blueRow && redCol == blueCol) {
                        blueRow -= dir[0];
                        blueCol -= dir[1];
                        break;
                    }
                }
                if (blueRow == hole[0] && blueCol == hole[1]) {
                    cantMove = true;
                    isBlueInHole = true;
                    break;
                }
            }
            if (moved == 1) {
                continue;
            }
            if (isRedInHole && !isBlueInHole) {
                if (ans == -1) {
                    ans = cnt;
                }
                ans = Math.min(ans, cnt);
            }
            if (cantMove) {
                continue;
            }
            dfs(cnt + 1, new int[]{redRow, redCol}, new int[]{blueRow, blueCol});
        }
    }

    public static boolean isWall(int row, int col) {
        return map[row][col].equals("#");
    }

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));

        String[] lines = br.readLine().split(" ");
        N = Integer.parseInt(lines[0]);
        M = Integer.parseInt(lines[1]);
        map = new String[N][M];
        int[] redLoc = new int[2];
        int[] blueLoc = new int[2];
        for (int i = 0; i < N; i++) {
            String line = br.readLine();
            for (int j = 0; j < M; j++) {
                char ch = line.charAt(j);
                if (ch == 'R') {
                    redLoc = new int[]{i, j};
                } else if (ch == 'B') {
                    blueLoc = new int[]{i, j};
                } else if (ch == 'O') {
                    hole = new int[]{i, j};
                }
                map[i][j] = String.valueOf(line.charAt(j));
            }
        }

        dfs(1, redLoc, blueLoc);
        bw.write(ans + "\n");
        bw.flush();
    }
}