import java.io.*;
import java.util.ArrayList;

public class Main {

    public static int N;
    public static int[][] arr;
    public static int[] members;
    public static int result;
    public static boolean[] team;

    public static void calculate() {
        ArrayList<Integer> start = new ArrayList<>();
        ArrayList<Integer> link = new ArrayList<>();

        for (int i = 0; i < N; i++) {
            if (team[i]) {
                start.add(i);
            } else {
                link.add(i);
            }
        }

        int startScore = getScore(start);

        int linkScore = getScore(link);

        int cal = Math.abs(startScore - linkScore);
        if (cal < result) {
            result = cal;
        }
    }

    private static int getScore(ArrayList<Integer> team) {
        if (team.size() == 1) {
            return 0;
        }
        int score = 0;
        for (Integer i : team) {
            for (Integer j : team) {
                if (i == j) {
                    continue;
                }
                score += arr[i][j];
            }
        }
        return score;
    }

    public static void dfs(int depth, int last) {
        if (depth == N) {
            return;
        }
        for (int i = last; i < N; i++) {
            if (team[i]) {
                continue;
            }
            team[i] = true;
            last = members[i];
            calculate();
            dfs(depth + 1, last);
            team[i] = false;
        }
    }

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));

        N = Integer.parseInt(br.readLine());
        arr = new int[N][N];
        members = new int[N];
        for (int i = 0; i < N; i++) {
            String[] inputArr = br.readLine().split(" ");
            members[i] = i;
            for (int j = 0; j < N; j++) {
                arr[i][j] = Integer.parseInt(inputArr[j]);
            }
        }

        team = new boolean[N];
        result = Integer.MAX_VALUE;

        dfs(0, 0);

        bw.write(result + "\n");
        bw.flush();
    }
}
