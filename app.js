const canvas = document.querySelector("canvas");
const saveBtn = document.querySelector("#save")
const textInput = document.querySelector("#text");
const fileInput = document.querySelector("#file");
const eraser = document.querySelector("#eraser");
const blank = document.querySelector("#blank");
const modeBtn = document.querySelector('#mod-btn');
const colorOptions = Array.from(document.querySelectorAll('.color-option'));
const color = document.querySelector('#color');
const lineWidth = document.querySelector('#line-width');
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = 1200;
const CANVAS_HEIGHT = 800;

canvas.width = 1200;
canvas.height = 800;
ctx.lineCap = 'round';

ctx.lineWidth = lineWidth.value;
let isPainting = false; 
let isFilling = false;
let isEraser = false;

function onMove(event){
   if(isPainting || isEraser){
      ctx.lineTo(event.offsetX , event.offsetY);
      ctx.stroke();
      return
   }
   ctx.beginPath();
   ctx.moveTo(event.offsetX , event.offsetY);
}

function onMouseDown(){
   isPainting = true;
}

function onEraserClick(){
   ctx.strokeStyle = "white";
   isFilling = false;
   modeBtn.innerText="Fill";
}

function canclePainting(){
   isPainting = false;
}

function onBlank(){
   ctx.fillStyle = "white";
   ctx.fillRect(0,0, CANVAS_WIDTH, CANVAS_HEIGHT);
}

function onLineWidthChange(event){
   ctx.lineWidth = event.target.value;
}

function onColorChange(event){
   isEraser = false;
   ctx.strokeStyle = event.target.value;
   ctx.fillStyle = event.target.value;
}

function onColorClick(event){
   isEraser = false; 
   const colorValue = event.target.dataset.color;
   ctx.strokeStyle = colorValue;
   ctx.fillStyle = colorValue;
   color.value = colorValue;
}

function onModeClick(){
   if(isFilling){
      isFilling = false;
      modeBtn.innerText="Fill";
   }else{
      isFilling = true;
      modeBtn.innerText="Draw";
   }
}

function onCanvasClick(){
   if(isFilling){
      ctx.fillRect(0,0, CANVAS_WIDTH, CANVAS_HEIGHT);
   }
}

function onFileChange(event){
   const file = event.target.files[0];
   const url = URL.createObjectURL(file);
   const image = new Image();
   image.src=url;
   image.onload = function(){
      ctx.drawImage(image, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      fileInput.value = null;
   };
}

function onDoubleClick(event){
   const text = textInput.value;
   if(text !== ""){
      ctx.save();
      
      ctx.lineWidth = 1;
      ctx.font = "32px serif"
      ctx.strokeText(text, event.offsetX , event.offsetY);
      ctx.restore();
   }

}

function onSaveClick(){
   const url = canvas.toDataURL();
   const a = document.createElement("a");
   a.href = url;
   a.download = "myDrawing.png";
   a.click();
}

canvas.addEventListener("dblclick", onDoubleClick);
canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", onMouseDown);
canvas.addEventListener("mouseup",canclePainting);
canvas.addEventListener("mouseleave", canclePainting);
canvas.addEventListener("click", onCanvasClick);

lineWidth.addEventListener("change",onLineWidthChange);
color.addEventListener("change", onColorChange);

colorOptions.forEach((color) => color.addEventListener("click", onColorClick));
modeBtn.addEventListener("click", onModeClick);
blank.addEventListener("click", onBlank);
eraser.addEventListener("click", onEraserClick);
fileInput.addEventListener("change", onFileChange);
saveBtn.addEventListener("click", onSaveClick);