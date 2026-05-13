// src/pages/Challenges.jsx
import React, { useState } from 'react';

const topics = [
  {
    id: 'html',
    icon: '🌐',
    name: 'HTML Basics',
    color: '#7c5cfc',
    description: 'Practice the building blocks of the web: tags, structure, and semantics.',
    questions: [
      {
        question: 'Which HTML tag is used for the largest heading?',
        options: ['<heading>', '<h1>', '<title>', '<header>'],
        correctIndex: 1,
        explanation: 'The <h1> tag defines the top-level heading. Headings range from <h1> to <h6>.',
      },
      {
        question: 'Which attribute is required for an <img> tag?',
        options: ['title', 'href', 'alt', 'srcset'],
        correctIndex: 2,
        explanation: 'The alt attribute is required to describe the image for accessibility and fallback.',
      },
      {
        question: 'What is the correct HTML element for a paragraph?',
        options: ['<para>', '<p>', '<text>', '<paragraph>'],
        correctIndex: 1,
        explanation: 'Paragraphs in HTML are represented by the <p> element.',
      },
      {
        question: 'Which element defines a clickable link?',
        options: ['<link>', '<a>', '<button>', '<nav>'],
        correctIndex: 1,
        explanation: 'The <a> element defines a hyperlink, using the href attribute for the target URL.',
      },
      {
        question: 'Which tag is used to create an ordered list?',
        options: ['<ul>', '<li>', '<ol>', '<list>'],
        correctIndex: 2,
        explanation: '<ol> creates a numbered list, while <ul> creates a bulleted list.',
      },
    ],
  },
  {
    id: 'react',
    icon: '⚛️',
    name: 'React Fundamentals',
    color: '#22c55e',
    description: 'Test your knowledge of components, props, state, and React basics.',
    questions: [
      {
        question: 'What is the purpose of a React component?',
        options: ['Define styles', 'Create reusable UI parts', 'Store database data', 'Handle HTTP requests'],
        correctIndex: 1,
        explanation: 'Components let you build reusable pieces of UI in React.',
      },
      {
        question: 'Which hook is used to add state in a functional component?',
        options: ['useEffect', 'useState', 'useMemo', 'useRef'],
        correctIndex: 1,
        explanation: 'useState adds local state to functional components.',
      },
      {
        question: 'How do you pass data from parent to child in React?',
        options: ['Context', 'Props', 'Redux', 'Events'],
        correctIndex: 1,
        explanation: 'Props are used to pass data from a parent component to its child.',
      },
      {
        question: 'What should a React component return?',
        options: ['A string', 'JSX', 'A Promise', 'An object'],
        correctIndex: 1,
        explanation: 'React components return JSX to describe the UI.',
      },
      {
        question: 'Which lifecycle hook runs after every render?',
        options: ['useLayoutEffect', 'useState', 'componentDidMount', 'useEffect'],
        correctIndex: 3,
        explanation: 'useEffect runs after every render unless you provide a dependency array.',
      },
    ],
  },
  {
    id: 'python',
    icon: '🐍',
    name: 'Python Basics',
    color: '#f59e0b',
    description: 'Review Python syntax, data types, and simple programming logic.',
    questions: [
      {
        question: 'Which symbol is used for comments in Python?',
        options: ['//', '#', '/*', '<!--'],
        correctIndex: 1,
        explanation: 'Python uses # for single-line comments.',
      },
      {
        question: 'What is the correct way to create a list?',
        options: ['{1, 2, 3}', '[1, 2, 3]', '(1, 2, 3)', '<1, 2, 3>'],
        correctIndex: 1,
        explanation: 'Lists are created with square brackets [].',
      },
      {
        question: 'What does len([1, 2, 3]) return?',
        options: ['1', '2', '3', '4'],
        correctIndex: 2,
        explanation: 'len returns the number of items, which is 3.',
      },
      {
        question: 'Which keyword defines a function in Python?',
        options: ['func', 'def', 'function', 'lambda'],
        correctIndex: 1,
        explanation: 'def is used to define a function.',
      },
      {
        question: 'How do you check equality in Python?',
        options: ['=', '==', '===', '!='],
        correctIndex: 1,
        explanation: '== compares values, while = assigns a value.',
      },
    ],
  },
  {
    id: 'java',
    icon: '☕',
    name: 'Java Fundamentals',
    color: '#ef4444',
    description: 'Master Java syntax, OOP concepts, and core programming principles.',
    questions: [
      {
        question: 'Which keyword is used to create a class in Java?',
        options: ['struct', 'class', 'interface', 'object'],
        correctIndex: 1,
        explanation: 'The class keyword defines a class in Java. Classes are blueprints for objects.',
      },
      {
        question: 'What is the main method signature in Java?',
        options: ['public static main()', 'public static void main(String[] args)', 'void main()', 'static main(String[] args)'],
        correctIndex: 1,
        explanation: 'The correct signature is public static void main(String[] args) - it must be public, static, and return void.',
      },
      {
        question: 'Which access modifier allows access only within the same class?',
        options: ['public', 'private', 'protected', 'default'],
        correctIndex: 1,
        explanation: 'The private modifier restricts access to only within the same class.',
      },
      {
        question: 'What is the purpose of the "new" keyword in Java?',
        options: ['Declare variables', 'Create object instances', 'Import packages', 'Define classes'],
        correctIndex: 1,
        explanation: '"new" creates a new instance of a class in Java.',
      },
      {
        question: 'Which method is called automatically when an object is created?',
        options: ['destructor', 'initializer', 'constructor', 'startup'],
        correctIndex: 2,
        explanation: 'A constructor is a special method that runs when an object is created.',
      },
    ],
  },
  {
    id: 'csharp',
    icon: '#️⃣',
    name: 'C# Essentials',
    color: '#3b82f6',
    description: 'Learn C# syntax, types, and .NET framework fundamentals.',
    questions: [
      {
        question: 'Which keyword is used to declare a variable in C#?',
        options: ['var', 'let', 'const', 'dim'],
        correctIndex: 0,
        explanation: 'The var keyword is used in C# for implicit type declaration. You can also use explicit types like int, string, etc.',
      },
      {
        question: 'What is the base class for all types in C#?',
        options: ['System.Object', 'System.Class', 'System.Base', 'System.Root'],
        correctIndex: 0,
        explanation: 'System.Object is the base class for all types in C#, giving all objects common methods.',
      },
      {
        question: 'How do you handle exceptions in C#?',
        options: ['try-except', 'try-catch', 'error-handle', 'exception-block'],
        correctIndex: 1,
        explanation: 'C# uses try-catch blocks to handle exceptions, similar to Java.',
      },
      {
        question: 'What is a property in C#?',
        options: ['A class member', 'A method encapsulating a field', 'A static variable', 'A namespace'],
        correctIndex: 1,
        explanation: 'Properties provide controlled access to class members using get and set accessors.',
      },
      {
        question: 'Which of these is a value type in C#?',
        options: ['string', 'int', 'object', 'class'],
        correctIndex: 1,
        explanation: 'int is a value type, while string, object, and class are reference types.',
      },
    ],
  },
  {
    id: 'sql',
    icon: '🗄️',
    name: 'SQL Basics',
    color: '#14b8a6',
    description: 'Understand SQL queries, databases, and data manipulation fundamentals.',
    questions: [
      {
        question: 'Which SQL keyword is used to retrieve data from a database?',
        options: ['GET', 'SELECT', 'FETCH', 'RETRIEVE'],
        correctIndex: 1,
        explanation: 'SELECT is the fundamental SQL keyword for querying and retrieving data from tables.',
      },
      {
        question: 'What does the WHERE clause do in SQL?',
        options: ['Sorts results', 'Filters rows based on conditions', 'Groups data', 'Joins tables'],
        correctIndex: 1,
        explanation: 'The WHERE clause filters rows based on specified conditions in a query.',
      },
      {
        question: 'Which SQL keyword is used to sort results?',
        options: ['FILTER', 'ARRANGE', 'ORDER BY', 'SORT'],
        correctIndex: 2,
        explanation: 'ORDER BY sorts the result set in ascending or descending order.',
      },
      {
        question: 'What does INSERT do in SQL?',
        options: ['Update existing data', 'Add new rows to a table', 'Delete data', 'Create a table'],
        correctIndex: 1,
        explanation: 'INSERT is used to add new records (rows) to a table.',
      },
      {
        question: 'Which SQL keyword combines rows from multiple tables?',
        options: ['MERGE', 'UNION', 'JOIN', 'COMBINE'],
        correctIndex: 2,
        explanation: 'JOIN combines rows from two or more tables based on a related column.',
      },
    ],
  },
];

