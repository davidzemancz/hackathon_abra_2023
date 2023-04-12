

export function List(){
    var sady = JSON.parse(localStorage.getItem("sadyPravidel"));
    if (sady === null) sady = { list: [] };
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
    return sady.list.filter(s => s.id == sadaId);
}

export function Delete(sadaId){
    const sady = List();
    const list = sady.list.filter(s => s.id != sadaId);
    SaveMany({list: list})

}