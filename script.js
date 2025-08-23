async function getQuestions() {
    let r = await fetch("https://opentdb.com/api.php?amount=1&category=18");
    return await r.json();
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

(async () => {
    let data = await getQuestions();

    // Question set karo
    document.querySelector("#question").innerHTML = `Q. ${data.results[0].question}`;
    // Options banakar shuffle karo
    let options = [...data.results[0].incorrect_answers, data.results[0].correct_answer];
    options = shuffleArray(options);
    let answer = data.results[0].correct_answer;

    if (options[2] === undefined) {
        document.querySelector("#btn-3").style.display = "none";
        document.querySelector("#btn-4").style.display = "none";
    }

    // Buttons pe options dalo
    document.querySelector("#btn-1").innerHTML = options[0];
    document.querySelector("#btn-2").innerHTML = options[1];
    document.querySelector("#btn-3").innerHTML = options[2];
    document.querySelector("#btn-4").innerHTML = options[3];

    // Event listeners for answer check
    document.querySelectorAll(".option-button").forEach(btn => {
        btn.addEventListener("click", (e)=> {
            let resultBox = document.querySelector("#result");
            resultBox.style.display = "flex";

            if(e.target.innerHTML === answer) {
                resultBox.innerHTML = `
                  <h2 class="poppins-regular" id="result-text">Correct answer</h2>
                  <button id="restart-btn"><img src="./refresh.png" alt="reload"></button>`;
            } else {
                resultBox.innerHTML = `
                  <h2 class="poppins-regular" id="result-text">Wrong! Correct answer is: ${answer}</h2>
                  <button id="restart-btn"><img src="./refresh.png" alt="reload"></button>`;
            }

            // 🔥 Restart button ka listener yahin lagana hoga
            document.querySelector("#restart-btn").addEventListener("click", ()=> {
                location.reload();
            });
        });
    });
})();
