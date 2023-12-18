// Declaração de variáveis
const question = document.querySelector('#question');
const answerBox = document.querySelector('#answers-box');
const quizzContainer = document.querySelector('#quizz-container');
const scoreContainer = document.querySelector('#score-container');
const letters = ['a', 'b', 'c', 'd', 'e'];
let points = 0;
let actualQuestion = 0;
let timerInterval;

// Função para embaralhar as respostas
function shuffleAnswers(answers) {
  return answers.sort(() => Math.random() - 0.5);
}

// Perguntas
const questions = [
  {
    question: 'PHP foi desenvolvido para qual fim?',
    answers: [
      {
        answer: 'Back-End',
        correct: true,
      },
      {
        answer: 'Front-End',
        correct: false,
      },
      {
        answer: 'Sistema operacional',
        correct: false,
      },
      {
        answer: 'Banco de dados',
        correct: false,
      },
    ],
  },
  {
    question: 'Uma forma de declarar variável em JavaScript:',
    answers: [
      {
        answer: '$var',
        correct: false,
      },
      {
        answer: 'var',
        correct: true,
      },
      {
        answer: '@var',
        correct: false,
      },
      {
        answer: '#let',
        correct: false,
      },
    ],
  },
  {
    question: 'Qual o seletor de id no CSS?',
    answers: [
      {
        answer: '#',
        correct: true,
      },
      {
        answer: '.',
        correct: false,
      },
      {
        answer: '@',
        correct: false,
      },
      {
        answer: '/',
        correct: false,
      },
    ],
  },
  {
    question: 'Quanto é 2 + 2?',
    answers: [
      {
        answer: '4',
        correct: true,
      },
      {
        answer: '5',
        correct: false,
      },
      {
        answer: '6',
        correct: false,
      },
      {
        answer: '7',
        correct: false,
      },
    ],
  },
  {
    question: 'Quem é conhecido como o "pai da computação"?',
    answers: [
      {
        answer: 'Bill Gates',
        correct: false,
      },
      {
        answer: 'Alan Turing',
        correct: true,
      },
      {
        answer: 'Steve Jobs',
        correct: false,
      },
      {
        answer: 'Mark Zuckerberg',
        correct: false,
      },
    ],
  },
  {
    question: 'Em que ano a World Wide Web foi criada?',
    answers: [
      {
        answer: '1990',
        correct: true,
      },
      {
        answer: '2000',
        correct: false,
      },
      {
        answer: '1980',
        correct: false,
      },
      {
        answer: '2010',
        correct: false,
      },
    ],
  },
  {
    question: 'Qual é a capital do Japão?',
    answers: [
      {
        answer: 'Pequim',
        correct: false,
      },
      {
        answer: 'Tóquio',
        correct: true,
      },
      {
        answer: 'Seul',
        correct: false,
      },
      {
        answer: 'Bangkok',
        correct: false,
      },
    ],
  }, 
  {
    question: 'Qual é a capital da França?',
    answers: [
      {
        answer: 'Londres',
        correct: false,
      },
      {
        answer: 'Madrid',
        correct: false,
      },
      {
        answer: 'Paris',
        correct: true,
      },
      {
        answer: 'Berlim',
        correct: false,
      },
    ],
  },
  {
    question: 'Quem escreveu "Dom Quixote"?',
    answers: [
      {
        answer: 'William Shakespeare',
        correct: false,
      },
      {
        answer: 'Miguel de Cervantes',
        correct: true,
      },
      {
        answer: 'Leo Tolstoy',
        correct: false,
      },
      {
        answer: 'Jane Austen',
        correct: false,
      },
    ],
  },
  {
    question: 'Em que ano a Revolução Francesa começou?',
    answers: [
      {
        answer: '1776',
        correct: false,
      },
      {
        answer: '1789',
        correct: true,
      },
      {
        answer: '1801',
        correct: false,
      },
      {
        answer: '1825',
        correct: false,
      },
    ],
  },
];

// Embaralhar as perguntas para obter 10 perguntas aleatórias
const shuffledQuestions = questions.sort(() => Math.random() - 0.5).slice(0, 10);

