import sys

#stdin = open("input.txt")

E,S,M = list(map(int, sys.stdin.readline().split(" ")))

e,s,m,year = 1, 1, 1, 1

while True:
    if (e==E) and (s==S) and (m==M):
        break
    e += 1
    s += 1
    m += 1
    year += 1
    if e > 15:
        e = 1
    if s > 28:
        s = 1
    if m > 19:
        m = 1

print(year)
