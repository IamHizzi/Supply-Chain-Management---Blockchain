const KEYS ={
    consignments:'consignments',
    preManifests:'preManifests',
    dispatches:'dispatches',
    items:'items',
    Manifests:'manifests', 
    unloads:'unloads',  
    deliveries:'deliveries',
    dummyDispatches:'dummyDispatches',
}

export function deleteAll(){
    //localStorage.removeItem(KEYS.consignments);
    localStorage.removeItem(KEYS.Manifests);
    //localStorage.removeItem(KEYS.preManifests);
    localStorage.removeItem(KEYS.dispatches);
    localStorage.removeItem(KEYS.items);
    localStorage.removeItem(KEYS.unloads);
    localStorage.removeItem(KEYS.deliveries);
    localStorage.removeItem(KEYS.dummyDispatches);

}

export function clearStorage(){
    localStorage.clear();
}