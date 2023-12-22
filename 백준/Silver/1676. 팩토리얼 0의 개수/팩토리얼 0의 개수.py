from sys import stdin as s
import math

# input.txt file
#s = open('input.txt')


N = int(s.readline().rstrip())

result = 1

for i in range(1, N+1):
    result *= i

div = 10
count = 0
while True:
    divNum = result % div
    if divNum == 0:
        count += 1
        div *= 10
    else:
        break

print(count)
