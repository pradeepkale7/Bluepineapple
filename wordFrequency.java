import java.util.HashMap;

public class wordFrequency {

    public static void main(String[] args) {

        String text = "This implementation is simple and easy to understand but it has some limitations  One limitation is that the keys must be unique otherwise the insert function will overwrite the value of an existing key Another limitation is that the maximum size of the map is fixed and if we exceed the maximum size we cannot insert any more elements into the map";

        String words[] = text.split(" ");   //spliting the sentences in word

        HashMap<String, Integer> wordcount = new HashMap<>();


        //Count the number of word and it frequency
        for (String word : words) {

            wordcount.put(word.toLowerCase(), wordcount.getOrDefault(word, 0) + 1);

        }

        // Print the words count frequency
        for (HashMap.Entry<String, Integer> entry : wordcount.entrySet()) {

            System.out.print("Word : " + entry.getKey() + "  frequency :  " + entry.getValue() + "\n");
        }
    }
}
