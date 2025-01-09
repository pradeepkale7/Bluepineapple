class Node {
    int data;
    Node leftChild;
    Node rightChild;
    public Node(int key){
      data=key;
      leftChild=rightChild=null;
    }
 }
 public class TreeDataStructure {
   Node root=null;

   public void inorder(Node root){
      if(root!=null){
         inorder(root.leftChild);
         System.out.print(root.data + " ");
         inorder(root.rightChild);
         
      }
   }
    public  void preorder(Node root){
         if(root!=null){
            System.out.print(root.data+" ");
            preorder(root.leftChild);
            preorder(root.rightChild);
         }
      }


      void postorder(Node root){
         if(root!=null){
            postorder(root.leftChild);
            postorder(root.rightChild);
            System.out.print(root.data+" ");
         }
      }
  
    public static void main(String args[]) {
      TreeDataStructure tree = new TreeDataStructure();
      tree.root = new Node(27);
      tree.root.leftChild = new Node(12);
      tree.root.rightChild = new Node(3);
      tree.root.leftChild.leftChild = new Node(44);
      tree.root.leftChild.rightChild = new Node(17);
      tree.root.rightChild.leftChild = new Node(56);
      System.out.println("Inorder traversal: ");
      tree.inorder(tree.root);
      System.out.println("\nPreorder traversal: ");
      tree.preorder(tree.root);
      System.out.println("\nPostorder traversal: ");
      tree.postorder(tree.root);
      
    }
 }