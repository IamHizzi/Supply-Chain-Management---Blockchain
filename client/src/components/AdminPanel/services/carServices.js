const KEYS ={
    vehicle:'vehicle',
    
}

export function insertVehicle(data) {
    let vehicle=getAllvehicle();
    vehicle.push(data)
    localStorage.setItem(KEYS.vehicle,JSON.stringify(vehicle))
    //alert("data inserted at"+KEYS.vehicle + JSON.stringify(vehicle))
}


export function getAllvehicle() {
    if (localStorage.getItem(KEYS.vehicle) == null)
        localStorage.setItem(KEYS.vehicle, JSON.stringify([]))
    return JSON.parse(localStorage.getItem(KEYS.vehicle));
}
