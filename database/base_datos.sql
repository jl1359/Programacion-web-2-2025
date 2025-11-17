-- BASE DE DATOS: CUESTIONARIOS

DROP DATABASE IF EXISTS cuestionarios;
CREATE DATABASE cuestionarios CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE cuestionarios;

-- 1. TABLAS DE APOYO / CATÁLOGOS

-- Tipos de usuario: ADMIN, EDITOR, ESTUDIANTE, etc.
CREATE TABLE tipo_usuario (
  id_tipo_usuario   INT AUTO_INCREMENT PRIMARY KEY,
  nombre            VARCHAR(50) NOT NULL,
  descripcion       VARCHAR(255)
) ENGINE=InnoDB;

-- Usuarios del sistema
CREATE TABLE usuario (
  id_usuario        INT AUTO_INCREMENT PRIMARY KEY,
  nombre            VARCHAR(100) NOT NULL,
  correo            VARCHAR(120) NOT NULL UNIQUE,
  contrasena        VARCHAR(255) NOT NULL,
  fecha_registro    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  estado            ENUM('ACTIVO','INACTIVO','BLOQUEADO') NOT NULL DEFAULT 'ACTIVO',
  id_tipo_usuario   INT NOT NULL,
  CONSTRAINT fk_usuario_tipo
    FOREIGN KEY (id_tipo_usuario) REFERENCES tipo_usuario(id_tipo_usuario)
) ENGINE=InnoDB;

-- Ciclos / niveles (p.ej. Primaria, Secundaria, etc.)
CREATE TABLE ciclo (
  id_ciclo          INT AUTO_INCREMENT PRIMARY KEY,
  nombre            VARCHAR(100) NOT NULL,
  descripcion       VARCHAR(255),
  fecha_inicio      DATE,
  fecha_fin         DATE,
  estado            ENUM('ACTIVO','INACTIVO') NOT NULL DEFAULT 'ACTIVO'
) ENGINE=InnoDB;

-- Grado de dificultad de la PREGUNTA
CREATE TABLE dificultad (
  id_dificultad     INT AUTO_INCREMENT PRIMARY KEY,
  nombre            VARCHAR(50) NOT NULL,   -- Fácil / Media / Difícil
  descripcion       VARCHAR(255),
  orden             TINYINT                 -- 1,2,3 para ordenar
) ENGINE=InnoDB;

-- Categoría del contenido: área, rango, etc.
CREATE TABLE categoria (
  id_categoria      INT AUTO_INCREMENT PRIMARY KEY,
  nombre            VARCHAR(100) NOT NULL,
  descripcion       VARCHAR(255),
  rango_edad_min    TINYINT,
  rango_edad_max    TINYINT
  -- si quieres, podrías agregar id_ciclo aquí más adelante
) ENGINE=InnoDB;

-- 2. CUESTIONARIO Y PREGUNTAS

-- Cuestionario / Banco de preguntas
CREATE TABLE cuestionario (
  id_cuestionario   INT AUTO_INCREMENT PRIMARY KEY,
  titulo            VARCHAR(150) NOT NULL,
  descripcion       VARCHAR(255),
  tipo              ENUM('BANCO','PRACTICA','EXAMEN') NOT NULL DEFAULT 'BANCO',
  fecha_creacion    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  estado            ENUM('BORRADOR','PUBLICADO','ARCHIVADO') NOT NULL DEFAULT 'BORRADOR',
  id_usuario        INT NOT NULL,           -- creador
  id_categoria      INT,
  CONSTRAINT fk_cuestionario_usuario
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario),
  CONSTRAINT fk_cuestionario_categoria
    FOREIGN KEY (id_categoria) REFERENCES categoria(id_categoria)
) ENGINE=InnoDB;

-- Pregunta
CREATE TABLE pregunta (
  id_pregunta           INT AUTO_INCREMENT PRIMARY KEY,
  enunciado             VARCHAR(500) NOT NULL,
  tipo                  ENUM('SELECCION','CORTA','NUMERICA','INTERACTIVA') NOT NULL,
  descripcion           TEXT,                    -- explicación, notas extra
  fecha_creacion        DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  fecha_publicacion     DATETIME,
  estado                ENUM('BORRADOR','PUBLICADA','INACTIVA') NOT NULL DEFAULT 'BORRADOR',
  id_usuario            INT NOT NULL,           -- quién la creó
  id_categoria          INT,
  id_cuestionario       INT,
  id_dificultad         INT,
  CONSTRAINT fk_pregunta_usuario
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario),
  CONSTRAINT fk_pregunta_categoria
    FOREIGN KEY (id_categoria) REFERENCES categoria(id_categoria),
  CONSTRAINT fk_pregunta_cuestionario
    FOREIGN KEY (id_cuestionario) REFERENCES cuestionario(id_cuestionario),
  CONSTRAINT fk_pregunta_dificultad
    FOREIGN KEY (id_dificultad) REFERENCES dificultad(id_dificultad)
) ENGINE=InnoDB;

