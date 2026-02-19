function initTrexGame() {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    
    let dino = { x: 50, y: 160, w: 40, h: 40, dy: 0, grounded: false };
    let obstacles = [];
    let gameSpeed = 5;

    function spawnObstacle() {
        obstacles.push({ x: canvas.width, y: 160, w: 20, h: 40 });
    }

    function update() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Dino Physics
        dino.dy += 0.6; // Gravity
        dino.y += dino.dy;
        if (dino.y > 160) { dino.y = 160; dino.grounded = true; }

        ctx.fillStyle = "#535353";
        ctx.fillRect(dino.x, dino.y, dino.w, dino.h);

        // Obstacles
        obstacles.forEach((obs, index) => {
            obs.x -= gameSpeed;
            ctx.fillStyle = "#ff4d4d";
            ctx.fillRect(obs.x, obs.y, obs.w, obs.h);

            // Collision Check
            if (dino.x < obs.x + obs.w && dino.x + dino.w > obs.x && dino.y < obs.y + obs.h && dino.y + dino.h > obs.y) {
                alert("Game Over! Try again.");
                location.reload();
            }
        });

        if (Math.random() < 0.01) spawnObstacle();
        requestAnimationFrame(update);
    }

    window.addEventListener('keydown', (e) => {
        if (e.code === "Space" && dino.grounded) {
            dino.dy = -12;
            dino.grounded = false;
        }
    });

    update();
}
