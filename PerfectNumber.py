
n =int(input("Enter the range of numbers : "))

for num in range(1,n):    # for 1 to n
    sum=0  # for checking the final value 
    
    for i in range(1,num):    #for checking the quotient
    
        if(num%i==0):
            sum+=i           # adding the quotient sum 
        
    if(sum==num):
        print(f"{sum} ")  # printing the perfect number 
