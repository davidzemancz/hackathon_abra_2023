

export function List(){
    var sady = JSON.parse(localStorage.getItem("sadyPravidel"));
    if (sady === null) sady = { list: [ {id: 0, nazev: "Sada 1"} ] };
    return sady;
}

export function SaveMany(sady){
    localStorage.setItem("sadyPravidel", JSON.stringify(sady));
}

export function Save(sada){
    const sady = List();
    sady.list.push(sada);
    SaveMany(sady);
}

export function Load(sadaId){
    const sady = List();
    var l = sady.list.filter(s => s.id == sadaId);
    var sada = { pravidla: [] };
    if (l.length > 0) sada = l[0];
    return sada;
}

export function Delete(sadaId){
    const sady = List();
    const list = sady.list.filter(s => s.id != sadaId);
    SaveMany({list: list})
}

export function PravidlaProFakturu(faktura){
    const sady = List();
    let sadyProFak = []
    for(var i = 0; i < sady.length; i++){
        if (faktura.nazFirmy == sady[i].dodavatel && faktura.sumCelkem >= sady[i].cenaOd && faktura.sumCelkem <= sady[i].cenaDo ) {
            sadyProFak.push(sady[i])
        }
    }
   
    return sadyProFak
}