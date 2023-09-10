import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;

public class Main {
    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        String[] input = br.readLine().split(" ");
        int N = Integer.parseInt(input[0]);
        int K = Integer.parseInt(input[1])-1;
        ArrayList<Integer> circle = new ArrayList<>();
        for (int i = 0; i < N; i++) {
            circle.add(i + 1);
        }
        int index = 0;
        StringBuilder sb = new StringBuilder();
        sb.append("<");
        while (true) {
            index += K;
            if (index >= N) {
                index = index % N;
            }
            if (N == 1) {
                sb.append(circle.get(index));
                break;
            }
            sb.append(circle.get(index)+", ");
            circle.remove(index); //여기서 N 줄어듦
            N = circle.size();
        }
        sb.append(">");
        System.out.println(sb);
    }
}
