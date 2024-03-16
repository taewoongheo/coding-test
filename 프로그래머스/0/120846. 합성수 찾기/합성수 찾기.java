class Solution {
    
    public boolean check(int num) {
        for(int i = 2; i < num; i++) {
            if(num % i == 0) {
                return true;
            }
        }
        return false;
    }
    
    public int solution(int n) {
        
        int answer = 0;
        for(int i = 1; i <= n; i++) {
            if(check(i)) {
                answer += 1;
            }
        }
        
        return answer;
    }
}