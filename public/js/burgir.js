const mobileNav = document.querySelector("ul");
const burgerIcon = document.querySelector(".burger");



burgerIcon.addEventListener("click",function(){
    if(mobileNav.classList.toggle("active")){
        burgerIcon.classList.toggle("active");
        document.body.style.overflow = "hidden";
    }
    else{
        burgerIcon.classList.toggle("active");
        document.body.style.overflow = "auto";
    }
    
    
});