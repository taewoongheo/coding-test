import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.LinkedList;
import java.util.Queue;

public class Main {

    public static ArrayList<ArrayList<int[]>> portLocation = new ArrayList<>();
    public static int[][] move = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};
    public static int N;
    public static int[][] map;
    public static boolean[][] visited;

    //섬 분류하기 - portLocation 완성
    public static void divideCountry(int[] location, ArrayList<int[]> land) {

        //bfs 로 탐색
        Queue<int[]> bfsQueue = new LinkedList<>();
        bfsQueue.add(location);
        visited[location[0]][location[1]] = false;
        while (!bfsQueue.isEmpty()) {
            int[] currentLocation = bfsQueue.poll();
            boolean findPort = false;
            for (int i = 0; i < 4; i++) {
                int nx = currentLocation[0] + move[i][0];
                int ny = currentLocation[1] + move[i][1];
                if((nx >= 0) && (nx < N) && (ny >= 0) && (ny < N)) {
                    if(map[nx][ny] == 0 && !findPort) {
                        land.add(new int[]{currentLocation[0], currentLocation[1]});
                        findPort = true;
                    }
                    if(visited[nx][ny]) {
                        bfsQueue.add(new int[]{nx, ny});
                        visited[nx][ny] = false;
                    }
                }
            }
        }
    }

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        N = Integer.parseInt(br.readLine());
        map = new int[N][N];
        visited = new boolean[N][N];
        for(int i = 0; i < N; i++) {
            String[] line = br.readLine().split(" ");
            for (int j = 0; j < N; j++) {
                map[i][j] = Integer.parseInt(line[j]);
                if (map[i][j] == 1) {
                    visited[i][j] = true;
                }
            }
        }

        for (int i = 0; i < N; i++) {
            for (int j = 0; j < N; j++) {
                if (visited[i][j]) { //새로운 땅 발견
                    int[] newLocation = new int[]{i, j};
                    ArrayList<int[]> newLand = new ArrayList<>();
                    divideCountry(newLocation, newLand);
                    portLocation.add(newLand);
                }
            }
        }

        int countryCnt = portLocation.size();
        int result = Integer.MAX_VALUE;
        for (int i = 0; i < countryCnt; i++) {
            for(int j = i+1; j < countryCnt; j++) {
                //나라 끼리 매칭(i, j)
                for (int k = 0; k < portLocation.get(i).size(); k++) {
                    for(int l = 0; l < portLocation.get(j).size(); l++) {
                        int[] countryA = portLocation.get(i).get(k);
                        int[] countryB = portLocation.get(j).get(l);
                        int dis = Math.abs(countryA[0] - countryB[0]) + Math.abs(countryA[1] - countryB[1]) - 1;
                        if (result > dis) {
                            result = dis;
                        }
                    }
                }
            }
        }
        System.out.println(result);
    }
}