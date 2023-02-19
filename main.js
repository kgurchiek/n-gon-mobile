javascript:(function() {
  document.body.style.setProperty('touch-action', 'pan-y');

  simulation.mouseDistance = 75;
  simulation.mouseAngle = 0;
  
  // override usual mouse movement
  simulation.camera = () => {
    var mCanvasPos = {
      x: ((m.pos.x + m.transX - canvas.width2) /  simulation.edgeZoomOutSmooth) * simulation.zoom + canvas.width2,
      y: simulation.mouse.y = ((m.pos.y + m.transY - canvas.height2) /  simulation.edgeZoomOutSmooth) * simulation.zoom + canvas.height2
    }

    simulation.mouse.x = mCanvasPos.x + Math.cos(simulation.mouseAngle) * simulation.mouseDistance;
    simulation.mouse.y = mCanvasPos.y + Math.sin(simulation.mouseAngle) * simulation.mouseDistance;
    
    const dx = simulation.mouse.x / window.innerWidth - 0.5;
    const dy = simulation.mouse.y / window.innerHeight - 0.5;
    const d = Math.max(dx * dx, dy * dy)
    simulation.edgeZoomOutSmooth = (1 + 4 * d * d) * 0.04 + simulation.edgeZoomOutSmooth * 0.96

    ctx.save();
    ctx.translate(canvas.width2, canvas.height2);
    ctx.scale(simulation.zoom / simulation.edgeZoomOutSmooth, simulation.zoom / simulation.edgeZoomOutSmooth);
    ctx.translate(-canvas.width2 + m.transX, -canvas.height2 + m.transY);
    simulation.mouseInGame.x = (simulation.mouse.x - canvas.width2) / simulation.zoom * simulation.edgeZoomOutSmooth + canvas.width2 - m.transX;
    simulation.mouseInGame.y = (simulation.mouse.y - canvas.height2) / simulation.zoom * simulation.edgeZoomOutSmooth + canvas.height2 - m.transY;
  }
  
  const overlay = document.createElement('div');
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.position = 'absolute';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.zIndex = '9999';
  document.body.appendChild(overlay);

  const moveJoystickStartPos = {
    x: window.innerWidth / 5,
    y: window.innerHeight * 0.8
  }
  const moveJoystickBounds = 75;

  const shootJoystickStartPos = {
    x: window.innerWidth * 4 / 5,
    y: window.innerHeight * 0.8
  }
  const shootJoystickBounds = 75;

  const moveJoystickBG = document.createElement('div');
  moveJoystickBG.style.width = '150px';
  moveJoystickBG.style.height = '150px';
  moveJoystickBG.style.borderRadius = '50%';
  moveJoystickBG.style.backgroundColor = 'grey';
  moveJoystickBG.style.position = 'fixed';
  moveJoystickBG.style.top = `${moveJoystickStartPos.y}px`;
  moveJoystickBG.style.left = `${moveJoystickStartPos.x}px`;
  moveJoystickBG.style.transform = 'translate(-50%, -50%)';
  moveJoystickBG.style.opacity = '0.5';
  overlay.appendChild(moveJoystickBG);
  
  const moveJoystickCircle = document.createElement('div');
  moveJoystickCircle.style.width = '50px';
  moveJoystickCircle.style.height = '50px';
  moveJoystickCircle.style.borderRadius = '50%';
  moveJoystickCircle.style.backgroundColor = 'black';
  moveJoystickCircle.style.position = 'fixed';
  moveJoystickCircle.style.top = `${moveJoystickStartPos.y}px`;
  moveJoystickCircle.style.left = `${moveJoystickStartPos.x}px`;
  moveJoystickCircle.style.transform = 'translate(-50%, -50%)';
  moveJoystickCircle.style.opacity = '0.75';
  overlay.appendChild(moveJoystickCircle);

  const shootJoystickBG = document.createElement('div');
  shootJoystickBG.style.width = '150px';
  shootJoystickBG.style.height = '150px';
  shootJoystickBG.style.borderRadius = '50%';
  shootJoystickBG.style.backgroundColor = 'grey';
  shootJoystickBG.style.position = 'fixed';
  shootJoystickBG.style.top = `${shootJoystickStartPos.y}px`;
  shootJoystickBG.style.left = `${shootJoystickStartPos.x}px`;
  shootJoystickBG.style.transform = 'translate(-50%, -50%)';
  shootJoystickBG.style.opacity = '0.5';
  overlay.appendChild(shootJoystickBG);
  
  const shootJoystickCircle = document.createElement('div');
  shootJoystickCircle.style.width = '50px';
  shootJoystickCircle.style.height = '50px';
  shootJoystickCircle.style.borderRadius = '50%';
  shootJoystickCircle.style.backgroundColor = 'black';
  shootJoystickCircle.style.position = 'fixed';
  shootJoystickCircle.style.top = `${shootJoystickStartPos.y}px`;
  shootJoystickCircle.style.left = `${shootJoystickStartPos.x}px`;
  shootJoystickCircle.style.transform = 'translate(-50%, -50%)';
  shootJoystickCircle.style.opacity = '0.75';
  overlay.appendChild(shootJoystickCircle);

  var touches = [];
  var isDraggingMove = false;
  var isDraggingShoot = true;
  
  const handleMoveTouchStart = (e) => {
    isDraggingMove = true;
    touches.push("move");
  };

  const handleShootTouchStart = (e) => {
    isDraggingShoot = true;
    touches.push("shoot");
  };

  const handleMoveTouchMove = (e) => {
    if (isDraggingMove) {
      const currentPosition = {
        x: e.touches[touches.indexOf("move")].clientX,
        y: e.touches[touches.indexOf("move")].clientY
      };
      const distanceFromCenter = Math.sqrt((currentPosition.x - moveJoystickStartPos.x) ** 2 + (currentPosition.y - moveJoystickStartPos.y) ** 2);
      const angle = Math.atan2(currentPosition.y - moveJoystickStartPos.y, currentPosition.x - moveJoystickStartPos.x);
      
      if (distanceFromCenter > moveJoystickBounds) {
        currentPosition.x = moveJoystickStartPos.x + moveJoystickBounds * Math.cos(angle);
        currentPosition.y = moveJoystickStartPos.y + moveJoystickBounds * Math.sin(angle);
      }
      
      moveJoystickCircle.style.left = `${currentPosition.x}px`;
      moveJoystickCircle.style.top = `${currentPosition.y}px`;

      input.right = angle > -Math.PI * 2/5 && angle < Math.PI * 2/5;
      input.left = angle > Math.PI * 3/5 || angle < -Math.PI * 3/5;
      input.down = angle > Math.PI / 4 && angle < Math.PI * 3/4;
      input.up = angle > -Math.PI * 3/4 && angle < -Math.PI / 4;
    }
  };

  const handleShootTouchMove = (e) => {
    if (isDraggingShoot) {
      const currentPosition = {
        x: e.touches[touches.indexOf("shoot")].clientX,
        y: e.touches[touches.indexOf("shoot")].clientY
      };
      var distanceFromCenter = Math.sqrt((currentPosition.x - shootJoystickStartPos.x) ** 2 + (currentPosition.y - shootJoystickStartPos.y) ** 2);
      const angle = Math.atan2(currentPosition.y - shootJoystickStartPos.y, currentPosition.x - shootJoystickStartPos.x);
      
      if (distanceFromCenter > shootJoystickBounds) {
        currentPosition.x = shootJoystickStartPos.x + shootJoystickBounds * Math.cos(angle);
        currentPosition.y = shootJoystickStartPos.y + shootJoystickBounds * Math.sin(angle);
        
        distanceFromCenter = shootJoystickBounds;
      }
      
      shootJoystickCircle.style.left = `${currentPosition.x}px`;
      shootJoystickCircle.style.top = `${currentPosition.y}px`;
      
      simulation.mouseAngle = angle;
      simulation.mouseDistance = distanceFromCenter;
    }
  }

  const handleMoveTouchEnd = () => {
    isDraggingMove = false;
    touches.splice(touches.indexOf("move"), 1);
    moveJoystickCircle.style.top = `${moveJoystickStartPos.y}px`;
    moveJoystickCircle.style.left = `${moveJoystickStartPos.x}px`;
    
    input.right = false;
    input.left = false;
    input.up = false;
    input.down = false;
  };

  const handleShootTouchEnd = () => {
    isDraggingShoot = false;
    touches.splice(touches.indexOf("shoot"), 1)
    shootJoystickCircle.style.top = `${shootJoystickStartPos.y}px`;
    shootJoystickCircle.style.left = `${shootJoystickStartPos.x}px`;
  };
  
  moveJoystickCircle.addEventListener('touchstart', handleMoveTouchStart);
  moveJoystickCircle.addEventListener('touchmove', handleMoveTouchMove);
  moveJoystickCircle.addEventListener('touchend', handleMoveTouchEnd);
  moveJoystickBG.addEventListener('touchstart', handleMoveTouchStart);
  moveJoystickBG.addEventListener('touchmove', handleMoveTouchMove);
  moveJoystickBG.addEventListener('touchend', handleMoveTouchEnd);
  shootJoystickCircle.addEventListener('touchstart', handleShootTouchStart);
  shootJoystickCircle.addEventListener('touchmove', handleShootTouchMove);
  shootJoystickCircle.addEventListener('touchend', handleShootTouchEnd);
  shootJoystickBG.addEventListener('touchstart', handleShootTouchStart);
  shootJoystickBG.addEventListener('touchmove', handleShootTouchMove);
  shootJoystickBG.addEventListener('touchend', handleShootTouchEnd);
})();
