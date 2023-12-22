from sys import stdin as s
import math

# input.txt file
#s = open('input.txt')

M, N = list(map(int, s.readline().split(" ")))

arr = []
threshold = None

M = 2 if M == 1 else M

threshold = math.floor(math.sqrt(N))

th = [2]

for i in range(2, threshold+1):
    th.append(i)

for num in range(M, N+1):
    for i in th:
        if (num % i == 0) and (num != i):
            break
    else:
        arr.append(num)

for i in arr:
    print(i)
