import java.io.*;
import java.util.*;

public class Main {

	public static int N;
	public static int[] arr;
	public static int idx = 2;
	public static Map<Integer, ArrayList<Integer>> g;
	public static boolean[] v;

	public static boolean dfs(int node) {
		HashSet<Integer> set = new HashSet<>();
		for (Integer n : g.get(node)) {
			if (!v[n]) { //아직 방문하지 않은 노드면 set 에 넣음.
				set.add(n);
				v[n] = true;
			}
		}
		while (!set.isEmpty()) {
			int nNode = arr[idx]; //다음에 갈 노드
			if (set.contains(nNode)) { //현재 set 에 포함여부 = 현재 노드와 이웃해 있는지 여부
				set.remove(nNode);
				idx++;
				if (!dfs(nNode)) {
					return false;
				}
			} else { //만약 현재 노드와 이웃해있지 않다면 false 임.
				return false;
			}
		}
		return true;
	}

	public static void main(String[] args) throws IOException {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
		BufferedWriter bw = new BufferedWriter(new OutputStreamWriter(System.out));

		N = Integer.parseInt(br.readLine());
		g = new HashMap<>();
		for (int i = 1; i <= N; i++) {
			g.put(i, new ArrayList<>());
		}
		for (int i = 0; i < N - 1; i++) {
			String[] line = br.readLine().split(" ");
			int node1 = Integer.parseInt(line[0]);
			int node2 = Integer.parseInt(line[1]);
			g.get(node1).add(node2);
			g.get(node2).add(node1);
		}
		arr = new int[N + 1];
		v = new boolean[N + 1];
		String[] input = br.readLine().split(" ");
		for (int i = 1; i <= N; i++) {
			arr[i] = Integer.parseInt(input[i - 1]);
		}

		if (arr[1] != 1) {
			//첫번째 수가 1 이 아니면 0 출력
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