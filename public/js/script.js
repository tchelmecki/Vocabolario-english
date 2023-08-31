const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById("progressBarFull");
const loader = document.getElementById("loader");
const game = document.getElementById("container2");
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
const startG1 = document.querySelector(".startG1");

let questions = [];

fetch('/public/js/questions.json')
    .then((res) => {
        return res.json();
    })
    .then((loadedQuestions) => {
        questions = loadedQuestions;
        startGame();
    })
    .catch((err) => {
        console.error(err);
    });

/* Do testu
fetch("https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple")
    .then(res=>{
        return res.json();
    })
    .then(loadedQuestions => {
        console.log(loadedQuestions.results);
        questions = loadedQuestions.results.map(loadedQuestion => {
            const formattedQuestion = {
                question: loadedQuestion.question
            };
            const answerChoices = [...loadedQuestion.incorrect_answers];
            formattedQuestion.answer = Math.floor(Math.random()*3)+1;
            answerChoices.splice(formattedQuestion.answer -1,0,
                loadedQuestion.correct_answer);
            
                answerChoices.forEach((choice, index) => {
                    formattedQuestion["choice" + (index+1)] = choice;
                })
            return formattedQuestion;
        })
        startGame();
    })
    .catch(err => {
        console.error(err);
    });*/
    

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 4;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [ ... questions];
    getNewQuestion();
    game.classList.remove("hidden");
    loader.classList.add("hidden");
};

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter>=MAX_QUESTIONS){
        localStorage.setItem("mostRecentScore", score);
        //go to the end page
        return window.location.assign("/end");
    }
    questionCounter++;
    progressText.innerText = `${(questionCounter/MAX_QUESTIONS)*100}%`;

    //UPDATE THE PROGRESS BAR
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS)*100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach( choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion["choice" + number];
    });

    availableQuestions.splice(questionIndex,1);
    acceptingAnswers = true;
};


choices.forEach(choice => {
    choice.addEventListener('click', e =>{
        if(!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        /*const classToApply = 'incorrect';
            if(selectedAnswer == currentQuestion.answer){
                classToApply = 'correct';
            }
        */
        const classToApply 
        = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        if(classToApply === "correct"){
            incrementScore(CORRECT_BONUS);
        }

        
        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout( ()=> {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000); 

       
    });

    incrementScore = num => {
        score += num;
        scoreText.innerText = score;
    }
});

/*WYSYŁANIE DO HTML NAZW KATEGORII ZA POMOCA JSON*/

/*fetch('/public/js/words.json')
  .then(response => response.json())
  .then(data => {
    const categoriesContainer = document.querySelector('.tiles');

    // Tworzenie elementu HTML dla każdej kategorii słów
      data.categories.forEach(category => {
      const categoryDiv = document.createElement('div');
      categoryDiv.classList.add('tile1');
      categoryDiv.textContent = category.name;
      categoryDiv.className = "tile1";
      
       
      // Dodanie liczby słów w kategorii
      const categoryCount = document.createElement('span');
      categoryCount.textContent = `słów: ${category.words.length} `;
      categoryCount.className = "categoryCount";
      categoryDiv.appendChild(categoryCount);

      // Dodawanie ikony kategorii
      const icon = document.createElement('img');
      icon.className = "icon-category";
      icon.src = category.icon;
      categoryDiv.appendChild(icon);


      // Dodawanie utworzonego elementu kategorii do kontenera
      categoriesContainer.appendChild(categoryDiv);
      const startG1 = document.createElement('a');
      startG1.className = "startG1"
      startG1.addEventListener("click", (event)=>{
        event.stopPropagation();
        createModal({
            title: 'Wybierz mini grę',
            description: ''
          });
      }); // dodanie obsługi zdarzenia "click"
      //startG1.setAttribute('href', 'miniGame1.html');
      categoryDiv.appendChild(startG1);

      // Dodanie obsługi zdarzenia kliknięcia dla każdej kategorii
      categoryDiv.addEventListener('click', (startG1) => {
        startG1.stopPropagation();
        // Przekierowanie do strony words.html z wybraną kategorią w adresie URL
      window.location.href = `words=${encodeURIComponent(category.name)}`;
      });
    });
  })
  .catch(error => console.error('Błąd ładowania pliku JSON:', error));*/


//KAFELEK
const modal = (body) => {
    return `<div class="modal">
    <!--<button class="modal-close-icon"><i class="modal-title-icon" data-feather="x"></i></button>-->
    <p class="modal-title">
        ${body.title}
    </p>
    <p class="modal-description">
        <!--${body.description}!-->
    </p>
    <div class="modal-buttons">
        <a href="/miniGame1"><button class="modal-accept">Zaznacz odpowiedź</button></a>
        <a href="/miniGame2"><button class="modal-accept">Układanie słów</button></a>
        <a href="/miniGame3"><button class="modal-accept">Wpisz słowo</button></a>
        <a href="#"><button class="modal-accept">TEST</button></a>
    </div>
    </div>`
};

const createModal = (value) =>{
    const modalContainer = document.createElement("div");
    modalContainer.className = "modal-container";
    modalContainer.innerHTML = modal(value);
    document.body.appendChild(modalContainer);


    //WYŁĄCZANIE "x" DIVA   
    /*const closeIcon = document.querySelector(".modal-close-icon");

    closeIcon.addEventListener("click", () => {
        const modal = document.querySelector(".modal-container");
        modal.remove();
        document.body.style.overflow = "auto";
    });*/

    const modalActiveCointainer = document.querySelector(".modal-container");
    modalActiveCointainer.addEventListener("click", (e) => {
        if(e.target.classList.contains('modal-container')){
            e.target.remove();
            document.body.style.overflow = "auto";
        }
    })

    feather.replace();
    document.body.style.overflow = "hidden";
};

const showGames = () =>{
    createModal({
        title: "Wybierz rozgrywke",
        //description: "Lorem ipsum description",
    }); 
};




//startGame
startG1.addEventListener("click", (event)=>{
    event.stopPropagation();
    createModal({
        title: 'Wybierz mini grę',
        description: ''
      });
  }); // dodanie obsługi zdarzenia "click"
  //startG1.setAttribute('href', 'miniGame1.html');
  categoryDiv.appendChild(startG1);