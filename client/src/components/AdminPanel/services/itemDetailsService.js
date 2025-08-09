const KEYS ={
    items:'items',
    itemId:'itemId'
}

export const getTaxRateCollection = ()=>([
    { id: '5', title: '5%' },
    { id: '10', title: '10%' },
])

export function insertitem(data) {
    let items=getAllitems();
    data['id'] = generateitemId()
    items.push(data)
    localStorage.setItem(KEYS.items,JSON.stringify(items))
    //alert("data inserted at"+KEYS.items + JSON.stringify(items))
}

export function generateitemId() {
    if (localStorage.getItem(KEYS.itemId) == null)
        localStorage.setItem(KEYS.itemId, '0')
    var id = parseInt(localStorage.getItem(KEYS.itemId))
    localStorage.setItem(KEYS.itemId, (++id).toString())
    return id;
}

export function getAllitems() {
    if (localStorage.getItem(KEYS.items) == null)
        localStorage.setItem(KEYS.items, JSON.stringify([]))
    return JSON.parse(localStorage.getItem(KEYS.items));
}

export function removeItemDetails(data){
    localStorage.removeItem(KEYS.items);

}