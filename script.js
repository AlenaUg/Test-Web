const questions = [ //Вопросы
    {
        question: "В Российской Федерации судьи...",
        optionA: "Неприкосновенны",
        optionB: "Независимы",
        optionC: "Несменяемы",
        optionD: "Все варианты",
        correctOption: "optionD"
    },

    {
        question: "Как называется итоговое решение Конституционного Суда РФ по существу запроса о соблюдении установленного порядка выдвижения обвинения Президента РФ в государственной измене или совершении иного тяжкого преступления?",
        optionA: "Постановление",
        optionB: "Заключение",
        optionC: "Приговор",
        optionD: "Определение",
        correctOption: "optionB"
    },

    {
        question: "Какая из теорий объясняет происхождение государства и права проявлением божественной воли?",
        optionA: "Теологическая",
        optionB: "Патриархальная",
        optionC: "Органическая",
        optionD: "Общественный договор",
        correctOption: "optionA"
    },

    {
        question: "Совет Федерации состоит из…",
        optionA: "150 представителей",
        optionB: "186 представителей",
        optionC: "198 представителей",
        optionD: "178 представителей",
        correctOption: "optionD"
    },

    {
        question: "В РФ экономический спор между юридическими лицами по вопросу о признании права собственности подведомствен суду:",
        optionA: "Присяжных",
        optionB: "Мировому",
        optionC: "Арбитражному",
        optionD: "Конституционному",
        correctOption: "optionC"
    },

    {
        question: "Одна из сторон в гражданском судопроизводстве:",
        optionA: "Эксперт",
        optionB: "Свидетель",
        optionC: "Потерпевший",
        optionD: "Истец",
        correctOption: "optionD"
    },

    {
        question: "Какие существуют типы государства и права?",
        optionA: "Все варианты",
        optionB: "Феодальный",
        optionC: "Капиталистический",
        optionD: "Социалистический",
        correctOption: "optionA"
    },

    {
        question: "Что из представленного относится к основанию для оформления жилья в собственность?",
        optionA: "Поговор купли-продажи",
        optionB: "Приватизация",
        optionC: "Все пункты",
        optionD: "Наследование жилья",
        correctOption: "optionC"
    },

    {
        question: "Верховным Главнокомандующим Вооруженными Силами Российской Федерации является:",
        optionA: "Президент РФ",
        optionB: "Министр обороны РФ",
        optionC: "ГосДума",
        optionD: "Премьер-министр",
        correctOption: "optionA"
    },

    {
        question: "Конституционный суд РФ состоит из…",
        optionA: "12 судей",
        optionB: "17 судей",
        optionC: "23 судей",
        optionD: "19 судей",
        correctOption: "optionD"
    },
]


let shuffledQuestions = [] //массив для хранения перетасованных выбранных вопросов

function handleQuestions() {
    //функция для перетасовки и добавления 10 вопросов в массив перетасованных вопросов
    while (shuffledQuestions.length <= 9) {
        const random = questions[Math.floor(Math.random() * questions.length)]
        if (!shuffledQuestions.includes(random)) {
            shuffledQuestions.push(random)
        }
    }
}


let questionNumber = 1
let playerScore = 0
let wrongAttempt = 0
let indexNumber = 0

// функция для отображения следующего вопроса
function NextQuestion(index) {
    handleQuestions()
    const currentQuestion = shuffledQuestions[index]
    document.getElementById("question-number").innerHTML = questionNumber
    document.getElementById("player-score").innerHTML = playerScore
    document.getElementById("display-question").innerHTML = currentQuestion.question;
    document.getElementById("option-one-label").innerHTML = currentQuestion.optionA;
    document.getElementById("option-two-label").innerHTML = currentQuestion.optionB;
    document.getElementById("option-three-label").innerHTML = currentQuestion.optionC;
    document.getElementById("option-four-label").innerHTML = currentQuestion.optionD;
}


