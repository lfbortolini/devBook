$("#nova-publicacao").on("submit", criarPublicacao);
$(".curtir-publicacao").on("click", curtirPublicao);

function criarPublicacao(evento) {
  evento.preventDefault();

  $.ajax({
    url: "/publicacoes",
    method: "POST",
    data: {
      titulo: $("#titulo").val(),
      conteudo: $("#conteudo").val(),
    },
  })
    .done(function () {
      window.location = "/home";
    })
    .fail(function (erro) {
      console.log(erro);

      if (erro.status >= 400) {
        alert("Erro ao criar publicação" + erro.responseText);
      } else {
        window.location = "/home";
      }
    });
}

function curtirPublicao(evento) {
  evento.preventDefault();

  const elementoClicado = $(evento.target);
  const publicacaoId = elementoClicado.closest("div").data("publicacao-id");

  elementoClicado.prop("disabled", true);

  $.ajax({
    url: `/publicacoes/${publicacaoId}/curtir`,
    method: "POST",
  })
    .done(function () {
      const contadorCurtidas = elementoClicado.next("span");
      const quantidadeCurtidas = parseInt(contadorCurtidas.text());

      contadorCurtidas.text(quantidadeCurtidas + 1);
    })
    .fail(function () {
      alert("Falha ao curtir publicação");
    })
    .always(function () {
      elementoClicado.prop("disabled", false);
    });
}
