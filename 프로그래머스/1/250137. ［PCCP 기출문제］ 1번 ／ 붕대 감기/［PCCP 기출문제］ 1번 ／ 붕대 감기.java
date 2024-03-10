class Solution {
    public int solution(int[] bandage, int health, int[][] attacks) {
        int answer = 0;
        
        int attackLength = attacks.length;
        int lastAttack = attacks[attackLength-1][0];
        
        int attackIdx = 0;
        int bandageCount = 0;
        int maxHealth = health;
        for(int i = 0; i <= lastAttack; i++) {
            int currentAttack = attacks[attackIdx][0];

            if (currentAttack == i) { //공격 o
                health -= attacks[attackIdx][1];
                attackIdx += 1;
                bandageCount = 0;
                if (health <= 0) {
                    answer = -1;
                    break;
                }
                System.out.print(i+" attack!"+currentAttack);
            } else { //공격 x
                System.out.print(i+" "+bandageCount);
                health += bandage[1];
                bandageCount += 1;
                if (bandageCount == bandage[0]) {
                    health += bandage[2];
                    bandageCount = 0;
                }
                if (health > maxHealth) {
                    health = maxHealth;
                    bandageCount = 0;
                }
            }
            System.out.print(" "+health+"\n");
        }
        
        if(answer != -1) {
            answer = health;
            System.out.println("result: "+answer);
        }
        
        return answer;
    }
}