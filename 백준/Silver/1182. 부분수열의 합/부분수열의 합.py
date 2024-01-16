import sys

#stdin = open("input.txt")

n, s = list(map(int, sys.stdin.readline().split(" ")))
arr = list(map(int, sys.stdin.readline().split(" ")))
count = 0


def bt(n, depth, num):
    if n == depth:
        return
    if (num+arr[depth]) == s:
        global count
        count += 1
    bt(n, depth + 1, num + arr[depth])
    bt(n, depth + 1, num)


bt(n, 0, 0)
print(count)
