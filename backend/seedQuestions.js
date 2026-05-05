require("dotenv").config();
const mongoose = require("mongoose");
const Question = require("./models/Question");

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("MongoDB connected!");
});

const questions = [

  // ===== REACT - EASY =====
  { question: "What is React?", category: "React", difficulty: "Easy" },
  { question: "What is JSX in React?", category: "React", difficulty: "Easy" },
  { question: "What is a component in React?", category: "React", difficulty: "Easy" },
  { question: "What is the difference between functional and class components?", category: "React", difficulty: "Easy" },
  { question: "What is useState hook in React?", category: "React", difficulty: "Easy" },

  // ===== REACT - MEDIUM =====
  { question: "What is useEffect hook and when do you use it?", category: "React", difficulty: "Medium" },
  { question: "What is the virtual DOM and how does it work?", category: "React", difficulty: "Medium" },
  { question: "What is props drilling and how do you avoid it?", category: "React", difficulty: "Medium" },
  { question: "What is React Router and how does it work?", category: "React", difficulty: "Medium" },
  { question: "What is the difference between controlled and uncontrolled components?", category: "React", difficulty: "Medium" },

  // ===== REACT - HARD =====
  { question: "What is useContext hook and when should you use it?", category: "React", difficulty: "Hard" },
  { question: "Explain React reconciliation algorithm.", category: "React", difficulty: "Hard" },
  { question: "What is useMemo and useCallback? When do you use them?", category: "React", difficulty: "Hard" },
  { question: "What is React lazy loading and Suspense?", category: "React", difficulty: "Hard" },
  { question: "How does React handle performance optimization?", category: "React", difficulty: "Hard" },

  // ===== NODE.JS - EASY =====
  { question: "What is Node.js?", category: "Node.js", difficulty: "Easy" },
  { question: "What is npm in Node.js?", category: "Node.js", difficulty: "Easy" },
  { question: "What is the difference between require and import in Node.js?", category: "Node.js", difficulty: "Easy" },
  { question: "What is package.json file?", category: "Node.js", difficulty: "Easy" },
  { question: "What is Express.js?", category: "Node.js", difficulty: "Easy" },

  // ===== NODE.JS - MEDIUM =====
  { question: "What is middleware in Express.js?", category: "Node.js", difficulty: "Medium" },
  { question: "What is the event loop in Node.js?", category: "Node.js", difficulty: "Medium" },
  { question: "What is REST API and how do you create one in Express?", category: "Node.js", difficulty: "Medium" },
  { question: "What is the difference between GET, POST, PUT and DELETE requests?", category: "Node.js", difficulty: "Medium" },
  { question: "How do you handle errors in Express.js?", category: "Node.js", difficulty: "Medium" },

  // ===== NODE.JS - HARD =====
  { question: "What is JWT authentication and how does it work?", category: "Node.js", difficulty: "Hard" },
  { question: "What is bcrypt and why do we use it for passwords?", category: "Node.js", difficulty: "Hard" },
  { question: "What is CORS and how do you handle it in Express?", category: "Node.js", difficulty: "Hard" },
  { question: "Explain async and await in Node.js with an example.", category: "Node.js", difficulty: "Hard" },
  { question: "What is the difference between SQL and NoSQL databases?", category: "Node.js", difficulty: "Hard" },

  // ===== MONGODB - EASY =====
  { question: "What is MongoDB?", category: "MongoDB", difficulty: "Easy" },
  { question: "What is a collection in MongoDB?", category: "MongoDB", difficulty: "Easy" },
  { question: "What is a document in MongoDB?", category: "MongoDB", difficulty: "Easy" },
  { question: "What is Mongoose in Node.js?", category: "MongoDB", difficulty: "Easy" },
  { question: "What is the difference between MongoDB and MySQL?", category: "MongoDB", difficulty: "Easy" },

  // ===== MONGODB - MEDIUM =====
  { question: "What is a Schema in Mongoose?", category: "MongoDB", difficulty: "Medium" },
  { question: "How do you perform CRUD operations in MongoDB?", category: "MongoDB", difficulty: "Medium" },
  { question: "What is populate in Mongoose and when do you use it?", category: "MongoDB", difficulty: "Medium" },
  { question: "What is indexing in MongoDB?", category: "MongoDB", difficulty: "Medium" },
  { question: "What is the difference between find() and findOne() in MongoDB?", category: "MongoDB", difficulty: "Medium" },

  // ===== MONGODB - HARD =====
  { question: "What is aggregation in MongoDB?", category: "MongoDB", difficulty: "Hard" },
  { question: "How do you handle relationships between collections in MongoDB?", category: "MongoDB", difficulty: "Hard" },
  { question: "What is MongoDB Atlas and how do you connect it to Node.js?", category: "MongoDB", difficulty: "Hard" },
  { question: "What are MongoDB indexes and how do they improve performance?", category: "MongoDB", difficulty: "Hard" },
  { question: "Explain the difference between embedding and referencing in MongoDB.", category: "MongoDB", difficulty: "Hard" },

  // ===== JAVASCRIPT - EASY =====
  { question: "What is the difference between var, let and const?", category: "JavaScript", difficulty: "Easy" },
  { question: "What is a function in JavaScript?", category: "JavaScript", difficulty: "Easy" },
  { question: "What is an array in JavaScript?", category: "JavaScript", difficulty: "Easy" },
  { question: "What is the difference between == and === in JavaScript?", category: "JavaScript", difficulty: "Easy" },
  { question: "What is a callback function in JavaScript?", category: "JavaScript", difficulty: "Easy" },

  // ===== JAVASCRIPT - MEDIUM =====
  { question: "What is a Promise in JavaScript?", category: "JavaScript", difficulty: "Medium" },
  { question: "What is async/await in JavaScript?", category: "JavaScript", difficulty: "Medium" },
  { question: "What is closure in JavaScript?", category: "JavaScript", difficulty: "Medium" },
  { question: "What is the difference between null and undefined?", category: "JavaScript", difficulty: "Medium" },
  { question: "What is event bubbling in JavaScript?", category: "JavaScript", difficulty: "Medium" },

  // ===== JAVASCRIPT - HARD =====
  { question: "What is the prototype chain in JavaScript?", category: "JavaScript", difficulty: "Hard" },
  { question: "What is hoisting in JavaScript?", category: "JavaScript", difficulty: "Hard" },
  { question: "Explain the difference between call, apply and bind in JavaScript.", category: "JavaScript", difficulty: "Hard" },
  { question: "What is the event loop in JavaScript?", category: "JavaScript", difficulty: "Hard" },
  { question: "What is debouncing and throttling in JavaScript?", category: "JavaScript", difficulty: "Hard" },

  // ===== DSA - EASY =====
  { question: "What is an array data structure?", category: "DSA", difficulty: "Easy" },
  { question: "What is a linked list?", category: "DSA", difficulty: "Easy" },
  { question: "What is a stack data structure?", category: "DSA", difficulty: "Easy" },
  { question: "What is a queue data structure?", category: "DSA", difficulty: "Easy" },
  { question: "What is binary search?", category: "DSA", difficulty: "Easy" },

  // ===== DSA - MEDIUM =====
  { question: "What is the difference between stack and queue?", category: "DSA", difficulty: "Medium" },
  { question: "What is bubble sort and how does it work?", category: "DSA", difficulty: "Medium" },
  { question: "What is a binary tree?", category: "DSA", difficulty: "Medium" },
  { question: "What is the time complexity of binary search?", category: "DSA", difficulty: "Medium" },
  { question: "What is recursion and give an example?", category: "DSA", difficulty: "Medium" },

  // ===== DSA - HARD =====
  { question: "What is the difference between BFS and DFS?", category: "DSA", difficulty: "Hard" },
  { question: "What is dynamic programming?", category: "DSA", difficulty: "Hard" },
  { question: "What is the time and space complexity of merge sort?", category: "DSA", difficulty: "Hard" },
  { question: "What is a hash table and how does it work?", category: "DSA", difficulty: "Hard" },
  { question: "Explain the concept of Big O notation.", category: "DSA", difficulty: "Hard" },

  // ===== GENERAL - EASY =====
  { question: "What is the difference between frontend and backend development?", category: "General", difficulty: "Easy" },
  { question: "What is an API?", category: "General", difficulty: "Easy" },
  { question: "What is Git and why do we use it?", category: "General", difficulty: "Easy" },
  { question: "What is the difference between HTTP and HTTPS?", category: "General", difficulty: "Easy" },
  { question: "What is a database?", category: "General", difficulty: "Easy" },

  // ===== GENERAL - MEDIUM =====
  { question: "What is the MVC architecture pattern?", category: "General", difficulty: "Medium" },
  { question: "What is the difference between authentication and authorization?", category: "General", difficulty: "Medium" },
  { question: "What is version control and how does Git work?", category: "General", difficulty: "Medium" },
  { question: "What is agile methodology in software development?", category: "General", difficulty: "Medium" },
  { question: "What is the difference between a library and a framework?", category: "General", difficulty: "Medium" },

  // ===== GENERAL - HARD =====
  { question: "What is CI/CD pipeline in software development?", category: "General", difficulty: "Hard" },
  { question: "What is microservices architecture?", category: "General", difficulty: "Hard" },
  { question: "What is Docker and why do developers use it?", category: "General", difficulty: "Hard" },
  { question: "What is the difference between monolithic and microservices architecture?", category: "General", difficulty: "Hard" },
  { question: "Explain the SOLID principles in software development.", category: "General", difficulty: "Hard" },
];

const seedDB = async () => {
  try {
    // Delete existing questions
    await Question.deleteMany({});
    console.log("Old questions deleted!");

    // Insert new questions
    await Question.insertMany(questions);
    console.log(`${questions.length} questions added successfully!`);

    mongoose.connection.close();
    console.log("Done! Database connection closed.");
  } catch (error) {
    console.log("Error seeding:", error);
  }
};

seedDB();