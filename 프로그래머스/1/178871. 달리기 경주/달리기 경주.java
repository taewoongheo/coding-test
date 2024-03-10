import java.util.*;

class Solution {
    public String[] solution(String[] players, String[] callings) {
        String[] answer = {};
        
        //callings 배열을 순서대로 돌면서 players 인덱스의 i 와 i-1 의 위치를 바꾸면 됨
        int callSize = callings.length;
        int playerSize = players.length;
        
        Map<String, Integer> map = new HashMap<>();
        
        for(int i = 0; i < playerSize; i++) {
            map.put(players[i], i);
        }
        
        for(int i = 0; i < callSize; i++) {
            String call = callings[i];
            int fastIdx = map.get(call);
            String tempPlayer = players[fastIdx-1];
            players[fastIdx-1] = call;
            players[fastIdx] = tempPlayer;
            map.replace(call, fastIdx-1);
            map.replace(tempPlayer, fastIdx);
        }
        
        answer = players;
        
        return answer;
    }
}