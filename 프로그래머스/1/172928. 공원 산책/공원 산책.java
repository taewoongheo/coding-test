import java.util.*;

class Solution {
    
    public int[] solution(String[] park, String[] routes) {
        
        String[][] parkTable = new String[park.length][park[0].length()];
        // System.out.println("park.length: "+park.length+" park[0].length(): "+park[0].length());
        
        int x = 0; 
        int y = 0;
        for(int i = 0; i < park.length; i++) {
            String parkLine = park[i];
            for(int j = 0; j < parkLine.length(); j++) {
                parkTable[i][j] = String.valueOf(parkLine.charAt(j));
                if (parkTable[i][j].equals("S")) {
                    x = i;
                    y = j;
                } 
            }
        }
        
        for(int i = 0; i < park.length; i++) {
            // System.out.println(Arrays.toString(parkTable[i]));
        }
        
        System.out.println(x+" "+y);
        int h = x; 
        int w = y; 
        for(int i = 0; i < routes.length; i++) {
            String[] command = routes[i].split(" ");
            String direction = command[0];
            int distance = Integer.parseInt(command[1]);
            h = x; //임시 높이 좌표(x)
            w = y; //임시 넓이 좌표(y)
            
            //동서남북에 따라 이동
            if (direction.equals("E")) {
                // System.out.println("E");
                w += distance;
            } else if(direction.equals("W")) {
                // System.out.println("W");
                w -= distance;
            } else if(direction.equals("S")) {
                // System.out.println("S");
                h += distance;
            } else if(direction.equals("N")) {
                // System.out.println("N");
                h -= distance;
            }
            
            // System.out.println("x: "+x+" y: "+y+" h: "+h+" w: "+w);
            if (((w >= park[0].length()) || (w < 0)) || ((h >= park.length) || (h < 0))) {
                // System.out.println("넘침: "+w+" "+h);
                h = x; 
                w = y;
            }
            
            // System.out.println("x: "+x+" y: "+y+" h: "+h+" w: "+w);
            for(int j = y+1; j <= w; j++) {
                if (parkTable[x][j].equals("X")) {
                    w = y;
                    break;
                }
            }
            
            for(int j = y-1; j >= w; j--) {
                if (parkTable[x][j].equals("X")) {
                    w = y;
                    break;
                }
            }
            
            for(int j = x+1; j <= h; j++) {
                if (parkTable[j][y].equals("X")) {
                    h = x;
                    break;
                }
            }
            
            for(int j = x-1; j >= h; j--) {
                if (parkTable[j][y].equals("X")) {
                    h = x;    
                    break;
                }
            }
                
            x = h;
            y = w;
            // System.out.println("x: "+x+" y: "+y);
            // System.out.println("-------");
        }
        
        int[] answer = {x, y};
        
        return answer;
    }
}