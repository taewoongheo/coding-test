import java.util.*;

class Solution {
    public int[][] solution(int[][] data, String ext, int val_ext, String sort_by) {
        
        int extIdx = 0;
        if (ext.equals("code")) {
            extIdx = 0;
        } else if(ext.equals("date")) {
            extIdx = 1;
        } else if(ext.equals("maximum")) {
            extIdx = 2;
        } else if(ext.equals("remain")) {
            extIdx = 3;
        }
        
        int sortByIdx = 0;
        if (sort_by.equals("code")) {
            sortByIdx = 0;
        } else if(sort_by.equals("date")) {
            sortByIdx = 1;
        } else if(sort_by.equals("maximum")) {
            sortByIdx = 2;
        } else if(sort_by.equals("remain")) {
            sortByIdx = 3;
        }
        
        Map<Integer, Integer> idxInfo = new HashMap<>(); //data 에서 어떤 인덱스를 갖는지
        ArrayList<Integer> arr = new ArrayList<>(); //ext 로 걸러진 idx 모음
        for(int i = 0; i < data.length; i++) {
            int dataVal = data[i][extIdx];
            if(dataVal < val_ext) {
                idxInfo.put(dataVal, i);
                arr.add(i);
            }
        }
        
        System.out.println(arr.size());
        boolean complete = false;
        while (true) {
            if(complete) {
                break;
            }
            complete = true;
            for(int i = 0; i < arr.size()-1; i++) {
                int stdNum = data[arr.get(i)][sortByIdx];
                int diffNum = data[arr.get(i+1)][sortByIdx];
                if(stdNum > diffNum) {
                    Collections.swap(arr, i, i+1);
                    complete = false;
                }
            }   
        }
        System.out.println(arr);
        int[][] answer = new int[arr.size()][];
        for(int i = 0; i < arr.size(); i++) {
            int[] ans = data[arr.get(i)];
            answer[i] = ans;
        }
        
        return answer;
    }
}