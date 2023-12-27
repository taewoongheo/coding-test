from sys import stdin as s

#s = open("input.txt")

A, B = list(map(int, s.readline().split(" ")))
m = int(s.readline().rstrip())
arr = list(map(int, s.readline().split(" ")))

decimal = 0
#A진수 -> 10진수 변환
idx = m-1
for i in range(m):
    num = arr[i]
    digit = idx - i
    decimal += arr[i] * (A ** digit)

result = ""
#10진수 -> B진수 변환
while decimal != 0:
    if decimal % B:
        result = str(decimal % B) + " " + result
    else:
        result = "0 " + result
    decimal //= B

print(result)
