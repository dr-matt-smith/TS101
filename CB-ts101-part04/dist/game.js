(function() {
    const RED = "#ff0000";
    const SCREEN_WIDTH = 800;
    const SCREEN_HEIGHT = 600;
    const BACKGROUND_COLOUR = RED;
    addEventListener("load", ()=>{
        const canvas = document.getElementById("gameCanvas");
        canvas.width = SCREEN_WIDTH;
        canvas.height = SCREEN_HEIGHT;
        const g = canvas.getContext("2d");
        g.fillStyle = BACKGROUND_COLOUR;
        g.fillRect(0, 0, 800, 600);
    });
    return {};
})();
