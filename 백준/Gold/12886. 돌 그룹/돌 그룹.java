import java.io.*;
import java.util.*;

public class Main {

    public static class Group {
        int A, B;

        public Group(int A, int B) {
            this.A = A;
            this.B = B;
        }
    }

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));

        String[] line = br.readLine().split(" ");
        boolean[][] v = new boolean[1001][1001];
        int sum = 0;
        for (String input : line) {
            sum += Integer.parseInt(input);
        }
        if (sum % 3 != 0) {
            bw.write("0" + "\n");
            bw.flush();
            System.exit(0);
        }

        boolean isAnswer = false;
        Queue<Group> q = new LinkedList<>();
        int A = Integer.parseInt(line[0]);
        int B = Integer.parseInt(line[1]);
        q.add(new Group(A, B));
        v[A][B] = true;
        while (!q.isEmpty()) {
            Group g = q.poll();
            int a = g.A;
            int b = g.B;
            int c = sum - a - b;
            if (a == b && b == c) {
                isAnswer = true;
                break;
            }
            if (a != b) {
                int x = a > b ? a - b : a * 2;
                int y = b > a ? b - a : b * 2;
                if (x <= 1000 && y <= 1000 && !v[x][y]) {
                    v[x][y] = true;
                    v[y][x] = true;
                    q.offer(new Group(x, y));
                }
            }
            if (b != c) {
                int x = b > c ? b - c : b * 2;
                int y = c > b ? c - b : c * 2;
                if (x <= 1000 && y <= 1000 && !v[x][y]) {
                    v[x][y] = true;
                    v[y][x] = true;
                    q.offer(new Group(x, y));
                }
            }
            if (c != a) {
                int x = c > a ? c - a : c * 2;
                int y = a > c ? a - c : a * 2;
                if (x <= 1000 && y <= 1000 && !v[x][y]) {
                    v[x][y] = true;
                    v[y][x] = true;
                    q.offer(new Group(x, y));
                }
            }
        }
        if (isAnswer) {
            bw.write("1" + "\n");
        } else {
            bw.write("0" + "\n");
        }
        bw.flush();
    }
}