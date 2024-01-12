from sys import stdin as s
#s = open("input.txt")

n = int(s.readline().rstrip())

arr = list(map(int, s.readline().split(" ")))

dp = [0] * n
dp[0] = arr[0]

for i in range(1, n):
    maxValue = arr[i]
    if arr[i] + dp[i-1] > arr[i]:
        maxValue = arr[i] + dp[i-1]
    dp[i] = maxValue

print(max(dp))
