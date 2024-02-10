import sys

#stdin = open("input.txt")

N = int(sys.stdin.readline().rstrip())

digit = 1

count = 0
for i in range(1, N+1):
    if i == 10:
        digit = 2
    elif i == 100:
        digit = 3
    elif i == 1000:
        digit = 4
    elif i == 10000:
        digit = 5
    elif i == 100000:
        digit = 6
    elif i == 1000000:
        digit = 7
    elif i == 10000000:
        digit = 8
    elif i == 100000000:
        digit = 9
    count += digit


print(count)
