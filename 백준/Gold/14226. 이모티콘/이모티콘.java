import java.io.*;
import java.util.*;

public class Main {

	public static class Emo {
		public int num, time, clipboard;
		public Emo(int num, int clipboard, int time) {
			this.num = num;
			this.clipboard = clipboard;
			this.time = time;
		}
	}

	public static void main(String[] args) throws IOException {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));

		int S = Integer.parseInt(br.readLine());
		boolean[][] v = new boolean[2001][2001]; //[이모티콘 수][클립보드 수]

		//bfs
		Emo emo = new Emo(1, 0, 0);
		Queue<Emo> q = new LinkedList<>();
		q.offer(emo);
		v[1][0] = true;

		while (!q.isEmpty()) {
			Emo cur = q.poll();
			int n = cur.num;
			int c = cur.clipboard;
			int t = cur.time;

			if (n == S) {
				bw.write(t + "\n");
				break;
			}

			if (n > 0 && n < 2001) {
				if (!v[n][n]) {
					v[n][n] = true;
					q.offer(new Emo(n, n, t + 1));
				}
			}

			if (n > 0) {
				if (!v[n - 1][n]) {
					v[n - 1][n] = true;
					q.offer(new Emo(n - 1, c, t + 1));
				}
			}

			if (c != 0 && n + c < 2001) {
				if (!v[n + c][c]) {
					v[n + c][c] = true;
					q.offer(new Emo(n + c, c, t + 1));
				}
			}
		}

		bw.flush();
	}
}