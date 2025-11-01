const mainTerminal = document.getElementById("terminal-1");
const spanTime = document.querySelector('.time');

let dragging = false;
let posX = 0;
let posY = 0;

const dateNow = new Date();
const currentTime = {
    hour: String(dateNow.getHours()).padStart(2, '0'),
    minute: String(dateNow.getMinutes()).padStart(2, '0')
}

setInterval(spanTime.innerHTML = `${currentTime.hour}:${currentTime.minute}`, 1000);


mainTerminal.addEventListener("dblclick", () => {
    mainTerminal.style.left = `auto`;
    mainTerminal.style.top = `auto`;
})

mainTerminal.addEventListener("mousedown", (e) => {
    dragging = true;
    posX = e.clientX;
    posY = e.clientY;

    mainTerminal.style.cursor = "grabbing";
}
)

mainTerminal.addEventListener("mousemove", (e) => {
    if (!dragging) return;

    const deltaX = e.clientX - posX;
    const deltaY = e.clientY - posY;

    // Finding out where my div is
    const terminalStyle = window.getComputedStyle(mainTerminal);
    const mtLeft = parseInt(terminalStyle.left);
    const mtTop = parseInt(terminalStyle.top);

    let x = mtLeft + deltaX; // x-position
    let y = mtTop + deltaY; // y-position

    // Making sure the window doesn't go off screen
    const rect = mainTerminal.getBoundingClientRect();
    const limitX = window.innerWidth - rect.width;
    const limitY = window.innerHeight - rect.height;

    x = Math.max(0, Math.min(x, limitX));
    y = Math.max(0, Math.min(y, limitY));

    mainTerminal.style.left = `${x}px`;
    mainTerminal.style.top = `${y}px`;

    posX = e.clientX;
    posY = e.clientY;

}
)

mainTerminal.addEventListener("mouseup", () => {
    dragging = false;
    mainTerminal.style.cursor = "grab";
})