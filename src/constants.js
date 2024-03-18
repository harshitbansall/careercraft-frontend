export const jsQuiz = {
    "questions": [
        {
            "question": "What is the correct way to create a variable in Python?",
            "options": [
                "variable x = 5",
                "x = 5",
                "5 = x",
                "create x = 5"
            ],
            "correctAnswer": "x = 5"
        },
        {
            "question": "Which statement is used to exit from a loop in Python?",
            "options": [
                "quit",
                "break",
                "exit",
                "return"
            ],
            "correctAnswer": "break"
        },
        {
            "question": "What is the output of the following code? \n\nprint(2 + 3 * 4)",
            "options": [
                "20",
                "14",
                "17",
                "35"
            ],
            "correctAnswer": "14"
        },
        {
            "question": "Which of the following is not a Python data type?",
            "options": [
                "List",
                "Array",
                "Tuple",
                "Dictionary"
            ],
            "correctAnswer": "Array"
        },
        {
            "question": "What is the correct way to comment multiple lines in Python?",
            "options": [
                "// This is a comment",
                "# This is a comment",
                "/* This is a comment */",
                "''' This is a comment '''"
            ],
            "correctAnswer": "''' This is a comment '''"
        },
        {
            "question": "What is the result of the following code? \n\nprint(type('Hello World'))",
            "options": [
                "String",
                "Class",
                "Value",
                "Object"
            ],
            "correctAnswer": "Class"
        },
        {
            "question": "Which of the following statements is true about Python?",
            "options": [
                "It is a high-level programming language.",
                "It can be used for web development.",
                "It is easy to read and write.",
                "All of the above"
            ],
            "correctAnswer": "All of the above"
        },
        {
            "question": "What is the output of the following code? \n\nprint(len([1, 2, 3, 4, 5]))",
            "options": [
                "1",
                "5",
                "2",
                "TypeError"
            ],
            "correctAnswer": "5"
        },
        {
            "question": "Which module in Python provides functionality for working with files?",
            "options": [
                "os",
                "sys",
                "io",
                "file"
            ],
            "correctAnswer": "os"
        },
        {
            "question": "What will be the value of x after executing the following code? \n\nx = 10\nx += 5",
            "options": [
                "10",
                "15",
                "20",
                "5"
            ],
            "correctAnswer": "15"
        }
    ]
}


export const resultInitialState = {
    score:0,
    correctAnswers:0,
    wrongAnswers:0,

}

export default jsQuiz