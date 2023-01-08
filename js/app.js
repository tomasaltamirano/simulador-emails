document.addEventListener('DOMContentLoaded', function () {
	//seleccionar los elementos de la interfaz
	const inputEmail = document.querySelector('#email');
	const inputAsunto = document.querySelector('#asunto');
	const inputMensaje = document.querySelector('#mensaje');
	const formulario = document.querySelector('#formulario');
	const btnSubmit = document.querySelector('#formulario button[type="submit"]');
	const btnReset = document.querySelector('#formulario button[type="reset"]');
	const spinner = document.querySelector('#spinner');

	const email = {
		email: '',
		asunto: '',
		mensaje: '',
	};

	console.log(email);
	inputEmail.addEventListener('input', validar);
	inputAsunto.addEventListener('input', validar);
	inputMensaje.addEventListener('input', validar);

	formulario.addEventListener('submit', enviarEmail);

	btnReset.addEventListener('click', function (e) {
		e.preventDefault();
		resetFormulario();
	});

	function enviarEmail(e) {
		e.preventDefault();
		spinner.classList.remove('hidden');

		setTimeout(() => {
			resetFormulario();
			spinner.classList.add('hidden');

			const alertaExito = document.createElement('P');
			alertaExito.classList.add(
				'bg-green-500',
				'text-white',
				'p-2',
				'text-center',
				'rounded-lg',
				'mt-10',
				'font-bold',
				'text-sm',
				'uppercase'
			);

			alertaExito.textContent = 'Mensaje enviado con exito';
			formulario.appendChild(alertaExito);

			setTimeout(() => {
				alertaExito.remove();
			}, 3000);
		}, 3000);
	}

	function validar(e) {
		if (e.target.value.trim() === '') {
			mostrarAlerta(
				`El campo ${e.target.id} es obligatorio`,
				e.target.parentElement
			);

			email[e.target.name] = '';
			comprobarEmail();
			return;
		}
		if (e.target.id === 'email' && !validarEmail(e.target.value)) {
			mostrarAlerta('El email es incorrecto', e.target.parentElement);

			email[e.target.name] = '';
			comprobarEmail();
			return;
		}

		limpiarAlerta(e.target.parentElement);

		//asignar los valores
		email[e.target.name] = e.target.value.trim().toLowerCase();

		//comprobar email
		comprobarEmail();
	}

	function mostrarAlerta(mensaje, referencia) {
		limpiarAlerta(referencia);

		const error = document.createElement('P');
		error.textContent = mensaje;
		error.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center');
		// console.log(error);

		referencia.appendChild(error);
	}

	function limpiarAlerta(referencia) {
		const alerta = referencia.querySelector('.bg-red-600');
		if (alerta) {
			alerta.remove();
		}
	}

	function validarEmail(email) {
		const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
		const resultado = regex.test(email);
		return resultado;
	}

	function comprobarEmail() {
		if (Object.values(email).includes('')) {
			btnSubmit.classList.add('opacity-50');
			btnSubmit.disabled = true;
		} else {
			btnSubmit.classList.remove('opacity-50');
			btnSubmit.disabled = false;
		}
	}

	function resetFormulario() {
		email.email = '';
		email.asunto = '';
		email.mensaje = '';

		formulario.reset();
		comprobarEmail();
	}
});
