
r1=int(input("Enter the row of 1st matrix "))
c1=int(input("Enter the col of 1st matrix "))
r2=int(input("Enter the row of 2nd matrix "))
c2=int(input("Enter the col of 2nd matrix "))


#initializing the matrix 
m1=[[0 for _ in range(c1)] for _ in range(r1)]
m2=[[0 for _ in range(c2)] for _ in range(r2)]

result=[[0 for _ in range(c2)] for _ in range(r1)]

if(r1!=c2):
    print("The matrix multiplication cannot be performed ") 
    exit()


#Taking input form the user
def matrixInput(row,col,matrix):
    print("Enter the values in matrix \n")
    for i in range(0,row):
        for j in range(0,col):
            num=int(input(f"Enter the [{i+1}][{j+1}] Element "))
            matrix[i][j]=num
            
#displaying the matrix
def displayMatrix(row, col ,matrix):
       for i in range(0,row):
            for j in range(0,col):
                print(" ",matrix[i][j],end='')
            print('\n')         
                
matrixInput(r1,c1,m1)
matrixInput(r2,c2,m2)
print("********* Matrix  1  *********** \n\n")   
displayMatrix(r1,c1,m1)
print("********* Matrix  2  *********** \n\n")   
displayMatrix(r2,c2,m2)


# Performing the multiplication 
for i in range(0,r1):
    for j in range(0,c2):
        sum=0
        for k in range(0,c1):
            sum+=m1[i][k]*m2[k][j]
        result[i][j]=sum


print("********* Multiplication of matrix *********** \n\n")   
displayMatrix(r1,c2,result)
