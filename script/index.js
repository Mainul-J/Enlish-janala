function removeActive (){
    const clickBtns = document.getElementsByClassName('active');
    for (const btn of clickBtns) {
        btn.classList.remove('active')
    }
}

//loading 
function showLoader(){
  document.getElementById("loader").classList.remove("hidden");
}

function hideLoader(){
  document.getElementById("loader").classList.add("hidden");
}

// pronounceWord
function pronounceWord(word) {
    console.log(word);
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}


// alert('hello');
console.log('connected...');
document.getElementById('navbar').style.display = 'none';
document.getElementById('learn-vocabularies').style.display ='none';
document.getElementById('faq-section').style.display = 'none';
document.getElementById('display-card').style.display = 'none';
document.getElementById('footer').style.display = 'none';
document.getElementById('btn-login').addEventListener('click',function(){
    const password =document.getElementById('login-password').value;
    // console.log(password);
    const userName =document.getElementById('user').value;
    if (userName != '') {
        if (password.length === 6 && password == "123456") {
            // console.log(`ok`);
            // hide by style 
            document.getElementById('banner').style.display = "none";
            document.getElementById('navbar').style.display = "block";
            document.getElementById('learn-vocabularies').style.display ='block';
            document.getElementById('faq-section').style.display = 'block';
            document.getElementById('display-card').style.display = 'block';
            document.getElementById('footer').style.display = 'block';
            document.body.style.background = "#F0F4F8"
            loadVocabulariesBtn()
            // hide by class
            // document.getElementById('banner').classList.add('hidden')
        }
        else{
            alert('password is wrong')
        }
    }
    else{
        console.log('user input is invalid');
    }
});

//load data learn vocabularies 

const loadVocabulariesBtn = async() =>{
 const res = await fetch('https://openapi.programming-hero.com/api/levels/all')

const data = await res.json();

displayLessonsBtn(data.data);
}

// load vocabularies word

const loadWordByLevel =async(id) =>{
showLoader();

const url =`https://openapi.programming-hero.com/api/level/${id}`;
console.log(id);
// console.log(url);
    const res = await fetch(url);
    const data = await res.json();
    removeActive();
    document.getElementById(`btn-${id}`).classList.add('active')
    // console.log(data.data);
    displayWords(data.data);
    hideLoader();
}

const loadDetails =async (id) => {
    console.log(id);
    const url = `https://openapi.programming-hero.com/api/word/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    showDetails(data.data);

}

// display load data from Vocabularies

const displayLessonsBtn = (buttons) =>{
    console.log(buttons);
    const lessonContainer = document.getElementById("Lessons-container")
    buttons.forEach(button => {
        const div = document.createElement('div')
        div.innerHTML = `
        <button id="btn-${button.level_no}" onclick="loadWordByLevel(${button.level_no})" class="btn btn-outline btn-primary">lesson-${button.level_no}</button>
        `;
        lessonContainer.append(div);
    });
};


// display words in section of id{lesson-card-section}

const displayWords = (words) =>{
    // console.log(words);
    const cardContainer = document.getElementById('lesson-card-section');
    cardContainer.innerHTML = " "
    if (words.length < 1){
        cardContainer.innerHTML=`
        <div class="justify-center items-center bg-gray-100 w-full shadow-sm  col-span-full mx-auto">
    <div class="flex flex-col justify-center items-center py-5 space-y-4">
  <img src="./assets/alert-error.png" alt="">
    <h1 class="text-sm text-slate-500">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</h1>
<h1 class="text-3xl">নেক্সট Lesson এ যান</h1>
    </div>
</div>
        `;
        return ;
    }
     words.forEach(word => {
        console.log(word);
        const div = document.createElement('div');
        div.innerHTML =`
        <div class="card bg-blue-300 ">
  <div class="card-body items-center text-center text-bg-text">
    <h2 class="card-title">${word.word}!</h2>
    <h2 class="card-title">Meaning / Pronunciation</h2>
    
    <h2 class="card-title">${word.meaning} / ${word.pronunciation}</h2>
  </div>
   <div class="flex justify-between items-center px-1 py-1">
    <button onclick="loadDetails(${word.id})" class="btn bg-blue-100"><i class="fa-solid fa-info"></i></button>
    <button onclick="pronounceWord('${word.word}')" class="btn bg-blue-100"><i class="fa-solid fa-volume-high"></i></i></button>
    
   </div>
  </div>
`;
cardContainer.append(div);
    });
    
};

const showDetails=(details)=>{
console.log(details);
const modalContainer = document.getElementById('modal-box');
modalContainer.innerHTML ="";
document.getElementById('my_modal_5').showModal();
const div = document.createElement('div')
div.innerHTML = `
<div class="bg-base-100 ">
    <div class="flex flex-col justify-center items-center shadow-sm p-2 space-y-4 rounded">
      <h1 class="">word: ${details.word? details.word:''}</h1>
      <p class="">pronunciation : ${details.pronunciation? details.pronunciation: ''}</p>
    <h1 class="">meaning: ${details.meaning? details.meaning: 'N/A'}</h1>
    <p class="">part of space : ${details.partsOfSpeech? details.partsOfSpeech: ''}</p>
    <p class="">sentence : ${details.sentence? details.sentence : 'N/A'}</p>
    <p class="">synonyms : ${details.synonyms}</p>
    </div>
    <button id="compleat-${details.id}"  onclick="clickButtons('compleat-${details.id}')" class="btn btn-primary mt-5">compleat learning</button>
</div>
`;
modalContainer.append(div)
}


const clickButtons = (id) =>{
    const buttonId = document.getElementById(id);
    if (buttonId && !buttonId.disabled){
        buttonId.disabled = true;
    }
        
    }
