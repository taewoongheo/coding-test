import java.util.*;

class Solution {
    public int[] solution(String[] wallpaper) {
        
        //가정 : 드래그는 왼쪽에서 시작함 -> 끝 점은 시작 점 보다 x, y 좌표가 크다고 가정. 
        // -> 반례가 있나? 없음. 애초에 드래그는 항상 직사각형 모양일 수 밖에 없다. 
        
        //로직
        //완전탐색으로 구현한다면 칸 하나 잡고, 두번째 칸으로 나머지 모두 돌림
        //  이전에 파일 위치를 1번 파일부터 x, y 를 두 개의 리스트로 따로 저장
        //  Math.abs(첫번째 x - 두번째 x), Math.abs(첫번째 y - 두번째 y) 계산
        //  첫번째 x + Math.abs(x절대값) 값을 기준으로 x 값 모여있는 배열에서 루프 돌림. 만약 범위를 벗어난다면 break
        //  첫번째 y + Math.abs(y절댓값) 값을 기준으로 똑같이 함. 
        
        //wallpaper 의 가로세로 길이는 최대 50x50=250 번의 연산. 위 로직을 O(n^2) 으로 구현하면 통과 가능. 
        //근데 저거 이미 O(n^3) 이다. 다른 방법은 없나?
        
        //가장 위, 아래에 있는 파일, 가장 오른쪽, 왼쪽에 있는 파일 위치 알아내면 됨. 
        //가장 위에 있는 파일 -> y 좌표가 가장 작음
        //가장 아래에 있는 파일 -> y 좌표가 가장 큼
        //가장 오른쪽에 있는 파일 -> x 좌표가 가장 작음
        //가장 왼쪽에 있는 파일 -> x 좌표가 가장 큼
        
        int[][] fourPoint = new int[4][2]; //오른쪽, 왼쪽, 위, 아래
        fourPoint[0][1] = 100;
        fourPoint[2][0] = 100;
        for(int i = 0; i < wallpaper.length; i++) {
            String wallpaperline = wallpaper[i];
            for(int j = 0; j < wallpaperline.length(); j++) {
                if(wallpaperline.charAt(j)=='#') {

                    if(fourPoint[0][1] > j) {
                        fourPoint[0][0] = i;
                        fourPoint[0][1] = j;
                    }

                    if(fourPoint[1][1] < j) {
                        fourPoint[1][0] = i;
                        fourPoint[1][1] = j;
                    }

                    if(fourPoint[2][0] > i) {
                        fourPoint[2][0] = i;
                        fourPoint[2][1] = j;
                    }

                    if(fourPoint[3][0] < i) {
                        fourPoint[3][0] = i;
                        fourPoint[3][1] = j;
                    }
                }
            }
        }
        
        for(int i = 0; i < 4; i++) {
            System.out.println(Arrays.toString(fourPoint[i]));
        }
        
        return new int[]{fourPoint[2][0], fourPoint[0][1], fourPoint[3][0]+1, fourPoint[1][1] + 1};
    }
}