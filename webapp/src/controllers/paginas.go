package controllers

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strconv"
	"webapp/src/config"
	"webapp/src/cookies"
	"webapp/src/models"
	"webapp/src/requisicoes"
	"webapp/src/respostas"
	"webapp/src/utils"

	"github.com/gorilla/mux"
)

func CarregarTelaDeLogin(w http.ResponseWriter, r *http.Request) {
	utils.ExecutarTempalte(w, "login.html", nil)
}

func CarregarPaginaDeCadastroDeUsuario(w http.ResponseWriter, r *http.Request) {
	utils.ExecutarTempalte(w, "cadastro.html", nil)
}

func CarregarPaginaPrincipal(w http.ResponseWriter, r *http.Request) {
	url := fmt.Sprintf("%s/publicacoes", config.APIURL)

	response, erro := requisicoes.FazerRequisicaoComAutenticacao(r, http.MethodGet, url, nil)

	if erro != nil {
		respostas.JSON(w, http.StatusInternalServerError, respostas.ErroAPI{Erro: erro.Error()})
		return
	}
	defer response.Body.Close()

	if response.StatusCode >= 400 {
		respostas.TratarStatusCodeDeErro(w, response)
		return
	}

	var publicacoes []models.Publicacao
	if erro = json.NewDecoder(response.Body).Decode(&publicacoes); erro != nil {
		respostas.JSON(w, http.StatusUnprocessableEntity, respostas.ErroAPI{Erro: erro.Error()})
		return
	}

	cookie, _ := cookies.Ler(r)
	usuarioID, _ := strconv.ParseUint(cookie["id"], 10, 64)

	utils.ExecutarTempalte(w, "home.html", struct {
		Publicacoes []models.Publicacao
		UsuarioID   uint64
	}{
		Publicacoes: publicacoes,
		UsuarioID:   usuarioID,
	})
}

func CarregarPaginaDeEdicaoDePublicacao(w http.ResponseWriter, r *http.Request) {
	parametros := mux.Vars(r)
	publicacaoID, erro := strconv.ParseUint(parametros["publicacaoId"], 10, 64)
	if erro != nil {
		respostas.JSON(w, http.StatusBadRequest, respostas.ErroAPI{Erro: erro.Error()})
		return
	}

	url := fmt.Sprintf("%s/publicacoes/%d", config.APIURL, publicacaoID)
	response, erro := requisicoes.FazerRequisicaoComAutenticacao(r, http.MethodGet, url, nil)

	if erro != nil {
		respostas.JSON(w, http.StatusInternalServerError, respostas.ErroAPI{Erro: erro.Error()})
		return
	}
	defer response.Body.Close()

	if response.StatusCode >= 400 {
		respostas.TratarStatusCodeDeErro(w, response)
		return
	}

	var publicacao models.Publicacao
	if erro = json.NewDecoder(response.Body).Decode(&publicacao); erro != nil {
		respostas.JSON(w, http.StatusUnprocessableEntity, respostas.ErroAPI{Erro: erro.Error()})
		return
	}

	utils.ExecutarTempalte(w, "atualizar-publicacao.html", publicacao)
}
