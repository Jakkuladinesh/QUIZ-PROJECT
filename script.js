let authScreen = document.getElementById("authScreen");
      let loginForm = document.getElementById("loginForm");
      let registerForm = document.getElementById("registerForm");
      let startScreen = document.getElementById("startScreen");
      let quizScreen = document.getElementById("quizScreen");
      let resultScreen = document.getElementById("resultScreen");

      let loginButton = document.getElementById("loginButton");
      let registerButton = document.getElementById("registerButton");
      let showRegister = document.getElementById("showRegister");
      let showLogin = document.getElementById("showLogin");

      let startButton = document.getElementById("startButton");
      let restartButton = document.getElementById("restartButton");

      let loginUsername = document.getElementById("loginUsername");
      let loginPassword = document.getElementById("loginPassword");

      let registerUsername = document.getElementById("registerUsername");
      let registerPassword = document.getElementById("registerPassword");

      let users = JSON.parse(localStorage.getItem("users")) || {};

      showRegister.addEventListener("click", () => {
        loginForm.classList.add("hidden");
        registerForm.classList.remove("hidden");
      });

      showLogin.addEventListener("click", () => {
        registerForm.classList.add("hidden");
        loginForm.classList.remove("hidden");
      });

      registerButton.addEventListener("click", () => {
        const username = registerUsername.value;
        const password = registerPassword.value;

        if (username && password) {
          if (users[username]) {
            alert("Username already exists!");
          } else {
            users[username] = password;
            localStorage.setItem("users", JSON.stringify(users));
            alert("Registration successful! Please login.");
            registerForm.classList.add("hidden");
            loginForm.classList.remove("hidden");
          }
        } else {
          alert("Please fill out all fields.");
        }
      });

      loginButton.addEventListener("click", () => {
        let username = loginUsername.value;
        let password = loginPassword.value;

        if (users[username] && users[username] === password) {
          alert("Login successful!");
          authScreen.classList.add("hidden");
          startScreen.classList.remove("hidden");
        } else {
          alert("Invalid username or password.");
        }
      });

      

      let currentQuestion = 0;
      let score = 0;
      let timer;
      let timeLeft = 30;
      let highScore = localStorage.getItem("highScore") || 0;

      const questions = [
        {
          question: "1.What does HTML stand for?",
          options: [
            "Hyper Text Markup Language",
            "Home Tool Markup Language",
            "Hyperlinks and Text Markup Language",
            "Hyper Tool Multi Language",
          ],
          answer: 1,
        },
        {
          question: "2.What does CSS stand for?",
          options: [
            "Cascading Style Sheets",
            "Creative Style Syntax",
            "Colorful Style Syntax",
            "Computer Style Sheets",
          ],
          answer: 1,
        },
        
        {
          question: "3.Which CSS property is used to make text bold?",
          options: ["font-style", "font-weight", "text-style", "text-bold"],
          answer: 2,
        },
        {
          question:
            "4.Which CSS property is used to control the space between elements?",
          options: ["spacing", "margin", "padding", "border"],
          answer: 2,
        },
        {
          question: "5.Which JavaScript keyword is used to declare a constant?",
          options: ["const", "var", "let", "constant"],
          answer: 1,
        },
        {
          question: "6.What does the 'id' attribute in HTML do?",
          options: [
            "Specifies a unique identifier for an element",
            "Styles an element",
            "Adds an image to the element",
            "Adds a link to the element",
          ],
          answer: 1,
        },
        {
          question:
            "7.What is the default value of the 'position' property in CSS?",
          options: ["absolute", "relative", "static", "fixed"],
          answer: 3,
        },

        {
          question:
            "8.Which CSS property is used to change the text color of an element?",
          options: ["font-color", "color", "text-color", "background-color"],
          answer: 2,
        },
        {
          question:
            "9.Which event is triggered when a user clicks on an HTML element?",
          options: ["onmouseover", "onhover", "onclick", "onpress"],
          answer: 3,
        },
        {
          question: "10.What does HTML stand for?",
          options: [
            "Hyper Text Markup Language",
            "Home Tool Markup Language",
            "Hyperlinks and Text Markup Language",
            "Hyper Tool Multi Language",
          ],
          answer: 1,
        },
        {
          question: "11.What does CSS stand for?",
          options: [
            "Cascading Style Sheets",
            "Creative Style Syntax",
            "Colorful Style Syntax",
            "Computer Style Sheets",
          ],
          answer: 1,
        },
        
        {
          question: "12.Which CSS property is used to make text bold?",
          options: ["font-style", "font-weight", "text-style", "text-bold"],
          answer: 2,
        },
        {
          question:
            "13.Which CSS property is used to control the space between elements?",
          options: ["spacing", "margin", "padding", "border"],
          answer: 2,
        },
        {
          question: "14.Which JavaScript keyword is used to declare a constant?",
          options: ["const", "var", "let", "constant"],
          answer: 1,
        },
        {
          question: "15.What does the 'id' attribute in HTML do?",
          options: [
            "Specifies a unique identifier for an element",
            "Styles an element",
            "Adds an image to the element",
            "Adds a link to the element",
          ],
          answer: 1,
        },
        {
          question:
            "16.What is the default value of the 'position' property in CSS?",
          options: ["absolute", "relative", "static", "fixed"],
          answer: 3,
        },

        {
          question:
            "17.Which CSS property is used to change the text color of an element?",
          options: ["font-color", "color", "text-color", "background-color"],
          answer: 2,
        },
        {
          question:
            "18.Which event is triggered when a user clicks on an HTML element?",
          options: ["onmouseover", "onhover", "onclick", "onpress"],
          answer: 3,
        },
        
        
      ];

      function startQuiz() {
        score = 0;
        currentQuestion = 0;
        timeLeft = 100;
        startScreen.classList.add("hidden");
        quizScreen.classList.remove("hidden");
        resultScreen.classList.add("hidden");
        showQuestion();
        startTimer();
      }

      function showQuestion() {
        const question = questions[currentQuestion];
        document.getElementById("question").textContent = question.question;
        const optionsElement = document.getElementById("options");
        optionsElement.innerHTML = "";

        question.options.forEach((option, index) => {
          const button = document.createElement("button");
          button.textContent = option;
          button.addEventListener("click", () => checkAnswer(index));
          optionsElement.appendChild(button);
        });
      }

      function checkAnswer(selectedIndex) {
        if (selectedIndex === questions[currentQuestion].answer - 1) {
          score++;
        }

        currentQuestion++;

        if (currentQuestion < questions.length) {
          showQuestion();
        } else {
          endQuiz();
        }
      }

      function startTimer() {
        clearInterval(timer);

        timer = setInterval(() => {
          timeLeft--;
          document.getElementById("timer").textContent = timeLeft;

          if (timeLeft <= 0) {
            clearInterval(timer);
            endQuiz();
          }
        }, 1000);
      }

      function endQuiz() {
        clearInterval(timer);
        quizScreen.classList.add("hidden");
        resultScreen.classList.remove("hidden");
        document.getElementById("score").textContent = score;

        if (score > highScore) {
          highScore = score;
          localStorage.setItem("highScore", highScore);
        }

        document.getElementById("highScore").textContent = highScore;
      }
      function showCorrectAnswers() {
        const correctAnswersList = document.getElementById("correctAnswersList");
        correctAnswersList.innerHTML = "";
        questions.forEach((q, index) => {
          const listItem = document.createElement("li");
          listItem.textContent = `${index + 1}. ${q.question} - ${q.options[q.answer - 1]}`;
          correctAnswersList.appendChild(listItem);
        });
      }


      startButton.addEventListener("click", startQuiz);
      restartButton.addEventListener("click", startQuiz);
