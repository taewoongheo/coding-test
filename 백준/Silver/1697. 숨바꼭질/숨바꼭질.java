import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.LinkedList;
import java.util.Queue;
import java.util.Stack;

public class Main {

    public static int N, K;
    public static int out = Integer.MAX_VALUE;
    public static int[] dis;
    public static Queue<int[]> bfsQueue = new LinkedList<>();
    public static String[] oper = new String[]{"*", "+", "-"};

    public static void bt(int loc, int diff, int cnt) {

        bfsQueue.add(new int[]{loc, diff, cnt});
        while (!bfsQueue.isEmpty()) {
            int[] curInfo = bfsQueue.poll();
            int curLoc = curInfo[0];
            int curDiff = curInfo[1];
            int curCnt = curInfo[2];

            if ((curLoc == K) && (out > curCnt)) {
                out = curCnt;
            }

            if ((dis[curLoc] < curCnt) && (dis[curLoc] != 0)) {
                continue;
            }
            dis[curLoc] = curCnt;

            for (int i = 0; i < 3; i++) {
                String operator = oper[i];
                int dupliLoc = curLoc;

                if (operator.equals("+")) {
                    if (N > K) {
                        continue;
                    }
                    dupliLoc += 1;
                } else if (operator.equals("-")) {
                    dupliLoc -= 1;
                } else if (operator.equals("*")) {
                    if (N > K) {
                        continue;
                    }
                    dupliLoc *= 2;
                }

                int dupliLocDiff = Math.abs(dupliLoc - K);
                if (N > K) {
                    if (dupliLocDiff < K) {
                        if (curDiff < dupliLocDiff) {
                            continue;
                        }
                    }
                } else if (N < K) {
                    if (dupliLocDiff > K) {
                        if(curDiff > dupliLocDiff) {
                            continue;
                        }
                    }
                }

                if (dupliLoc < 0 || dupliLoc > 100000) {
                    continue;
                }

                bfsQueue.add(new int[]{dupliLoc, dupliLocDiff, curCnt + 1});
            }

        }
    }

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String[] line = br.readLine().split(" ");
        N = Integer.parseInt(line[0]);
        K = Integer.parseInt(line[1]);
        dis = new int[100001];

        bt(N, Math.abs(N - K), 0);

        System.out.println(out);
    }
}