from sys import stdin as s

#input.txt file
#s = open('input.txt')

n = int(s.readline().rstrip())

for i in range(0, n):
    result = ""
    inputStr = s.readline().split()
    strSize = len(inputStr)
    for i in range(0, strSize):
        result += inputStr[i][::-1] + " "
    print(result)