// Função para iniciar o quizz
function init() {
  // Criar primeira pergunta
  createQuestion(0);
}

// Função para criar uma pergunta
function createQuestion(i) {
  // Limpar questão anterior
  const oldButtons = answerBox.querySelectorAll('button');
  oldButtons.forEach((btn) => {
    btn.remove();
  });

  // Alterar texto da pergunta
  const questionText = question.querySelector('#question-text');
  const questionNumber = question.querySelector('#question-number');

  questionText.textContent = shuffledQuestions[i].question;
  questionNumber.textContent = i + 1;

  // Inserir alternativas embaralhadas
  const shuffledAnswers = shuffleAnswers(shuffledQuestions[i].answers);
  shuffledAnswers.forEach((answer, i) => {
    // Criar template botão quizz
    const answerTemplate = document.querySelector('.answer-template').cloneNode(true);

    const letterBtn = answerTemplate.querySelector('.btn-letter');
    const answerText = answerTemplate.querySelector('.question-answer');

    letterBtn.textContent = letters[i];
    answerText.textContent = answer['answer'];

    answerTemplate.setAttribute('correct-answer', answer['correct']);

    // Remover hide e template class
    answerTemplate.classList.remove('hide');
    answerTemplate.classList.remove('answer-template');

    // Inserir alternativa na tela
    answerBox.appendChild(answerTemplate);

    // Inserir evento click no botão
    answerTemplate.addEventListener('click', function () {
      checkAnswer(this);
    });
  });

  // Iniciar temporizador de 10 segundos
  startTimer(10, function () {
    // Se o temporizador chegar a zero, considerar a resposta como errada
    checkAnswer(null);
  });
}

// Função para iniciar temporizador
function startTimer(duration, callback) {
  let timer = duration;
  timerInterval = setInterval(function () {
    timer--;

    if (timer <= 0) {
      clearInterval(timerInterval);
      callback();
    }
  }, 1000);
}

// Função para verificar resposta do usuário
function checkAnswer(btn) {
  // Limpar temporizador
  clearInterval(timerInterval);

  // Selecionar todos os botões
  const buttons = answerBox.querySelectorAll('button');

  // Verificar se resposta correta e adicionar classe
  buttons.forEach((button) => {
    if (button.getAttribute('correct-answer') == 'true') {
      button.classList.add('correct-answer');

      // Checar se usuário acertou a pergunta
      if (btn === button) {
        // Incrementar os pontos
        points++;
      }
    } else {
      button.classList.add('wrong-answer');
    }
  });

  // Exibir próxima pergunta
  nextQuestion();
}

// Função para exibir a próxima pergunta no quizz
function nextQuestion() {
  // Timer para usuário ver as respostas
  setTimeout(function () {
    // Verificar se ainda há perguntas
    if (actualQuestion >= shuffledQuestions.length) {
      // Apresentar mensagem de sucesso
      showSuccessMessage();
      return;
    }

    createQuestion(actualQuestion);
  }, 1200);
}

// Função para exibir a tela final
function showSuccessMessage() {
  hideOrShowQuizz();

  // Trocar dados tela de sucesso
  // Calcular score
  const score = ((points / shuffledQuestions.length) * 100).toFixed(2);

  const displayScore = document.querySelector('#display-score span');
  displayScore.textContent = score.toString();

  // Alterar o número de perguntas corretas
  const correctAnswers = document.querySelector('#correct-answers');
  correctAnswers.textContent = points;

  // Alterar o total de perguntas
  const totalQuestions = document.querySelector('#questions-qty');
  totalQuestions.textContent = shuffledQuestions.length;
}

// Função para mostrar ou esconder o score
function hideOrShowQuizz() {
  quizzContainer.classList.toggle('hide');
  scoreContainer.classList.toggle('hide');
}

// Botão para reiniciar quizz
const restartBtn = document.querySelector('#restart');
restartBtn.addEventListener('click', function () {
  // Zerar jogo
  actualQuestion = 0;
  points = 0;
  hideOrShowQuizz();
  init();
});

// Inicialização do quizz
init();
