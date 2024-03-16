class Solution {
    public int solution(int[] sides) {
        
        int answer = 0;
        int big = Math.max(sides[0], sides[1]);
        int small = Math.min(sides[0], sides[1]);
        
        int start = big-small+1;
        answer += big-start+1;
        
        int otherBig = small-1;
        answer += otherBig;
        
        return answer;
    }
}