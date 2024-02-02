import sys

#stdin = open("input.txt")

arr = []
for i in range(9):
    arr.append(int(sys.stdin.readline().rstrip()))

result = []


def sumRecursive(idx, arr, sumArr):
    if (sum(sumArr) == 100) and (len(sumArr) == 7):
        global result
        result = sumArr
        return
    if idx >= 9:
        return
    sumRecursive(idx+1, arr, sumArr + [arr[idx]])
    sumRecursive(idx+1, arr, sumArr)

sumArr = []
sumRecursive(0, arr, sumArr)

result.sort()
for i in range(len(result)):
    print(result[i])
