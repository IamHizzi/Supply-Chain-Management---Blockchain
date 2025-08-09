const KEYS ={
    dispatches:'dispatches',
    dispatchNo:'dispatchNo',
}



export function insertdispatch(data) {
    let dispatches=getAlldispatches();
    data['id'] = generatedispatchNo()
    dispatches.push(data)
    localStorage.setItem(KEYS.dispatches,JSON.stringify(dispatches))
    //alert("data inserted at"+KEYS.dispatchs + JSON.stringify(dispatchs))
}

export function generatedispatchNo() {
    if (localStorage.getItem(KEYS.dispatchNo) == null)
        localStorage.setItem(KEYS.dispatchNo, '0')
    var id = parseInt(localStorage.getItem(KEYS.dispatchNo))
    localStorage.setItem(KEYS.dispatchNo, (++id).toString())
    return id;
}

export function getAlldispatches() {
    if (localStorage.getItem(KEYS.dispatches) == null)
        localStorage.setItem(KEYS.dispatches, JSON.stringify([]))
    return JSON.parse(localStorage.getItem(KEYS.dispatches));
}

export function deleteDispatch(id) {
    let dp = getAlldispatches();
    dp = dp.filter(x => x.id != id)
    localStorage.setItem(KEYS.dispatches, JSON.stringify(dp));
    //localStorage.setItem(KEYS.dummyDispatches,JSON.stringify(manifests))
}
export function removedispatches(){
    localStorage.removeItem(KEYS.dispatches);

}