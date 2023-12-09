from sys import stdin as s

# input.txt file
#s = open('input.txt')

n = int(s.readline().rstrip())
input = list(s.readline().rstrip())
inputArr = []
for i in range(n):
    inputArr.append((float(s.readline().rstrip())))

stack = []
input.reverse()
for i in range(len(input)):
    inputChar = input.pop()
    if inputChar in "+-*/":
        fir = stack.pop()
        sec = stack.pop()

        if(type(fir) == str):
            fir = inputArr[ord(fir)-65]

        if(type(sec) == str):
            sec = inputArr[ord(sec)-65]

        if inputChar == "+":
            fir = fir + sec
            stack.append(fir)
        elif inputChar == "-":
            fir = sec - fir
            stack.append(fir)
        elif inputChar == "*":
            fir = fir * sec
            stack.append(fir)
        elif inputChar == "/":
            fir = sec / fir
            stack.append(fir)
    else:
        stack.append(inputChar)

print("%.2f"%(stack.pop()))

