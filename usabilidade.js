	var cronometroBusca;

	function focarAutor() {
        document.getElementById("txtAutor").focus();
		document.getElementById("txtAutor").select();
	}

	function pesqAvanc(){
		var label = document.getElementById("labelPesq");
		var input = document.getElementById("txtpesquisaG");
			if (label.style.display == "block" || label.style.display == "") {
				label.style.display = "none";
				input.style.display = "none";
			} else {
				label.style.display = "block";
				input.style.display = "block";
			}
	}

    
	function validarFormulario() {
		var nomeAutor = document.getElementById("txtAutor").value.trim();
		var nomeAssunto = document.getElementById("txtAssunto").value.trim();
		var numeroIsbn = document.getElementById("txtIsbn").value.trim();
				if ((nomeAutor == "") && (nomeAssunto == "") && (numeroIsbn == ""))
					alert("Desculpe não foi informado nenhum dado. \n Digite no mínimo um campo Autor ou Assunto abaixo.");
					else if (nomeAutor !== "") validarAutor();
						else if (nomeAssunto !== "") validarAssunto();
							else if (numeroIsbn !== "") validarIsbn();
								else acionarPesquisarCancelar();
	}


	function validarIsbn() {
		var isbn = document.getElementById("txtIsbn").value;
		var validacaoIsbn = 	/\d\d\d-\d\d-\d\d\d-\d\d\d\d-\d/;
	
			if (!validacaoIsbn.test(isbn)) {
				alert("Desculpe Dados INCORRETOS. \n Digite somente números.");
				focarAutor();
			}
			else {
				acionarPesquisarCancelar();
			}
	}

	function validarAssunto() {
		var assunto = document.getElementById("txtAssunto").value;
		var validacaoAssunto = /^[a-z ;\u00C0-\u00FF]{1,}$/i;
			if (!validacaoAssunto.test(assunto)) {
				alert("Desculpe dados Incorretos. \n Por favor informe apenas letras, espaços em branco ou números!\n");
				focarAutor();
			}
			else {
				acionarPesquisarCancelar();
			}
	}

	function validarAutor() {
		var nomeAutor = document.getElementById("txtAutor").value;
		var validacaoAutor = /^[a-z ;\u00C0-\u00FF]{1,}$/i;
			if (!validacaoAutor.test(nomeAutor)) {
				alert("Dados INCORRETOS./n Por favor informe apenas letras,espaços em branco, ");
				focarAutor();
			}
			else {
				acionarPesquisarCancelar();
			}
	}

	function alterarConfigBotao(label, corFundo) {

		document.getElementById("btnPesquisar").value = label;
		document.getElementById("btnPesquisar").style.backgroundColor = corFundo;
				if (label == "Pesquisar") 
					document.getElementById("boxProgressBar").style.display = "none";
				else  
					document.getElementById("boxProgressBar").style.display = "block";
	}

	function acionarPesquisarCancelar() {
		var acao = document.getElementById("btnPesquisar").value;
			switch (acao) {
				case "Pesquisar":
					alterarConfigBotao("Cancelar", "#A0522D");
					iniciarCronometro();
			break;
				case "Cancelar":
				if (confirm("Você quer Finalizar a sua Busca ?")) {
					alterarConfigBotao("Pesquisar", "#A0522D");
					pararCronometro();
				}
				focarAutor();
			break;
		}
	}

	function pararCronometro() {
		document.getElementById("boxProgressBar").value = "0";
		clearTimeout(cronometroBusca);
	}

	function iniciarCronometro() {
		var valorBarra = document.getElementById("boxProgressBar").value;
		if (valorBarra < 100) {
			document.getElementById("boxProgressBar").value++;
			cronometroBusca = setTimeout("iniciarCronometro()",100);
		}
		else {
		   
			focarAutor();
			alterarConfigBotao("Pesquisar", "#A0522D");
			pararCronometro();
			alert("Desculpe! Não foi encontrado nenhum item! \n Tente novamente!");
		}
	}
