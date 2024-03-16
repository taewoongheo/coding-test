class Solution {
    public String solution(String[] cards1, String[] cards2, String[] goal) {
        
        int cards1Idx = 0;
        int cards2Idx = 0;
        for(int i = 0; i < goal.length; i++) {
            String word = goal[i];
            System.out.println(word);
            
            if(cards1Idx < cards1.length) {
                if(cards1[cards1Idx].equals(word)) {
                    cards1Idx += 1;
                    continue;
                }   
            }
            if(cards2Idx < cards2.length) {
                if(cards2[cards2Idx].equals(word)) {
                    cards2Idx += 1;
                    continue;
                }
            }
            
            return "No";
        }
        
        return "Yes";
    }
}