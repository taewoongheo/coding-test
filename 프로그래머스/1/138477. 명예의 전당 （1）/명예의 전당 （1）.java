import java.util.*;

class Solution {
    public int[] solution(int k, int[] score) {
        
        int[] answer = new int[score.length];
        
        int[][] arr = new int[score.length][k];
        for(int i = 0; i < score.length; i++) {
            int currentScore = score[i];
            if(currentScore > arr[i][k-1]) {
                arr[i][k-1] = currentScore;
            }
            for(int j = k-2; j >= 0; j--) {
                if(currentScore > arr[i][j]) {
                    int temp = arr[i][j];
                    arr[i][j] = arr[i][j+1];
                    arr[i][j+1] = temp;
                }
            }
            if(i < score.length-1) {
                arr[i+1] = arr[i];
            }
            if(i < k-1) {
                System.out.println("arr[i][i] "+arr[i][i]);
                answer[i] = arr[i][i];
            } else {
                System.out.println("arr[i][k-1] "+arr[i][k-1]);
                answer[i] = arr[i][k-1];   
            }
        }
        
        // answer[score.length-1] = arr[score.length-1][k-1];
        
        return answer;
    }
}