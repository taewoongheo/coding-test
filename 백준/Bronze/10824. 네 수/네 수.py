from sys import stdin as s

# input.txt file
#s = open('input.txt')

inputList = list(s.readline().split(" "))

print(int(inputList[0] + inputList[1]) + int(inputList[2] + inputList[3]))
