console.log("Welcome to Javascript");

let boxes = document.querySelectorAll(".box");
let reset = document.querySelector("#reset");
let newbtn = document.querySelector("#new");
let msg = document.querySelector(".msg");
let turn_X = true;
let count = 0;

const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turn_X) {
            box.innerText = "X";
            turn_X = false;
            count++;
        } else {
            box.innerText = "O";
            turn_X = true;
            count++;
        }
        box.disabled = true;

        let isWinner = checkWinner();

        if (count == 9 && !isWinner) {
            gameDraw();
        }
    });
})

const resetGame = () => {
    turn_X = true;
    count = 0;
    msg.classList.add("hide");
    enableBoxes();
}

const disableBoxes = () => {
    for (const box of boxes) {
        box.disabled = true;
    }
}

const enableBoxes = () => {
    for (const box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
}

const gameDraw = () => {
    msg.innerText = "Game was a Draw!";
    msg.classList.remove("hide");
    disableBoxes();
};

const showWinner = (e) => {
    msg.innerText = `Congratulations! The Winner is ${e}`;
    msg.classList.remove("hide");
}

const checkWinner = () => {
    for (const pattern of winPatterns) {
        let position_1 = boxes[pattern[0]].innerText;
        let position_2 = boxes[pattern[1]].innerText;
        let position_3 = boxes[pattern[2]].innerText;

        if (position_1 !== "" && position_2 !== "" && position_3 !== "") {
            if (position_1 == position_2 && position_2 == position_3) {
                showWinner(position_1);
                disableBoxes();
            }
        }
    }
}

reset.addEventListener("click", resetGame);
newbtn.addEventListener("click", resetGame);