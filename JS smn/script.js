let tituloGeneral = document.createElement('h1');
tituloGeneral.setAttribute('class', 'titulo-general');
tituloGeneral.innerText = 'Pronóstico del tiempo en Argentina';
document.body.append(tituloGeneral);

let contenedor = document.createElement('div');
contenedor.setAttribute('class', 'contenedor');
document.body.append(contenedor);

async function indicarClima() {
	let response = await fetch('https://ws.smn.gob.ar/map_items/weather');
	let climasDeLugares = response.json();
	return climasDeLugares;
}

indicarClima().then((resultado) => {
	console.log(resultado);
	for (let i = 0; i < resultado.length; i++) {
		const element = resultado[i];

		let nuevoDiv = document.createElement('div');
		nuevoDiv.setAttribute('class', 'contenedor-ciudad');

		let titulo = document.createElement('h1');
		titulo.setAttribute('class', 'nombre-lugar');
		titulo.innerHTML = `${element.name}`;

		let provincia = document.createElement('p');
		provincia.setAttribute('class', 'nombre-lugar');
		provincia.innerHTML = `${element.province}`;

		let icono = document.createElement('p');
		icono.setAttribute('class', 'icono');

		let clima = document.createElement('h2');
		clima.setAttribute('class', 'clima');
		clima.innerHTML = `${element.weather.description}`;

		let temperatura = document.createElement('h3');
		temperatura.setAttribute('class', 'temperatura');
		temperatura.innerHTML = `${element.weather.temp}°`;

		let humedad = document.createElement('h3');
		humedad.setAttribute('class', 'humedad');
		humedad.innerHTML = `${element.weather.humidity}% de humedad`;

		let viento = document.createElement('h3');
		viento.setAttribute('class', 'viento');
		viento.innerHTML = `Viento: ${element.weather.wind_speed} km/h`;

		let presion = document.createElement('h3');
		presion.setAttribute('class', 'presion');
		presion.innerHTML = `Presión: ${element.weather.pressure} hPa`;

		nuevoDiv.appendChild(titulo);
		nuevoDiv.appendChild(provincia);
		nuevoDiv.appendChild(icono);
		nuevoDiv.appendChild(clima);
		nuevoDiv.appendChild(temperatura);
		nuevoDiv.appendChild(humedad);
		nuevoDiv.appendChild(viento);
		nuevoDiv.appendChild(presion);
		contenedor.appendChild(nuevoDiv);

		let descripcion = element.weather.description;

		if (descripcion.includes('iebla') || descripcion.includes('eblin')) {
			nuevoDiv.style.backgroundColor = 'darkgray';
			icono.innerHTML = `<i class="fas fa-smog fa-3x"></i>`;
		} else if (descripcion.includes('espejado')) {
			nuevoDiv.style.backgroundColor = 'lightblue';
			icono.innerHTML = `<i class="fas fa-sun fa-3x"></i>`;
		} else if (descripcion.includes('arcialmente nublad')) {
			nuevoDiv.style.backgroundColor = 'lightgrey';
			icono.innerHTML = `<i class="fas fa-cloud-sun fa-3x"></i>`;
		} else if (descripcion.includes('ublad')) {
			nuevoDiv.style.backgroundColor = 'darkslategrey';
			icono.innerHTML = `<i class="fas fa-cloud fa-3x"></i>`;
		} else if (
			descripcion.includes('lovizna') ||
			descripcion.includes('luvi') ||
			descripcion.includes('orment') ||
			descripcion.includes('recipitaci')
		) {
			nuevoDiv.style.backgroundColor = 'darkblue';
			icono.innerHTML = `<i class="fas fa-cloud-showers-heavy fa-3x"></i>`;
		} else if (descripcion.includes('ieve') || descripcion.includes('evad')) {
			nuevoDiv.style.backgroundColor = 'lavender';
			icono.innerHTML = `<i class="fas fa-snowflake fa-3x"></i>`;
		} else if (descripcion.includes('ubierto')) {
			nuevoDiv.style.backgroundColor = 'darkslategrey';
			icono.innerHTML = `<i class="fas fa-cloud fa-3x"></i>`;
		} else if (descripcion.includes('alor') || descripcion.includes('aluros')) {
			nuevoDiv.style.backgroundColor = 'red';
			icono.innerHTML = `<i class="fas fa-sun fa-3x"></i>`;
		}
	}
});
