import java.io.*;

public class Main {

    public static int N, K;
    public static int[] arr;
    public static boolean[] checkArr; //루프가 끝났는데 false 면 완성할 수 없는 수
    public static boolean[] v;

    public static void bt(int digit, int num, int curIdx) {
        if (digit == K) {
            checkArr[num] = true;
            return;
        }
        for (int i = 0; i < N; i++) {
            if (!v[i] && curIdx <= i) {
                v[i] = true;
                bt(digit + 1, num + arr[i], i);
                v[i] = false;
            }
        }
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

        for (int i = 0; i < N; i++) {
            K = i + 1; //만들어야 하는 자릿수
            v = new boolean[N];
            bt(0, 0, 0);
        }

        for (int i = 1; i < 2000001; i++) {
            if(!checkArr[i]) {
                bw.write(i + "\n");
                break;
            }
        }
        bw.flush();
    }
}
