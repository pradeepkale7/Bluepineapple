
#include <stdio.h>
#include <string.h>


int size = 0; // Current number of elements in the map 
char keys[100][100]; // Array to store 100 string of size 100
int values[100];  //store the value 



int getIndex(char key[])
{

    for (int i = 0; i < size; i++)
    {
        if (strcmp(keys[i],key)==0)
        {
            return i;
        }
    }

    return -1;
}

void insert(char key[], int value)
{

    // searching for the key if already present
    int index = getIndex(key);

    if (index == -1)
    {
        strcpy(keys[size],key);
        values[size]=value;
        size++;
    }
    else
    {
        strcpy(keys[index],key);
        values[index]=value;
    }
}


void printMap(){

    for(int i=0;i<size;i++){
        printf("%s = key and %d = value\n",keys[i],values[i]);
    }
}


int get(char key[]){
    int index=getIndex(key);
    if(index==-1) return -1;

    return values[index];
}
void main()
{

    insert("One", 5);
    insert("Two", 3);
    insert("Pradeep", 7);

    printf("Value of complete Map: \n");
   printMap();

    printf("\nValue of apple: %d\n", get("Two"));
    printf("Index of Pradeep: %d\n", getIndex("Pradeep"));

}
