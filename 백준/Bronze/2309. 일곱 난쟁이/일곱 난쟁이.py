import sys

#stdin = open("input.txt")

arr = []
for i in range(9):
    arr.append(int(sys.stdin.readline().rstrip()))

result = []

for i in range(9):
    fir = i
    for j in range(9):
        sec = j
        if fir == sec:
            continue
        arrCopy = arr.copy()
        arrCopy.remove(arr[i])
        arrCopy.remove(arr[j])
        if sum(arrCopy) == 100:
            result = sorted(arrCopy)
            break

for i in range(len(result)):
    print(result[i])

