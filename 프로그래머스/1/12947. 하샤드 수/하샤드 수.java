class Solution {
    public boolean solution(int x) {
        
        String num = String.valueOf(x);
        
        int divideNum = 0;
        for(int i = 0; i < num.length(); i++) {
            divideNum += Integer.parseInt(String.valueOf(num.charAt(i)));
        }
        System.out.println(divideNum);
        if(x % divideNum == 0) {
            return true;
        }
        
        return false;
    }
}