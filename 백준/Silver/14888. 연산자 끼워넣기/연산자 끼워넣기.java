import java.io.*;

public class Main {

    public static int max = Integer.MIN_VALUE;
    public static int min = Integer.MAX_VALUE;

    public static void bt(int depth, int[] num, int N, int cal, int[] operator) {
        if (depth == N) { // 끝 도달. max와 min이랑 비교해서 최댓값 최솟값 찾기
            if (cal > max) {
                max = cal;
            }
            if (cal < min) {
                min = cal;
            }
            return;
        }

        for (int i = 0; i < 4; i++) {
            if (operator[i] > 0) {
                int temp = cal; // 현재 연산 결과 임시 저장
                switch (i) { // 연산자에 따라 계산
                    case 0:
                        cal += num[depth];
                        break;
                    case 1:
                        cal -= num[depth];
                        break;
                    case 2:
                        cal *= num[depth];
                        break;
                    case 3:
                        int inputNum = num[depth];
                        if (inputNum < 0) {
                            cal = cal / (inputNum * -1);
                            cal *= -1;
                        } else {
                            cal = cal / inputNum;
                        }
                        break;
                }

                operator[i]--;
                bt(depth + 1, num, N, cal, operator);
                // 백트래킹: 재귀 호출 이후 원래의 연산 결과로 복구
                cal = temp;
                operator[i]++;
            }
        }
    }

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));

        int N = Integer.parseInt(br.readLine());
        String[] inputNum = br.readLine().split(" ");
        String[] inputOper = br.readLine().split(" ");
        int[] num = new int[N];
        int[] operator = new int[4];
        for (int i = 0; i < N; i++) {
            num[i] = Integer.parseInt(inputNum[i]);
        }

        int cal = num[0];
        for (int i = 0; i < 4; i++) {
            operator[i] = Integer.parseInt(inputOper[i]);
        }

        bt(1, num, N, cal, operator);

        bw.write(max + "\n");
        bw.write(min + "\n");
        bw.flush();
    }
}
