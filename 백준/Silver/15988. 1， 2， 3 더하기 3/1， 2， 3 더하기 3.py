import sys

#stdin = open("input.txt")

T = int(sys.stdin.readline().rstrip())
size = 1000001

dp = [0] * size
dp[1] = 1
dp[2] = 2
dp[3] = 4

for i in range(4, size):
    dp[i] = (dp[i-1] + dp[i-2] + dp[i-3]) % 1000000009

for i in range(T):
    n = int(sys.stdin.readline().rstrip())
    print(dp[n])
