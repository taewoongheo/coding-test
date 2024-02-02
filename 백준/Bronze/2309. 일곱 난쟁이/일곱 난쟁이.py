import sys

#stdin = open("input.txt")

arr = []
for i in range(9):
    arr.append(int(sys.stdin.readline().rstrip()))

result = []


def sumRecursive(idx, arr, sumArr):
    if len(sumArr) == 7 and sum(sumArr) == 100:
        global result
        result = sumArr
        return
    if idx >= 9 or len(sumArr) > 7:
        return
    sumRecursive(idx + 1, arr, sumArr + [arr[idx]])
    sumRecursive(idx + 1, arr, sumArr)


sumRecursive(0, arr, [])
result.sort()
for i in range(len(result)):
    print(result[i])
