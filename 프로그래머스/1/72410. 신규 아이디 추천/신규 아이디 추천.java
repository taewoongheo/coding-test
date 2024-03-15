class Solution {
    public String solution(String new_id) {
        String answer = "";
        
        String notPossible = "~!@#$%^&*()=+[{]}:?,<>/";
        
        int idLength = new_id.length();
        
        //1단계
        String lowerId = new_id.toLowerCase();
        System.out.println("1단계: "+lowerId);
        
        //2단계
        String possible = "";
        for(int i = 0; i < idLength; i++) {
            String ch = String.valueOf(lowerId.charAt(i));
            if(notPossible.contains(ch)) {
                continue; 
            }
            possible += ch;
        }
        System.out.println("2단계: "+possible);
        
        //3단계
        StringBuffer dupliDot = new StringBuffer();
        String last = String.valueOf(possible.charAt(0));
        dupliDot.append(last);
        for(int i = 1; i < possible.length(); i++) {
            String ch = String.valueOf(possible.charAt(i));
            if((last.equals(".")) && (ch.equals("."))) {
                continue;
            }
            dupliDot.append(ch);
            last = ch;
        }
        System.out.println("3단계: "+dupliDot);
        
        //4단계
        if (dupliDot.length() > 0 && String.valueOf(dupliDot.charAt(0)).equals(".")) {
            dupliDot.deleteCharAt(0);
        }
        if (dupliDot.length() > 0 && String.valueOf(dupliDot.charAt(dupliDot.length() - 1)).equals(".")) {
            dupliDot.deleteCharAt(dupliDot.length() - 1);
        }
        System.out.println("4단계: "+dupliDot);
        
        //5단계
        if(dupliDot.length() == 0) {
            dupliDot.append("a");
        }
        System.out.println("5단계: "+dupliDot);
        
        // 6단계
        String maxLengthStr = String.valueOf(dupliDot);
        if (dupliDot.length() > 15) {
            maxLengthStr = dupliDot.substring(0, 15);
            if (maxLengthStr.endsWith(".")) {
                maxLengthStr = maxLengthStr.substring(0, maxLengthStr.length() - 1);
            }
        }
        System.out.println("6단계: "+maxLengthStr);

        //7단계
        if(maxLengthStr.length() <= 2) {
            String lastCh = String.valueOf(maxLengthStr.charAt(maxLengthStr.length() - 1));
            while (true) {
                if(maxLengthStr.length() >= 3) {
                    break;
                }
                maxLengthStr += lastCh;
            }
        }
        System.out.println("7단계: "+maxLengthStr);
        
        return maxLengthStr;
    }
}