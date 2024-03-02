import java.io.*;
import java.util.ArrayList;

public class Main {

    public static ArrayList<Integer> arr = new ArrayList<>();

    public static boolean check(int num) {
        return arr.contains(num);
    }

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));

        int N = Integer.parseInt(br.readLine());
        for (int i = 0; i < N; i++) {
            String[] input = br.readLine().split(" ");
            String command = input[0];

            if (command.equals("all")) {
                arr = new ArrayList<>();
                for (int j = 1; j <= 20; j++) {
                    arr.add(j);
                }
                continue;
            } else if (command.equals("empty")) {
                arr = new ArrayList<>();
                continue;
            }

            int num = Integer.parseInt(input[1]);
            if (command.equals("add")) {
                if (!check(num)) {
                    arr.add(num);
                }
            } else if (command.equals("remove")) {
                for (int j = 0; j < arr.size(); j++) {
                    if (num == arr.get(j)) {
                        arr.remove(j);
                    }
                }
            } else if (command.equals("check")) {
                if (check(num)) {
                    bw.write(1 + "\n");
                } else {
                    bw.write(0 + "\n");
                }
            } else if (command.equals("toggle")) {
                if (check(num)) {
                    for (int j = 0; j < arr.size(); j++) {
                        if (num == arr.get(j)) {
                            arr.remove(j);
                        }
                    }
                } else {
                    arr.add(num);
                }
            }
        }
        
        bw.flush();
    }
}
