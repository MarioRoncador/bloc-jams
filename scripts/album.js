 var createSongRow = function(songNumber, songName, songLength) {
     var template =
        '<tr class="album-view-song-item">'
      + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
      + '  <td class="song-item-title">' + songName + '</td>'
      + '  <td class="song-item-duration">' + songLength + '</td>'
      + '</tr>'
      ;
 
      var $row = $(template);
     
   var clickHandler = function() {

     var songNumber = parseInt($(this).attr('data-song-number'));


    if (currentlyPlayingSongNumber !== null) {
         // Revert to song number for currently playing song because user started playing new song.

             var currentlyPlayingCell = getSongNumberCell(currentlyPlayingSongNumber);
             currentlyPlayingCell.html(currentlyPlayingSongNumber);
     }


    if (currentlyPlayingSongNumber !== songNumber) {
         // Switch from Play -> Pause button to indicate new song is playing.
         $(this).html(pauseButtonTemplate);
        setSong(songNumber);
        updatePlayerBarSong();
    } else if (currentlyPlayingSongNumber === songNumber) {
         // Switch from Pause -> Play button to pause currently playing song.
         $(this).html(playButtonTemplate);
         $('.main-controls .play-pause').html(playerBarPlayButton);
        currentlyPlayingSongNumber = null;
        currentSongFromAlbum = null;
     }

 };

 var onHover = function(event) {
     var songNumberCell = $(this).find('.song-item-number');
     var songNumber = parseInt(songNumberCell.attr('data-song-number'));

     if (songNumber !== currentlyPlayingSongNumber) {
         songNumberCell.html(playButtonTemplate);
     }
 };

 var offHover = function(event) {
     var songNumberCell = $(this).find('.song-item-number');
     var songNumber = parseInt(songNumberCell.attr('data-song-number'));

    if (songNumber !== currentlyPlayingSongNumber) {
        songNumberCell.html(songNumber);
     }
     console.log("songNumber type is " + typeof songNumber + "\n and currentlyPlayingSongNumber type is " + typeof currentlyPlayingSongNumber);
 };
     
     // #1
     $row.find('.song-item-number').click(clickHandler);
     // #2
     $row.hover(onHover, offHover);
     // #3
     return $row;
     
 }; 
 // Selecet elements that we want to populate with text dynamically
     var albumTitle = document.getElementsByClassName('album-view-title')[0];
     var albumArtist = document.getElementsByClassName('album-view-artist')[0];
     var albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0];
     var albumImage = document.getElementsByClassName('album-cover-art')[0];
     var albumSongList = document.getElementsByClassName('album-view-song-list')[0];
 

var setCurrentAlbum = function(album) {
     currentAlbum = album;
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

// ASSIGNMENT 19 FIRST FUNCTION
var setSong = function(songNumber){
    currentlyPlayingSongNumber = parseInt(songNumber);
    currentSongFromAlbum = currentAlbum.songs[songNumber - 1];; 
};
// ASSIGNMENT 19 SECOND FUNCTION
var getSongNumberCell = function(number){
    return $('.song-item-number[data-song-number="' + number + '"]');
};



 var trackIndex = function(album, song) {
     return album.songs.indexOf(song);
 };

var updatePlayerBarSong = function() {

    $('.currently-playing .song-name').text(currentSongFromAlbum.title);
    $('.currently-playing .artist-name').text(currentAlbum.artist);
    $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + " - " + currentAlbum.artist);
    $('.main-controls .play-pause').html(playerBarPauseButton);

};


var prevNextSong = function(instruction) {


	if (instruction === previousSong){
 		var getLastSongNumber = function(index) {
    	 return index == (currentAlbum.songs.length - 1) ? 1 : index + 2;
	 	};
	 	 var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
	     currentSongIndex--;
	     if (currentSongIndex < 0) {
		 currentSongIndex = currentAlbum.songs.length - 1;
         }
		
	}else if(instruction === nextSong){
	     var getLastSongNumber = function(index) {
    	 return index == 0 ? currentAlbum.songs.length : index;
		  };
		var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
	    currentSongIndex++;
		if (currentSongIndex >= currentAlbum.songs.length) {
            currentSongIndex = 0;
        }
		 
	}

	// Set a new current song
    currentlyPlayingSongNumber = currentSongIndex + 1;
    currentSongFromAlbum = currentAlbum.songs[currentSongIndex];

    // Update the Player Bar information
    $('.currently-playing .song-name').text(currentSongFromAlbum.title);
    $('.currently-playing .artist-name').text(currentAlbum.artist);
    $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + " - " + currentAlbum.title);
    $('.main-controls .play-pause').html(playerBarPauseButton);
    
    var lastSongNumber = getLastSongNumber(currentSongIndex);
    var $refSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber); // change
    var $lastSongNumberCell = $('.song-item-number[data-song-number="' + lastSongNumber + '"]');
    
    $refSongNumberCell.html(pauseButtonTemplate); //change
    $lastSongNumberCell.html(lastSongNumber);
    
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

var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
 var playerBarPlayButton = '<span class="ion-play"></span>';
 var playerBarPauseButton = '<span class="ion-pause"></span>';


var currentAlbum = null;
var currentlyPlayingSongNumber = null;
var currentSongFromAlbum = null;
var $previousButton = $('.main-controls .previous');
var $nextButton = $('.main-controls .next');

$(document).ready(function(){
    setCurrentAlbum(albumPicasso);
    $previousButton.click(prevNextSong(previousSong));
    $nextButton.click(prevNextSong(nextSong));
    }
 });
