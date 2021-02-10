
var tree;
var capacidad;
var contHojas=0;
let weights;
let arr= new Array();
let items;

function setup() {
  contHojas=0;
  capacidad= document.getElementById('Capacidad').value;
  var w= document.getElementsByClassName('w');
  var v= document.getElementsByClassName('v');

  createCanvas(1200, 450);
  background(255);
  tree = new Tree();

  let myArray = new Array (50, 25, 75, 12, 36, 62, 86, 6, 18, 30, 42, 56, 68, 80, 92, 3, 9, 15, 21, 27, 33, 39, 45, 53, 59, 65, 71, 77, 83, 89, 95);
  var aux1=knapSack(capacidad, w, v, w.length);
  document.getElementById('final').innerHTML="El máximo valor que se puede obtener es "+aux1;
  items= new Array( 1, 2, 3, 4);


  let weights = etiquetas(w, capacidad); //w=[6, 4, 2, 1]
  let values= etiquetas(v, 0);
  items = etiquetasI(items, 0);

  for (var i = 0; i <weights.length; i++) {
    tree.addValue(myArray[i], weights[i], values[i], items[i]); //weights=[6, 6, 4, 4, 4, 4, ...]
  }
  tree.traverse();
  nodos();
}

function knapSack(W, wt, val, n){
   if (n == 0 || W == 0) 
            return parseInt("0"); 
        if (wt[n - 1].value > W) 
            return parseInt(knapSack(W, wt, val, n - 1)); 
        else
            return max(parseInt(val[n - 1].value) + parseInt(knapSack(W - wt[n - 1].value, wt, val, n - 1)), parseInt(knapSack(W, wt, val, n - 1))); 
}

function max(a, b){  
  if (a > b) {
    return parseInt(a);
  }
  return parseInt(b);
} 

function Node(val, w, v, i, x, y) {
  this.value = val; //5, 25, 75
  this.weight= w;
  this.v=v;
  this.left = null;
  this.right = null;
  this.x = x;
  this.y = y;
  this.camino= " -> item"+i;
}

Node.prototype.visit = function(parent) {

  if (this.left != null) {
    this.left.visit(this);
  }
  if (this.weight>=0) {
    
    var aux= this.weight+" , "+this.v;
    stroke(100);
    line(parent.x, parent.y, this.x, this.y);
    stroke(0, 27, 72);//color de las lineas 
    fill(2, 69, 122); //color letra
    ellipse(this.x, this.y, 45, 45);
    noStroke();
    fill(151, 202, 219);
    textAlign(CENTER);
    textSize(12);
    text(aux, this.x, this.y); 

    if (this.right==null) {
      contHojas+=1;
      arr.push(this.camino +" ; valor total = "+this.v);
    }
  }
  if (this.right != null) {
    this.right.visit(this);
  }
};


Node.prototype.addNode = function(n, lrama) {
  if (n.value < this.value) {

    if (this.left == null) {

      this.left = n;
      this.left.weight= this.weight - n.weight;
      this.left.v= parseInt(this.v) + parseInt(n.v);
      this.left.x = this.x - lrama;
      this.left.y = this.y + 70;
      this.left.camino=this.camino + n.camino;

    } else {
      this.left.addNode(n, lrama/2);
    }
  } else if (n.value > this.value) {
    if (this.right == null) {

      this.right = n;
      this.right.weight= this.weight;
      this.right.v= parseInt(this.v);
      this.right.x = this.x + lrama;
      this.right.y = this.y + 70;
      this.right.camino =this.camino;

    } else {
      this.right.addNode(n,  lrama/2);
    }
  }
};

function Tree() {
  this.root = null;
}

Tree.prototype.traverse = function() {
  this.root.visit(this.root);
};

Tree.prototype.addValue = function(val, w, v, i) {
  var n = new Node(val, w, v, i);
  if (this.root == null) {
    this.root = n;
    this.root.x = width / 2;
    this.root.y = 30;
    this.root.camino = " ";
  } else {
    this.root.addNode(n, 300);
  }
};

function etiquetas(w, c){
  weights= new Array();
  weights.push(c);

  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 2**(i+1); j++) {
          weights.push(w[i].value);
    }
  }
  return weights;
}

function etiquetasI(ar, c){
  val= new Array();
  val.push(c);

  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 2**(i+1); j++) {
          val.push(ar[i]);
    }
  }
  return val;
}

function nodos(){
  var dvGrande= document.getElementById("ramas");



  dv= document.getElementById("nodos");
  dv.remove();
  dv = document.createElement("div");
      dv.setAttribute("id", "nodos");
      dvGrande.appendChild(dv);

  for (var i = 1; i < contHojas; i++) {
      var par = document.createElement("p");
      par.innerHTML=("Rama "+i+" contiene: "+arr[i-1]);
      dv.appendChild(par);
     }
     var par = document.createElement("p");
      par.innerHTML=("Rama "+i+": No se agrega nada, no hay ganancia");
      dv.appendChild(par);

}