$("#nova-publicacao").on("submit", criarPublicacao);

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
