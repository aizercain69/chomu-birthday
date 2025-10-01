// === APP CONFIGURATION (MODIFIED) ===
const CONFIG = {
    friendName: "Taiba", 
    loginSecret: "chomu", 
    gallerySong: "voice.mp3",
    birthdaySong: "song.mp3", 
    videoEdits: [ 
        { videoSrc: "edits/1.mp4", caption: "WARNING: you might find these cringy, but these are some golden oness😭" },
        { videoSrc: "edits/2.mp4", caption: "back when u were obsessed with blood😭" },
        { videoSrc: "edits/3.mp4", caption: "who u tryna thirst trap bro wtff😶😶" },
        { videoSrc: "edits/4.mp4", caption: "W taiba🫡🫡" },
        { videoSrc: "edits/5.mp4", caption: "okay bruv🫢🫢" },
        { videoSrc: "edits/6.mp4", caption: "Khair Mubarak🫡" },
        { videoSrc: "edits/7.mp4", caption: "edits in traditionals asw😏" },
        { videoSrc: "edits/8.mp4", caption: "unfortunately we ran out of edits man, this is the last one😞😞" },
    ],
    art: [ 
        { imageSrc: "art/1.jpg", caption: "such wonderful journals😭😭" },
        { imageSrc: "art/2.jpg", caption: "the PSYCHOPATHIC era loll" },
        { imageSrc: "art/3.jpg", caption: "back then when you were obsessed with MGK🤭" },
        { imageSrc: "art/4.jpg", caption: "hope you find your peter parker😏😏" },
        { imageSrc: "art/5.jpg", caption: "I like how every journal has it's own theme, such creativity🫡🫡" },
        { imageSrc: "art/6.jpg", caption: "unfinished ganji chudail😝" },
        { imageSrc: "art/7.jpg", caption: "painter asww 😭😭" },
        { imageSrc: "art/8.jpg", caption: "W drawings in the back😆" },
        { imageSrc: "art/9.jpg", caption: "finished gangi chudail😭😭" },
        { imageSrc: "art/10.jpg", caption: "such perfection mannn🫡🫡" },
    ],
    gallery: [
        { image: "photos/1.jpg", caption: "dora the explorer😭" }, 
        { image: "photos/2.jpg", caption: "" },
        { image: "photos/3.jpg", caption: "did u see the fox ahh pose, lol" }, 
        { image: "photos/4.jpg", caption: "" },
        { image: "photos/5.jpg", caption: "" }, 
        { image: "photos/6.jpg", caption: "awwwww" },
        { image: "photos/7.mp4", caption: "" }, 
        { image: "photos/8.jpg", caption: "cool kids😖😖" },
        { image: "photos/9.jpg", caption: "mumma jiiii😭" }, 
        { image: "photos/10.jpg", caption: "" },
        { image: "photos/11.jpg", caption: "" }, 
        { image: "photos/12.mp4", caption: "" },
        { image: "photos/13.jpg", caption: "" }, 
        { image: "photos/14.mp4", caption: "" },
        { image: "photos/15.jpg", caption: "ngl u look better with dis filter😝" },
        { image: "photos/16.jpg", caption: "" },
        { image: "photos/17.jpg", caption: "" },
        { image: "photos/18.jpg", caption: "" },
        { image: "photos/19.mp4", caption: "" },
        { image: "photos/20.mp4", caption: "" },
    ],
    // Unchanged sections
    notepadMessages: ["       Such an amazing person you are, with amaing talents. In the beginning, when u added me randomly on snap, I was like well who is this and why u tryna add me bro, coz I had like a smaller friend circle and only knew few juniors. but when we like texted each other almost every day talking abt random stuff, I thought u must be a cool person irl but I wasn't that lucky 😭😭. And yes we've known each other for years atp and I literally saw u mature emotionally (based on the edits u did 3yrs, don't judge me bro 😅), but the core TAIBA is still in there 😭😭, lol. But idk what happ recently, maybe you got busy with college or you're tired from college, we haven't been talking that much lately. as in the convo js doesn't feel lively and yk exciting or smtg. it's the same old abt wyd-nmm how ws yo day bla bla bla... I mean I'm not blaming you or smtg coz we js get busy sometimes and I get that. My concern is that we MIGHT reach a point where we just stop texting each other(not willingly, but unknowingly). So yes before that happens I just wanna say thank god we became friends, had phun the whole time I texted ya, lol."],
    birthdayMessage: "HAPPY BIRTHDAY CHOMUUUUU 🥳🥳😭😭😭. HAVE A LOT OF PHUN MACHA, you just turned 18😏 there's still lot more left to do and a lot more life to live. gosh why do I sound so emotional, js have fun bro 😭😭🙏🏾🙏🏾🙏🏾 and yes don't forget to eat well and may your dust allergy leave ya 🗣🗣🗣.",
    credits: `Thank you for being here! And a special thanks for being an incredible friend.`
};

