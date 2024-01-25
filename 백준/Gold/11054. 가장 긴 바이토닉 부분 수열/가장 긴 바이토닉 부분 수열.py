import sys

#stdin = open("input.txt")

T = int(sys.stdin.readline().rstrip())
arr = list(map(int, sys.stdin.readline().split(" ")))

dpIncrease = [0] * T
dpIncrease[0] = 1

dpDecrease = [0] * T
dpDecrease[0] = 1
arrReverse = arr[::-1]

for i in range(1, T):
    itemIncrease = arr[i]
    itemDecrease = arrReverse[i]
    maxIncrease = 0
    maxDecrease = 0
    for j in range(i-1, -1, -1):
        if (itemIncrease > arr[j]) and (dpIncrease[j] >= maxIncrease):
            maxIncrease = dpIncrease[j]
        if (itemDecrease > arrReverse[j]) and (dpDecrease[j] >= maxDecrease):
            maxDecrease = dpDecrease[j]
    dpIncrease[i] = maxIncrease + 1
    dpDecrease[i] = maxDecrease + 1

dpDecrease = dpDecrease[::-1]
result = [dpIncrease[i] + dpDecrease[i] for i in range(len(dpIncrease))]

print(max(result)-1)
