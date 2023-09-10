const main = document.querySelector(".main"),
image = main.querySelector(".image img"),
tname = main.querySelector(".track_name"),
tartist = main.querySelector(".track_details .track_artist"),
Audio = document.querySelector(".song"),
progress = main.querySelector('.progress'),
progress_bar = main.querySelector('.progress_bar'),
prev = main.querySelector('.prev_track span'),
fwd = main.querySelector('.fwd_track span'),
play = main.querySelector('.play span'),
currtime = main.querySelector('.curr_time'),
tottime = main.querySelector('.tot_time');

let index = 2;


window.addEventListener("load", ()=> {
    loadData(index);
    Audio.pauseSong();

    Audio.play();
});

function loadData(indexValue){
    tname.innerHTML = songs[indexValue - 1].name;
    tartist.innerHTML = songs[indexValue - 1].artist;
    image.src = "img/"+songs[indexValue - 1].image+".jpg";
    Audio.src = "music/"+songs[indexValue - 1].audio+".mp3";
};

play.addEventListener("click", ()=>{
    const isMusicPaused = main.classList.contains("paused");
    if(isMusicPaused){
        pauseSong();
    }
    else{ 
        playSong();
    }
});

function playSong(){
    main.classList.add("paused");
    play.innerHTML = "pause";
    Audio.play();
};

function pauseSong(){
    main.classList.remove("paused");
    play.innerHTML = "play_arrow";
    Audio.pause();
};

prev.addEventListener("click", ()=>{
    prevSong();
});

fwd.addEventListener("click", ()=>{
    fwdSong();
});

function prevSong(){
    index--;
    if(index <= 0){
        index = songs.length;
    }
    else{
        index = index;
    }
    loadData(index);
    playSong();
};

function fwdSong(){
    index++;
    if(index > songs.length){
        index = 1;
    }
    else{
        index = index;
    }
    loadData(index);
    playSong();
};

Audio.addEventListener("timeupdate", (e)=>{
   
    const initTime = e.target.currentTime;
    const finalTime = e.target.duration;
    let bar_width = (initTime / finalTime) * 100;

    progress_bar.style.width = bar_width+"%";


    progress.addEventListener("click", (e)=>{
        let progressValue = progress.clientWidth;
        let clickedOffsetX = e.offsetX;
        let audioDuration = Audio.duration;
       
        Audio.currentTime = ( clickedOffsetX / progressValue) * audioDuration;
      
      });

    Audio.addEventListener("loadeddata", ()=>{
        const audioDuration = Audio.duration;
        let durationMinute = Math.floor(audioDuration / 60);
        let durationSeconds = Math.floor(audioDuration % 60);
        
       if(durationSeconds < 10){
           durationSeconds = "0" + durationSeconds;
       }
        tottime.innerText = durationMinute +":"+ durationSeconds;

    });

    const currentTime =  Audio.currentTime;
    let currentMinute = Math.floor(currentTime / 60);
    let currentSeconds = Math.floor(currentTime % 60);
    
   if(currentSeconds < 10){
       currentSeconds = "0" + currentSeconds;
   }
    currtime.innerText = currentMinute +":"+ currentSeconds;


});




