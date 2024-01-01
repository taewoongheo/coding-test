import sys 
sys.setrecursionlimit(10 ** 6)

n = int(sys.stdin.readline().rstrip())

d = [0] * (n+1)
d[1] = 1
if n > 1:
    d[2] = 2

for i in range(3, n+1):
    d[i] = d[i-1] + d[i-2]

print(d[n] % 10007)