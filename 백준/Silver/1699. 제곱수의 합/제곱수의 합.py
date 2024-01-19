import sys
import math

#stdin = open("input.txt")

n = int(sys.stdin.readline().rstrip())

dp = [0] * (n+1)
sqrt = []

for i in range(1, n+1):
    dp[i] = dp[i-1] + 1
    if math.sqrt(i).is_integer():
        dp[i] = 1
        sqrt.append(i)
        continue
    for j in range(len(sqrt)):
        sqrtValue = sqrt[j]
        if dp[i-sqrtValue] < dp[i]:
            dp[i] = dp[i-sqrtValue] + 1

print(dp[n])
