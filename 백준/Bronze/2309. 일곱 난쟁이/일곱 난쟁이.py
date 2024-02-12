import sys

#stdin = open("input.txt")

arr = []
for i in range(9):
    arr.append(int(sys.stdin.readline().rstrip()))

result = []
for i in range(9):
    fir = arr[i]
    for j in range(i+1, 9):
        sec = arr[j]
        if sum(arr)-fir-sec == 100:
            arr.remove(fir)
            arr.remove(sec)
            result = arr
            break
    else:
        continue
    break

result.sort()
for i in range(7):
    print(result[i])
