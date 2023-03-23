$("#parar-de-seguir").on("click", pararDeSeguir);
$("#seguir").on("click", seguir);

function pararDeSeguir() {
  $(this).prop("disabled", true);

  const usuarioId = $(this).data("usuario-id");

  $.ajax({
    url: `/usuarios/${usuarioId}/parar-de-seguir`,
    method: "POST",
  })
    .done(function () {
      window.location = `/usuarios/${usuarioId}`;
    })
    .fail(function () {
      Swal.fire("Ops...", "Erro ao para de seguir o usuário!", "error");
      $("#parar-de-seguir").prop("disabled", false);
    });
}

function seguir() {
  $(this).prop("disabled", true);

  const usuarioId = $(this).data("usuario-id");

  $.ajax({
    url: `/usuarios/${usuarioId}/seguir`,
    method: "POST",
  })
    .done(function () {
      window.location = `/usuarios/${usuarioId}`;
    })
    .fail(function () {
      Swal.fire("Ops...", "Erro ao seguir o usuário!", "error");
      $("#seguir").prop("disabled", false);
    });
}
