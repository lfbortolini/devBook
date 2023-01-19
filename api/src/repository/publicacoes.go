package repository

import (
	"api/src/models"
	"database/sql"
)

type Publicacoes struct {
	db *sql.DB
}

func NovoRepositorioPublicacoes(db *sql.DB) *Publicacoes {
	return &Publicacoes{db}
}

func (repositorio Publicacoes) Criar(publicacao models.Publicacao) (uint64, error) {
	statement, erro := repositorio.db.Prepare("insert into publicacoes (titulo, conteudo, autor_id, curtidas) values (?, ?, ?, ?)")
	if erro != nil {
		return 0, erro
	}

	defer statement.Close()
	resultado, erro := statement.Exec(publicacao.Titulo, publicacao.Conteudo, publicacao.AutorID, publicacao.Curtidas)
	if erro != nil {
		return 0, erro
	}

	ultimoIDInserido, erro := resultado.LastInsertId()
	if erro != nil {
		return 0, erro
	}

	return uint64(ultimoIDInserido), nil
}

func (repositorio Publicacoes) BuscarPorID(publicacaoID uint64) (models.Publicacao, error) {
	linhas, erro := repositorio.db.Query(`
		select p.*, u.Nick
		  from publicacoes p inner join usuarios u on u.id = p.autor_id
		 where p.id = ?`, publicacaoID)
	if erro != nil {
		return models.Publicacao{}, erro
	}
	defer linhas.Close()

	var publicacao models.Publicacao
	if linhas.Next() {
		if erro = linhas.Scan(
			&publicacao.ID, &publicacao.Titulo, &publicacao.Conteudo, &publicacao.AutorID, &publicacao.Curtidas, &publicacao.CriadaEm, &publicacao.AutorNick,
		); erro != nil {
			return models.Publicacao{}, erro
		}
	}
	return publicacao, nil
}
