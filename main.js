 javascript:(function() {
  document.body.style.setProperty('touch-action', 'pan-y');
  
  simulation.mouseDistance = 75;
  simulation.mouseAngle = 0;
  simulation.mousePos = {
    x: 0,
    y: 0
  }
  simulation.customLook = false;
  
  // override usual mouse movement
  simulation.camera = () => {
    if (!simulation.customLook) {
      var mCanvasPos = {
        x: ((m.pos.x + m.transX - canvas.width2) /  simulation.edgeZoomOutSmooth) * simulation.zoom + canvas.width2,
        y: simulation.mouse.y = ((m.pos.y + m.transY - canvas.height2) /  simulation.edgeZoomOutSmooth) * simulation.zoom + canvas.height2
      }

      simulation.mouse.x = mCanvasPos.x + Math.cos(simulation.mouseAngle) * simulation.mouseDistance;
      simulation.mouse.y = mCanvasPos.y + Math.sin(simulation.mouseAngle) * simulation.mouseDistance;
   } else {
      simulation.mouse.x = simulation.mousePos.x;
      simulation.mouse.y = simulation.mousePos.y;
   }
    
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

  function setCrosshair() {
    simulation.customLook = false;
    var mCanvasPos = {
      x: ((m.pos.x + m.transX - canvas.width2) /  simulation.edgeZoomOutSmooth) * simulation.zoom + canvas.width2,
      y: simulation.mouse.y = ((m.pos.y + m.transY - canvas.height2) /  simulation.edgeZoomOutSmooth) * simulation.zoom + canvas.height2
    }

    simulation.mouse.x = mCanvasPos.x + Math.cos(simulation.mouseAngle) * simulation.mouseDistance;
    simulation.mouse.y = mCanvasPos.y + Math.sin(simulation.mouseAngle) * simulation.mouseDistance;
    
    simulation.mouseInGame.x = (simulation.mouse.x - canvas.width2) / simulation.zoom * simulation.edgeZoomOutSmooth + canvas.width2 - m.transX;
    simulation.mouseInGame.y = (simulation.mouse.y - canvas.height2) / simulation.zoom * simulation.edgeZoomOutSmooth + canvas.height2 - m.transY;
  }

  function setCrosshairPoint() {
    simulation.customLook = true;
    simulation.mouse.x = simulation.mousePos.x;
    simulation.mouse.y = simulation.mousePos.y;
    
    simulation.mouseInGame.x = (simulation.mouse.x - canvas.width2) / simulation.zoom * simulation.edgeZoomOutSmooth + canvas.width2 - m.transX;
    simulation.mouseInGame.y = (simulation.mouse.y - canvas.height2) / simulation.zoom * simulation.edgeZoomOutSmooth + canvas.height2 - m.transY;
  }
  
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

  const fieldJoystickStartPos = {
    x: window.innerWidth * 9 / 10,
    y: window.innerHeight * 0.6
  }
  const fieldJoystickBounds = 50;

  const overlay = document.createElement('div');
  overlay.style.width = '0%';
  overlay.style.height = '0%';
  overlay.style.position = 'absolute';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.zIndex = '9999';
  document.body.appendChild(overlay);
  
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

  const fieldJoystickBG = document.createElement('div');
  fieldJoystickBG.style.width = '125px';
  fieldJoystickBG.style.height = '125px';
  fieldJoystickBG.style.borderRadius = '50%';
  fieldJoystickBG.style.backgroundColor = 'grey';
  fieldJoystickBG.style.position = 'fixed';
  fieldJoystickBG.style.top = `${fieldJoystickStartPos.y}px`;
  fieldJoystickBG.style.left = `${fieldJoystickStartPos.x}px`;
  fieldJoystickBG.style.transform = 'translate(-50%, -50%)';
  fieldJoystickBG.style.opacity = '0.5';
  overlay.appendChild(fieldJoystickBG);

  const fieldJoystickCircle = document.createElement('div');
  fieldJoystickCircle.style.width = '30px';
  fieldJoystickCircle.style.height = '30px';
  fieldJoystickCircle.style.borderRadius = '50%';
  fieldJoystickCircle.style.backgroundColor = 'black';
  fieldJoystickCircle.style.position = 'fixed';
  fieldJoystickCircle.style.top = `${fieldJoystickStartPos.y}px`;
  fieldJoystickCircle.style.left = `${fieldJoystickStartPos.x}px`;
  fieldJoystickCircle.style.transform = 'translate(-50%, -50%)';
  fieldJoystickCircle.style.opacity = '0.75';
  overlay.appendChild(fieldJoystickCircle);

  const pauseButton = document.createElement('div');
  pauseButton.style.width = '30px';
  pauseButton.style.height = '30px';
  pauseButton.style.borderRadius = '50%';
  pauseButton.style.backgroundColor = 'black';
  pauseButton.style.position = 'fixed';
  pauseButton.style.top = '10%';
  pauseButton.style.left = `${window.innerWidth / 2}px`;
  pauseButton.style.transform = 'translate(-50%, -50%)';
  pauseButton.style.opacity = '0.75';
  overlay.appendChild(pauseButton);

  for (var i = 0; i < overlay.children.length; i++) {
    overlay.children[i].style.setProperty('user-select', 'none');
    overlay.children[i].style.setProperty('-o-user-select', 'none');
    overlay.children[i].style.setProperty('-webkit-user-select', 'none');
    overlay.children[i].style.setProperty('-khtml-user-select', 'none');
    overlay.children[i].style.setProperty('-moz-user-select', '-moz-none');
  }
  
  var touches = [];
  var isDraggingScreen = false;
  var isDraggingMove = false;
  var isDraggingShoot = false;
  var isDraggingField = false;

  const handleScreenTouchStart = (e) => {
    if (touches.length < e.touches.length) {
      isDraggingScreen = true;
      touches.push("screen");
      simulation.mousePos.x = e.touches[touches.indexOf("screen")].clientX;
      simulation.mousePos.y = e.touches[touches.indexOf("screen")].clientY;
      setCrosshairPoint();
    }
  };
  
  const handleMoveTouchStart = (e) => {
    isDraggingMove = true;
    touches.push("move");
  };

  const handleShootTouchStart = (e) => {
    isDraggingShoot = true;
    touches.push("shoot");
  };

  const handleFieldTouchStart = (e) => {
    isDraggingField = true;
    touches.push("field");
  };

  const handlePauseTouchStart = (e) => {
    if (!simulation.isChoosing && m.alive) {
      if (simulation.paused) {
        build.unPauseGrid()
        simulation.paused = false;
        document.body.style.cursor = "none";
        requestAnimationFrame(cycle);
      } else if (!tech.isNoDraftPause) {
        simulation.paused = true;
        build.pauseGrid()
        document.body.style.cursor = "auto";

        if (tech.isPauseSwitchField || simulation.testing) {
          document.getElementById("pause-field").addEventListener("click", () => {
            const energy = m.energy //save current energy
            if (m.fieldMode === 4 && simulation.molecularMode < 3) {
              simulation.molecularMode++
              m.fieldUpgrades[4].description = m.fieldUpgrades[4].setDescription()
            } else {
              m.setField((m.fieldMode === m.fieldUpgrades.length - 1) ? 0 : m.fieldMode + 1) //cycle to next field
              if (m.fieldMode === 4) {
                simulation.molecularMode = 0
                m.fieldUpgrades[4].description = m.fieldUpgrades[4].setDescription()
              }
            }
            m.energy = energy //return to current energy
            document.getElementById("pause-field").innerHTML = `<div class="grid-title"><div class="circle-grid field"></div> &nbsp; ${m.fieldUpgrades[m.fieldMode].name}</div> ${m.fieldUpgrades[m.fieldMode].description}`
          });
        }
      }
    }

    if (simulation.paused) {
      overlay.removeChild(moveJoystickBG);
      overlay.removeChild(moveJoystickCircle);
      overlay.removeChild(shootJoystickBG);
      overlay.removeChild(shootJoystickCircle);
      overlay.removeChild(fieldJoystickBG);
      overlay.removeChild(fieldJoystickCircle);
    } else {
      overlay.appendChild(moveJoystickBG);
      overlay.appendChild(moveJoystickCircle);
      overlay.appendChild(shootJoystickBG);
      overlay.appendChild(shootJoystickCircle);
      overlay.appendChild(fieldJoystickBG);
      overlay.appendChild(fieldJoystickCircle);
    }
  };

  const handleScreenTouchMove = (e) => {
    console.log(touches);
    if (isDraggingScreen) {
      simulation.mousePos.x = e.touches[touches.indexOf("screen")].clientX;
      simulation.mousePos.y = e.touches[touches.indexOf("screen")].clientY;
      setCrosshairPoint();
    }
  };
  
  const handleMoveTouchMove = (e) => {
    if (isDraggingMove) {
      const currentPosition = {
        x: e.touches[touches.indexOf("move")].clientX,
        y: e.touches[touches.indexOf("move")].clientY
      };
      var distanceFromCenter = Math.sqrt((currentPosition.x - moveJoystickStartPos.x) ** 2 + (currentPosition.y - moveJoystickStartPos.y) ** 2);
      const angle = Math.atan2(currentPosition.y - moveJoystickStartPos.y, currentPosition.x - moveJoystickStartPos.x);
      
      if (distanceFromCenter > moveJoystickBounds) {
        currentPosition.x = moveJoystickStartPos.x + moveJoystickBounds * Math.cos(angle);
        currentPosition.y = moveJoystickStartPos.y + moveJoystickBounds * Math.sin(angle);

        distanceFromCenter = moveJoystickBounds;
      }
      
      moveJoystickCircle.style.left = `${currentPosition.x}px`;
      moveJoystickCircle.style.top = `${currentPosition.y}px`;

      input.right = angle > -Math.PI * 2/5 && angle < Math.PI * 2/5;
      input.left = angle > Math.PI * 3/5 || angle < -Math.PI * 3/5;
      input.down = angle > Math.PI / 4 && angle < Math.PI * 3/4 && distanceFromCenter > moveJoystickBounds / 3;
      input.up = angle > -Math.PI * 3/4 && angle < -Math.PI / 4 && distanceFromCenter > moveJoystickBounds / 3;
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
      setCrosshair();
      input.fire = true;
    }
  }

  const handleFieldTouchMove = (e) => {
    if (isDraggingField) {
      const currentPosition = {
        x: e.touches[touches.indexOf("field")].clientX,
        y: e.touches[touches.indexOf("field")].clientY
      };
      var distanceFromCenter = Math.sqrt((currentPosition.x - fieldJoystickStartPos.x) ** 2 + (currentPosition.y - fieldJoystickStartPos.y) ** 2);
      const angle = Math.atan2(currentPosition.y - fieldJoystickStartPos.y, currentPosition.x - fieldJoystickStartPos.x);
      
      if (distanceFromCenter > fieldJoystickBounds) {
        currentPosition.x = fieldJoystickStartPos.x + fieldJoystickBounds * Math.cos(angle);
        currentPosition.y = fieldJoystickStartPos.y + fieldJoystickBounds * Math.sin(angle);
        
        distanceFromCenter = fieldJoystickBounds;
      }
      
      fieldJoystickCircle.style.left = `${currentPosition.x}px`;
      fieldJoystickCircle.style.top = `${currentPosition.y}px`;
      
      simulation.mouseAngle = angle;
      simulation.mouseDistance = distanceFromCenter;
      setCrosshair();
      input.field = true;
    }
  }

  const handleScreenTouchEnd = () => {
    if (touches.includes("screen")) {
      isdraggingScreen = false;
      touches.splice(touches.indexOf("screen"), 1);
    }
  };

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
    input.fire = false;
    touches.splice(touches.indexOf("shoot"), 1)
    shootJoystickCircle.style.top = `${shootJoystickStartPos.y}px`;
    shootJoystickCircle.style.left = `${shootJoystickStartPos.x}px`;
  };

  const handleFieldTouchEnd = () => {
    isDraggingField = false;
    input.field = false;
    touches.splice(touches.indexOf("field"), 1)
    fieldJoystickCircle.style.top = `${fieldJoystickStartPos.y}px`;
    fieldJoystickCircle.style.left = `${fieldJoystickStartPos.x}px`;
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

fieldJoystickCircle.addEventListener('touchstart', handleFieldTouchStart);
  fieldJoystickCircle.addEventListener('touchmove', handleFieldTouchMove);
  fieldJoystickCircle.addEventListener('touchend', handleFieldTouchEnd);
  fieldJoystickBG.addEventListener('touchstart', handleFieldTouchStart);
  fieldJoystickBG.addEventListener('touchmove', handleFieldTouchMove);
  fieldJoystickBG.addEventListener('touchend', handleFieldTouchEnd);

  pauseButton.addEventListener('touchstart', handlePauseTouchStart);

  document.body.addEventListener('touchstart', handleScreenTouchStart);
  document.body.addEventListener('touchmove', handleScreenTouchMove);
  document.body.addEventListener('touchend', handleScreenTouchEnd);
})();