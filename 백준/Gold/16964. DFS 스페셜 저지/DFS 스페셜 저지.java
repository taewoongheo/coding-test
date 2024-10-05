import java.io.*;
import java.util.*;

public class Main {

	public static int N;
	public static Map<Integer, ArrayList<Integer>> g;
	public static int[] arr;
	public static boolean[] v;
	public static int idx = 2;

	public static boolean dfs(int node) {

		HashSet<Integer> set = new HashSet<>();
		for (Integer n : g.get(node)) {
			if (!v[n]) {
				v[n] = true;
				set.add(n);
			}
		}

		while (!set.isEmpty()) {
			int cNode = arr[idx];
			if (set.contains(cNode)) {
				set.remove(cNode);
				idx++;
				if (!dfs(cNode)) {
					return false;
				}
			} else {
				return false;
			}
		}

		return true;
	}

	public static void main(String[] args) throws IOException {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));

		N = Integer.parseInt(br.readLine());
		arr = new int[N + 1];
		v = new boolean[N + 1];
		g = new HashMap<>();
		for (int i = 0; i < N; i++) {
			g.put(i + 1, new ArrayList<>());
		}
		for (int i = 0; i < N - 1; i++) {
			String[] line = br.readLine().split(" ");
			int node1 = Integer.parseInt(line[0]);
			int node2 = Integer.parseInt(line[1]);
			g.get(node1).add(node2);
			g.get(node2).add(node1);
		}
		String[] line = br.readLine().split(" ");
		for (int i = 0; i < N; i++) {
			arr[i + 1] = Integer.parseInt(line[i]);
		}
		if (arr[1] != 1) {
			bw.write("0\n");
			bw.flush();
			System.exit(0);
		}
		v[1] = true;
		if (dfs(1)) {
			bw.write("1\n");
		} else {
			bw.write("0\n");
		}
		bw.flush();
	}
}