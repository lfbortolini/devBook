package modelos

import (
	"errors"
	"strings"
	"time"
)

type Usuario struct {
	ID       uint64    `json:"id,omitempty"`
	Nome     string    `json:"nome,omitempty"`
	Nick     string    `json:"nick,omitempty"`
	Email    string    `json:"email,omitempty"`
	Senha    string    `json:"senha,omitempty"`
	CriadoEm time.Time `json:"criadoEm,omitempty"`
}

func (usuario *Usuario) Preparar() error {
	usuario.formatar()
	if erro := usuario.validar(); erro != nil {
		return erro
	}

	return nil
}

func (usuario *Usuario) validar() error {
	if usuario.Nome == "" {
		return errors.New("O campo nome é obrigatório")
	}

	if usuario.Nick == "" {
		return errors.New("O campo nick é obrigatório")
	}

	if usuario.Email == "" {
		return errors.New("O campo email é obrigatória")
	}

	if usuario.Senha == "" {
		return errors.New("O campo senha é obrigatória")
	}
	return nil
}

func (usuario *Usuario) formatar() {
	usuario.Nome = strings.TrimSpace(usuario.Nome)
	usuario.Nick = strings.TrimSpace(usuario.Nick)
	usuario.Email = strings.TrimSpace(usuario.Email)
}
