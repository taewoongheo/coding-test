import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.LinkedList;
import java.util.Queue;

public class Main {

    public static int s;
    public static boolean[][] v;

    public static class Emo {
        public int num;
        public int clipboard;
        public int time;
        public Emo(int num, int clipboard, int time) {
            this.num = num;
            this.clipboard = clipboard;
            this.time = time;
        }
    }

    public static void bfs() {
        Queue<Emo> q = new LinkedList<>();
        v = new boolean[2001][2001];

        q.offer(new Emo(1, 0, 0));
        while(!q.isEmpty()) {
            Emo cur = q.poll();
            int n = cur.num;
            int c = cur.clipboard;
            int t = cur.time;

            if (n == s) {
                System.out.println(t);
                return;
            }

            if (n > 0 && n < 2000) {
                if (!v[n][n]) {
                    v[n][n] = true;
                    q.offer(new Emo(n, n, t + 1));
                }

                if (!v[n - 1][c]) {
                    v[n - 1][c] = true;
                    q.offer(new Emo(n - 1, c, t + 1));
                }
            }

            if (n > 0 && n + c < 2000) {
                if (!v[n + c][c]) {
                    v[n + c][c] = true;
                    q.offer(new Emo(n + c, c, t + 1));
                }
            }
        }
    }

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        s = Integer.parseInt(br.readLine());

        bfs();
    }
}