import java.util.*;

class Solution {
    public int solution(int[][] sizes) {
        int answer = 0;
        //2차원 배열을 순회하면서 현재 가로 or 세로 길이 보다 더 큰 값을 만나면 해당 값으로 갱신하면 됨. 
        //이때 0, 1(가로, 세로) 값은 신경 안씀. 
        //루프를 두 번 돌려야 됨. -> 가로, 세로
        
        for(int i = 0; i < sizes.length; i++) {
            int width = Math.max(sizes[i][0], sizes[i][1]);
            int height = Math.min(sizes[i][0], sizes[i][1]);
            sizes[i][0] = width;
            sizes[i][1] = height;
        }
        
        int w = Integer.MIN_VALUE;
        int h = Integer.MIN_VALUE;
        for(int i = 0; i < sizes.length; i++) {
            if (sizes[i][0] > w) {
                w = sizes[i][0];
            }
            if (sizes[i][1] > h) {
                h = sizes[i][1];
            }
        }
        
        return w*h;
    }
}