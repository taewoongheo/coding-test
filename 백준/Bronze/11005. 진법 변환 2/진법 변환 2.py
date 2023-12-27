from sys import stdin as s

#s = open("input.txt")

N, B = list(map(int, s.readline().split(" ")))

result = ""

while N != 0:
    remainder = N % B
    if remainder >= 10:
        differ = remainder - 10
        result = chr(65+differ) + result
    else:
        result = str(remainder) + result
    N = N // B

print(result)
