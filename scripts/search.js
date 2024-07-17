const tableBody = document.querySelector('#flightTable tbody')

function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        fromId: params.get('fromId'),
        toId: params.get('toId')
    };
}
console.log(window.location.search)
const params = getQueryParams()
console.log(params)
console.log(params.fromId)
console.log(params.toId)
window.onload = () => {

    const getallFlight = async () => {
        document.getElementById('loadingSpinner').classList.remove('hidden');
        try {
            const params = getQueryParams();
            console.log(params)
            const { data } = await axios.get(`http://localhost/fullstack/Flight-Backend/api/flight/getFlights.php?departure_airport_id=${params.fromId}&destination_airport_id=${params.toId}`);
            
            data.forEach(flight => {
                const row = document.createElement('tr')
    
                const fligh_id = document.createElement('td')
                fligh_id.innerText = flight.flight_number
                row.append(fligh_id)
    
                const flight_dep = document.createElement('td')
                flight_dep.innerText = params.fromId
                row.append(flight_dep)
    
                const flight_des = document.createElement('td')
                flight_des.innerText = params.toId
                row.append(flight_des)
    
                const flight_dep_time = document.createElement('td')
                flight_dep_time.innerText = new Date(flight.departure_datetime).toLocaleString('en-GB', { dateStyle: 'short', timeStyle: 'short' })
                row.append(flight_dep_time)
    
                const flight_des_time = document.createElement('td')
                flight_des_time.innerText = new Date(flight.arrival_datetime).toLocaleString('en-GB', { dateStyle: 'short', timeStyle: 'short' })
                row.append(flight_des_time)
    
                const flight_seats = document.createElement('td')
                flight_seats.innerText = flight.available_seats
                row.append(flight_seats)
                
                const book_button = document.createElement('td')
                const button = document.createElement('button')
                button.innerText = 'Book'
                button.classList.add('book-button')
                button.addEventListener('click', () => bookFlight(flight.flight_number))
                book_button.append(button)
                row.append(book_button)
    
                tableBody.append(row)
            });
        } catch (error) {
            console.error('Error fetching flights:', error);
        }
        document.getElementById('loadingSpinner').classList.add('hidden');
    }

    const bookFlight = (flightNumber) => {
        alert(`Booking flight ${flightNumber}`);
    }

    getallFlight()
}

const modal = document.getElementById('modal');
const span = document.getElementsByClassName('close')[0];

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
