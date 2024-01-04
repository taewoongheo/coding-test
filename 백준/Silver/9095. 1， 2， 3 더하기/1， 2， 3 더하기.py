from sys import stdin as s
#s = open("input.txt")

T = int(s.readline().rstrip())

d = [0, 1, 2, 4, 0, 0, 0, 0, 0, 0, 0, 0]

for i in range(4, 12):
    d[i] = d[i-1] + d[i-2] + d[i-3]

for i in range(T):
    print(d[int(s.readline().rstrip())])
