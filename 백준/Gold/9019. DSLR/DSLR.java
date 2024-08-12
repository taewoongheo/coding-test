import java.io.*;
import java.util.*;

public class Main {

    public static int goalNum;
    public static StringBuilder[] v;
    public static String[] oper;

    public static StringBuilder bfs(Integer num) {
        Queue<Integer> q = new LinkedList<>();
        q.add(num);
        v[num] = new StringBuilder("0");
        while (!q.isEmpty()) {
            int curNum = q.poll();
            StringBuilder operations = v[curNum];
            for (int i = 0; i < 4; i++) {
                int newNum = curNum;
                StringBuilder newOper = new StringBuilder(operations.toString());
                switch (i) {
                    case 0: {
                        //D
                        newNum *= 2;
                        if (newNum > 9999) {
                            newNum %= 10000;
                        }
                        break;
                    }
                    case 1: {
                        //S
                        newNum -= 1;
                        if (newNum < 0) {
                            newNum = 9999;
                        }
                        break;
                    }
                    case 2: {
                        //L
                        newNum *= 10;
                        if (newNum >= 10000) {
                            int leftNum = newNum / 10000;
                            newNum %= 10000;
                            newNum += leftNum;
                        }
                        break;
                    }
                    case 3: {
                        //R
                        int rightNum = newNum % 10 * 1000;
                        newNum /= 10;
                        newNum += rightNum;
                        break;
                    }
                }
                StringBuilder newOperations = newOper.append(oper[i]);
                if (newNum == goalNum) {
                    return newOperations;
                }
                if (v[newNum] == null) {
                    v[newNum] = newOperations;
                    q.add(newNum);
                }
            }
        }
        return new StringBuilder("0");
    }

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));

        oper = new String[]{"D", "S", "L", "R"};

        int N = Integer.parseInt(br.readLine());
        for (int i = 0; i < N; i++) {
            String[] line = br.readLine().split(" ");
            int num = Integer.parseInt(line[0]);
            goalNum = Integer.parseInt(line[1]);
            v = new StringBuilder[10001];
            StringBuilder ans = bfs(num);
            bw.write(ans.substring(1) + "");
            bw.write("\n");
        }
        bw.flush();
    }
}