function checkForAnswer() {
    const currentQuestion = shuffledQuestions[indexNumber] //получает текущий вопрос
    const currentQuestionAnswer = currentQuestion.correctOption //получает ответ на текущий вопрос
    const options = document.getElementsByName("option"); //получает все элементы с именем 'option'
    let correctOption = null

    options.forEach((option) => {
        if (option.value === currentQuestionAnswer) {
            correctOption = option.labels[0].id
        }
    })

    //проверка, чтобы убедиться, что вход был проверен или выбрана опция
    if (options[0].checked === false && options[1].checked === false && options[2].checked === false && options[3].checked == false) {
        document.getElementById('option-modal').style.display = "flex"
    }

    //проверка, совпадает ли установленный переключатель с ответом
    options.forEach((option) => {
        if (option.checked === true && option.value === currentQuestionAnswer) {
            document.getElementById(correctOption).style.backgroundColor = "#99CC33" // Верно
            playerScore++
            indexNumber++
            //установлено значение задержки номера вопроса до загрузки следующего вопроса
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }

        else if (option.checked && option.value !== currentQuestionAnswer) {
            const wrongLabelId = option.labels[0].id
            document.getElementById(wrongLabelId).style.backgroundColor = "#FF6633" // Не верно
            document.getElementById(correctOption).style.backgroundColor = "#99CC33" // Верно
            wrongAttempt++
            indexNumber++
            //установлено значение задержки номера вопроса до загрузки следующего вопроса
            setTimeout(() => {
                questionNumber++
            }, 1000)
        }
    })
}


//вызывается при вызове следующей кнопки
function handleNextQuestion() {
    checkForAnswer()
    unCheckRadioButtons()
    //задерживает отображение следующего вопроса на секунду
    setTimeout(() => {
        if (indexNumber <= 9) {
            NextQuestion(indexNumber)
        }
        else {
            handleEndGame()
        }
        resetOptionBackground()
    }, 1000);
}

//возвращает параметрам фона значение null после отображения правильных/неправильных цветов
function resetOptionBackground() {
    const options = document.getElementsByName("option");
    options.forEach((option) => {
        document.getElementById(option.labels[0].id).style.backgroundColor = ""
    })
}

//снятие всех переключателей для следующего вопроса
function unCheckRadioButtons() {
    const options = document.getElementsByName("option");
    for (let i = 0; i < options.length; i++) {
        options[i].checked = false;
    }
}

//функция для получения ответов на все вопросы
function handleEndGame() {
    let remark = null
    let remarkColor = null

    // результат оценки, цвет
    if (playerScore <= 3) {
        remark = "Плохой результат, продолжай практиковаться!"
        remarkColor = "red"
    }
    else if (playerScore >= 4 && playerScore < 7) {
        remark = "Средний результат, ты можешь добиться большего!"
        remarkColor = "orange"
    }
    else if (playerScore >= 7) {
        remark = "Отличный результат, продолжайте в том же духе!"
        remarkColor = "green"
    }
    const playerGrade = (playerScore / 10) * 100

    //данные для табло успеваемости
    document.getElementById('remarks').innerHTML = remark
    document.getElementById('remarks').style.color = remarkColor
    document.getElementById('grade-percentage').innerHTML = playerGrade
    document.getElementById('wrong-answers').innerHTML = wrongAttempt
    document.getElementById('right-answers').innerHTML = playerScore
    document.getElementById('score-modal').style.display = "flex"
}

//закрывает модель подсчета очков и перезапускает
function closeScoreModal() {
    questionNumber = 1
    playerScore = 0
    wrongAttempt = 0
    indexNumber = 0
    shuffledQuestions = []
    NextQuestion(indexNumber)
    document.getElementById('score-modal').style.display = "none"
}

//функция для закрытия режима предупреждения
function closeOptionModal() {
    document.getElementById('option-modal').style.display = "none"
}