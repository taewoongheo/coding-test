import java.io.*;
import java.util.StringTokenizer;

public class Main {

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));

        int N = Integer.parseInt(br.readLine());

        for (int i = 0; i < N; i++) {
            StringBuilder sb = new StringBuilder();
            StringTokenizer st = new StringTokenizer(br.readLine());

            while (st.hasMoreTokens()) {
                StringBuilder word_sb = new StringBuilder();
                String word = st.nextToken();
                int word_length = word.length();
                for (int j = 0; j < word_length; j++) {
                    word_sb.append(word.charAt(j));
                }
                word_sb.reverse();
                word_sb.append(" ");
                sb.append(word_sb);
            }
            bw.write(String.valueOf(sb)+"\n");
            bw.flush();
        }
    }
}
