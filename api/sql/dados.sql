insert into usuarios(nome, nick, email, senha)
values ("Usuário 1", "usuario_1", "usuario1@gmail.com", "$2a$10$Xyh2NTEqUKTYxJ2zxfUSCObp85FtcalF8Jl4BiJOLUHtsemWb9E.6"),
("Usuário 2", "usuario_2", "usuario2@gmail.com", "$2a$10$Xyh2NTEqUKTYxJ2zxfUSCObp85FtcalF8Jl4BiJOLUHtsemWb9E.6"),
("Usuário 3", "usuario_3", "usuario3@gmail.com", "$2a$10$Xyh2NTEqUKTYxJ2zxfUSCObp85FtcalF8Jl4BiJOLUHtsemWb9E.6"),
("Usuário 4", "usuario_4", "usuario4@gmail.com", "$2a$10$Xyh2NTEqUKTYxJ2zxfUSCObp85FtcalF8Jl4BiJOLUHtsemWb9E.6");

insert into seguidores(usuario_id, seguidor_id)
values (1, 2), (1,3), (3,1);

insert into publicacoes(titulo, conteudo, autor_id)
values ("Publicacão do usuário 1", "Essa é a publicação do usuário 1? Oba!", 1),
("Publicacão do usuário 2", "Essa é a publicação do usuário 2? Oba!", 2),
("Publicacão do usuário 3", "Essa é a publicação do usuário 3? Oba!", 3),
("Publicacão do usuário 4", "Essa é a publicação do usuário 4? Oba!", 4);