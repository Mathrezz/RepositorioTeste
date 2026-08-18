CREATE TABLE tarefas(
	id	SERIAL PRIMARY KEY,
	titulo VARCHAR(50) NOT NULL,
	status BOOLEAN NOT NULL
	);
	
INSERT INTO tarefas(titulo, status) VALUES 
	('Comer', FALSE),
	('Cagar', FALSE),
	('Dormir', TRUE),
	('Jogar', TRUE);
	
SELECT * FROM tarefas;