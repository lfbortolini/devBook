$("#formulario-cadastro").on("submit", criarUsuario);

function criarUsuario(evento) {
  evento.preventDefault();

  if ($("#senha").val() != $("#confirmar-senha").val()) {
    alert("As senhas não são idênticas");
    return;
  }

  $.ajax({
    url: "/usuarios",
    method: "POST",
    data: {
      nome: $("#nome").val(),
      email: $("#email").val(),
      nick: $("#nick").val(),
      senha: $("#senha").val(),
    },
  })
    .done(function () {
      alert("Usuário cadastrado com sucesso.");
    })
    .fail(function (erro) {
      console.log(erro);

      if (erro.status >= 400) {
        alert("Erro ao cadastrar usuário." + erro.responseText);
      } else {
        alert("Usuário cadastrado com sucesso.");
      }
    });
}