-- Opciones de respuesta (para selección múltiple, etc.)
CREATE TABLE opcion (
  id_opcion           INT AUTO_INCREMENT PRIMARY KEY,
  texto               VARCHAR(500) NOT NULL,
  es_correcta         BOOLEAN NOT NULL DEFAULT 0,
  orden               INT,
  id_pregunta         INT NOT NULL,
  CONSTRAINT fk_opcion_pregunta
    FOREIGN KEY (id_pregunta) REFERENCES pregunta(id_pregunta)
    ON DELETE CASCADE
) ENGINE=InnoDB;

-- Opciones o configuración interactiva (arrastrar, ordenar, etc.)
CREATE TABLE opcion_interactivo (
  id_interactivo      INT AUTO_INCREMENT PRIMARY KEY,
  tipo_elemento       VARCHAR(50) NOT NULL,  -- p.ej. 'DRAG_ITEM', 'DROP_ZONE'
  configuracion       VARCHAR(255),          -- por ejemplo JSON pequeño
  dato                TEXT,
  id_pregunta         INT NOT NULL,
  CONSTRAINT fk_interactivo_pregunta
    FOREIGN KEY (id_pregunta) REFERENCES pregunta(id_pregunta)
    ON DELETE CASCADE
) ENGINE=InnoDB;

-- 3. EXÁMENES

CREATE TABLE examen (
  id_examen           INT AUTO_INCREMENT PRIMARY KEY,
  titulo              VARCHAR(150) NOT NULL,
  descripcion         VARCHAR(255),
  fecha_creacion      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  fecha_inicio        DATETIME,
  fecha_fin           DATETIME,
  estado              ENUM('BORRADOR','PROGRAMADO','EN_CURSO','FINALIZADO','CANCELADO')
                      NOT NULL DEFAULT 'BORRADOR',
  id_ciclo            INT,
  id_usuario          INT NOT NULL,          -- quien arma el examen
  CONSTRAINT fk_examen_ciclo
    FOREIGN KEY (id_ciclo) REFERENCES ciclo(id_ciclo),
  CONSTRAINT fk_examen_usuario
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario)
) ENGINE=InnoDB;

-- Relación N:M entre EXAMEN y PREGUNTA
CREATE TABLE examen_pregunta (
  id_examen           INT NOT NULL,
  id_pregunta         INT NOT NULL,
  orden               INT,
  puntaje             DECIMAL(5,2),
  PRIMARY KEY (id_examen, id_pregunta),
  CONSTRAINT fk_examenpreg_examen
    FOREIGN KEY (id_examen) REFERENCES examen(id_examen)
    ON DELETE CASCADE,
  CONSTRAINT fk_examenpreg_pregunta
    FOREIGN KEY (id_pregunta) REFERENCES pregunta(id_pregunta)
    ON DELETE CASCADE
) ENGINE=InnoDB;

-- 4. RESPUESTAS DE USUARIO

CREATE TABLE respuesta_usuario (
  id_respuesta        INT AUTO_INCREMENT PRIMARY KEY,
  respuesta_texto     TEXT,
  fecha_respuesta     DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  es_correcta         BOOLEAN,
  puntaje             DECIMAL(5,2),
  id_usuario          INT NOT NULL,
  id_pregunta         INT NOT NULL,
  id_examen           INT NOT NULL,
  id_opcion           INT NULL,     -- NULL cuando es respuesta abierta
  CONSTRAINT fk_resp_usuario
    FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario),
  CONSTRAINT fk_resp_pregunta
    FOREIGN KEY (id_pregunta) REFERENCES pregunta(id_pregunta),
  CONSTRAINT fk_resp_examen
    FOREIGN KEY (id_examen) REFERENCES examen(id_examen),
  CONSTRAINT fk_resp_opcion
    FOREIGN KEY (id_opcion) REFERENCES opcion(id_opcion)
) ENGINE=InnoDB;
