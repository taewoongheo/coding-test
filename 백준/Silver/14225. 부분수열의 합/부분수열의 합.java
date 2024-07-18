import java.io.*;

public class Main {

    public static int N;
    public static int[] arr;
    public static boolean[] checkArr; //루프가 끝났는데 false 면 완성할 수 없는 수

    public static void dfs(int cur, int sum) {
        if (cur == N) {
            checkArr[sum] = true;
            return;
        }
        dfs(cur + 1, sum + arr[cur]);
        dfs(cur + 1, sum);
    }

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));

        N = Integer.parseInt(br.readLine());
        arr = new int[N];
        checkArr = new boolean[2000001];
        String[] line = br.readLine().split(" ");
        for (int i = 0; i < N; i++) {
            arr[i] = Integer.parseInt(line[i]);
        }

        dfs(0, 0);

        for (int i = 1; i < 2000001; i++) {
            if(!checkArr[i]) {
                bw.write(i + "\n");
                break;
            }
        }
        bw.flush();
    }
}
