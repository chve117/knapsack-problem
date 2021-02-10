let resultados;
var s ;
var campo;
var filas;
var columnas;
var cuadro ;
var TopIndice ;
var CerosArriba ;
var CerosIzquierda;
var LeftIndice;
var text;

  function borrar(){
    s.remove();
    tabla();
    while (campo.length > 0) campo[0].remove();

    campos();
      var parGrande= document.getElementById("resultado");

  var dv = document.getElementById("respuesta");
  dv.remove();

   dv = document.createElement("div");
      dv.setAttribute("id", "respuesta");
      parGrande.appendChild(dv);
  }

  function tabla(){
  campo=document.getElementsByClassName("form-group");
  s=Snap(800, 400);
  filas = document.getElementById('pesoMax').value;
  columnas = document.getElementById('noItems').value;
  
  cuadro = new Array(filas+1);  
  TopIndice = new Array(filas+1);       
  CerosArriba = new Array(filas+1);       
  CerosIzquierda = new Array(columnas+1);       
  LeftIndice = new Array(columnas+1);       

  for (var i = 0; i <= filas; i++) {
    cuadro[i]= new Array(columnas+1);

    var aux= 185+(i*35)
    TopIndice[i]=s.text(aux, 12, " "+i);
    CerosArriba[i]=s.text(aux, 43, "0");

    TopIndice[i].attr({
      'font-size':14
    });  
        CerosArriba[i].attr({
      'font-size':14
    });  
  }
  for (var i = 0; i <= columnas; i++) {

    var aux2= 44+(i*35);
    LeftIndice[i]=s.text(150, aux2, " "+i);
    CerosIzquierda[i]=s.text(185, aux2, "0");

    LeftIndice[i].attr({
      'font-size':14
    });

    CerosIzquierda[i].attr({
      'font-size':14
    });  
  }
  
    for (var i = 0; i <= filas ; i++) {
    for (var j = 0; j <= columnas ; j++) {
    aux= 170+(i*35);
    aux2= 20+(j*35);
    cuadro[i][j] = s.rect(aux, aux2, 17, 35);

    cuadro[i][j].attr({
      fill: "lightblue",
      stroke: "#000",
      strokeWidth: 2, 
      "fill-opacity": 0.5,
      width: "*=2" 
    });
    }
   }


  }


  function llenaTabla(){
  text = new Array(columnas);        
  for (var i = 0; i < columnas; i++) {
    text[i]=new Array(filas);     
  }

  var cont=0;

  for (var i = 0; i < columnas ; i++) {
    var Y=77+ (i*35); 
       
    for (var j = 0; j < filas ; j++) {
    var X=218+ (j*35);   
 
    text[i][j]=s.text(X, Y, ""+resultados[cont]); 
    cont+=1;

    text[i][j].attr({
      'font-size':14
    });

    }
   }

  }


  function  campos(){
  var pesos = document.getElementById("campoPesos");
  var valores = document.getElementById("campoValores");

  for (var i = 0; i < columnas; i++) {
      var dv = document.createElement("div");
      dv.setAttribute("class", "form-group");
      pesos.appendChild(dv);
      var inp = document.createElement("input");
      inp.setAttribute("type", "number");
      inp.setAttribute("class", "form-control datoInputPeso");
      inp.setAttribute("value", 0);
      dv.appendChild(inp);
  }
  for (var i = 0; i < columnas; i++) {
      var dv = document.createElement("div");
      dv.setAttribute("class", "form-group");
      valores.appendChild(dv);
      var inp = document.createElement("input");
      inp.setAttribute("type", "number");
      inp.setAttribute("class", "form-control datoInputValor");
      inp.setAttribute("value", 0);
      dv.appendChild(inp);
  }

  }

  
  tabla()
  viewsArrayInput()
  llenaTabla()

function viewsArrayInput(){
     s.remove();
    tabla();
  resultados = new Array();

  var pesos_valores = new Array();
  var pesos = new Array();
  var valores = new Array();

  var inputsPesos = document.getElementsByClassName('datoInputPeso');
  namesValues = [].map.call(inputsPesos,function(dataInputPeso){
      pesos.push(dataInputPeso.value);
  });

  var inputsValores = document.getElementsByClassName('datoInputValor');
  namesValues = [].map.call(inputsValores,function(dataInputValor){
      valores.push(dataInputValor.value);
  });

  for(var i = 0; i < pesos.length; i++) {
    pesos_valores.push({w:parseInt(pesos[i]), v:parseInt(valores[i])});
  }
  var parGrande= document.getElementById("resultado");

  var dv = document.getElementById("respuesta");
  dv.remove();

   dv = document.createElement("div");
      dv.setAttribute("id", "respuesta");
      parGrande.appendChild(dv);


  var capacity= document.getElementById('pesoMax').value;
  var knap=knapsack(pesos_valores, capacity);
  console.log(knap.maxValue);

      var par = document.createElement("p");
      par.innerHTML=("Valor Máximo:  "+knap.maxValue);
      dv.appendChild(par);

    knap.subset.forEach(function(item){
      par = document.createElement("p");

      par.innerHTML=("Peso:  "+item.w +"  Valor:  "+item.v);
      dv.appendChild(par);

  });
  llenaTabla();
}




function knapsack(items, capacity){
  
    var memo = [];


    for (var i = 0; i < items.length; i++) {
      
      var row = [];
      for (var cap = 1; cap <= capacity; cap++) {
        row.push(getSolution(i,cap));
      }
      memo.push(row);
    }
  
    return(getLast());
  
    function getLast(){
      var lastRow = memo[memo.length - 1];
      return lastRow[lastRow.length - 1];
    }
  
    function getSolution(row,cap){
      const NO_SOLUTION = {maxValue:0, subset:[]};
    
      var col = cap - 1;
      var lastItem = items[row];
      var remaining = cap - lastItem.w;
      var lastSolution = row > 0 ? memo[row - 1][col] || NO_SOLUTION : NO_SOLUTION;
      var lastSubSolution = row > 0 ? memo[row - 1][remaining - 1] || NO_SOLUTION : NO_SOLUTION;
  
      if(remaining < 0){
        resultados.push(lastSolution.maxValue);
        return lastSolution;
      }
      var lastValue = lastSolution.maxValue;
      var lastSubValue = lastSubSolution.maxValue;
  
      var newValue = lastSubValue + lastItem.v;
      if(newValue >= lastValue){
        
        var _lastSubSet = lastSubSolution.subset.slice();
        _lastSubSet.push(lastItem);
        resultados.push(newValue);
        return {maxValue: newValue, subset:_lastSubSet};
      }else{
        resultados.push(lastSolution.maxValue);

        return lastSolution;
      }
    }
  }
