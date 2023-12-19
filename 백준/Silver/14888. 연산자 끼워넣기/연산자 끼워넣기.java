import java.io.*;

public class Main {

    public static int max = Integer.MIN_VALUE;
    public static int min = Integer.MAX_VALUE;

    public static void bt(int depth, int[] num, int N, int cal, int[] operator) {
        if (depth == N) { //깊이(depth)가 맨 아래(N)까지 들어오면 최소, 최댓값 갱신
            if (cal > max) {
                max = cal;
            }
            if (cal < min) {
                min = cal;
            }
            return;
        }

        for (int i = 0; i < 4; i++) {
            if (operator[i] > 0) { //pruning. 연산자의 개수가 1개 이상일 때만 통과
                int temp = cal; //현재 레벨의 계산값 저장
                switch (i) {
                    case 0: //+
                        cal += num[depth];
                        break;
                    case 1: //-
                        cal -= num[depth];
                        break;
                    case 2: //*
                        cal *= num[depth];
                        break;
                    case 3: //÷
                        int inputNum = num[depth];
                        if (inputNum < 0) {
                            cal = cal / (inputNum * -1);
                            cal *= -1;
                        } else {
                            cal = cal / inputNum;
                        }
                        break;
                }

                operator[i]--; //사용한 연산자 개수 하나 뺌
                bt(depth + 1, num, N, cal, operator);
                cal = temp; //값 복구
                operator[i]++; //연산자 배열 값 복구
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

        int cal = num[0]; //cal=계산한 값을 저장
        for (int i = 0; i < 4; i++) {
            operator[i] = Integer.parseInt(inputOper[i]); //연산자 개수 초기화
        }

        bt(1, num, N, cal, operator);

        bw.write(max + "\n");
        bw.write(min + "\n");
        bw.flush();
    }
}