import java.util.Arrays;

class Solution {
    public int solution(String[] friends, String[] gifts) {
        int answer = 0;
        
        int friendsSize = friends.length;
        int giftsSize = gifts.length;
        
        int[][] present = new int[friendsSize][friendsSize];
        
        //테이블완성
        for(int i = 0; i < giftsSize; i++) {
            String[] givesPresent = gifts[i].split(" ");
            String give = givesPresent[0];
            String receive = givesPresent[1];
            int x = 0;
            int y = 0;
            for(int j = 0; j < friendsSize; j++) {
                if (friends[j].equals(give)) {
                    x = j;
                }
                if (friends[j].equals(receive)) {
                    y = j;
                }
            }
            present[x][y]++;
        }
        
        for(int i = 0; i < friendsSize; i++) {
            for(int j = 0; j < friendsSize; j++) {
                System.out.print(present[i][j] + " ");
            }
            System.out.println();
        }
        
        //선물지수 계산
        int[] presentCal = new int[friendsSize];
        //준 선물 루프(+)
        for(int i = 0; i < friendsSize; i++) {
            for(int j = 0; j < friendsSize; j++) {
                presentCal[i] += present[i][j];
            }
        }
        //받은 선물 루프(-)
        for(int i = 0; i < friendsSize; i++) {
            for(int j = 0; j < friendsSize; j++) {
                presentCal[i] -= present[j][i];
            }
        }
        System.out.println(Arrays.toString(presentCal));
        
        //선물 계산
        int[] result = new int[friendsSize];
        for(int i = 0; i < friendsSize; i++) {
            for(int j = 0; j < friendsSize; j++) {
                if (i==j) {
                    continue;
                }
                //준 선물이 더 많다면
                if (present[i][j] > present[j][i]) {
                    result[i]++;
                } else if(present[i][j] == present[j][i]) {
                    //만약 주고받은 선물의 개수가 같다면, 선물 지수를 확인
                    if (presentCal[i] > presentCal[j]) {
                        result[i]++;
                    }
                }
            }
            if (result[i] > answer) {
                answer = result[i];
            }
        }
        
        return answer;
    }
}