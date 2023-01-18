package rotas

import (
	"api/src/controllers"
	"net/http"
)

var rotasUsuarios = []Rota{
	{
		URI:                "/usuarios",
		Metodo:             http.MethodPost,
		Funcao:             controllers.CriarUsuario,
		RequerAutentucacao: false,
	},
	{
		URI:                "/usuarios",
		Metodo:             http.MethodGet,
		Funcao:             controllers.BuscarUsuarios,
		RequerAutentucacao: true,
	},
	{
		URI:                "/usuarios/{usuarioID}",
		Metodo:             http.MethodGet,
		Funcao:             controllers.BuscarUsuario,
		RequerAutentucacao: true,
	},
	{
		URI:                "/usuarios/{usuarioID}",
		Metodo:             http.MethodPut,
		Funcao:             controllers.AtualizarUsuario,
		RequerAutentucacao: true,
	},
	{
		URI:                "/usuarios/{usuarioID}",
		Metodo:             http.MethodDelete,
		Funcao:             controllers.DeletarUsuario,
		RequerAutentucacao: true,
	},
	{
		URI:                "/usuarios/{usuarioID}/seguir",
		Metodo:             http.MethodPost,
		Funcao:             controllers.SeguirUsuario,
		RequerAutentucacao: true,
	},
	{
		URI:                "/usuarios/{usuarioID}/parar-de-seguir",
		Metodo:             http.MethodPost,
		Funcao:             controllers.PararDeSeguirUsuario,
		RequerAutentucacao: true,
	},
	{
		URI:                "/usuarios/{usuarioID}/seguidores",
		Metodo:             http.MethodGet,
		Funcao:             controllers.BuscarSeguidores,
		RequerAutentucacao: true,
	},
}
