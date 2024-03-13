import java.util.*;

class Solution {
    
    public static int[][] dirArr = {{0, 1}, {0, -1}, {1, 0}, {-1, 0}};
    
    public int[] solution(String[] park, String[] routes) {
        
        int x = 0; 
        int y = 0;
        boolean start = false;
        for(int i = 0; i < park.length; i++) {
            if(start) {
                break;
            }
            for(int j = 0; j < park[0].length(); j++) {
                if(park[i].charAt(j) == 'S') {
                    x = i; 
                    y = j;
                    start = true;
                    break;
                }
            }
        }
        
        System.out.println(x+" "+y);
        
        for(String cell : routes) {
            String[] command = cell.split(" ");
            int dirIdx = direction(command[0]);
            int dis = Integer.parseInt(command[1]);
            
            if(isWalk(park, x, y, dirIdx, dis)) {
                x += dis*dirArr[dirIdx][0];
                y += dis*dirArr[dirIdx][1];
            }
            
        }
        
        return new int[]{x, y};
    }
    
    public static int direction(String dir) {
        int idx = 0;  
        
        if (dir.equals("E")) {
            idx = 0; 
        } else if(dir.equals("W")) {
            idx = 1;
        } else if(dir.equals("S")) {
            idx = 2;
        } else if(dir.equals("N")) {
            idx = 3;
        }
        return idx;
    }
    
    public static boolean isWalk(String[] park, int x, int y, int dirIdx, int dis) {

        for(int i = 0; i < dis; i++) {
            x += dirArr[dirIdx][0];
            y += dirArr[dirIdx][1];
            
            if( ((x < 0) || (x >= park.length)) || ((y < 0) || (y >= park[0].length())) || park[x].charAt(y)=='X') {
                System.out.println("실패");
                return false;
            }
        }
        System.out.println("성공: "+x+" "+y);
        return true;
    }
}