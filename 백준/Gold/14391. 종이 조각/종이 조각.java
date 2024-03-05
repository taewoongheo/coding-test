import java.util.*;
import java.io.*;

public class Main {
    public static int N,M;
    public static int[][] paper;

    public static void main(String[] args) throws Exception{
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());
        N = Integer.parseInt(st.nextToken());
        M = Integer.parseInt(st.nextToken());
        paper = new int[N][M];

        for(int i=0; i<N; i++) {
            String str = br.readLine();
            for(int j=0; j<M; j++) {
                paper[i][j] = str.charAt(j) - '0';
            }
        }

        int ans = 0;

        for (int s = 0; s < (1<<N*M); s++) {
            //가로
            int sum = 0;
            for (int i = 0; i < N; i++) {
                int cur = 0;
                for (int j = 0; j < M; j++) {
                    int k = i * M + j;
                    if ((s & (1 << k)) == 0) {
                        cur *= 10;
                        cur += paper[i][j];
                    } else {
                        sum += cur;
                        cur = 0;
                    }
                }
                sum += cur;
            }

            //세로
            for (int j = 0; j < M; j++) {
                int cur = 0;
                for (int i = 0; i < N; i++) {
                    int k = i*M +j;
                    if ((s & (1 << k)) != 0) {
                        cur *= 10;
                        cur += paper[i][j];
                    } else {
                        sum += cur;
                        cur = 0;
                    }
                }
                sum += cur;
            }
            ans = Math.max(ans, sum);
        }

        System.out.println(ans);
    }

}
