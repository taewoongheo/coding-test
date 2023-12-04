import java.io.*;

public class Main {

    public static int max = Integer.MIN_VALUE;

    public static int min = Integer.MAX_VALUE;

    public static void bt(int depth, int[] num, int N, int cal, int[] operator, int oper) {

        switch (oper) { //연산자에 따라 계산
            case 0:
                // +
                cal += num[depth];
                break;
            case 1:
                // -
                cal -= num[depth];
                break;
            case 2:
                // x
                cal *= num[depth];
                break;
            case 3:
                // %
                int inputNum = num[depth];
                if (inputNum < 0) {
                    cal = cal / (inputNum * -1);
                    cal *= -1;
                } else {
                    cal = cal / inputNum;
                }
                break;
        }
        operator[oper]--;

        if(depth == N-1) { //끝 도달. max와 min이랑 비교해서 최댓값 최솟값 찾기
            if (cal > max) {
                max = cal;
            }
            if (cal < min) {
                min = cal;
            }
        }

        for (int i = 0; i < 4; i++) {
            
            if (operator[i] == 0) {
                continue;
            }
            bt(depth + 1, num, N, cal, operator, i);
            operator[i]++;
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
            for (int j = 0; j < 4; j++) { //oper 연산자 개수 초기화
                operator[j] = Integer.parseInt(inputOper[j]);
            }
            if (operator[i] == 0) {
                continue;
            }
            bt(1, num, N, cal, operator, i); //4개의 연산자에 대해 모두 돌려야 함
        }

        bw.write(max+"\n");
        bw.write(min+"\n");
        bw.flush();
    }
}
