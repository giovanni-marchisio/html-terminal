const main_terminal = document.getElementById("terminal-1");
const position_info = document.getElementById("pos-info");
const event_types = ["mouseleave", "mouseout", "mouseup"]; // test

let dragging = false;
let posX = 0;
let posY = 0;

main_terminal.addEventListener("dblclick", () => {
    main_terminal.style.left = `auto`;
    main_terminal.style.top = `auto`;
})

main_terminal.addEventListener("mousedown", (e) => {
    dragging = true;
    posX = e.clientX;
    posY = e.clientY;

    main_terminal.style.cursor = "grabbing";
    }
)

main_terminal.addEventListener("mousemove", (e) => {
    if (!dragging) return;
    
    const deltaX = e.clientX - posX;
    const deltaY = e.clientY - posY;

    // Finding out where my div is
    const terminal_style = window.getComputedStyle(main_terminal);
    const mt_left = parseInt(terminal_style.left);
    const mt_top = parseInt(terminal_style.top);

    let x = mt_left + deltaX; // x-position
    let y = mt_top + deltaY; // y-position

    // Making sure the window doesn't go off screen
    const rect = main_terminal.getBoundingClientRect();
    const limitX = window.innerWidth - rect.width;
    const limitY = window.innerHeight - rect.height;

    console.log(window.innerWidth, rect.width);

    x = Math.max(0, Math.min(x, limitX));
    y = Math.max(0, Math.min(y, limitY));
    
    main_terminal.style.left = `${x}px`;
    main_terminal.style.top = `${y}px`;

    posX = e.clientX;
    posY = e.clientY;

    // test
    position_info.innerText = `X:${mt_left} Y:${mt_top}`;
    }
)

event_types.forEach(type => {
    main_terminal.addEventListener(type, () => {
        dragging = false;
        main_terminal.style.cursor = "grab";

        //test
        position_info.innerText = `X:${posX} Y:${posY}\n Mouse: ${type}`;
    })
});
