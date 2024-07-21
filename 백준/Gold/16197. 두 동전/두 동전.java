import java.io.*;

public class Main {

    public static int N, M, out = -1;
    public static String[][] arr;
    public static int[][] m = {{-1, 0}, {0, 1}, {1, 0}, {0, -1}};
    public static boolean[][] visitA;
    public static boolean[][] visitB;
    public static int[][] coin;

    public static void dfs(int cnt, int[][] coin) {
        if (cnt >= 10) {
            return;
        }
        int[] coinA = coin[0];
        int[] coinB = coin[1];
        for (int i = 0; i < 4; i++) {
            int nxA = coinA[0] + m[i][0];
            int nyA = coinA[1] + m[i][1];
            int nxB = coinB[0] + m[i][0];
            int nyB = coinB[1] + m[i][1];
            boolean isOutA = nxA < 0 || nxA >= N || nyA < 0 || nyA >= M;
            boolean isOutB = nxB < 0 || nxB >= N || nyB < 0 || nyB >= M;
            if (isOutA && !isOutB) {
                if (out == -1) {
                    out = Integer.MAX_VALUE;
                }
                out = Math.min(out, cnt + 1);
            } else if (isOutB && !isOutA) {
                if (out == -1) {
                    out = Integer.MAX_VALUE;
                }
                out = Math.min(out, cnt + 1);
            } else if (isOutA && isOutB) {
                continue;
            } else {
                if (!visitA[nxA][nyA] && !visitB[nxB][nyB] && !arr[nxA][nyA].equals("#") && !arr[nxB][nyB].equals("#")) {
                    //두 동전 모두 움직이는 경우
                    visitA[nxA][nyA] = true;
                    visitB[nxB][nyB] = true;
                    dfs(cnt + 1, new int[][]{{nxA, nyA}, {nxB, nyB}});
                    visitA[nxA][nyA] = false;
                    visitB[nxB][nyB] = false;
                } else if ((visitA[nxA][nyA] || arr[nxA][nyA].equals("#")) &&
                        (!visitB[nxB][nyB] && !arr[nxB][nyB].equals("#")) &&
                        (nxB != coinA[0] || nyB != coinA[1])) {
                    //동전 B 만 움직이는 경우
                    visitB[nxB][nyB] = true;
                    dfs(cnt + 1, new int[][]{{coinA[0], coinA[1]}, {nxB, nyB}});
                    visitB[nxB][nyB] = false;
                } else if ((!visitA[nxA][nyA] && !arr[nxA][nyA].equals("#")) &&
                        (visitB[nxB][nyB] || arr[nxB][nyB].equals("#")) &&
                        (nxA != coinB[0] || nyA != coinB[1])) {
                    //동전 A 만 움직이는 경우
                    visitA[nxA][nyA] = true;
                    dfs(cnt + 1, new int[][]{{nxA, nyA}, {coinB[0], coinB[1]}});
                    visitA[nxA][nyA] = false;
                }
            }
        }
    }

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));

        String[] line = br.readLine().split(" ");
        N = Integer.parseInt(line[0]);
        M = Integer.parseInt(line[1]);
        arr = new String[N][M];
        visitA = new boolean[N][M];
        visitB = new boolean[N][M];
        coin = new int[2][2]; //동전 위치
        int coinIdx = 0;
        for (int i = 0; i < N; i++) {
            String input = br.readLine();
            for (int j = 0; j < M; j++) {
                String ch = String.valueOf(input.charAt(j));
                if (ch.equals("o")) {
                    coin[coinIdx] = new int[]{i, j};
                    coinIdx++;
                }
                arr[i][j] = ch;
            }
        }

        visitA[coin[0][0]][coin[0][1]] = true;
        visitB[coin[1][0]][coin[1][1]] = true;
        dfs(0, coin);

        bw.write(out + "\n");
        bw.flush();
    }
}