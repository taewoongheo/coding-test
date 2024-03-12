import java.util.*;

class Solution {
    public int[] solution(String[] id_list, String[] report, int k) {
        
        int[] answer = new int[id_list.length];
        int[][] board = new int[id_list.length+1][id_list.length];
        Map<String, Integer> userIdx = new HashMap<>();
        
        for(int i = 0; i < id_list.length; i++) {
            userIdx.put(id_list[i], i);
        }
        
        for(int i = 0; i < report.length; i++) {
            String[] rep = report[i].split(" ");
            String reporter = rep[0];
            String reported = rep[1];
            if(board[userIdx.get(reporter)][userIdx.get(reported)] == 0) {
                board[userIdx.get(reporter)][userIdx.get(reported)]++;
                board[id_list.length][userIdx.get(reported)]++;
            }
        }
    
        
        for(int i = 0; i < id_list.length; i++) {
            for(int j = 0; j < id_list.length; j++) {
                if(board[i][j] != 0) {
                    if (board[id_list.length][j] >= k) {
                        answer[i]++;
                    }
                }
            }
        }
        
        return answer;
    }
}