const commandInput = document.getElementById('commandInput');
const speakButton = document.getElementById('speakButton');
const listenButton = document.getElementById('listenButton');
const response = document.getElementById('response');

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const SpeechGrammarList = window.SpeechGrammarList || window.webkitSpeechGrammarList;
const SpeechRecognitionEvent = window.SpeechRecognitionEvent || window.webkitSpeechRecognitionEvent;

if (!SpeechRecognition) {
    response.textContent = "Sorry, your browser does not support speech recognition.";
} else {
    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript;
        commandInput.value = transcript;
        processCommand(transcript);
    };

    recognition.onerror = function(event) {
        response.textContent = "Speech recognition error detected: " + event.error;
    };

    listenButton.addEventListener('click', () => {
        recognition.start();
        response.textContent = "Newbie: Listening...";
    });

    speakButton.addEventListener('click', () => {
        const command = commandInput.value;
        if (command) {
            processCommand(command);
        }
    });

    commandInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            const command = commandInput.value;
            if (command) {
                processCommand(command);
            }
        }
    });
}

function speak(text) {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.volume = currentVolume;
    synth.speak(utterance);
}

let currentVolume = 1;

function processCommand(command) {
    command = command.toLowerCase();
    if (command.includes('hello')) {
        speak('Hello! How can I help you?');
        response.textContent = 'Newbie: Hello! How can I help you?';
    } else if (command.includes('hi')) {
        speak('Hello! How can I help you?');
        response.textContent = 'Newbie: Hello! How can I help you?';
    } else if (command.includes("what is your name")) {
        speak('My name is newbie');
        response.textContent = 'My name is newbie';
    } 
    else if (command.includes('time')) {
        const now = new Date();
        const time = now.toLocaleTimeString();
        speak(`The current time is ${time}`);
        response.textContent = `Newbie: The current time is ${time}`;
    }else if (command.includes('open youtube')) {
        speak("Opening youtube");
        response.textContent = `Newbie: Opening Youtube`;
        window.open('https://www.youtube.com', '_blank');
    }else if (command.includes('open facebook')) {
        speak("Opening facebook");
        response.textContent = `Newbie: Opening Facebook`;
        window.open('https://www.facebook.com', '_blank');
    } else if (command.includes('search')) {
        const query = command.replace('search', '').trim();
        if (query) {
            speak(`Searching for ${query}`);
            response.textContent = `Newbie: Searching for ${query}`;
            window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, '_blank');
        } else {
            speak("Please provide a search query.");
            response.textContent = "Newbie: Please provide a search query.";
        }
    }else if (command.startsWith('play ')) {  
        const videoQuery = command.replace('play ', '').trim();  
        if (videoQuery) {  
            speak(`Playing ${videoQuery}on YouTube`);  
            response.textContent = `Newbie: Playing ${videoQuery} on YouTube`;   
            window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(videoQuery)}`, '_blank');  
        } else {  
            speak("Please provide a video title to play.");  
            response.textContent = "Newbie: Please provide a video title to play.";  
        }
    }else if (command.includes('open instagram')) {
        speak("Opening instagram");
        response.textContent = `Newbie: Opening Instagram`;
        window.open('https://www.instagram.com', '_blank');    
    } else if (command.includes('exit')) {
        speak('Goodbye! see you next time!');
        response.textContent = 'Newbie: Goodbye! see you next time!';
    } 
    else if (command.includes('set volume to')) {
        const audioQuery = parseInt(command.replace('set volume to', '').trim());
        if (audioQuery <= 100 && audioQuery >= 0) {
            currentVolume = audioQuery/100;
            speak(`setting the volume to ${audioQuery}%`);
            response.textContent = `setting the volume into ${audioQuery}%`;
        } else{
            speak("Please provide a volume percentage between 0 and 100.");
            response.textContent = "Newbie: Please provide a volume percentage between 0 and 100.";
        }
    } 
    else {
        speak("I'm sorry, I didn't understand that command.");
        response.textContent = "Newbie: I'm sorry, I didn't understand that command.";
    }
    commandInput.value = '';

}
