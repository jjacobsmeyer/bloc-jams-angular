(function() {
    function SongPlayer(Fixtures) {
        var SongPlayer = {};
        
        /**
        * @desc Current Album is storing the album information
        * @type {Object} album
        */
        
        var currentAlbum = Fixtures.getAlbum();
        
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
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
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
            return currentAlbum.songs.indexOf(song);
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
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            } 
            else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };
        
        return SongPlayer;
    }
    
    angular
        .module('blocJams')
        .factory('SongPlayer', SongPlayer);
})();