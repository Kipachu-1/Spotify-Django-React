const cover = document.createElement('div');
        cover.style.position = 'absolute';
        cover.style.width = '100%';
        cover.style.overflow = 'hidden';
        cover.style.height = '100%';
        cover.style.backgroundColor = 'black';
        cover.innerHTML = "<div style='display:flex;justify-self: center;align-self: center;flex-direction:column;justify-content: center;align-items: center;'><img src ='/media/images/R_aykuK3q.jfif' style = 'width:200px ;height:200px'><p style = 'color:white; text-align: center;'>Sorry, rotation is not supported!</p></div>"

if (/iPhone/i.test(navigator.userAgent)) {
    if (window.orientation == 90 || window.orientation == -90) {
        document.body.appendChild(cover);
    }
window.addEventListener('orientationchange', function () {
    if (window.orientation == 90 || window.orientation == -90) {
        document.body.appendChild(cover);
    }
    if(window.orientation == 0) {
        cover.remove();
    }
    
}, true);
}