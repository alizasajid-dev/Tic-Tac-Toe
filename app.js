let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#res-btn");
let newGamebtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true;
let moves = 0; // Counter to track filled cells

const winPatterns = [
    [0,1,2], [3,4,5], [6,7,8], // Rows
    [0,3,6], [1,4,7], [2,5,8], // Columns
    [0,4,8], [2,4,6]           // Diagonals
];

const resetGame = () => {
    turnO = true;
    moves = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "O";
            turnO = false;
        } else {
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;
        moves++;
        checkWinner();
    });
});

const disableBoxes = () => {
    boxes.forEach((box) => box.disabled = true);
};

const enableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = false;
        box.innerText = "";
    });
};

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let [a, b, c] = pattern;
        let boxA = boxes[a].innerText;
        let boxB = boxes[b].innerText;
        let boxC = boxes[c].innerText;

        if (boxA !== "" && boxA === boxB && boxB === boxC) {
            showWinner(boxA);
            return;
        }
    }
    
    // Check for Draw
    if (moves === 9) {
        msg.innerText = "It's a Tie!";
        msgContainer.classList.remove("hide");
        disableBoxes();
    }
};

newGamebtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
