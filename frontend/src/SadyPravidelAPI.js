

export function List(){
    var sady = JSON.parse(localStorage.getItem("sadyPravidel"));
    if (sady === null) sady = { list: [ ] };
    return sady;
}

export function SaveMany(sady){
    console.log("SaveMany")
    console.log(sady)
    localStorage.setItem("sadyPravidel", JSON.stringify(sady));
}

export function Save(sada){
    let sady = List();
    if (sada.id === undefined || sada.id === 0) {
        sada.id = sady.list.length > 0 ? sady.list[sady.list.length - 1].id + 1 : 1;
    }
    else{
        Delete(sada.id);
        sady = List();
    }
    sady.list.push(sada);
    SaveMany(sady);
}

export function Load(sadaId){
    const sady = List();
    var l = sady.list.filter(s => s.id === parseInt(sadaId));
    var sada = { pravidla: [] };
    if (l.length > 0) sada = l[0];
    return sada;
}

export function Delete(sadaId){
    const sady = List();
    const sadyList = sady.list.filter(s => s.id !== sadaId);
    console.log("Volam save many")
    SaveMany({list: sadyList});
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