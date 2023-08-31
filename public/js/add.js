const tile1 = document.querySelectorAll('.tile1');
const kropki = document.querySelector('.icon2')


//3KROPKI

const modalKropki = (body) => {
    return `<div class="modal-kropki">
    <!--<button class="modal-close-icon"><i class="modal-title-icon" data-feather="x"></i></button>-->
    <!--<p class="modal-title">
        ${body.title}
    </p>!-->
    <p class="modal-description">
        <!--${body.description}!-->
    </p>
    <div class="btn-kropki">
        <button class="modal-accept"><ion-icon class="icon-kropki" name="log-out-outline"></ion-icon>
            <a href="/logout">Wyloguj</a>
        </button>
        <a href="highScores.html"><button class="btn-kropki-highscore"><ion-icon class="icon-kropki" name="trophy-outline"></ion-icon>Lista wyników </button></a>
    </div>
    </div>`
};

const createModalKropki = (value) =>{
    const modalContainerKropki = document.createElement("div");
    modalContainerKropki.className = "modal-container-kropki";
    modalContainerKropki.innerHTML = modalKropki(value);
    document.body.appendChild(modalContainerKropki);


    //WYŁĄCZANIE "x" DIVA   
    /*const closeIcon = document.querySelector(".modal-close-icon");

    closeIcon.addEventListener("click", () => {
        const modal = document.querySelector(".modal-container");
        modal.remove();
        document.body.style.overflow = "auto";
    });*/

    const modalActiveCointainerKropki = document.querySelector(".modal-container-kropki");
    modalActiveCointainerKropki.addEventListener("click", (e) => {
        if(e.target.classList.contains('modal-container-kropki')){
            e.target.remove();
            document.body.style.overflow = "auto";
        }
        
    })

    feather.replace();
    document.body.style.overflow = "hidden";
};

const showKropki = () =>{
    createModalKropki({
        title: "Wybierz opcję",
        description: "W budowie!!!",
    }); 
};
kropki.addEventListener("click", showKropki);


