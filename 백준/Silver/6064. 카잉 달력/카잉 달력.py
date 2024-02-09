import sys

#stdin = open("input.txt")

T = int(sys.stdin.readline().rstrip())

def num(m, n, x, y):
    while x <= m * n:
        if (x-y)%n == 0:
            return x
        x += m
    return -1

for i in range(T):
    m, n, x, y = list(map(int, sys.stdin.readline().split(" ")))
    print(num(m, n, x, y))
