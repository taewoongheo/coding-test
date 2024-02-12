import sys

#stdin = open("input.txt")

N, S = list(map(int, sys.stdin.readline().split(" ")))
arr = list(map(int, sys.stdin.readline().split(" ")))

count = 0


def bt(sum, depth):
    if depth == N:
        return
    if sum+arr[depth] == S:
        global count
        count += 1
    bt(sum + arr[depth], depth + 1)
    bt(sum, depth + 1)

bt(0, 0)
print(count)
