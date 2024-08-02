import java.io.*;

public class Main {

    public static int N, K, ans;
    public static String[] words; //입력받은 단어배열
    public static boolean[] alphabet; //각 알파벳 사용여부
    public static void dfs(int cnt, int idx) {
        if (cnt == K) {
            int temp = 0;
            for (String word : words) {
                if (canRead(word)) {
                    temp += 1;
                }
            }
            ans = Math.max(ans, temp);
            return;
        }
        for (int i = 0; i < 26; i++) {
            char ch = (char) ('a' + i);
            if (!alphabet[i] && i > idx) {
                alphabet[i] = true;
                dfs(cnt + 1, i);
                alphabet[i] = false;
            }
        }
    }

    public static boolean canRead(String word) {
        for (int i = 4; i < word.length() - 4; i++) {
            if (!alphabet[word.charAt(i) - 97]) {
                return false;
            }
        }
        return true;
    }

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));

        String[] line = br.readLine().split(" ");
        N = Integer.parseInt(line[0]);
        K = Integer.parseInt(line[1]);
        if (K < 5) {
            bw.write(0 + "\n");
            bw.flush();
            System.exit(0);
        }

        alphabet = new boolean[26];
        char[] requiredAlphabet = {'a', 'n', 't', 'c', 'i'};
        for (char c : requiredAlphabet) {
            alphabet[c - 97] = true;
        }

        words = new String[N];
        for (int i = 0; i < N; i++) {
            words[i] = br.readLine();

        }

        dfs(5, 0);
        bw.write(ans + "\n");
        bw.flush();
    }
}