// === GLOBAL VARIABLES ===
let currentVideoIndex = 0, currentArtIndex = 0, currentGalleryIndex = 0;
let nextPageAfterPopup = '';
let gallerySong = new Audio();
let typeItInstance = null;
let notepadTyped = false;

// === PAGE NAVIGATION & POP-UP LOGIC ===
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => { page.style.display = 'none'; });

    const activePage = document.getElementById(pageId);
    if (activePage) {
        // Pause all media when changing pages
        document.querySelectorAll('audio, video').forEach(media => media.pause());

        activePage.style.display = 'block';
        if (pageId === 'birthday-page' || pageId === 'gallery-page') {
             activePage.style.display = 'flex';
        }

        // Call setup function for the specific page
        const pageSetups = {
            'video-edits-page': setupVideoEditsPage,
            'art-page': setupArtPage,
            'guess-voice-page': setupGuessVoicePage,
            'gallery-page': setupGalleryPage,
            'notepad-page': setupNotepadPage,
            'birthday-page': setupBirthdayPage,
            'credits-page': setupCreditsPage
        };
        if (pageSetups[pageId]) pageSetups[pageId]();
    }
}

function showPopup(message, buttonTheme) {
    const popup = document.getElementById('transition-popup');
    document.getElementById('popup-message').textContent = message;

    document.querySelectorAll('.popup-action-button').forEach(btn => btn.style.display = 'none');

    const themedButton = document.getElementById(`popup-${buttonTheme}-button`);
    if (themedButton) {
        themedButton.style.display = 'inline-block';
        nextPageAfterPopup = themedButton.getAttribute('data-next');
    }

    popup.style.display = 'flex';
}

// === PAGE SETUP FUNCTIONS ===
function setupVideoEditsPage() {
    const player = document.getElementById('video-player');
    const captionEl = document.getElementById('video-caption');
    const nextSectionButton = document.querySelector('#video-edits-page .generic-next-section-button');
    const nextButton = document.getElementById('next-video-button');

    function updateVideo() {
        const item = CONFIG.videoEdits[currentVideoIndex];
        player.src = item.videoSrc;
        captionEl.textContent = item.caption;
        
        nextSectionButton.style.display = (currentVideoIndex === CONFIG.videoEdits.length - 1) ? 'inline-block' : 'none';
        nextButton.style.display = (currentVideoIndex === CONFIG.videoEdits.length - 1) ? 'none' : 'inline-block';
    }
    document.getElementById('prev-video-button').onclick = () => { 
        currentVideoIndex = (currentVideoIndex - 1 + CONFIG.videoEdits.length) % CONFIG.videoEdits.length;
        updateVideo(); 
    };
    nextButton.onclick = () => { currentVideoIndex++; updateVideo(); };
    updateVideo();
}

