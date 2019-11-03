
function pegarDados() {
    const dados = {
        danoArma: $('#dano-arma').val() == '' ? 0 : parseInt($('#dano-arma').val()),
        affinityArma: $('#affinity-arma').val() == '' ? 0 : parseInt($('#affinity-arma').val()),
        ataque: parseInt($('#attack').val()),
        critico: parseInt($('#critical').val()),
        repeatOffender: $('#repeat-offender').val() === 'true' ? true : false,
        criticalBoost: $('#critical-boost').val() === 'true' ? true : false,
        powerCharm: $('#power-charm').val() === 'true' ? true : false,
        powerTalon: $('#power-talon').val() === 'true' ? true : false,
        challenger: $('#challenger').val() === 'null' ? false : true,
    }

    dados.danoArma += dados.ataque;
    dados.affinityArma += dados.critico;

    dados.powerCharm === true ? dados.danoArma += 6 : 0;
    dados.powerTalon === true ? dados.danoArma += 9 : 0;

    return dados;
}

function mostrarDados(dados) {
    const danoSomado = dados.danoArma * 10;
    let danoSomadoCritico = 0;
    let danoChallenger = 0
    let multiplicadorCritico;
    const affinityOriginal = dados.affinityArma;

    if (dados.criticalBoost) {
        multiplicadorCritico = 1.40;
    } else {
        multiplicadorCritico = 1.25;
    }

    for (let golpes = 0; golpes <= 9; golpes++) {
        if ((dados.repeatOffender === true) && (golpes === 0)) {
            dados.affinityArma += 25;
        }

        if ((dados.repeatOffender === true) && (dados.golpes === 4)) {
            dados.affinityArma += 5;
        }

        const acertoCritico = dados.affinityArma / 10;
        if (acertoCritico > golpes) {
            danoSomadoCritico += (dados.danoArma * multiplicadorCritico);
        } else {
            danoSomadoCritico += dados.danoArma;
        }
    }

    dados.affinityArma = affinityOriginal;

    $('.dano-somado').text(dados.danoArma);
    $('.affinity-somado').text(dados.affinityArma);

    if (dados.repeatOffender) {
        $('.affinity-somado-repeatoffender').text(dados.affinityArma + 30);
    } else {
        $('.affinity-somado-repeatoffender').text(0);
    }
    
    if ($('#challenger').val() === '10-10') {
        dados.danoArma += 10;
        dados.affinityArma += 10;
    }
    if ($('#challenger').val() === '20-15') {
        dados.danoArma += 20;
        dados.affinityArma += 15;
    }

    const affinityComChallenger = dados.affinityArma;

    for (let golpes = 0; golpes <= 9; golpes++) {
        if ((dados.repeatOffender === true) && (golpes === 0)) {
            dados.affinityArma += 25;
        }

        if ((dados.repeatOffender === true) && (golpes === 4)) {
            dados.affinityArma += 5;
        }

        const acertoCriticoChallenger = dados.affinityArma / 10;
        if (acertoCriticoChallenger > golpes) {
            danoChallenger += (dados.danoArma * multiplicadorCritico);
        } else {
            danoChallenger += dados.danoArma;
        }
    }


    if (dados.challenger) {
        $('.dano-somado-challenger').text(dados.danoArma);
        $('.affinity-somado-challenger').text(affinityComChallenger);
    }

    $('.dano-medio').text(danoSomado);
    $('.dano-medio-critico').text(danoSomadoCritico);

    if (dados.challenger) {
        $('.dano-medio-challenger').text(danoChallenger);
    }

    if (dados.repeatOffender && dados.challenger) {
        $('.affinity-somado-challenger-repearoffender').text(affinityComChallenger + 30)
    } else {
        $('.affinity-somado-challenger-repearoffender').text(0)
    }
}

$('.botao-calcular').click(function () {
    const dados = pegarDados();
    mostrarDados(dados)
})