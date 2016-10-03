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
 
     return template;
 }; 
 // Selecet elements that we want to populate with text dynamically
     var albumTitle = document.getElementsByClassName('album-view-title')[0];
     var albumArtist = document.getElementsByClassName('album-view-artist')[0];
     var albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0];
     var albumImage = document.getElementsByClassName('album-cover-art')[0];
     var albumSongList = document.getElementsByClassName('album-view-song-list')[0];
 

var setCurrentAlbum = function(album) {
     // Asign values to each part of the abbum (text,images)
     albumTitle.firstChild.nodeValue = album.title;
     albumArtist.firstChild.nodeValue = album.artist;
     albumReleaseInfo.firstChild.nodeValue = album.year + ' ' + album.label;
     albumImage.setAttribute('src', album.albumArtUrl);
 
     // #Clear contents pf aòbum song list container
     albumSongList.innerHTML = '';
 
     // #Build list of songs from album JavaScript object
     for (var i = 0; i < album.songs.length; i++) {
         albumSongList.innerHTML += createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
     }
 };
 
var songListContainer = document.getElementsByClassName('album-view-song-list')[0];
var songRows = document.getElementsByClassName('album-view-song-item');

var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';


window.onload = function() {
     setCurrentAlbum(albumPicasso);
    
       songListContainer.addEventListener('mouseover', function(event) {
  // Only target individual song rows during event delegation
         if (event.target.parentElement.className === 'album-view-song-item') {
              event.target.parentElement.querySelector('.song-item-number').innerHTML = playButtonTemplate;
         }
     });  
    
     for (var i = 0; i < songRows.length; i++) {
         songRows[i].addEventListener('mouseleave', function(event) {
            // Selects first child element, which is the song-item-number element
             this.children[0].innerHTML = this.children[0].getAttribute('data-song-number');
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

     

