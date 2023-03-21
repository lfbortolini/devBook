$("#nova-publicacao").on("submit", criarPublicacao);

$(document).on("click", ".curtir-publicacao", curtirPublicao);
$(document).on("click", ".descurtir-publicacao", descurtirPublicao);

$("#atualizar-publicacao").on("click", atualizarPublicacao);
$(".deletar-publicacao").on("click", deletarPublicacao);

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
      Swal.fire(
        "Opss...",
        "Erro ao criar publicação" + erro.responseText,
        "error"
      );
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

      elementoClicado.addClass("descurtir-publicacao");
      elementoClicado.addClass("text-danger");
      elementoClicado.removeClass("curtir-publicacao");
    })
    .fail(function () {
      Swal.fire("Opss...", "Falha ao curtir publicação", "error");
    })
    .always(function () {
      elementoClicado.prop("disabled", false);
    });
}

function descurtirPublicao(evento) {
  evento.preventDefault();

  const elementoClicado = $(evento.target);
  const publicacaoId = elementoClicado.closest("div").data("publicacao-id");

  elementoClicado.prop("disabled", true);

  $.ajax({
    url: `/publicacoes/${publicacaoId}/descurtir`,
    method: "POST",
  })
    .done(function () {
      const contadorCurtidas = elementoClicado.next("span");
      const quantidadeCurtidas = parseInt(contadorCurtidas.text());

      contadorCurtidas.text(quantidadeCurtidas - 1);

      elementoClicado.removeClass("descurtir-publicacao");
      elementoClicado.removeClass("text-danger");
      elementoClicado.addClass("curtir-publicacao");
    })
    .fail(function () {
      Swal.fire("Opss...", "Falha ao descurtir publicação", "error");
    })
    .always(function () {
      elementoClicado.prop("disabled", false);
    });
}

function atualizarPublicacao(evento) {
  $(this).prop("disabled", true);

  const publicacaoId = $(this).data("publicacao-id");

  $.ajax({
    url: `/publicacoes/${publicacaoId}`,
    method: "PUT",
    data: {
      titulo: $("#titulo").val(),
      conteudo: $("#conteudo").val(),
    },
  })
    .done(function () {
      Swal.fire("Sucesso!", "Publicacao editada com sucesso!", "success").then(
        function () {
          window.location = "/home";
        }
      );
    })
    .fail(function () {
      Swal.fire("Opss...", "Falha ao aditar a publicação!", "error");
    })
    .always(function () {
      $("#atualizar-publicacao").prop("disabled", false);
    });
}

function deletarPublicacao(evento) {
  evento.preventDefault();

  Swal.fire({
    title: "Atenção!",
    text: "Tem certeza que deseja excluir essa publicação?",
    showCancelButton: true,
    cancelButtonText: "Cancelar",
    icon: "warning",
  }).then(function (confirmacao) {
    if (!confirmacao.value) return;

    const elementoClicado = $(evento.target);
    const publicacao = elementoClicado.closest("div");
    const publicacaoId = publicacao.data("publicacao-id");

    elementoClicado.prop("disabled", true);

    $.ajax({
      url: `/publicacoes/${publicacaoId}`,
      method: "DELETE",
    })
      .done(function () {
        publicacao.fadeOut("slow", function () {
          $(this).remove();
        });
      })
      .fail(function () {
        Swal.fire("Opss...", "Erro ao excluir a publicacao", "error");
      });
  });
}
