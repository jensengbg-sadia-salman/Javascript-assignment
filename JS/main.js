

const API_URL = 'https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=69ab711ea16439dafed0a2b49ac0e865&extras=url_m&page=1&format=json&nojsoncallback=1&sort=relevance';


const form = document.querySelector('form');
const input =document.querySelector('input');
const error_mgs = document.querySelector('.errorMgs');
const select = document.querySelector('select');
const photoGallery =  document.querySelector('.images');
const loadingImg = document.querySelector('#loadingImg');
loadingImg.style.display = 'none';

//add eventlistener
form.addEventListener('submit', formSubmitted);
select.addEventListener('onchange', formSubmitted);



function formSubmitted(event){
    event.preventDefault();

    const searchTerm = input.value;
    const NumOfImg = select.value;
    
  
    //calling functions

    seacrhStart();
    search(searchTerm, NumOfImg)
    .then(displayImages);

}

               // Before Starting Search
function seacrhStart(){
  
    if(input.value == ""){
      input.style.border= "1px solid red";
      error_mgs.textContent = "Enter Your Search Query";
      return false;
    }else{
      error_mgs.textContent = "";
    }
  

loadingImg.style.display= "";
photoGallery.innerHTML = "";

 }
 


 // starting search
function search (searchTerm, NumOfImg){
    const url = `${API_URL}&text=${searchTerm}&per_page=${NumOfImg}`
    //console.log(url);
    
     return fetch(url)
    .then(response => response.json())
    .then(result =>{
        //console.log(result.photos.photo);

        return result.photos.photo;
    })   
}


// displaying Images
function displayImages(photo){
    photo.forEach(url =>{
       // console.log(url.url_m);
    const imageElement = document.createElement('img');
    imageElement.src = url.url_m;
    photoGallery.appendChild(imageElement);
    })

    loadingImg.style.display = 'none';

    // Light Box Code

const lightBox = document.createElement('div');
lightBox.id = 'lightbox'
document.body.appendChild(lightBox)



const images = document.querySelectorAll('img')

images.forEach(image =>{
image.addEventListener('click', e=>{

lightBox.classList.add('active');

const lightbox_img = document.createElement('img')
  lightbox_img.id = 'imge'
  lightbox_img.src = image.src

  while(lightBox.firstChild){
  lightBox.removeChild(lightBox.firstChild);
      }

   lightBox.appendChild(lightbox_img)
      })
    }) 

  lightBox.addEventListener('click', e=>{
      if(e.target !== e.currentTarget)return
    lightBox.classList.remove('active');
  })
}





