from sys import stdin as s
#s = open("input.txt")

N = int(s.readline().rstrip())

inputList = list(map(int, s.readline().split(" ")))

dp = [1] * N

for i in range(1, N):
    item = inputList[i]
    for j in range(i-1, -1, -1):
        if (inputList[j] < item) and (dp[j] >= dp[i]):
            dp[i] = dp[j] + 1
print(max(dp))
