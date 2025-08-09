const KEYS ={
    preManifests:'preManifests',
    preManifestId:'preManifestId'
}
export function insertPreManifestItem(data,id) {
    let preManifests=getAllPreManifests();
    data.splice(0,1)
    //alert(JSON.stringify(data))
    for(let i=0; i<data.length; i++){
        data[i].manifestId=id
        //alert(data[i].manifestId)
        preManifests.push(data[i])
       
    } 
    //alert(JSON.stringify(preManifests))
    //alert("data inserted at"+KEYS.preManifests + JSON.stringify(preManifests))
    localStorage.setItem(KEYS.preManifests,JSON.stringify(preManifests))
}

export function generatePreManifestNo() {
    if (localStorage.getItem(KEYS.preManifestId) == null)
        localStorage.setItem(KEYS.preManifestId, '0')
    var id = parseInt(localStorage.getItem(KEYS.preManifestId))
    localStorage.setItem(KEYS.preManifestId, (++id).toString())
    return id;
}
export function getAllPreManifests() {
    if (localStorage.getItem(KEYS.preManifests) == null)
        localStorage.setItem(KEYS.preManifests, JSON.stringify([]))
    return JSON.parse(localStorage.getItem(KEYS.preManifests));
}

export function removePreManifestItem(){
    localStorage.removeItem(KEYS.preManifests);
}