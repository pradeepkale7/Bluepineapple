import java.util.HashMap;

public class wordFrequency {

    public static void main(String[] args) {

        String text = "My name is Pradeep . I amn the most handsome guy in this world so would you try tonbe the best in this case and count the number of letters in this string that descibe pradeep in it.";

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