function setupArtPage() { // Renamed from setupPoetryPage
    const imageEl = document.getElementById('art-image');
    const captionEl = document.getElementById('art-caption');
    const nextSectionButton = document.querySelector('#art-page .generic-next-section-button');
    const nextButton = document.getElementById('next-art-button');

    function updateArt() {
        const item = CONFIG.art[currentArtIndex];
        imageEl.src = item.imageSrc;
        captionEl.textContent = item.caption;
        
        nextSectionButton.style.display = (currentArtIndex === CONFIG.art.length - 1) ? 'inline-block' : 'none';
        nextButton.style.display = (currentArtIndex === CONFIG.art.length - 1) ? 'none' : 'inline-block';
    }
    document.getElementById('prev-art-button').onclick = () => { 
        currentArtIndex = (currentArtIndex - 1 + CONFIG.art.length) % CONFIG.art.length;
        updateArt(); 
    };
    nextButton.onclick = () => { currentArtIndex++; updateArt(); };
    updateArt();
}

function setupGuessVoicePage() {
    const audio = document.getElementById('voice-guess-audio');
    const errorMessage = document.getElementById('voice-guess-error');
    
    document.getElementById('play-voice-button').onclick = () => audio.play();
    
    // Assumes the "YOU?" button has the id 'correct-voice-option'
    document.getElementById('correct-voice-option').onclick = () => {
        audio.pause();
        errorMessage.style.display = 'none';
        showPopup("Correct! Now let's have a look at the person who has all these amazing talents.", 'gallery');
    };

    // Assumes the "ME?" button has the id 'wrong-voice-option'
    document.getElementById('wrong-voice-option').onclick = () => {
        errorMessage.style.display = 'block';
        setTimeout(() => { errorMessage.style.display = 'none' }, 3000);
    };
}

function setupGalleryPage() {
    // Stop the voice audio when moving to gallery
    const voiceAudio = document.getElementById('voice-guess-audio');
    if (voiceAudio) {
        voiceAudio.pause();
    }
    
    gallerySong.src = CONFIG.gallerySong;
    gallerySong.loop = true;
    gallerySong.play().catch(e => console.error("Gallery song error:", e));

    const galleryImage = document.getElementById('gallery-image');
    const galleryVideo = document.getElementById('gallery-video');
    const galleryCaption = document.getElementById('gallery-caption');
    const nextSectionButton = document.querySelector('#gallery-page .generic-next-section-button');
    const nextButton = document.getElementById('next-gallery-button');

    function updateGallery() {
        const item = CONFIG.gallery[currentGalleryIndex];
        const isVideo = item.image.endsWith('.mp4');
        
        galleryVideo.style.display = isVideo ? 'block' : 'none';
        galleryImage.style.display = isVideo ? 'none' : 'block';

        if (isVideo) {
            galleryVideo.src = item.image;
            if (!gallerySong.paused) gallerySong.pause();
        } else {
            galleryImage.src = item.image;
            if (gallerySong.paused) gallerySong.play();
        }
        
        // Handle caption visibility
        if (item.caption && item.caption.trim() !== '') {
            galleryCaption.textContent = item.caption;
            galleryCaption.style.display = 'block';
        } else {
            galleryCaption.textContent = '';
            galleryCaption.style.display = 'none';
        }
        
        nextSectionButton.style.display = (currentGalleryIndex === CONFIG.gallery.length - 1) ? 'inline-block' : 'none';
        nextButton.style.display = (currentGalleryIndex === CONFIG.gallery.length - 1) ? 'none' : 'inline-block';
    }
    document.getElementById('prev-gallery-button').onclick = () => { 
        currentGalleryIndex = (currentGalleryIndex - 1 + CONFIG.gallery.length) % CONFIG.gallery.length;
        updateGallery(); 
    };
    nextButton.onclick = () => { currentGalleryIndex++; updateGallery(); };
    updateGallery();
}


