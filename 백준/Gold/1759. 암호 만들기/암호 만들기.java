import java.io.*;
import java.util.Arrays;

public class Main {

    public static BufferedWriter bw;
    public static String[] arr;
    public static String[] result;
    public static boolean[] visited;
    public static int L;
    public static int C;

    public static boolean alphabetVerification() {
        int vowel = 0; //최소 1개
        int consonant = 0; //최소 2개
        for (int i = 0; i < L; i++) {
            switch (result[i]) {
                case "a":
                    vowel += 1;
                    continue;
                case "e":
                    vowel += 1;
                    continue;
                case "i":
                    vowel += 1;
                    continue;
                case "o":
                    vowel += 1;
                    continue;
                case "u":
                    vowel += 1;
                    continue;
            }
            consonant += 1;
        }
        if ((vowel >= 1) && (consonant >= 2)) {
            return true;
        }
        return false;
    }

    public static void bt(int depth, int start) throws IOException {
        if (depth == L) {
            if (alphabetVerification()) {
                for (int i = 0; i < L; i++) {
                    bw.write(result[i] + "");
                }
                bw.write("\n");
                return;
            }
            return;
        }
        for (int i = start; i < C; i++) {
            if (visited[i]) {
                continue;
            }
            visited[i] = true;
            result[depth] = arr[i];
            bt(depth + 1, i);
            visited[i] = false;
        }
    }

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        bw = new BufferedWriter(new OutputStreamWriter(System.out));

        String[] LC = br.readLine().split(" ");
        arr = br.readLine().split(" ");

        L = Integer.parseInt(LC[0]);
        C = Integer.parseInt(LC[1]);

        Arrays.sort(arr);

        result = new String[L];
        visited = new boolean[C];
        bt(0, 0);

        bw.flush();
    }
}