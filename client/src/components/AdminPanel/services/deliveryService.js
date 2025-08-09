const KEYS={
    deliveries:'deliveries',
    deliveryNo:'deliveryNo',
}

export const getTransportCompanies = ()=>([
    { id: 'tcs', title: 'TCS' },
    { id: 'pakPost', title: 'Pak Post' },
    { id: 'leopards', title: 'Leopards Courier' },
])

export function insertdelivery(data) {
    let deliveries=getAlldeliveries();
    //data['id'] = generatedeliveryNo()
    deliveries.push(data)
    localStorage.setItem(KEYS.deliveries,JSON.stringify(deliveries))
    //alert("data inserted at"+KEYS.delivers + JSON.stringify(delivers))
}
export function getAlldeliveries() {
    if (localStorage.getItem(KEYS.deliveries) == null)
        localStorage.setItem(KEYS.deliveries, JSON.stringify([]))
    return JSON.parse(localStorage.getItem(KEYS.deliveries));
}
export function generatedeliveryNo() {
    if (localStorage.getItem(KEYS.deliveryNo) == null)
        localStorage.setItem(KEYS.deliveryNo, '0')
    var id = parseInt(localStorage.getItem(KEYS.deliveryNo))
    localStorage.setItem(KEYS.deliveryNo, (++id).toString())
    return id;
}

export function deleteDeliveries(){
    localStorage.removeItem(KEYS.deliveries)
}
