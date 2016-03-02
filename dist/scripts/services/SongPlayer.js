(function() {
    function SongPlayer(Fixtures) {
        var SongPlayer = {};
        
        /**
        * @desc Current Album is storing the album information
        * @type {Object} album
        */
        
        SongPlayer.currentAlbum = Fixtures.getAlbum();
        
        /** 
        * @desc Buzz object audio file
        * @type {Object}
        */
        
        var currentBuzzObject = null;
        
        /** 
        * @function setSong
        * @desc Stops currently playing song and loads new audio file as currentBuzzObject
        * @param {Object} song
        */
        
        var setSong = function(song) {
            if (currentBuzzObject) {
                stopSong(SongPlayer.currentSong);
            }
            
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });
            
            SongPlayer.currentSong = song;
        };
        
        /** 
        * @function getSongIndex 
        * @desc returns the index of a song 
        * @params {Object} song index
        */
        
        var getSongIndex = function(song) {
            return SongPlayer.currentAlbum.songs.indexOf(song);
        };
        
         /** 
        * @desc assigning current song
        * @type {Object}
        */
        SongPlayer.currentSong = null;
        
        /** 
        * @function playSong 
        * @desc Plays currentBuzzObject (song) 
        * @param {Object} song
        */
        
        var playSong = function(song) {
            currentBuzzObject.play();
            song.playing = true;
        }
        
        var stopSong = function(song) {
            currentBuzzObject.stop();
            song.playing = null;
        }
        
        /** 
        * @function SongPlayer.play 
        * @desc Plays song on SongPlayer 
        * @param {Object} song 
        */
        
        SongPlayer.play = function(song) {
            song = song || SongPlayer.currentSong;
            if (SongPlayer.currentSong !== song) {
            setSong(song);  
            playSong(song);
            }
            else if (SongPlayer.currentSong === song) {
                if (currentBuzzObject.isPaused()) {
                    playSong(song);
                }
            }
        };
        
        /**
        * @function SongPlayer.pause 
        * @desc Pauses currentBuzzObejct, sets song.playing to false
        * @param {Object} song
        */
        
        SongPlayer.pause = function(song) {
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
        };
        
        /** 
        * @function SongPlayer.previous 
        * @desc goes to the previous song
        * @param {Object} song
        */
        
        SongPlayer.previous = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;
            
            if (currentSongIndex < 0) {
//                currentBuzzObject.stop();
//                SongPlayer.currentSong.playing = null;
                stopSong(SongPlayer.currentSong);
            } 
            else {
                var song = SongPlayer.currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };
        
        /**
        * @function SongPlayer.next 
        * @desc goes to the next song
        * @param {Object} song
        */
        
        SongPlayer.next = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;
            
            if (currentSongIndex < 5) {
                var song = SongPlayer.currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
            else {
//                currentBuzzObject.stop();
//                SongPlayer.currentSong.playing = null;
                stopSong(SongPlayer.currentSong);
            }
        };
        
        return SongPlayer;
    }
    
    angular
        .module('blocJams')
        .factory('SongPlayer', SongPlayer);
})();