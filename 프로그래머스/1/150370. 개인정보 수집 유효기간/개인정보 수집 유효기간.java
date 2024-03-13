import java.util.*;

class Solution {
    public int[] solution(String today, String[] terms, String[] privacies) {
        ArrayList<Integer> out = new ArrayList<>();

        // 현재 날짜
        String current = today.replace(".", ""); // 'YYYYMMDD' 형식으로 변환
        
        Map<String, Integer> termInfo = new HashMap<>();
        for (String term : terms) {
            String[] t = term.split(" ");
            termInfo.put(t[0], Integer.parseInt(t[1]));
        }
        
        for (int i = 0; i < privacies.length; i++) {
            String[] privacy = privacies[i].split(" ");
            String date = privacy[0].replace(".", ""); // 'YYYYMMDD' 형식으로 변환
            String term = privacy[1];
            
            int monthInt = Integer.parseInt(date.substring(4, 6));
            int yearInt = Integer.parseInt(date.substring(0, 4));
            int day = Integer.parseInt(date.substring(6, 8));
            
            // 유효기간을 더함
            monthInt += termInfo.get(term);
            while (monthInt > 12) {
                yearInt += 1;
                monthInt -= 12;
            }
            
            // 파기해야 하는 날짜를 조정
            day -= 1;
            if (day == 0) {
                day = 28; // 모든 달을 28일로 가정
                if (monthInt == 1) {
                    monthInt = 12;
                    yearInt -= 1;
                } else {
                    monthInt -= 1;
                }
            }
            
            // 날짜 문자열 재구성
            String expiryDate = String.format("%04d%02d%02d", yearInt, monthInt, day);
            
            if (current.compareTo(expiryDate) > 0) {
                out.add(i + 1);
            }
        }
        
        // 출력 배열 생성
        return out.stream().mapToInt(Integer::intValue).toArray();
    }
}
