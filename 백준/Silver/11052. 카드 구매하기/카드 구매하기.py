from sys import stdin as s
#s = open("input.txt")

N = int(s.readline().rstrip())

numArr = list(map(int, s.readline().split(" ")))
d = [0] * (len(numArr)+1)
d[1] = numArr[0]

for i in range(len(numArr)):
    originIdx = i
    lastIdx = 1
    maxNum = numArr[i]
    while originIdx >= lastIdx:
        if maxNum < d[originIdx] + d[lastIdx]:
            maxNum = d[originIdx] + d[lastIdx]
        originIdx -= 1
        lastIdx += 1
    d[i+1] = maxNum

print(d[-1])