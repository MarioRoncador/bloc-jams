// Example Album
 var albumPicasso = {
     title: 'The Colors',
     artist: 'Pablo Picasso',
     label: 'Cubism',
     year: '1881',
     albumArtUrl: 'assets/images/album_covers/01.png',
     songs: [
         { title: 'Blue', duration: '4:26' },
         { title: 'Green', duration: '3:14' },
         { title: 'Red', duration: '5:01' },
         { title: 'Pink', duration: '3:21'},
         { title: 'Magenta', duration: '2:15'}
     ]
 };
 
 // Another Example Album
 var albumMarconi = {
     title: 'The Telephone',
     artist: 'Guglielmo Marconi',
     label: 'EM',
     year: '1909',
     albumArtUrl: 'assets/images/album_covers/20.png',
     songs: [
         { title: 'Hello, Operator?', duration: '1:01' },
         { title: 'Ring, ring, ring', duration: '5:01' },
         { title: 'Fits in your pocket', duration: '3:21'},
         { title: 'Can you hear me now?', duration: '3:14' },
         { title: 'Wrong phone number', duration: '2:15'}
     ]
 };

// Biggie Album
 var albumBig = {
     title: 'Life After Death',
     artist: 'The Notorious B.I.G.',
     label: 'Bad Boy Entertainment',
     year: '1994',
     albumArtUrl: 'http://www.egotripland.com/wp-content/uploads/2012/03/Notorious_BIG-Life_After_Death1-e1331104684115.jpg',
     songs: [
         { title: 'Hypnotize', duration: '4:01' },
         { title: 'Fuck You Tonight', duration: '5:24' },
         { title: 'I Love The Dough', duration: '3:45'},
         { title: 'I Got A Story To Tell', duration: '3:18' },
         { title: 'Kick In The Door', duration: '3:15'}
     ]
 };

 var createSongRow = function(songNumber, songName, songLength) {
     var template =
        '<tr class="album-view-song-item">'
      + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
      + '  <td class="song-item-title">' + songName + '</td>'
      + '  <td class="song-item-duration">' + songLength + '</td>'
      + '</tr>'
      ;
 
      return $(template);;
 }; 
 // Selecet elements that we want to populate with text dynamically
     var albumTitle = document.getElementsByClassName('album-view-title')[0];
     var albumArtist = document.getElementsByClassName('album-view-artist')[0];
     var albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0];
     var albumImage = document.getElementsByClassName('album-cover-art')[0];
     var albumSongList = document.getElementsByClassName('album-view-song-list')[0];
 

var setCurrentAlbum = function(album) {
     // Asign values to each part of the abbum (text,images)
     var $albumTitle = $('.album-view-title');
     var $albumArtist = $('.album-view-artist');
     var $albumReleaseInfo = $('.album-view-release-info');
     var $albumImage = $('.album-cover-art');
     var $albumSongList = $('.album-view-song-list');
     $albumTitle.text(album.title);
     $albumArtist.text(album.artist);
     $albumReleaseInfo.text(album.year + ' ' + album.label);
     $albumImage.attr('src', album.albumArtUrl);
    
     $albumSongList.empty();
 
     // #Build list of songs from album JavaScript object
     for (var i = 0; i < album.songs.length; i++) {
          var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
         $albumSongList.append($newRow);
     }
 };


/*var findParentByClassName = function(element, targetClass) {
    if (element) {
        var currentParent = element.parentElement;
        while (currentParent.className != targetClass && currentParent.className !== null) {
            currentParent = currentParent.parentElement;
        }
        return currentParent;
    }
};*/




var findParentByClassName = function(element, classToFind){
    var rightParent = element.parentElement;
    while(rightParent.className !== classToFind && rightParent.className !== null){
        if(rightParent.className !== classToFind){
            alert("No parent found"); // CHECK IF PARENT EXISTS, IF IT DOESN'T ALERT "No parent found";
        }else if(rightParen.className === null ){
            alert("No parent found with that class name");
// FAILS TO FIND A PARENT WITH THE GIVEN CLASS NAME "No parent found with that class name",
        }
        rightParent = rightParent.parentElement;
       }
    return rightParent;
};

/* Correct code:

var findParentByClassName = function(element, classToFind){
    var rightParent = element.parentElement;
    while(rightParent.className !== classToFind && rightParent.className !== null){
        rightParent = rightParent.parentElement;
    }
    return rightParent;
};*/

var getSongItem = function(element){
    switch (element.className){
            case 'album-song-button':
        case 'ion-play':
        case 'ion-pause':
            return findParentByClassName(element, 'song-item-number');
        case 'album-view-song-item':
            return element.querySelector('.song-item-number');
        case 'song-item-title':
        case 'song-item-duration':
            return findParentByClassName(element, 'album-view-song-item').querySelector('.song-item-number');
        case 'song-item-number':
            return element;
        default:
            return;
    }
};

var clickHandler = function(targetElement) {
    var songItem = getSongItem(targetElement);
      if (currentlyPlayingSong === null) {
         songItem.innerHTML = pauseButtonTemplate;
         currentlyPlayingSong = songItem.getAttribute('data-song-number');
     } else if (currentlyPlayingSong === songItem.getAttribute('data-song-number')) {
         songItem.innerHTML = playButtonTemplate;
         currentlyPlayingSong = null;
     } else if (currentlyPlayingSong !== songItem.getAttribute('data-song-number')) {
         var currentlyPlayingSongElement = document.querySelector('[data-song-number="' + currentlyPlayingSong + '"]');
         currentlyPlayingSongElement.innerHTML = currentlyPlayingSongElement.getAttribute('data-song-number');
         songItem.innerHTML = pauseButtonTemplate;
         currentlyPlayingSong = songItem.getAttribute('data-song-number');
     }
 };
            
 

var songListContainer = document.getElementsByClassName('album-view-song-list')[0];
var songRows = document.getElementsByClassName('album-view-song-item');

var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';

var currentlyPlayingSong = null;

window.onload = function() {
     setCurrentAlbum(albumPicasso);
    
       songListContainer.addEventListener('mouseover', function(event) {
  // Only target individual song rows during event delegation
         if (event.target.parentElement.className === 'album-view-song-item') {
              event.target.parentElement.querySelector('.song-item-number').innerHTML = playButtonTemplate;
             
var songItem = getSongItem(event.target);

            if (songItem.getAttribute('data-song-number') !== currentlyPlayingSong) {
                songItem.innerHTML = playButtonTemplate;
            }
             
         }
     });  
    
     for (var i = 0; i < songRows.length; i++) {
         songRows[i].addEventListener('mouseleave', function(event) {
             var songItem = getSongItem(event.target);
             var songItemNumber = songItem.getAttribute('data-song-number');
 
             // #2
             if (songItemNumber !== currentlyPlayingSong) {
                 songItem.innerHTML = songItemNumber;
             }

         });
         songRows[i].addEventListener('click', function(event) {
             // Event handler call
             clickHandler(event.target);
         });
     }
     
     var albums = [albumPicasso,albumMarconi,albumBig];
     var index = 1;
     albumImage.addEventListener("click",function(event){

        setCurrentAlbum(albums[index]);
         index++;
         if (index == albums.length){
             index = 0;
         }
     });
 };
