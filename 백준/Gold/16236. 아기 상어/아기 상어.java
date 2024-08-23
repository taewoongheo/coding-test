import java.io.*;
import java.util.*;

public class Main {

    public static class BabyShark {
        int r, c, cnt, size, fish;

        public BabyShark(int r, int c, int cnt, int size, int fish) {
            this.r = r;
            this.c = c;
            this.cnt = cnt;
            this.size = size;
            this.fish = fish;
        }
    }

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));

        int N = Integer.parseInt(br.readLine());
        int[][] map = new int[N][N];
        boolean[][] v = new boolean[N][N];
        BabyShark bs = new BabyShark(0, 0, 0, 0, 0);
        for (int i = 0; i < N; i++) {
            String[] line = br.readLine().split(" ");
            for (int j = 0; j < N; j++) {
                if (line[j].equals("9")) {
                    bs = new BabyShark(i, j, 0, 2, 0);
                }
                map[i][j] = Integer.parseInt(line[j]);
            }
        }

        //bfs
        Queue<BabyShark> q = new LinkedList<>();
        ArrayList<BabyShark> eat = new ArrayList<>();
        q.add(bs);
        v[bs.r][bs.c] = true;
        map[bs.r][bs.c] = 0;
        int[][] m = {{0, 1}, {1, 0}, {0, -1}, {-1, 0}};
        int sCnt = 0;

        while (!q.isEmpty()) {

            int qSize = q.size();
            int lowRow = N;
            for (int k = 0; k < qSize; k++) {
                BabyShark s = q.poll();
                int r = s.r;
                int c = s.c;
                int cnt = s.cnt;

                for (int i = 0; i < 4; i++) {
                    int nr = r + m[i][0];
                    int nc = c + m[i][1];
                    int fish = s.fish;
                    int size = s.size;
                    if (nr < 0 || nr >= N || nc < 0 || nc >= N) {
                        continue;
                    }
                    if (map[nr][nc] != 0 && !v[nr][nc]) {
                        //먹을 수 있는 물고기
                        if (size > map[nr][nc]) {
                            fish += 1;
                            if (fish == size) {
                                //크기증가
                                size += 1;
                                fish = 0;
                            }
                            if (nr < lowRow) {
                                lowRow = nr;
                            }
                            v[nr][nc] = true;
                            eat.add(new BabyShark(nr, nc, cnt + 1, size, fish));
                        } else if (size == map[nr][nc]) {
                            v[nr][nc] = true;
                            q.offer(new BabyShark(nr, nc, cnt + 1, size, fish));
                        }
                    } else if (!v[nr][nc]) {
                        v[nr][nc] = true;
                        q.offer(new BabyShark(nr, nc, cnt + 1, size, fish));
                    }
                }
            }

            if (!eat.isEmpty()) {

                BabyShark nextBabyShark = new BabyShark(0, 0, 0, 0, 0);
                ArrayList<BabyShark> nsArr = new ArrayList<>();

                for (BabyShark s : eat) {
                    if (lowRow == s.r) {
                        nsArr.add(s);
                    }
                }

                if (nsArr.size() > 1) {
                    int lowLeft = N;
                    for (BabyShark s : nsArr) {
                        if (s.c < lowLeft) {
                            lowLeft = s.c;
                            nextBabyShark = s;
                        }
                    }
                } else {
                    nextBabyShark = nsArr.get(0);
                }

                map[nextBabyShark.r][nextBabyShark.c] = 0;
                q = new LinkedList<>();
                eat = new ArrayList<>();
                v = new boolean[N][N];
                q.add(nextBabyShark);
                v[nextBabyShark.r][nextBabyShark.c] = true;
                sCnt = nextBabyShark.cnt;
            }
        }

        bw.write(sCnt + "\n");
        bw.flush();
    }
}