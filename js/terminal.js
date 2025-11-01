const screen = document.getElementById("screen");

var currentLine = null;
var browser;
var username = "guest";
var historyPos = -1;

const HISTORY = [];
const COMMANDS = {
    help(args) {
        printf(`\n\nCommands:\n\n
            help: Show all the available commands,\n
            clear: Clear the terminal\n
            usermod: Changes the current user's name\n
            google: Searches the web using google\n
            duckduckgo: Searches the web using duckduckgo\n
            exit: Closes the terminal\n
            \n\n`);
    },
    clear() {
        screen.innerHTML = "";
    },
    usermod(args) {
        // Not currently being used, but it could be useful in the future (I think)
        const login = args[0];
        const oldName = args[1];

        const newName = args.slice(2).join(' ').trim()

        if (!newName || login != '-l' || oldName != username) {
            printf('\nUsage: usermod -l <old_name> <new_name>\n\n', 'error');
            return;
        }

        if (newName) {
            username = newName;
        }
    },
    google(args) {
        const search = args.join(' ');
        let googleSearchURL = `https://www.google.com/search?q=${search}`;
        window.open(googleSearchURL, '_blank');
    },
    duckduckgo(args) {
        const search = args.join(' ');
        let duckSearchURL = `https://www.duckduckgo.com/search?q=${search}`;
        window.open(duckSearchURL, '_blank');
    },
    whoami(){
        printf(username);
    },
    neofetch(){

        const line = document.createElement('div');
        const img = document.createElement('img');
        const text = document.createElement('span');
        
        line.className = 'neofetch';

        img.src = `./img/puterpeng.gif`;
        img.width = 250;

        text.innerHTML = 
        `
        OS: ${navigator.oscpu}\n <br>
        Host: ${browser}\n

        `;
        line.appendChild(img);
        line.appendChild(text);
        screen.appendChild(line);
    },
    exit() {
        window.open('', '_self'); 
        window.close();
    }
}


whichBrowser();
newLine();

document.addEventListener('keydown', (e) => {
    if (!currentLine) {
        return;
    }
    e.preventDefault();

    const userText = currentLine.text;
    if (e.key === 'Backspace') {
        // Deletes the last character from the terminal
        userText.textContent = userText.textContent.slice(0, -1);
        e.preventDefault();
    } else if (e.key.length === 1 && !e.ctrlKey) {
        // Adds every inputed character to the terminal
        userText.textContent += e.key;
    } else if (e.key === 'Enter') {
        currentLine.cursor.remove();
        runCmd(userText.textContent);
        newLine();
        e.preventDefault();
    } else if (e.ctrlKey && e.key.toLowerCase() === 'l') {
        e.preventDefault();
        currentLine.cursor.remove();
        let fun = COMMANDS["clear"];
        fun();
        newLine();
    } else if (e.key === 'ArrowUp'){
        if (HISTORY.length == 0){
            return;
        }
        historyPos = Math.max(0, historyPos-1);
        userText.textContent = HISTORY[historyPos];
        e.preventDefault();
    } else if (e.key === 'ArrowDown'){
        if (HISTORY.length == 0){
            return;
        }
        historyPos = Math.min(HISTORY.length, historyPos+1);
        userText.textContent = HISTORY[historyPos];
        e.preventDefault();
    }

})


function newLine() {
    const line = document.createElement('div');
    const prompt = document.createElement('span');
    const text = document.createElement('span');
    const cursor = document.createElement('span');

    line.className = 'line'

    prompt.className = 'prompt'
    prompt.textContent = `[${username}@${browser} ~]$  `

    text.className = 'input';

    cursor.className = 'cursor';
    cursor.textContent = '|';

    line.appendChild(prompt);
    line.appendChild(text);
    line.appendChild(cursor);
    screen.appendChild(line);
    currentLine = { line, text, cursor };

}

function printf(text, className = '') {
    const print = document.createElement('div');
    print.className = 'line ' + (className || '');
    print.innerText = text;

    screen.appendChild(print);
}

function runCmd(cmd) {
    if (cmd.trim() == "") {
        return;
    }

    HISTORY.push(cmd);

    // There might be some issues when using clear with some cmds
    const commands = cmd.split('&&').map(cmd => cmd.trim());

    commands.forEach(c => {
        const arrayCommands = Object.values(COMMANDS);
        const parts = c.split(/\s+/).filter(Boolean);

        // ugly
        var cmdIs = false;
        arrayCommands.forEach(c => {
            if (parts[0] == c.name) {
                cmdIs = true;
            }
        })
        if (!cmdIs) {
            printf(`${browser}: command not found: ${parts}`, 'error');
            return;
        }

        const command = parts[0];
        const args = parts.slice(1);

        const fun = COMMANDS[command];

        if (fun) {
            fun(args);
        } else {
            return;
        }
    })

}

function whichBrowser() {
    const u = navigator.userAgent;

    if (u.includes("Chrome")) {
        browser = "chrome";
    } else if (u.includes("Edge")) {
        browser = "edge"
    } else if (u.includes("Firefox")) {
        browser = "firefox";
    } else {
        browser = "web"
    }

}