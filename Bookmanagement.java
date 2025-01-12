
// Bookmanagement.java
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

class Book {
    String title;
    int copies;

    public Book(String title, int count) {
        this.title = title;
        this.copies = count;
    }

    int getCopies() {
        return copies;
    }

    void setCopies(int count) {
        this.copies = count;
    }
}

public class Bookmanagement {

    static HashMap<String, List<Book>> Library = new HashMap<>();

    public static void addBook(String Author, String Title, int copies) {

        List<Book> list = Library.get(Author);
        if (list == null) {
            list = new ArrayList<>();
            Library.put(Author, list);
        }
        list.add(new Book(Title, copies));

    }

    public static void displayBook(String Author) {

        List<Book> list = Library.get(Author);

        if (list == null) {
            System.out.println("The author has no book in its name ");
        } else {
            System.out.println("Author : " + Author + "\nThe list of books \n ");

            for (Book book : list) {
                System.out.print("Book Title : " + book.title + "\nBook Copies : " + book.copies + "\n");
            }
        }
    }

    public static void displayAllBooks() {

        if (Library.isEmpty()) {
            System.out.println("No book are there!");
        } else {
            for (String author : Library.keySet()) {
                System.out.println("\n\nAuthor : " + author + "\nThe list of books \n ");

                List<Book> list = Library.get(author);

                for (Book book : list) {
                    System.out.print("Book Title : " + book.title + "\nBook Copies : " + book.copies + "\n");
                }
            }
        }

    }

    public static void allocate(String Author, String Title) {

        List<Book> list = Library.get(Author);

        if (list == null) {
            System.out.print("Author not found ");
        } else {

            for (Book book : list) {

                if (book.title.equals(Title) && book.copies > 0) {
                    book.setCopies(book.copies - 1);
                    System.out.println("The book has been sucessfully allocated \n");
                    return;
                }
            }

            System.out.println("Book not found or Book out of stock !");
        }

    }

    public static void deallocate(String Author, String Title) {

        List<Book> list = Library.get(Author);

        if (list == null) {
            System.out.println("Author not found no such record ");
        } else {

            for (Book book : list) {
                if (book.title.equals(Title)) {
                    book.setCopies(book.copies + 1);
                    return;
                }

                System.out.println("Book not found or Book out of stock !");
            }
        }

    }

    public static void delete(String Author,String Title){

        if (Library.containsKey(Author)) {
            List<Book> books = Library.get(Author);
            for (int i = 0; i < books.size(); i++) {
                if (books.get(i).title.equals(Title)) {
                    books.remove(i);
                    break;
                }
            }
            if (books.isEmpty()) {
                Library.remove(Author);
            }
        } else {
            System.out.println("Author not found.");
        }
    }
    public static void main(String args[]) {
        addBook("Pradeep", "Games of Throne", 5);
        addBook("Pradeep", "Java Programming", 10);
        addBook("John", "C Programming", 5);
        addBook("John", "C++ Programming", 4);
        addBook("Michal", "Java Programming", 7);
        addBook("Michal", "Python Programming", 5);
        displayBook("Pradeep");
        // displayAllBooks();
        allocate("Pradeep","Games of Throne");
        deallocate("Pradeep","Games of Throne");
        deallocate("Pradeep","Games of Throne");
        displayBook("Michal");
        delete("Michal","Python Programming");
        displayBook("Michal");
    }
}