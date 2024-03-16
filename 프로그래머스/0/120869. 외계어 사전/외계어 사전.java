import java.util.*;

class Solution {
    public int solution(String[] spell, String[] dic) {
        
        for(int i = 0; i < dic.length; i++) {
            String[] word = dic[i].split("");
            boolean flag = true; // 결과 플래그
            boolean[] used = new boolean[spell.length]; //모두 사용하는지 여부 배열 초기화
            System.out.println(Arrays.toString(word));
            for(int j = 0; j < word.length; j++) { //단어 하나 검사 시작
                System.out.println("문자 검사 시작: "+word[j]);
                
                for(int k = 0; k < spell.length; k++) { //단어 하나의 "문자"에 대해 spell 하나하나 대조해봄
                    if (spell[k].equals(word[j]) && (used[k]==false)) { //아직 사용하지 않았거나, 일치하면 성공
                        System.out.println("사용: "+spell[k]);
                        used[k] = true;
                    }
                }
            }
            //성공했는가?
            for(int k = 0; k < spell.length; k++) {
                if(used[k] == false) {
                    flag = false;
                    break;
                }
            }
            if(flag==true) {
                return 1;
            }
        }
        
        return 2;
    }
}