const styles = {
  container: { flex: 1, overflowY: 'auto', padding: '40px 32px' },
  title: { fontFamily: "'Syne', sans-serif", fontSize: 26, fontWeight: 800, color: 'var(--text1)', marginBottom: 6 },
  sub: { fontSize: 14, color: 'var(--text2)', marginBottom: 28 },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 18 },
  card: (color) => ({
    background: 'var(--bg2)',
    border: '1px solid var(--border)',
    borderRadius: 20,
    padding: 24,
    transition: 'transform 0.18s, border-color 0.18s',
    cursor: 'pointer',
    borderTop: `4px solid ${color}`,
  }),
  cardIcon: { fontSize: 30, marginBottom: 14 },
  cardName: { fontFamily: "'Syne',sans-serif", fontSize: 18, fontWeight: 700, color: 'var(--text1)', marginBottom: 10 },
  cardDesc: { fontSize: 14, color: 'var(--text2)', lineHeight: 1.6, marginBottom: 20 },
  startBtn: (color) => ({
    padding: '10px 18px',
    borderRadius: 12,
    background: color,
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    fontWeight: 700,
    fontFamily: "'DM Sans',sans-serif",
  }),
  quizHeader: { marginBottom: 24 },
  questionCard: {
    background: 'var(--bg2)',
    border: '1px solid var(--border)',
    borderRadius: 18,
    padding: 22,
    marginBottom: 18,
  },
  questionLabel: { fontSize: 15, fontWeight: 700, color: 'var(--text1)', marginBottom: 14 },
  optionButton: (selected, correct, submitted) => ({
    width: '100%',
    textAlign: 'left',
    padding: '10px 14px',
    borderRadius: 12,
    border: submitted ? `1px solid ${correct ? '#22c55e' : selected ? '#ef4444' : 'var(--border)'}` : selected ? '1px solid #7c5cfc' : '1px solid var(--border)',
    background: submitted ? correct ? 'rgba(34,197,94,0.12)' : selected ? 'rgba(239,68,68,0.12)' : 'transparent' : selected ? 'rgba(124,92,252,0.12)' : 'transparent',
    cursor: submitted ? 'default' : 'pointer',
    marginBottom: 10,
    color: 'var(--text1)',
  }),
  explanation: { marginTop: 10, fontSize: 13, lineHeight: 1.6, color: 'var(--text2)' },
  footer: { display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center', marginTop: 16 },
  submitBtn: { padding: '12px 22px', background: 'var(--purple)', color: 'white', border: 'none', borderRadius: 14, cursor: 'pointer', fontWeight: 700 },
  backBtn: { padding: '12px 22px', background: 'var(--bg3)', color: 'var(--text1)', border: '1px solid var(--border)', borderRadius: 14, cursor: 'pointer', fontWeight: 700 },
  resultBox: { background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 18, padding: 22, marginBottom: 24 },
  resultTitle: { fontSize: 20, fontWeight: 800, color: 'var(--text1)', marginBottom: 8 },
  resultText: { fontSize: 14, color: 'var(--text2)', lineHeight: 1.6 },
};

