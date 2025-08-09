const KEYS = {
    unloads:'unloads',
    munload:'munload',
}

export function insertunload(data) {
    //localStorage.removeItem(KEYS.unloads)
    let unloads=getAllunloads();
    //alert(JSON.stringify(data))
    //data['id'] = generateunloadNo()
    unloads.push(data)
    //alert(JSON.stringify(unloads))
    localStorage.setItem(KEYS.unloads,JSON.stringify(unloads))
    //alert("data inserted at"+KEYS.unloads + JSON.stringify(unloads))
}
export function insertmanifestunload(data){

    let munload=getAllManifestunloads()
    munload.push(data)
    localStorage.setItem(KEYS.munload,JSON.stringify(munload))
}

export function getAllunloads() {
    if (localStorage.getItem(KEYS.unloads) == null)
        localStorage.setItem(KEYS.unloads, JSON.stringify([]))
    return JSON.parse(localStorage.getItem(KEYS.unloads));
}
export function getAllManifestunloads() {
    if (localStorage.getItem(KEYS.munload) == null)
        localStorage.setItem(KEYS.munload, JSON.stringify([]))
    return JSON.parse(localStorage.getItem(KEYS.munload));
}

export function deleteUnload(id) {
    var rec=getAllunloads()
    const newr=[]
  for(let i=0; i<rec.length;  i++){
    for(let item of rec[i]){
        if(item.id!=id){
            //alert(item)
            newr.push(item);
        }
    }
  }
    //alert(JSON.stringify(newr))
    localStorage.setItem(KEYS.unloads, JSON.stringify(newr));
    //localStorage.setItem(KEYS.dummyDispatches,JSON.stringify(manifests))
}

