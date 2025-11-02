const mainTerminal = document.getElementById("terminal-1");
const spanOptions = document.querySelector('[data-role="opt-menu"]');
const spanTime = document.querySelector('.time');

const optionsBtn = document.querySelector("span.config-icon");
const bgColorWheel = document.getElementById("background-color-wheel");

setInterval(() => { spanTime.innerHTML = timeNow(); }, 1 * 1000);
draggableWindow(mainTerminal);
draggableWindow(spanOptions);

mainTerminal.addEventListener("dblclick", () => {
    mainTerminal.style.left = `auto`;
    mainTerminal.style.top = `auto`;
})

optionsBtn.addEventListener("click", () => {
    spanOptions.classList.toggle("config-show");
})

bgColorWheel.addEventListener("change", () => {
    document.body.style.backgroundColor = bgColorWheel.value;
})

function timeNow() {
    const dateNow = new Date();
    const currentTime = {
        hour: String(dateNow.getHours()).padStart(2, '0'),
        minute: String(dateNow.getMinutes()).padStart(2, '0'),
        second: String(dateNow.getSeconds()).padStart(2, '0')
    }
    return `${currentTime.hour} : ${currentTime.minute} : ${currentTime.second}`;
}

function checkURL(url) {
    try {
        new URL(url);
        return true;
    } catch (err) {
        return false;
    }
}

// Turning this into a function will allow for a lot of cool sheesh
function draggableWindow(dWindow) {
    let dragging = false;
    let posX = 0;
    let posY = 0;

    dWindow.addEventListener("mousedown", (e) => {
        dragging = true;
        posX = e.clientX;
        posY = e.clientY;
        dWindow.style.cursor = "grabbing";
    });

    document.addEventListener("mousemove", (e) => {
        if (!dragging) return;

        const deltaX = e.clientX - posX;
        const deltaY = e.clientY - posY;

        // Finding out where my div is
        const windowStyle = window.getComputedStyle(dWindow);
        const mtLeft = parseInt(windowStyle.left);
        const mtTop = parseInt(windowStyle.top);

        let x = mtLeft + deltaX;
        let y = mtTop + deltaY;

        // Making sure the window doesn't go off screen
        const rect = dWindow.getBoundingClientRect();
        const limitX = document.documentElement.clientWidth - rect.width;
        const limitY = document.documentElement.clientHeight - rect.height;

        x = Math.max(0, Math.min(x, limitX));
        y = Math.max(0, Math.min(y, limitY));

        dWindow.style.left = `${x}px`;
        dWindow.style.top = `${y}px`;

        posX = e.clientX;
        posY = e.clientY;
    });

    document.addEventListener("mouseup", () => {
        if (dragging) {
            dragging = false;
            dWindow.style.cursor = "grab";
        }
    });

    dWindow.addEventListener("dblclick", () => {
        dWindow.style.left = `auto`;
        dWindow.style.top = `auto`;
    });
}
