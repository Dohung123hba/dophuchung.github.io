document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
    const gameContainer = document.getElementById("gameContainer");
    const chooseButton = document.getElementById("chooseButton");
    const resultParagraph = document.getElementById("result");
    const countdownParagraph = document.getElementById("countdown");
    const scoreParagraph = document.getElementById("score");
    const logoutButton = document.getElementById("logoutButton");
    let countdown = 5;
    let countdownInterval;
    let score = 100;
    let loggedIn = false;

    const betOptions = [5, 10, 20, 50, 100];
    const betInput = document.getElementById("bet");

    // Thêm tài khoản mặc định
    const defaultUsername = "hieuhuynhact";
    const defaultPassword = "123456";

    function login(username, password) {
        // Xác thực người dùng
        if (username === defaultUsername && password === defaultPassword) {
            loggedIn = true;
            loginForm.style.display = "none";
            gameContainer.style.display = "block";
            logoutButton.style.display = "block"; // Hiển thị nút Đăng xuất
        } else {
            alert("Tên người dùng hoặc mật khẩu không chính xác.");
        }
    }

    // Sự kiện cho nút Đăng xuất
    logoutButton.addEventListener("click", function () {
        loggedIn = false;
        loginForm.style.display = "block";
        gameContainer.style.display = "none";
        logoutButton.style.display = "none";
        score = 100;
        scoreParagraph.textContent = `Số điểm của bạn: ${score}`;
        document.getElementById("number").value = "";
        betInput.value = "5";
        resultParagraph.textContent = "";
        countdownParagraph.textContent = "";
    });

    // Sự kiện cho nút Đăng nhập
    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        login(username, password);
    });

    chooseButton.addEventListener("click", function () {
        const selectedNumber = parseInt(document.getElementById("number").value, 10);
        const selectedBet = parseInt(betInput.value, 10);

        if (isNaN(selectedNumber) || selectedNumber < 0 || selectedNumber > 99) {
            alert("Vui lòng nhập một số từ 0 đến 99.");
            return;
        }

        if (!betOptions.includes(selectedBet)) {
            alert("Vui lòng chọn một mức cược hợp lệ.");
            return;
        }

        if (selectedBet > score) {
            alert("Số điểm cược không thể cao hơn số điểm hiện có.");
            return;
        }

        clearInterval(countdownInterval);
        countdown = 1;

        countdownParagraph.textContent = `Thời gian đợi còn lại: ${countdown} giây`;
        chooseButton.disabled = true;
        betInput.disabled = true;

        // Trừ điểm cược ngay lập tức
        score -= selectedBet;
        scoreParagraph.textContent = `Số điểm của bạn: ${score}`;

        countdownInterval = setInterval(function () {
            countdown--;
            countdownParagraph.textContent = `Thời gian đợi còn lại: ${countdown} giây`;

            if (countdown === 0) {
                clearInterval(countdownInterval);
                chooseButton.disabled = false;
                betInput.disabled = false;

                const randomNumber = Math.floor(Math.random() * 100);
                const isNumberEven = randomNumber % 2 === 0;
                const isSelectedEven = selectedNumber % 2 === 0;
                if (selectedNumber === randomNumber) {
                    const winnings = selectedBet * 10;
                    score += winnings;
                    resultParagraph.textContent = `Chúc mừng! Bạn đã trúng giải đặc biệt ${randomNumber}, bạn đã thắng ${winnings} điểm!`;
                }
                else if (isSelectedEven === isNumberEven) {
                    const winnings = selectedBet * 2;
                    score += winnings;
                    resultParagraph.textContent = `Chúc mừng! Số may mắn là ${randomNumber}, bạn đã thắng ${winnings} điểm!`;
                } else {
                    resultParagraph.textContent = `Rất tiếc! Số may mắn là ${randomNumber}, bạn đã thua ${selectedBet} điểm!`;
                }

                scoreParagraph.textContent = `Số điểm của bạn: ${score}`;
            }
        }, 1000);
    });
});
