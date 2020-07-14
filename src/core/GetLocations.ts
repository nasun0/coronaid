import testing_locations from 'assets/testing_location.json';

let cached_data: {[key: string]: undefined | [number, number, string, string][]} = {};

function shuffle(list: [number, number, string, string][]) {
    let j, x, i;
    let res: [number, number, string, string][] = [...list];
    for (i = res.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = res[i];
        res[i] = res[j];
        res[j] = x;
    }
    return res;
}

function get_testing_location() {
    return shuffle((
        testing_locations as {[key: string]: any}[]
    ).map(el => {
        let desc: string[] = [];
        desc.push("Address: " + el['fulladdr']);
        desc.push("Phone Number: " + el['phone']);
        desc.push("" + el['comments']);
        desc = desc.filter(el => !el.endsWith('null'));
        return [el['X'], el['Y'], el['name'], desc.join("<br>")];
    }));
}

async function get_api_call(loc_name: string, longitude: number, latitude: number) {
    const google = (window as any).google;
    const service = new google.maps.places.PlacesService(document.createElement('div'));
    const pos = new google.maps.LatLng(latitude, longitude);
    console.log("QUERYING " + loc_name)
    const parameter = {location: pos, radius: '5000', query: loc_name};
    const nearbySearch = (parameter: object): Promise<[number, number, string, string][]> => {
        return new Promise((resolve: any, reject: any) => {
            service.textSearch(parameter, (results: any, status: any) => {
                if (status !== google.maps.places.PlacesServiceStatus.OK) {
                    return reject(status);
                }
                const result: [number, number, string, string][] = [];
                for (const i of results) {
                    const latlng = [i.geometry.location.lat(), i.geometry.location.lng()];
                    const name = i.name;
                    const address = "Address: " + i.vicinity;
                    result.push([latlng[1], latlng[0], name, address])
                }
                resolve(result);
            })
        })
    };
    return nearbySearch(parameter);
}

export default async function(loc_name: string, longitude: number, latitude: number) {
    if (cached_data[loc_name] !== undefined) {
        return cached_data[loc_name] as [number, number, string, string][];
    }
    if (loc_name === "Testing Locations") {
        cached_data[loc_name] = get_testing_location();
    } else {
        cached_data[loc_name] = await get_api_call(loc_name, longitude, latitude);
    }
    return cached_data[loc_name] as [number, number, string, string][];
}