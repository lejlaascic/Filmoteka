var movies=[{       
    title: 'The Lord of the Rings',
    actor: '	Viggo Mortensen',
    image: 'https://m.media-amazon.com/images/M/MV5BN2EyZjM3NzUtNWUzMi00MTgxLWI0NTctMzY4M2VlOTdjZWRiXkEyXkFqcGdeQXVyNDUzOTQ5MjY@._V1_.jpg',
    description: 'The continuing quest of Frodo and the Fellowship to destroy the One Ring. Frodo and Sam discover they are being followed by the mysterious Gollum. Aragorn, the Elf archer Legolas, and Gimli the Dwarf encounter the besieged Rohan kingdom, whose once great King Theoden has fallen under Sarumans deadly spell. Written by Jwelch5742'},
    {
        title: 'The Dark Knight',
        image: 'https://m.media-amazon.com/images/M/MV5BMTk4ODQzNDY3Ml5BMl5BanBnXkFtZTcwODA0NTM4Nw@@._V1_UY1200_CR90,0,630,1200_AL_.jpg',
        actor: 'Christian Bale',
        description: 'Despite his tarnished reputation after the events of The Dark Knight (2008), in which he took the rap for Dents crimes, Batman feels compelled to intervene to assist the city and its Police force, which is struggling to cope with Banes plans to destroy the city. Written by WellardRockard'
    },
    {
        title: 'Star Wars',
        image: 'https://i.kym-cdn.com/photos/images/newsfeed/001/555/890/09e.jpg',
        actor: 'Mark Hamill',
        description: 'Luke Skywalker, Han Solo, Princess Leia and Chewbacca face attack by the Imperial forces and its AT-AT walkers on the ice planet Hoth. While Han and Leia escape in the Millennium Falcon, Luke travels to Dagobah in search of Yoda. Only with the Jedi Masters help will Luke survive when the Dark Side of the Force beckons him into the ultimate duel with Darth Vader.'
    }];

    refreshView();
  
    // Klikom na dugme save pozivamo funkciju,na osnovu unosa u input polja pravimo objekat za svaki film,a zatim te objekte stavljamo u jedan prazan niz u kojem cemo cuvati nase objekte.
    function saveMovie(){
        var movie={
            title:getValue('title-film'),
            image:getValue('img-film'),
            actor:getValue('actor'),
            description:getValue('description')
        };
        movies.push(movie);
        refreshView();

    //Kreiramo listu i dodajemo filmove u tu listu
    var lista=document.getElementById('lista')
    lista.innerHTML = '';
    for(var movie of movies){
        var ul=document.createElement('ul');
        ul.className='ul-movie';
        var li=document.createElement('li');
        //dodjelimo id za svakog clana liste i postavimo da taj id bude index od svakog filma u nizu filmova
        li.id = `${movies.indexOf(movie)}`
        console.log(li)
        li.innerHTML=movie.title;
      
        ul.appendChild(li);
        lista.appendChild(ul);
    }
}

//Dugme za brisanje sadrzaja koje unosimo u input polja
function clearMovie(){
  var allClass=document.getElementsByClassName('film');
  for( var oneClass of allClass){
      oneClass.value='';
  }
}

//Funkcija za uzimanje id-eva input poja
function getValue(id){
    return document.getElementById(id).value;
}

//Funkcija koja kreira karticu za svaki film pokrece se ispunjavanjem inputa i klikom na dugne save,ovu funkciju pozivamo kada hocemo da osvjezimo prikaz
function refreshView(){
    var main=document.getElementById('main');
      main.innerHTML='';
    for(var i=0;i<movies.length;i++){
        var elm=movies[i]
    var card = document.createElement('div');
    card.className='card';
    card.id='card'
    var nameMovie=document.createElement('h2');
    nameMovie.innerHTML=elm.title;
    var imgMovie=document.createElement('img');
    imgMovie.src=elm.image;
    imgMovie.className='card-img'
    var actorMovie=document.createElement('p');
    actorMovie.innerHTML=elm.actor;
    var descriptionMovie=document.createElement('p');
    descriptionMovie.innerHTML=elm.description;
    descriptionMovie.style='font-size:0.8em'
    var delateBtn=document.createElement('button');
    delateBtn.innerHTML='Delate';
    delateBtn.className='delate'
    delateBtn.id=i;
    delateBtn.addEventListener('click',delateMovie)

    card.appendChild(nameMovie);
    card.appendChild(imgMovie);
    card.appendChild(actorMovie);
    card.appendChild(descriptionMovie);
    card.appendChild(delateBtn);
    main.appendChild(card);
    }
}
//funkcija za brisanje kartica
function delateMovie(evt){
    var index=evt.target.id;
    movies.splice(index,1);
    refreshView()
  //  console.log(movies)
}


//SEARCH-BAR

var search=document.getElementById('search');


//Pozivamo EventListener na focus odnosno kada se kursor nalazi unutar input polja search
search.addEventListener('focus',function(){
    var lista = document.getElementById('lista')
    lista.classList.remove('none')
})


//Pozivamo EventListener na blur odnosno kada se kursor nalazi izvan input polja search
search.addEventListener('blur',function(){
    var lista = document.getElementById('lista')
    lista.classList.add('none')
})


//Pozivamo EventListener kada pustimo tipku na tastaturi 
search.addEventListener('keyup',function(){

    //sve sto unosimo u search polje uzimamo mu vrijednost zatim pretvorimo sve u mala slova i pretvorimo u niz slova od unjetih slova
        var letter=search.value.toLowerCase().split('');
        for(var movie of movies){
            var index = true;
        //uzimamo sva slova iz naslova filmova iz naseg niza filmova pretvorimo ih u mala slova i zatim ih pretvorimo u niz slova
            var allLetterFromTittle=movie.title.toLowerCase().split('');
            //Prodemo petljom kroz tih slova
            for (let i = 0; i <= letter.length; i++) {
               if(letter.length < 1){
                var sviClanoviListe = document.querySelectorAll('li')
                //Druga petlja za sve clanove liste
                for (let j = 0; j < sviClanoviListe.length; j++) {
                    sviClanoviListe[j].classList.remove('none')
                }
                //ako ukucano slovo ne postoji  u nizu svih slova naslova
               } else if(i < letter.length && !allLetterFromTittle.includes(letter[i])){
                    document.getElementById(`${movies.indexOf(movie)}`).classList.add('none')
                    index = false;
                 //ako ukucano slovo  postoji  u nizu svih slova naslova
                }else if(i < letter.length && allLetterFromTittle.includes(letter[i]) && index){
                    document.getElementById(`${movies.indexOf(movie)}`).classList.remove('none')

                }
               
                
            }
        }
})


//Validacija

var validateInp=document.getElementsByClassName('film');
var saveBtn= document.getElementById('save');
var error = document.getElementById('error');

saveBtn.addEventListener('click',validateInput)
function validateInput(){
    for(var i=0;i<validateInp.length;i++){
        if(validateInp[i].value==''){
            error.classList.remove('none');
            error.innerHTML='Popunite sva polja za unos!!!';
        }
    }
}