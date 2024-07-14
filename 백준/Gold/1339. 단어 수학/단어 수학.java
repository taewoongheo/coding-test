import java.io.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;

public class Main {

    public static int K, size;
    public static ArrayList<String> wordArr = new ArrayList<>();
    public static HashMap<String, Integer> idxMap = new HashMap<>();
    public static int[] arr; //숫자저장배열
    public static int[] numArr; //실제 사용할 숫자배열
    public static boolean[] v;
    public static String[] input;
    public static int out;

    public static void makeNum(int depth) {
        if (depth == size) {
            int result = 0;
            for (int i = 0; i < K; i++) {
                String word = input[i];
                int sum = 0;
                for (int j = 0; j < word.length(); j++) {
                    String key = String.valueOf(word.charAt(j));
                    int idx = idxMap.get(key);
                    int value = numArr[idx];
                    sum += value;
                    if (j != word.length() - 1) {
                       sum *= 10;
                    }
                }
                result += sum;
            }

            out = Math.max(out, result);
            return;
        }
        for (int i = 0; i < arr.length; i++) {
            if (!v[i]) {
                int item = arr[i];
                numArr[depth] = item;
                v[i] = true;
                makeNum(depth + 1);
                v[i] = false;
            }
        }
    }

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));

        K = Integer.parseInt(br.readLine());
        input = new String[K];
        for (int i = 0; i < K; i++) {
            String word = br.readLine();
            input[i] = word;
            for (int j = 0; j < word.length(); j++) {
                String w = String.valueOf(word.charAt(j));
                if(!idxMap.containsKey(w)) {
                    idxMap.put(w, 0);
                    wordArr.add(w);
                }
            }
        }

        size = wordArr.size();

        for (int i = 0; i < size; i++) {
            idxMap.put(wordArr.get(i), i);
        }

        arr = new int[size];
        for (int i = 0; i < size; i++) {
            arr[i] = 9 - i;
        }

        numArr = new int[size];
        v = new boolean[size];
        makeNum(0);

        bw.write(out + "\n");
        bw.flush();
    }
}