// === UNCHANGED SETUP FUNCTIONS ===
function setupNotepadPage() {
    const continueButton = document.getElementById('notepad-continue-button');
    const notepadTextEl = document.getElementById('notepad-text');
    if (notepadTyped) {
        continueButton.classList.remove('opacity-0');
        return;
    }
    notepadTextEl.innerHTML = '';
    continueButton.classList.add('opacity-0');
    if (typeItInstance) {
        typeItInstance.destroy();
        typeItInstance = null;
    }
    typeItInstance = new TypeIt("#notepad-text", {
        speed: 60, lifeLike: true, waitUntilVisible: true,
        afterComplete: () => {
            continueButton.classList.remove('opacity-0');
            notepadTyped = true;
        }
    });
    CONFIG.notepadMessages.forEach(msg => {
        typeItInstance.type(msg).break().pause(500);
    });
    typeItInstance.go();
}

function setupBirthdayPage() {
    const birthdayAudio = document.getElementById('birthday-song');
    birthdayAudio.play().catch(e => console.log("Birthday song failed:", e));
    runConfetti(); // This will now trigger the new confetti animation
    document.getElementById('birthday-message').textContent = `"${CONFIG.birthdayMessage}"`;
}

function setupCreditsPage() {
    document.getElementById('credits-message').textContent = CONFIG.credits;
    const birthdayAudio = document.getElementById('birthday-song');
    if (!birthdayAudio.paused) {
        let vol = 1;
        const fadeOut = setInterval(() => {
            if (vol > 0.1) { vol -= 0.1; birthdayAudio.volume = vol; } 
            else { birthdayAudio.pause(); birthdayAudio.currentTime = 0; birthdayAudio.volume = 1; clearInterval(fadeOut); }
        }, 100);
    }
}

// MODIFIED: New confetti animation
function runConfetti() {
    const duration = 10 * 1000;
    const animationEnd = Date.now() + duration;

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        // Launch confetti from a random position at the top
        confetti({
            particleCount,
            startVelocity: 0,
            spread: 90,
            origin: { x: randomInRange(0.2, 0.8), y: -0.2 },
            gravity: 0.3 // Makes it fall slower
        });
    }, 250);
}


// === INITIALIZATION ===
document.addEventListener('DOMContentLoaded', () => {
    showPage('login-page');
    document.getElementById('login-title').textContent = `A Journey for ${CONFIG.friendName}`;
    const unlockButton = document.getElementById('unlock-button');
    const secretInput = document.getElementById('secret-word-input');
    const errorMessage = document.getElementById('error-message');
    
    // MODIFIED LOGIN LOGIC
    const handleLogin = () => {
        if (secretInput.value === CONFIG.loginSecret) { 
            // Show the new edits prompt instead of the old history page
            document.getElementById('login-page').style.display = 'none';
            document.getElementById('edits-prompt-popup').style.display = 'flex';
        } else { 
            errorMessage.style.display = 'block'; 
            setTimeout(() => errorMessage.style.display = 'none', 4000); 
        }
    };

    unlockButton.addEventListener('click', handleLogin);
    secretInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') handleLogin(); });

    // Event listener for the new "Why Not" button
    document.getElementById('start-edits-button').addEventListener('click', () => {
        document.getElementById('edits-prompt-popup').style.display = 'none';
        showPage('video-edits-page');
    });

    // Event listener for the generic popup buttons
    document.querySelectorAll('.popup-action-button').forEach(button => {
        button.addEventListener('click', () => {
            document.getElementById('transition-popup').style.display = 'none';
            if (nextPageAfterPopup) {
                showPage(nextPageAfterPopup);
                nextPageAfterPopup = '';
            }
        });
    });

    // Event listener for buttons that trigger the generic popup
    document.querySelectorAll('.next-section-button-trigger').forEach(button => {
        button.addEventListener('click', () => {
            const popupMessage = button.getAttribute('data-popup');
            const buttonTheme = button.getAttribute('data-buttontheme');
            if (popupMessage) {
                showPopup(popupMessage, buttonTheme);
            }
        });
    });

    // General navigation buttons for pages like notepad, birthday, etc.
    document.querySelectorAll('button[data-next]:not(.next-section-button-trigger)').forEach(button => {
        button.addEventListener('click', () => {
            const nextPage = button.getAttribute('data-next');
            showPage(nextPage);
        });
    });
});