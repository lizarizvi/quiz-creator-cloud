document.addEventListener('DOMContentLoaded', () => {
    // View Counter Logic
    let viewCount = localStorage.getItem('viewCount');
    
    if (viewCount === null) {
        viewCount = 0;
    }
    
    viewCount++;
    localStorage.setItem('viewCount', viewCount);
    document.getElementById('viewCount').textContent = viewCount;

    // Quiz Logic
    const quizForm = document.getElementById('quiz-form');
    const quizQuestionsDiv = document.getElementById('quiz-questions');
    const startQuizButton = document.getElementById('start-quiz');
    const submitQuizButton = document.getElementById('submit-quiz');
    const quizResultDiv = document.getElementById('quiz-result');
    const scoreParagraph = document.getElementById('score');
    const newGameButton = document.getElementById('new-game');
    
    let questions = [];
    
    quizForm.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const question = document.getElementById('question').value;
        const option1 = document.getElementById('option1').value;
        const option2 = document.getElementById('option2').value;
        const option3 = document.getElementById('option3').value;
        const option4 = document.getElementById('option4').value;
        const correctAnswer = parseInt(document.getElementById('correct-answer').value, 10);
        
        questions.push({
            question,
            options: [option1, option2, option3, option4],
            correctAnswer
        });
        
        quizForm.reset();
        renderQuiz();
    });
    
    startQuizButton.addEventListener('click', () => {
        document.getElementById('create-quiz').classList.add('hidden');
        document.getElementById('take-quiz').classList.remove('hidden');
        renderQuiz();
    });
    
    submitQuizButton.addEventListener('click', () => {
        let score = 0;
        questions.forEach((question, index) => {
            const selectedOption = document.querySelector(`input[name="question-${index}"]:checked`);
            if (selectedOption && parseInt(selectedOption.value, 10) === question.correctAnswer) {
                score += 1;
            }
        });
        
        scoreParagraph.textContent = `${score} out of ${questions.length}`;
        document.getElementById('take-quiz').classList.add('hidden');
        quizResultDiv.classList.remove('hidden');
        
        if (score === questions.length) {
            congratulateUser();
        }
    });
    
    newGameButton.addEventListener('click', () => {
        questions = [];
        document.getElementById('create-quiz').classList.remove('hidden');
        quizResultDiv.classList.add('hidden');
        quizForm.reset();
        quizQuestionsDiv.innerHTML = '';
    });
    
    function renderQuiz() {
        quizQuestionsDiv.innerHTML = '';
        questions.forEach((question, index) => {
            const questionDiv = document.createElement('div');
            questionDiv.classList.add('question');
            
            const questionTitle = document.createElement('h3');
            questionTitle.textContent = `${index + 1}. ${question.question}`;
            questionDiv.appendChild(questionTitle);
            
            question.options.forEach((option, optionIndex) => {
                const optionLabel = document.createElement('label');
                optionLabel.textContent = option;
                
                const optionInput = document.createElement('input');
                optionInput.type = 'radio';
                optionInput.name = `question-${index}`;
                optionInput.value = optionIndex + 1;
                
                optionLabel.prepend(optionInput);
                questionDiv.appendChild(optionLabel);
            });
            
            quizQuestionsDiv.appendChild(questionDiv);
        });
    }
    
    function congratulateUser() {
        alert('Congratulations! You got all the answers correct!');
    }
});
