$("#formulario-cadastro").on("submit", criarUsuario);

function criarUsuario(evento) {
  evento.preventDefault();

  if ($("#senha").val() != $("#confirmar-senha").val()) {
    Swal.fire("Opss...", "As senhas não são idênticas", "error");
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
      Swal.fire("Sucesso", "Usuário cadastrado com sucesso.", "success").then(
        function () {
          $.ajax({
            url: "/login",
            method: "POST",
            data: {
              email: $("#email").val(),
              senha: $("#senha").val(),
            },
          })
            .done(function () {
              window.location = "/home";
            })
            .fail(function () {
              Swal.fire("Opss...", "Erro ao autenticar o usuário.", "error");
            });
        }
      );
    })
    .fail(function (erro) {
      Swal.fire("Opss...", "Erro ao cadastrar usuário.", "error");
    });
}
