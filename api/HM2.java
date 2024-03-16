public class tree {
     
   
    
    static class Node
    {
        Node[] child = new Node[26];
      
        // isEndOfWord is true if the node represents
        // end of a word
        //boolean isEndOfWord;
         
        Node(){
            //isEndOfWord = false;
            for (int i = 0; i < 26; i++)
                child[i] = null;
        }
    };
	static Node root;
	
	static void insert(String key)
    {
        int length = key.length();//sizeof(key)
        int index;
      
        Node first = root;
      
        for (int i = 0; i < length; i++)
        {
            index = key[0] - 'a';
            if (first.child[index] == null)
                first.child[index] = new Node();
      
            first = first.child[index];
        }
      
        // mark last node as leaf
        first.child[++index] = '$';
    }
	
	
	// Online Java Compiler
// Use this editor to write, compile and run your Java code online

// Java implementation of search and insert operations
// on Trie
/******************************************/
public class Trie {

	static class Node
	{
		Node[] child = new Node[26];
	    char c ;
		//boolean isEndOfWord;
		
		Node(){
			//isEndOfWord = false;
			for (int i = 0; i < 26; i++){
			    c = '$';
				child[i] = null;
			}
		}
	};
	
	static Node root;
	
	// If not present, inserts key into trie
	// If the key is prefix of trie node,
	// just marks leaf node
	static void insert(String key)
	{
		
		int length = key.length();
		int index;
	
		Node word = root;
	
		for (int level = 0; level < length; level++)
		{   
		    if(key.charAt(level) < 'a'){
		        index = key.charAt(level) - 'A';
		        
		    }
		    else{
			index = key.charAt(level) - 'a';
		    }
			if (word.child[index] == null && word.c == '$')
				word.child[index] = new Node();
	
			word = word.child[index];
		}
	   //word.child[++index]='$';
		// mark last node as leaf
		//word.isEndOfWord = true;
	}
	
	// Returns true if key presents in trie, else false
	static boolean search(String key)
	{
		int level;
		int length = key.length();
		int j = 0;
		int index;
		Node pCrawl = root;
	
		for (level = 0; level < length; level++)
		{
			if(key.charAt(level) < 'a'){
		        index = key.charAt(level) - 'A';
		         }
		    else{
			index = key.charAt(level) - 'a';
		    }
	
			if (pCrawl.child[index] == null && pCrawl.c == '$')
				return false;
	        else{
	            pCrawl = pCrawl.child[index];
	            j++;
	        }
			
		}
	    if(j == length){
	        return true;
	    }
		else return false;
	}
	
	// Driver
	public static void main(String args[])
	{
		// Input keys (use only 'a' through 'z' and lower case)
		String keys[] = {"The", "a", "there", "answer", "any",
						"by", "bye", "their"};
	
		String output[] = {"Not present in trie", "Present in trie"};
	
	
		root = new Node();
	
		// Construct trie
		int i;
		for (i = 0; i < keys.length ; i++)
			insert(keys[i]);
	
		// Search for different keys
		if(search("ThE") == true)
			System.out.println("the --- " + output[1]);
		else System.out.println("the --- " + output[0]);
		
		if(search("these") == true)
			System.out.println("these --- " + output[1]);
		else System.out.println("these --- " + output[0]);
		
		if(search("their") == true)
			System.out.println("their --- " + output[1]);
		else System.out.println("their --- " + output[0]);
		
		if(search("thaw") == true)
			System.out.println("thaw --- " + output[1]);
		else System.out.println("thaw --- " + output[0]);
		
	}
}
// This code is contributed by Sumit Ghosh
/**********************************************************/
// Online Java Compiler
// Use this editor to write, compile and run your Java code online
import java.io.*;
import java.util.*;
public class HelloWorld {
    //Stack<String> stack = new Stack<>(); 
    
	static class Node
	{
		Node[] child = new Node[26];
	    char c ;
		//boolean isEndOfWord;
		
		Node(){
			//isEndOfWord = false;
			for (int i = 0; i < 26; i++){
			    c = '$';
				child[i] = null;
			}
		}
	};
	
	static Node root;
	
	// If not present, inserts key into trie
	// If the key is prefix of trie node,
	// just marks leaf node
	static void insert(String key)
	{
		
		int length = key.length();
		int index;
	
		Node word = root;
	
		for (int level = 0; level < length; level++)
		{   
		    if(key.charAt(level) < 'a'){
		        index = key.charAt(level) - 'A';
		        
		    }
		    else{
			index = key.charAt(level) - 'a';
		    }
			if (word.child[index] == null && word.c == '$')
				word.child[index] = new Node();
	
			word = word.child[index];
		}
	   //word.child[++index]='$';
		// mark last node as leaf
		//word.isEndOfWord = true;
	}
	
	// Returns true if key presents in trie, else false
	static boolean search(String key)
	{
		int level;
		int length = key.length();
		int j = 0;
		int index;
		Node pCrawl = root;
	
		for (level = 0; level < length; level++)
		{
			if(key.charAt(level) < 'a'){
		        index = key.charAt(level) - 'A';
		         }
		    else{
			index = key.charAt(level) - 'a';
		    }
	
			if (pCrawl.child[index] == null && pCrawl.c == '$')
				return false;
	        else{
	            pCrawl = pCrawl.child[index];
	            j++;
	        }
			
		}
	    if(j == length){
	        return true;
	    }
		else return false;
	}
	 public static void startWith(String s){
	     // Queue<String> queue = new Queue<String>();
         Node word = root;
        int length = s.length();
        int index=0;
        char key='$';
        int j=0; //length 
        String w1 = null;
        for(int i=0; i<length; i++){
            key = s.charAt(i);
            if(key <'a'){
                index = key - 'A';
            }
            else{
                index = key - 'a';
            }
            if(word.child[index] == null && word.c == '$')
                //queue.add(w1);
                System.out.println(" --- " + w1);
            else{
            w1=w1+key;  
            word = word.child[index];
            j++;
            }
        }
        for(int i=0; i<26; i++){
            if(word.child[--index] == null && word.c == '$'){
                //queue.add(w1);
                System.out.println(" --- " + w1);
            }
            word = word.child[index];
             w1=w1+key; 
        }
        //System.out.println("thaw --- " + queue.remove());
    }
	// Driver
	public static void main(String args[])
	{
		// Input keys (use only 'a' through 'z' and lower case)
		String keys[] = {"aya", "a", "there", "amal", "any",
						"by", "bye", "their"};
	
		String output[] = {"Not present in trie", "Present in trie"};
	
	
		root = new Node();
	
		// Construct trie
		int i;
		for (i = 0; i < keys.length ; i++)
			insert(keys[i]);
	
		// Search for different keys
		if(search("amal") == true)
			System.out.println("oui --- " + output[1]);
		else System.out.println("no --- " + output[0]);
		
		if(search("these") == true)
			System.out.println("these --- " + output[1]);
		else System.out.println("these --- " + output[0]);
		
		if(search("their") == true)
			System.out.println("their --- " + output[1]);
		else System.out.println("their --- " + output[0]);
		
		if(search("thaw") == true)
			System.out.println("thaw --- " + output[1]);
		else System.out.println("thaw --- " + output[0]);
		startWith("th");
		
	}
}
// This code is contributed by Sumit Ghosh
