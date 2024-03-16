import java.util.*;

class Solution {
    public int solution(String s) {
        String[] inputStr = s.split(" ");
        
        ArrayList<String> stack = new ArrayList<>();
        
        for(int i = 0; i < inputStr.length; i++) {
            String elem = inputStr[i];
            if(elem.equals("Z")) {
                stack.remove(stack.size() - 1);
                continue;
            }
            stack.add(elem);
        }
        
        int sum = 0; 
        for(int i = 0; i < stack.size(); i++) {
            sum += Integer.parseInt(stack.get(i));
        }
        
        return sum;
    }
}