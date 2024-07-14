import java.io.*;
import java.util.Arrays;

public class Main {

    public static int K;
    public static boolean[] v = new boolean[10];
    public static String[] symbol;
    public static boolean first = false;
    public static String min, max;

    public static void bt(StringBuilder str, int depth) {
        if (depth == K) {
            if (!first) {
                min = str.toString();
                first = true;
            } else {
                max = str.toString();
            }
            return;
        }

        String item = symbol[depth];
        int lastNum = Integer.parseInt(str.substring(str.length() - 1));
        for (int i = 0; i < 10; i++) {
            if (!v[i]) {
                if ((item.equals("<") && lastNum < i) || (item.equals(">") && lastNum > i)) {
                    v[i] = true;
                    str.append(i);
                    bt(str, depth + 1);
                    str.deleteCharAt(str.length() - 1);  // 재귀 호출 후 원래 상태로 되돌리기
                    v[i] = false;
                }
            }
        }
    }

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));

        K = Integer.parseInt(br.readLine());
        symbol = new String[K];
        String[] line = br.readLine().split(" ");
        for (int i = 0; i < K; i++) {
            symbol[i] = line[i];
        }

        for (int i = 0; i < 10; i++) {
            v[i] = true;
            bt(new StringBuilder().append(i), 0);
            v[i] = false;
        }

        bw.write(max + "\n");
        bw.write(min + "\n");
        bw.flush();
    }
}