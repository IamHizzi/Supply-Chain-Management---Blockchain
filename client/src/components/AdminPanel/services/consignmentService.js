const KEYS ={
    consignments:'consignments',
    consignmentNo:'consignmentNo'
}

export const getBranchesCollection = ()=>([
    { id: 'islamabad', title: 'Islamabad' },
    { id: 'karachi', title: 'Karachi' },
])

export function insertConsignment(data) {
    let consignments=getAllConsignments();
    data['id'] = generateConsignmentNo()
    consignments.push(data)
    localStorage.setItem(KEYS.consignments,JSON.stringify(consignments))
    //alert("data inserted at"+KEYS.consignments + JSON.stringify(consignments))
}

export function generateConsignmentNo() {
    if (localStorage.getItem(KEYS.consignmentNo) == null)
        localStorage.setItem(KEYS.consignmentNo, '0')
    var id = parseInt(localStorage.getItem(KEYS.consignmentNo))
    localStorage.setItem(KEYS.consignmentNo, (++id).toString())
    return id;
}

export function getAllConsignments() {
    if (localStorage.getItem(KEYS.consignments) == null)
        localStorage.setItem(KEYS.consignments, JSON.stringify([]))
    return JSON.parse(localStorage.getItem(KEYS.consignments));
}
/*
export function getRequiredConsignment(id){
    let con = getAllConsignments();
    con = con.filter(x => x.id == id)
    return JSON.parse(localStorage.getItem())
}
*/

export function removeConsignments(){
    localStorage.removeItem(KEYS.consignments);

}