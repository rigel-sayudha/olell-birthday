// Balloon dragging functionality
document.addEventListener('DOMContentLoaded', function() {
    const balloons = document.querySelectorAll('.balloons');
    
    balloons.forEach(balloon => {
        let isDragging = false;
        let currentX;
        let currentY;
        let initialX;
        let initialY;
        let xOffset = 0;
        let yOffset = 0;

        // Touch events
        balloon.addEventListener('touchstart', dragStart, false);
        balloon.addEventListener('touchend', dragEnd, false);
        balloon.addEventListener('touchmove', drag, false);

        // Mouse events
        balloon.addEventListener('mousedown', dragStart, false);
        balloon.addEventListener('mouseup', dragEnd, false);
        balloon.addEventListener('mousemove', drag, false);

        function dragStart(e) {
            if (e.type === 'touchstart') {
                initialX = e.touches[0].clientX - xOffset;
                initialY = e.touches[0].clientY - yOffset;
            } else {
                initialX = e.clientX - xOffset;
                initialY = e.clientY - yOffset;
            }

            if (e.target === balloon) {
                isDragging = true;
                balloon.style.animation = 'none'; // Pause floating animation while dragging
            }
        }

        function dragEnd(e) {
            initialX = currentX;
            initialY = currentY;
            isDragging = false;
            // Resume floating animation
            balloon.style.animation = 'floatAnimation 3s ease-in-out infinite';
        }

        function drag(e) {
            if (isDragging) {
                e.preventDefault();

                if (e.type === 'touchmove') {
                    currentX = e.touches[0].clientX - initialX;
                    currentY = e.touches[0].clientY - initialY;
                } else {
                    currentX = e.clientX - initialX;
                    currentY = e.clientY - initialY;
                }

                xOffset = currentX;
                yOffset = currentY;

                setTranslate(currentX, currentY, balloon);
            }
        }

        function setTranslate(xPos, yPos, el) {
            el.style.transform = `translate(${xPos}px, ${yPos}px)`;
        }
    });
});
