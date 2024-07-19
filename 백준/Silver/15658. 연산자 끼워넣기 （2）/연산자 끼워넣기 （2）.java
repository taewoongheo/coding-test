import java.io.*;

public class Main {

    public static int N;
    public static int[] arr;
    public static int[] oper;
    public static boolean[] left;
    public static int max = Integer.MIN_VALUE;
    public static int min = Integer.MAX_VALUE;

    public static void dfs(int depth, int num) {
        if (depth == N) {
            max = Math.max(max, num);
            min = Math.min(min, num);
            return;
        }
        for (int i = 0; i < 4; i++) {
            if (left[i]) {
                int temp = num;
                switch(i) {
                    case 0: {
                        num += arr[depth];
                        break;
                    }
                    case 1: {
                        num -= arr[depth];
                        break;
                    }
                    case 2: {
                        num *= arr[depth];
                        break;
                    }
                    case 3: {
                        if (num < 0) {
                            num *= -1;
                            num /= arr[depth];
                            num *= -1;
                        } else {
                            num /= arr[depth];
                        }
                        break;
                    }
                }
                oper[i] -= 1;
                if (oper[i] == 0) {
                    left[i] = false;
                }
                dfs(depth + 1, num);
                num = temp;
                oper[i] += 1;
                left[i] = true;
            }
        }
    }

    public static void main(String[] args) throws IOException {

        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));

        N = Integer.parseInt(br.readLine());
        arr = new int[N];
        String[] line = br.readLine().split(" ");
        for (int i = 0; i < N; i++) {
            arr[i] = Integer.parseInt(line[i]);
        }

        line = br.readLine().split(" ");
        oper = new int[4];
        left = new boolean[4];
        for (int i = 0; i < 4; i++) {
            oper[i] = Integer.parseInt(line[i]);
            if (oper[i] != 0) {
                //연산자가 하나라도 존재하면
                left[i] = true;
            }
        }

        dfs(1, arr[0]);

        bw.write(max + "\n");
        bw.write(min + "\n");
        bw.flush();
    }
}
