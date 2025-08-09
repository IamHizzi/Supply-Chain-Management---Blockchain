const KEYS ={
    Manifests:'manifests',
    ManifestId:'manifestId',
    dummyDispatches:'dummyDispatches',
}
export function insertManifestItem(data) {
    let Manifests=getAllManifests();
    data['id'] = generateManifestNo()
    Manifests.push(data)
    //alert(JSON.stringify(Manifests))
    localStorage.setItem(KEYS.Manifests,JSON.stringify(Manifests))
    localStorage.setItem(KEYS.dummyDispatches,JSON.stringify(Manifests))
}

export function updateManifest(data) {
    let manifests = getAllManifests();
    let recordIndex = manifests.findIndex(x => x.id == data.id);
    manifests[recordIndex] = { ...data }
    localStorage.setItem(KEYS.Manifests, JSON.stringify(manifests));
    localStorage.setItem(KEYS.dummyDispatches,JSON.stringify(manifests))
}

export function deleteManifest(id) {
    let manifests = getAllManifests();
    manifests = manifests.filter(x => x.id != id)
    localStorage.setItem(KEYS.Manifests, JSON.stringify(manifests));
    localStorage.setItem(KEYS.dummyDispatches,JSON.stringify(manifests))
}


export function generateManifestNo() {
    if (localStorage.getItem(KEYS.ManifestId) == null)
        localStorage.setItem(KEYS.ManifestId, '0')
    var id = parseInt(localStorage.getItem(KEYS.ManifestId))
    localStorage.setItem(KEYS.ManifestId, (++id).toString())
    return id;
}

export function getAllManifests() {
    if (localStorage.getItem(KEYS.Manifests) == null)
        localStorage.setItem(KEYS.Manifests, JSON.stringify([]))
    return JSON.parse(localStorage.getItem(KEYS.Manifests));
}


export function getAllDummymanifests(){
    if (localStorage.getItem(KEYS.dummyDispatches) == null)
        localStorage.setItem(KEYS.dummyDispatches, JSON.stringify([]))
    return JSON.parse(localStorage.getItem(KEYS.dummyDispatches));
}

export function deleteDummyManifest(id) {
    let dm = getAllDummymanifests();
    dm = dm.filter(x => x.id != id)
    localStorage.setItem(KEYS.dummyDispatches, JSON.stringify(dm));
}