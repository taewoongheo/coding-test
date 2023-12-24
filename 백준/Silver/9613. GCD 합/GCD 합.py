from sys import stdin as s
import math

# input.txt file
#s = open('input.txt')

N = int(s.readline().rstrip())

for i in range(N):
    inputList = list(map(int, s.readline().split(" ")))
    t = inputList[0]
    result = 0
    for j in range(1, t):
        for k in range(j+1, t+1):
            A = inputList[j]
            B = inputList[k]
            while True:
                b = B
                B = A % B
                A = b
                if B == 0:
                    break
            result += A 
    print(result)
