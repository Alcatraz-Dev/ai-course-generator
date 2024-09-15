/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 */

const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const GenerateCourseLayout_Ai = model.startChat({
  generationConfig,
  // safetySettings: Adjust safety settings
  // See https://ai.google.dev/gemini-api/docs/safety-settings
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Generate A Course Tutorial on Following Detail With as Course Name, Description, Along with Chapter Name, about, Duration:Category:'Programing', Topic:'Paython',Level:'Basic',Duration:'1 hours',Number Of Chapters:'5',in json format \n",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n{\n  "course": {\n    "name": "Python Fundamentals: From Zero to Hero",\n    "description": "This comprehensive course introduces you to the world of Python programming. We\'ll guide you from the absolute basics, covering essential concepts like variables, data types, operators, and control flow. By the end, you\'ll have a solid foundation to build upon and can confidently start crafting your own Python programs.",\n    "chapters": [\n      {\n        "name": "Introduction to Python",\n        "about": "What is Python? Why is it popular? Setting up your Python environment and writing your first Python program.",\n        "duration": "15 minutes"\n      },\n      {\n        "name": "Variables and Data Types",\n        "about": "Understanding variables, assigning values, and exploring different data types like integers, floats, strings, and booleans.",\n        "duration": "20 minutes"\n      },\n      {\n        "name": "Operators and Expressions",\n        "about": "Learning about arithmetic, comparison, logical, and assignment operators. Building expressions and evaluating them.",\n        "duration": "20 minutes"\n      },\n      {\n        "name": "Control Flow: Making Decisions",\n        "about": "Introducing conditional statements (if-else, elif) and loops (for, while) to control the flow of your programs.",\n        "duration": "20 minutes"\n      },\n      {\n        "name": "Functions and Modules",\n        "about": "Defining your own functions to organize code and reuse logic. Exploring built-in modules and their functionalities.",\n        "duration": "15 minutes"\n      }\n    ],\n    "category": "Programming",\n    "topic": "Python",\n    "level": "Basic",\n    "duration": "1 hour",\n    "numberOfChapters": 5\n  }\n}\n```',
        },
      ],
    },
  ],
});
export const GenerateChapterContent_Ai = model.startChat({
  generationConfig,
  // safetySettings: Adjust safety settings
  // See https://ai.google.dev/gemini-api/docs/safety-settings
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Explain the concept in Detail on Topic: Python Basic, Chapter: Variables and Data Types, in JSON Format with list of array with field as title, explanation on give chapter in detail, Code Example(Code field in <precode> format ) if applicable",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n[\n  {\n    "title": "Variables",\n    "explanation": "Variables are like containers that store data in a program. They allow you to give meaningful names to data values so you can easily access and manipulate them later. To create a variable, you use the assignment operator `=`.",\n    "code_example": "<precode>name = \\"Alice\\"  # Assign the string \\"Alice\\" to the variable \'name\'\\nage = 25     # Assign the integer 25 to the variable \'age\'\\n</precode>"\n  },\n  {\n    "title": "Data Types",\n    "explanation": "Data types define the kind of data a variable can hold. Python has several built-in data types, including:\\n\\n* **Integers (int):** Whole numbers without decimal points (e.g., 10, -5, 0)\\n* **Floating-point numbers (float):** Numbers with decimal points (e.g., 3.14, -2.5)\\n* **Strings (str):** Text enclosed in single or double quotes (e.g., \\"Hello\\", \'Python\')\\n* **Booleans (bool):** Represent truth values - either `True` or `False`\\n* **Lists (list):** Ordered collections of items enclosed in square brackets (e.g., [1, 2, 3])\\n* **Tuples (tuple):** Immutable (unchangeable) ordered collections enclosed in parentheses (e.g., (1, 2, 3))\\n* **Dictionaries (dict):** Unordered collections of key-value pairs enclosed in curly braces (e.g., { \'name\': \'Alice\', \'age\': 25 })",\n    "code_example": "<precode>age = 25  # integer\\nprice = 19.99  # float\\nmessage = \\"Welcome!\\"  # string\\nis_active = True  # boolean\\n</precode>"\n  },\n  {\n    "title": "Variable Naming Rules",\n    "explanation": "When naming variables in Python, follow these rules:\\n\\n* Variable names must start with a letter (a-z, A-Z) or an underscore (_).\\n* They can contain letters, numbers, and underscores. \\n* They are case-sensitive (e.g., `age` and `Age` are different variables).\\n* Avoid using keywords (reserved words like `if`, `for`, `while`, etc.) as variable names.",\n    "code_example": "<precode>name_with_underscore = \\"Bob\\"  # Valid\\n123variable = \\"Invalid\\"  # Invalid (starts with a number)\\nfor = 10  # Invalid (using a keyword)\\n</precode>"\n  },\n  {\n    "title": "Data Type Conversion",\n    "explanation": "You can convert between different data types using built-in functions like `int()`, `float()`, `str()`, and `bool()`. This is useful for manipulating data in different ways.",\n    "code_example": "<precode>number = 10  # integer\\nstring_number = str(number)  # Convert to string\\nprint(string_number)  # Output: \\"10\\"\\n\\nstring_price = \\"15.50\\"\\nfloat_price = float(string_price)  # Convert to float\\nprint(float_price)  # Output: 15.5\\n</precode>"\n  }\n]\n```',
        },
      ],
    },
  ],
});

// const result = await generateCourseLayout.sendMessage("Ge");
// console.log(result.response.text());