export default function Challenges() {
  const [activeTopic, setActiveTopic] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleStart = (topic) => {
    setActiveTopic(topic);
    setSelectedAnswers({});
    setSubmitted(false);
    setScore(0);
  };

  const handleAnswer = (questionIndex, optionIndex) => {
    if (submitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [questionIndex]: optionIndex }));
  };

  const handleSubmit = () => {
    if (!activeTopic) return;
    const correct = activeTopic.questions.reduce((count, question, index) => {
      return count + (selectedAnswers[index] === question.correctIndex ? 1 : 0);
    }, 0);
    setScore(correct);
    setSubmitted(true);
  };

  const handleReset = () => {
    setActiveTopic(null);
    setSelectedAnswers({});
    setSubmitted(false);
    setScore(0);
  };

  return (
    <main style={styles.container}>
      <div style={styles.title}>Quiz Topics</div>
      <div style={styles.sub}>Select a quiz topic, answer five questions, and review your score with corrections.</div>

      {!activeTopic && (
        <div style={styles.grid}>
          {topics.map((topic) => (
            <div
              key={topic.id}
              style={styles.card(topic.color)}
              onClick={() => handleStart(topic)}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-2px)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
            >
              <div style={styles.cardIcon}>{topic.icon}</div>
              <div style={styles.cardName}>{topic.name}</div>
              <div style={styles.cardDesc}>{topic.description}</div>
              <button style={styles.startBtn(topic.color)}>Start</button>
            </div>
          ))}
        </div>
      )}

      {activeTopic && (
        <div>
          <div style={styles.quizHeader}>
            <div style={styles.title}>{activeTopic.icon} {activeTopic.name}</div>
            <div style={styles.sub}>{activeTopic.description}</div>
          </div>

          {submitted && (
            <div style={styles.resultBox}>
              <div style={styles.resultTitle}>Your score: {score} / {activeTopic.questions.length}</div>
              <div style={styles.resultText}>Review each question below to see which answers were correct and why.</div>
            </div>
          )}

          {activeTopic.questions.map((question, questionIndex) => {
            const selectedIndex = selectedAnswers[questionIndex];
            const isCorrect = submitted && selectedIndex === question.correctIndex;
            return (
              <div key={questionIndex} style={styles.questionCard}>
                <div style={styles.questionLabel}>Question {questionIndex + 1}: {question.question}</div>
                <div style={{ display: 'grid', gap: 10 }}>
                  {question.options.map((option, optionIndex) => {
                    const selected = selectedIndex === optionIndex;
                    const correctAnswer = submitted && optionIndex === question.correctIndex;
                    return (
                      <button
                        key={option}
                        type="button"
                        style={styles.optionButton(selected, correctAnswer, submitted)}
                        onClick={() => handleAnswer(questionIndex, optionIndex)}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
                {submitted && (
                  <div style={styles.explanation}>
                    <strong>Correct answer:</strong> {question.options[question.correctIndex]}.
                    <br />
                    <strong>Your answer:</strong> {selectedIndex !== undefined ? question.options[selectedIndex] : 'No answer selected'}.
                    <br />
                    <strong>Why:</strong> {question.explanation}
                  </div>
                )}
              </div>
            );
          })}

          <div style={styles.footer}>
            {!submitted && (
              <button
                style={styles.submitBtn}
                type="button"
                onClick={handleSubmit}
                disabled={Object.keys(selectedAnswers).length < activeTopic.questions.length}
              >
                Submit Quiz
              </button>
            )}
            <button style={styles.backBtn} type="button" onClick={handleReset}>
              Choose another quiz
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
