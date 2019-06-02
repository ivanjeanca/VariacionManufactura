function potencia(numero, potencia){
    var pot = numero;
    for (let i = 1; i < potencia; i++) 
        pot = pot * numero;  
    return pot;
}

function factorial(numero){
    var fac = numero;
    var res = 1;
    while(fac > 0){
        res = res * fac;
        fac--;
    }
    return res;
}