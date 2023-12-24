from sys import stdin as s
import math

# input.txt file
#s = open('input.txt')

N, S = list(map(int, s.readline().split(" ")))
position = list(map(int, s.readline().split(" ")))

positionDiffer = []
for i in position:
    positionDiffer.append(abs(S-i))

print(math.gcd(*positionDiffer))
