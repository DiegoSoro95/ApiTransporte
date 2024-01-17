DROP DATABASE IF EXISTS transportesDB;

CREATE DATABASE transportesDB;

USE transportesDB;

/*----------CREACIÓN DE TABLAS-----------*/
CREATE TABLE empleado ( 
	usuario VARCHAR(50) PRIMARY KEY, 
    contrasenia VARCHAR(50), 
    nombre_completo VARCHAR(100),
	activo BIT NOT NULL
);

CREATE TABLE administrador (
	usuarioA VARCHAR(50) PRIMARY KEY,
	carga_horaria_semanal INT NOT NULL, 
	FOREIGN KEY (usuarioA) REFERENCES empleado(usuario)
);

CREATE TABLE chofer (
	usuarioC VARCHAR(50) PRIMARY KEY,
	nro_licencia VARCHAR(50) NOT NULL,
	telefono INT NOT NULL,
	FOREIGN KEY(usuarioC) REFERENCES empleado(usuario)
);

CREATE TABLE tecnico (
	usuarioT VARCHAR(50) PRIMARY KEY,
	especializacion VARCHAR(50) NOT NULL,		
	FOREIGN KEY (usuarioT) REFERENCES empleado(usuario)
);

CREATE TABLE tipo_camion (
	id_tipo CHAR(7) PRIMARY KEY, 
	descripcion VARCHAR(100) NOT NULL,
	dimensiones VARCHAR(50) NOT NULL,
	cantidad_ejes INT NOT NULL, 
	capacidad_carga DECIMAL(8,2) NOT NULL,
	capacidad_combustible INT NOT NULL
);

CREATE TABLE estado_camion (
	id_estado CHAR(3) PRIMARY KEY,
	descripcion VARCHAR(50)
);

CREATE TABLE camion (
	matricula VARCHAR(10) PRIMARY KEY,
	anio INT NOT NULL,
	marca VARCHAR(50) NOT NULL,
	kilometros INT NOT NULL,
	id_estado CHAR(3),
	id_tipo CHAR(7),
	FOREIGN KEY (id_estado) REFERENCES estado_camion(id_estado),
	FOREIGN KEY (id_tipo) REFERENCES tipo_camion(id_tipo)
);

CREATE TABLE mantenimiento (
	id_mantenimiento INT NOT NULL AUTO_INCREMENT,
	fecha_mantenimiento DATE NOT NULL,
	observaciones VARCHAR(100) NOT NULL,
	estado_mantenimiento bit(1)  NOT NULL,
	costo DECIMAL(8,2) NOT NULL,
	matricula VARCHAR(10),
	usuarioT VARCHAR(50),
	PRIMARY KEY(id_mantenimiento),
	FOREIGN KEY (matricula) REFERENCES camion(matricula),
	FOREIGN KEY (usuarioT) REFERENCES tecnico(usuarioT)
);

CREATE TABLE solicitud_de_material (
	id_solicitud INT NOT NULL AUTO_INCREMENT,
	id_mantenimiento INT,
	producto_solicitado VARCHAR(100) NOT NULL,
	cantidad INT NOT NULL,
	estado CHAR(9) NOT NULL,
	PRIMARY KEY (id_solicitud),
	FOREIGN KEY (id_mantenimiento) REFERENCES mantenimiento(id_mantenimiento)
);

CREATE TABLE cliente (
	documento VARCHAR(15) PRIMARY KEY,
	nombre_completo VARCHAR(50) NOT NULL,
	direccion VARCHAR(100) NOT NULL,
	telefono INT  NOT NULL
);

CREATE TABLE transporte(
	id_transporte INT NOT NULL AUTO_INCREMENT,
	estado_transporte VARCHAR(10) NOT NULL,
	fecha_hora_inicio DATETIME NOT NULL,
	fecha_hora_fin DATETIME DEFAULT NULL,
	kms_distancia INT NOT NULL,
	origen VARCHAR(100) NOT NULL,
	destino VARCHAR(100) NOT NULL,
	matricula VARCHAR(10),
	usuarioC VARCHAR(50),
	documentoCliente VARCHAR(15),
	activo BIT NOT NULL DEFAULT 1,
	PRIMARY KEY (id_transporte),
	FOREIGN KEY (matricula) REFERENCES camion(matricula),
	FOREIGN KEY (usuarioC) REFERENCES chofer(usuarioC),
	FOREIGN KEY (documentoCliente) REFERENCES cliente(documento)
);

CREATE TABLE generan (
	usuarioA VARCHAR(50),
	id_transporte INT,
	PRIMARY KEY (usuarioA, id_transporte),
	FOREIGN KEY (usuarioA) REFERENCES administrador(usuarioA),
	FOREIGN KEY (id_transporte) REFERENCES transporte(id_transporte)
);

CREATE TABLE realizan (
	usuarioC VARCHAR(50),
	id_transporte INT,
	PRIMARY KEY (usuarioC, id_transporte),
	FOREIGN KEY (usuarioC) REFERENCES chofer(usuarioC),
	FOREIGN KEY (id_transporte) REFERENCES transporte(id_transporte)
);

CREATE TABLE gasto_asociado(
	id_gasto INT NOT NULL AUTO_INCREMENT,
	monto_gasto DECIMAL(8,2) NOT NULL,
	observaciones VARCHAR(100) NOT NULL,
	id_transporte INT, PRIMARY KEY (id_gasto),
	fecha_gasto DATETIME NOT NULL,
	url_imagen VARCHAR(100) DEFAULT NULL,
	FOREIGN KEY (id_transporte) REFERENCES transporte(id_transporte)
);

/*----------DATOS PRE CARGADOS----------*/
insert into empleado VALUES ('fabri',hex(aes_encrypt('fabri123', '123')),'Fabricio Arrua',1);
insert into empleado VALUES ('diego',hex(aes_encrypt('diego123', '123')),'Diego Sorozabal',1);
insert into empleado VALUES ('enzo',hex(aes_encrypt('enzo123', '123')),'Enzo Garcia',1);
insert into empleado VALUES ('chofer1',hex(aes_encrypt('chofer123', '123')),'Test Chofer 1',1);
insert into empleado VALUES ('chofer2',hex(aes_encrypt('chofer123', '123')),'Test Chofer 2',1);
insert into empleado VALUES ('tecnico1',hex(aes_encrypt('tecnico123', '123')),'Test Tecnico 1',1);
insert into empleado VALUES ('tecnico2',hex(aes_encrypt('tecnico123', '123')),'Test Tecnico 2',1);


insert into administrador VALUES ('fabri', 40);
insert into administrador VALUES ('enzo', 40);
insert into administrador VALUES ('diego', 40);

insert into chofer VALUES ('chofer1','A00000010',22031122);
insert into chofer VALUES ('chofer2','A00000020',22032233);

insert into tecnico VALUES ('tecnico1','electrónica');
insert into tecnico VALUES ('tecnico2','mecánica');


insert into tipo_camion VALUES ('CAJAAB5', 'Caja abierta 5mts', '4918 x 1868 x 2154', 2, 1910, 60);
insert into tipo_camion VALUES ('CAJACE5', 'Caja cerrada 5mts', '4980 X 1725 X 2300', 2, 1910, 60);
insert into tipo_camion VALUES ('CAJAAB7', 'Caja abierta 7mts', '7285 x 2170 x 2315', 2, 5600, 120);
insert into tipo_camion VALUES ('CAJAAB8', 'Caja abierta 8mts', '8415 x 2442 x 2546', 2, 7600, 100);
insert into tipo_camion VALUES ('CAJACE7', 'Caja cerrada 7mts', '7470 X 2020 X 2546', 2, 6915, 100);
insert into tipo_camion VALUES ('CAJAB10', 'Caja abierta 10mts', '9765 X 2400 X 2735', 3, 16500, 200);
insert into tipo_camion VALUES ('CAJCE14', 'Caja cerrada 14mts', '15600 X 2450 X 3910', 5, 24500, 400);
insert into tipo_camion VALUES ('CHATA14', 'Chata 14mts', '15600 X 2450 X 3910', 5, 24500, 400);

INSERT INTO estado_camion (id_estado, descripcion) VALUES
    ('DIS', 'Disponible'),
    ('MAN', 'Mantenimiento'),
    ('SUS', 'Suspendido');
    
INSERT INTO camion (matricula, anio, marca, kilometros, id_estado, id_tipo) VALUES
    ('ABC1234', 2020, 'Ford', 50000, 'DIS', 'CAJAAB5'),
    ('XYZ6789', 2019, 'Mercedes', 70000, 'MAN', 'CAJCE14');

INSERT INTO mantenimiento (fecha_mantenimiento, observaciones, estado_mantenimiento, costo, matricula, usuarioT) VALUES
    ('2023-07-20', 'Revisión general', 1, 500, 'ABC1234', 'tecnico1'),
    ('2023-07-25', 'Reparación motor', 1, 1200, 'XYZ6789', 'tecnico2');

INSERT INTO solicitud_de_material (id_mantenimiento, producto_solicitado, cantidad, estado) VALUES
    (1, 'Aceite de motor', 5, 'Pendiente'),
    (2, 'Filtro de aire', 3, 'Aprobada');
    
INSERT INTO cliente (documento, nombre_completo, direccion, telefono) VALUES
    ('123456789', 'Juan Pérez', 'Calle 123, Ciudad A', 555123456),
    ('987654321', 'María Gómez', 'Avenida X, Ciudad B', 555987654);

INSERT INTO transporte (activo, estado_transporte, fecha_hora_inicio, fecha_hora_fin, kms_distancia, origen, destino, matricula, usuarioC, documentoCliente) VALUES
    (1,'En viaje', '2023-07-26 09:00:00', '2023-07-26 15:30:00', 250, 'Ciudad A', 'Ciudad B', 'ABC1234', 'chofer1', '123456789'),
    (1,'Finalizado', '2023-07-28 11:45:00', '2023-07-28 18:20:00', 180, 'Ciudad X', 'Ciudad Y', 'XYZ6789', 'chofer2', '987654321'),
    (1,'Pendiente', '2023-07-30 08:30:00', NULL, 300, 'Ciudad B', 'Ciudad C', 'ABC1234', 'chofer2', '987654321'),
    (1,'En viaje', '2023-08-01 10:00:00', '2023-08-01 18:30:00', 400, 'Ciudad Y', 'Ciudad Z', 'XYZ6789', 'chofer1', '123456789');

INSERT INTO generan (usuarioA, id_transporte) VALUES
    ('fabri', 1),
    ('enzo', 2),
	('diego', 2);

INSERT INTO realizan (usuarioC, id_transporte) VALUES
    ('chofer1', 1),
    ('chofer2', 2);
    
INSERT INTO gasto_asociado (monto_gasto, observaciones, id_transporte,fecha_gasto) VALUES
    (120, 'Combustible', 1,'2023-11-11'),
    (80, 'Peajes', 2,'2023-07-28');
    
insert into transporte values (0,'Pendiente','2024-09-01 07:00:00', null, 277, 'Montevideo', 'Mercedes, Soriano', null, null, '123456789', 1);
insert into transporte values (0,'Pendiente','2024-09-15 07:00:00', null, 221, 'Montevideo', 'Villa del Carmen, Durazno', null, null, '987654321', 1);
insert into transporte values (0,'Pendiente','2024-09-28 07:00:00', null, 262, 'Montevideo', 'Lascano, Rocha', null, null, '123456789', 1);
insert into transporte values (0,'Pendiente','2024-10-01 07:00:00', null, 389, 'Montevideo', 'Tambores, Paysandú', null, null, '987654321', 1);
insert into transporte values (0,'Pendiente','2024-10-15 07:00:00', null, 572, 'Montevideo', 'Sequeira, Artigas', null, null, '123456789', 1);

/*----------STORE PROCEDURES----------*/

/*----------SP LOGIN----------*/
CREATE PROCEDURE LoginChofer(pUsuario VARCHAR(50), pPass VARCHAR(50)) 
	SELECT c.*,e.nombre_completo,'C' as Tipo FROM empleado e JOIN chofer c ON e.usuario= c.usuarioC WHERE e.usuario = pUsuario AND aes_decrypt(unhex(e.contrasenia), '123') = pPass AND e.activo=1;

CREATE PROCEDURE LoginAdministrador(pUsuario VARCHAR(50), pPass VARCHAR(50))
	SELECT a.usuarioA as usuario, a.carga_horaria_semanal,e.nombre_completo,'A' as Tipo FROM empleado e JOIN administrador a ON e.usuario= a.usuarioA WHERE e.usuario = pUsuario AND aes_decrypt(unhex(e.contrasenia), '123') = pPass AND e.activo=1;

CREATE PROCEDURE LoginTecnico(pUsuario VARCHAR(50), pPass VARCHAR(50))
	SELECT t.usuarioT as usuario, t.especializacion ,e.nombre_completo,'T' as Tipo FROM empleado e JOIN tecnico t ON e.usuario= t.usuarioT WHERE e.usuario = pUsuario AND aes_decrypt(unhex(e.contrasenia), '123') = pPass AND e.activo=1;

/*----------SP CHOFER----------*/

CREATE PROCEDURE ListadoChoferSinTransporteAsignado()
	SELECT c.*,e.nombre_completo FROM chofer c JOIN empleado e ON c.usuarioC = e.usuario WHERE c.usuarioC NOT IN (SELECT DISTINCT t.usuarioC FROM transporte t WHERE t.usuarioC is not null) AND e.activo=1;
    
CREATE PROCEDURE ListadoChofer()
	SELECT c.*,e.nombre_completo FROM empleado e JOIN chofer c ON e.usuario= c.usuarioC AND e.activo=1;
    
CREATE PROCEDURE BuscarChofer(pUsuario VARCHAR(50))
	SELECT c.*,e.nombre_completo FROM empleado e JOIN chofer c ON e.usuario= c.usuarioC WHERE e.usuario = pUsuario AND e.activo=1;

DELIMITER //
CREATE PROCEDURE ModificarContrasenia(pUsuario VARCHAR(50), pPass VARCHAR(50), OUT MsgError VARCHAR(250))
BEGIN
	IF NOT EXISTS(SELECT * FROM empleado WHERE usuario = pUsuario AND activo=1) THEN
		SET MsgError = "No existe un Empleado con dicho nombre.";
	ELSE
		UPDATE empleado SET contrasenia = hex(aes_encrypt(pPass, '123')) WHERE usuario = pUsuario;
	END IF;
END//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE AltaChofer(pUsuario VARCHAR(50) , pPass VARCHAR(50), pNombre VARCHAR(100), pLicencia VARCHAR(50),pTelefono INT(11), OUT MsgError VARCHAR(250))
cuerpo:BEGIN
	DECLARE mensajeError VARCHAR(250);
    DECLARE transaccionActiva BIT;
    
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    
    BEGIN
		IF transaccionActiva THEN
			ROLLBACK;
		END IF;
        
        SET MsgError = mensajeError;
    END;
    
    IF EXISTS(SELECT * FROM empleado WHERE usuario = pUsuario AND activo=1) THEN
		SET MsgError = "Ya existe una Empleado con ese nombre de usuario";
        LEAVE cuerpo;
	END IF;
	
	SET transaccionActiva = 1;
    
    START TRANSACTION;
    
	IF EXISTS (SELECT c.usuarioC FROM chofer c JOIN empleado e ON c.usuarioC=e.usuario WHERE c.usuarioC = pUsuario AND e.activo = 0) THEN
		BEGIN
			SET mensajeError = "No se pudo activar el Chofer.";
			UPDATE chofer SET nro_licencia = pLicencia, telefono = pTelefono WHERE usuarioC = pUsuario;

			SET mensajeError = "No se pudo activar el Empleado.";
			UPDATE empleado SET contrasenia = pPass,nombre_completo = pNombre , activo = 1 WHERE usuario = pUsuario;
        END;
	ELSE
		BEGIN
			SET mensajeError = "No se pudo insertar el Empleado.";
			INSERT INTO empleado(usuario,contrasenia,nombre_completo,activo) VALUES (pUsuario,hex(aes_encrypt(pPass, '123')),pNombre,1);
			
			SET mensajeError = "No se pudo insertar el Chofer.";
			INSERT INTO chofer(usuarioC,nro_licencia,telefono) VALUES (pUsuario, pLicencia,pTelefono);
        END;
	END IF;
    
    COMMIT;
    
    SET transaccionActiva = 0;
END//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE ModificarChofer(pUsuario VARCHAR(50), pNombre VARCHAR(100), pLicencia VARCHAR(50),pTelefono INT(11), OUT MsgError VARCHAR(250))
cuerpo:BEGIN
	DECLARE mensajeError VARCHAR(50);
    DECLARE transaccionActiva BIT;
    
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    
    BEGIN
		IF transaccionActiva THEN
			ROLLBACK;
		END IF;
        
        SET MsgError = mensajeError;
    END;
    
    IF NOT EXISTS(SELECT * FROM empleado WHERE usuario = pUsuario AND activo=1) THEN
		SET MsgError = "No existe un Empleado con dicho nombre.";
        LEAVE cuerpo;
	END IF;
	
	SET transaccionActiva = 1;
    
    START TRANSACTION;

	IF EXISTS (SELECT c.usuarioC FROM chofer c JOIN empleado e on c.usuarioC=e.usuario WHERE c.usuarioC = pUsuario AND e.activo = 1) THEN
		SET mensajeError = "No se pudo modificar el Chofer.";
		UPDATE chofer SET nro_licencia = pLicencia, telefono = pTelefono WHERE usuarioC = pUsuario;

        SET mensajeError = "No se pudo modificar el Empleado.";
		UPDATE empleado SET nombre_completo = pNombre , activo = 1 WHERE usuario = pUsuario;
    END IF;
    
	COMMIT;
    
    SET transaccionActiva = 0;
END//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE EliminarChofer(pUsuario VARCHAR(50), OUT MsgError VARCHAR(100))
BEGIN
	IF NOT EXISTS(SELECT * FROM empleado WHERE usuario = pUsuario AND activo=1) THEN
		SET MsgError = "No existe un Empleado con dicho nombre.";
	ELSEIF EXISTS (SELECT c.usuarioC FROM chofer c JOIN empleado e on c.usuarioC=e.usuario WHERE c.usuarioC = pUsuario AND e.activo = 1) THEN
		UPDATE empleado SET activo = 0 WHERE usuario = pUsuario;
	ELSE
		SET MsgError = "El empleado no es un chofer.";
	END IF;
END//
DELIMITER ;

/*----------SP TECNICO----------*/

CREATE PROCEDURE BuscarTecnico(pUsuario VARCHAR(50))
	SELECT t.*,e.nombre_completo FROM empleado e JOIN tecnico t ON e.usuario= t.usuarioT WHERE e.usuario = pUsuario AND e.activo=1;

CREATE PROCEDURE ListarTecnicos()
	SELECT t.*,e.nombre_completo FROM empleado e JOIN tecnico t ON e.usuario= t.usuarioT WHERE e.activo=1;

DELIMITER //
CREATE PROCEDURE AltaTecnico(pUsuario VARCHAR(50) , pPass VARCHAR(50), pNombre VARCHAR(100), pEspecializacion VARCHAR(50), OUT MsgError VARCHAR(250))
cuerpo:BEGIN
	DECLARE mensajeError VARCHAR(250);
    DECLARE transaccionActiva BIT;
    
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    
    BEGIN
		IF transaccionActiva THEN
			ROLLBACK;
		END IF;
        
        SET MsgError = mensajeError;
    END;
    
    IF EXISTS(SELECT * FROM empleado WHERE usuario = pUsuario AND activo=1) THEN
		SET MsgError = "Ya existe una Empleado con ese nombre de usuario";
        LEAVE cuerpo;
	END IF;
	
	SET transaccionActiva = 1;
    
    START TRANSACTION;
    
	IF EXISTS (SELECT t.usuarioT FROM tecnico t JOIN empleado e ON t.usuarioT=e.usuario WHERE t.usuarioT = pUsuario AND e.activo = 0) THEN
		BEGIN
			SET mensajeError = "No se pudo activar el Tecnico.";
			UPDATE tecnico SET especializacion = pEspecializacion WHERE usuarioT = pUsuario;

			SET mensajeError = "No se pudo activar el Empleado.";
			UPDATE empleado SET contrasenia = pPass,nombre_completo = pNombre , activo = 1 WHERE usuario = pUsuario;
        END;
	ELSE
		BEGIN
			SET mensajeError = "No se pudo insertar el Empleado.";
			INSERT INTO empleado(usuario,contrasenia,nombre_completo,activo) VALUES (pUsuario,hex(aes_encrypt(pPass, '123')),pNombre,1);
			
			SET mensajeError = "No se pudo insertar el Tecnico.";
			INSERT INTO tecnico(usuarioT,especializacion) VALUES (pUsuario, pEspecializacion);
        END;
	END IF;
    
    COMMIT;
    
    SET transaccionActiva = 0;
END//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE ModificarTecnico(pUsuario VARCHAR(50), pNombre VARCHAR(100), pEspecializacion VARCHAR(50), OUT MsgError VARCHAR(250))
cuerpo:BEGIN
	DECLARE mensajeError VARCHAR(50);
    DECLARE transaccionActiva BIT;
    
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    
    BEGIN
		IF transaccionActiva THEN
			ROLLBACK;
		END IF;
        
        SET MsgError = mensajeError;
    END;
    
    IF NOT EXISTS(SELECT * FROM empleado WHERE usuario = pUsuario AND activo=1) THEN
		SET MsgError = "No existe un Empleado con dicho nombre.";
        LEAVE cuerpo;
	END IF;
	
	SET transaccionActiva = 1;
    
    START TRANSACTION;

	IF EXISTS (SELECT t.usuarioT FROM tecnico t JOIN empleado e on t.usuarioT=e.usuario WHERE t.usuarioT = pUsuario AND e.activo = 1) THEN
		SET mensajeError = "No se pudo modificar el Tecnico.";
		UPDATE tecnico SET especializacion = pEspecializacion WHERE usuarioT = pUsuario;

        SET mensajeError = "No se pudo modificar el Empleado.";
		UPDATE empleado SET nombre_completo = pNombre , activo = 1 WHERE usuario = pUsuario;
    END IF;
    
	COMMIT;
    
    SET transaccionActiva = 0;
END//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE EliminarTecnico(pUsuario VARCHAR(50), OUT MsgError VARCHAR(100))
BEGIN
	IF NOT EXISTS(SELECT * FROM empleado WHERE usuario = pUsuario AND activo=1) THEN
		SET MsgError = "No existe un Empleado con dicho nombre.";
	ELSEIF EXISTS (SELECT t.usuarioT FROM tecnico t JOIN empleado e on t.usuarioT=e.usuario WHERE t.usuarioT = pUsuario AND e.activo = 1) THEN
		UPDATE empleado SET activo = 0 WHERE usuario = pUsuario;
	ELSE
		SET MsgError = "El empleado no es un Tecnico.";
	END IF;
END//
DELIMITER ;

/*----------SP TRANSPORTE----------*/
CREATE PROCEDURE BuscarTransporte(pIdTransporte VARCHAR(50))
	SELECT * FROM transporte where id_transporte=pIdTransporte and activo=1;
    
DELIMITER //
CREATE PROCEDURE AgregarFechaLLegada(pIdTransporte VARCHAR(50), pFechaFin DATETIME, OUT MsgError VARCHAR(100))
BEGIN

	IF NOT EXISTS(SELECT * FROM transporte WHERE id_transporte = pIdTransporte and activo=1) THEN
		SET MsgError = "No existe dicho transporte.";
	ELSE
		UPDATE transporte SET fecha_hora_fin=pFechaFin WHERE id_transporte=pIdTransporte;
	END IF;
END//
DELIMITER ;

CREATE PROCEDURE ListarTransportesChofer(pIdChofer VARCHAR(50))
	SELECT * FROM transporte WHERE usuarioC = pIdChofer and activo=1;

CREATE PROCEDURE ListarTransportes()
	SELECT * FROM transporte WHERE activo=1;

DELIMITER //
CREATE PROCEDURE IniciarTransporte(pIdTransporte VARCHAR(50), OUT MsgError VARCHAR(100))
BEGIN
	IF NOT EXISTS(SELECT * FROM transporte WHERE id_transporte = pIdTransporte  and activo=1) THEN
		SET MsgError = "No existe dicho transporte.";
	ELSE
		UPDATE transporte SET estado_transporte='En Viaje' WHERE id_transporte=pIdTransporte;
	END IF;
END//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE FinalizarTransporte(pIdTransporte VARCHAR(50), OUT MsgError VARCHAR(100))
BEGIN
	IF NOT EXISTS(SELECT * FROM transporte WHERE id_transporte = pIdTransporte  and activo=1) THEN
		SET MsgError = "No existe dicho transporte.";
	ELSE
		UPDATE transporte SET estado_transporte='Finalizado' WHERE id_transporte=pIdTransporte;
	END IF;
END//
DELIMITER ;

CREATE PROCEDURE ListadoTransporteTiempoReal() /*FALTA LEER LA LOCALIZACION DE MONGO*/
	SELECT * FROM transporte WHERE estado_transporte='En Viaje' and activo=1;
    
CREATE PROCEDURE ListadoTransporteSinChofer()
	SELECT * FROM transporte WHERE usuarioC is null and activo=1;
    
DELIMITER //
CREATE PROCEDURE AsignarTransporte(pIdTransporte VARCHAR(50), pUsuarioC VARCHAR(50), pIdCamion VARCHAR(10), OUT MsgError VARCHAR(100))
cuerpo:BEGIN

	DECLARE mensajeError VARCHAR(50);
    DECLARE transaccionActiva BIT;
    
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    
    BEGIN
		IF transaccionActiva THEN
			ROLLBACK;
		END IF;
        
        SET MsgError = mensajeError;
    END;

	IF NOT EXISTS(SELECT * FROM transporte WHERE id_transporte = pIdTransporte and activo=1) THEN
		SET MsgError = "No existe dicho transporte.";
		LEAVE cuerpo;
	ELSEIF NOT EXISTS(SELECT * FROM camion WHERE matricula = pIdCamion) THEN
		SET MsgError = "No existe dicho camión.";
		LEAVE cuerpo;
	ELSEIF NOT EXISTS(SELECT * FROM chofer WHERE usuarioC = pUsuarioC) THEN
		SET MsgError = "No existe dicho chofer.";
		LEAVE cuerpo;
	END IF;

	SET transaccionActiva = 1;
    
    START TRANSACTION;

	IF EXISTS (SELECT * FROM transporte WHERE id_transporte = pIdTransporte and activo=1) THEN
		SET mensajeError = "No se pudo asignar el transporte.";
		UPDATE transporte SET matricula=pIdCamion,usuarioC=pUsuarioC WHERE id_transporte=pIdTransporte;

        SET mensajeError = "No se pudo asignar en el transporte al chofer.";
		INSERT INTO realizan (usuarioC, id_transporte) VALUES (pUsuarioC,pIdTransporte);
    END IF;
    
	COMMIT;
    
    SET transaccionActiva = 0;

END//
DELIMITER ;

CREATE PROCEDURE ListadoTransportesNoRealizados()
	SELECT * FROM transporte WHERE estado_transporte='Pendiente' and activo=1;

DELIMITER //
CREATE PROCEDURE AltaTransporteSinChofer(pFechaInicio Datetime, pkmsRecorrido INT(11), pOrigen VARCHAR(50), pDestino VARCHAR(50), pMatricula VARCHAR(10), pCliente VARCHAR(15),pUsuarioA VARCHAR(50), OUT MsgError VARCHAR(250))
cuerpo:BEGIN

	DECLARE mensajeError VARCHAR(50);
    DECLARE transaccionActiva BIT;
    DECLARE pIdTransporte INT;
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    
    BEGIN
		IF transaccionActiva THEN
			ROLLBACK;
		END IF;
        
        SET MsgError = mensajeError;
    END;

	IF NOT EXISTS(SELECT * FROM camion WHERE matricula = pMatricula) THEN
		SET MsgError = "No existe dicho camión.";
		LEAVE cuerpo;

	ELSEIF NOT EXISTS(SELECT * FROM cliente WHERE documento = pCliente) THEN
		SET MsgError = "No existe dicho cliente.";
		LEAVE cuerpo;
	END IF;

	SET transaccionActiva = 1;
    
    START TRANSACTION;

	SET mensajeError = "No se pudo agregar el transporte.";
	INSERT INTO transporte (estado_transporte,fecha_hora_inicio,kms_distancia,origen, destino, matricula, documentoCliente) VALUES ('Pendiente', pFechaInicio, pkmsRecorrido, pOrigen, pDestino, pMatricula, pCliente);
	
	SET pIdTransporte = LAST_INSERT_ID();
	SET mensajeError = "No se pudo asignar el administrador al transporte.";
	INSERT INTO generan (usuarioA, id_transporte) VALUES (pUsuarioA,pIdTransporte);
	COMMIT;
    
    SET transaccionActiva = 0;
END//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE AltaTransporteConChofer(pFechaInicio Datetime, pkmsRecorrido INT(11), pOrigen VARCHAR(50), pDestino VARCHAR(50), pMatricula VARCHAR(10),pUsuarioC VARCHAR(50), pCliente VARCHAR(15),pUsuarioA VARCHAR(50), OUT MsgError VARCHAR(250))
cuerpo:BEGIN

	DECLARE mensajeError VARCHAR(50);
    DECLARE transaccionActiva BIT;
    DECLARE pIdTransporte INT;
    
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    
    BEGIN
		IF transaccionActiva THEN
			ROLLBACK;
		END IF;
        
        SET MsgError = mensajeError;
    END;

	IF NOT EXISTS(SELECT * FROM camion WHERE matricula = pMatricula) THEN
		SET MsgError = "No existe dicho camión.";
		LEAVE cuerpo;
	ELSEIF NOT EXISTS(SELECT * FROM chofer WHERE usuarioC = pUsuarioC) THEN
		SET MsgError = "No existe dicho chofer.";
		LEAVE cuerpo;
	ELSEIF NOT EXISTS(SELECT * FROM cliente WHERE documento = pCliente) THEN
		SET MsgError = "No existe dicho cliente.";
		LEAVE cuerpo;
	END IF;

	SET transaccionActiva = 1;
    
    START TRANSACTION;

	SET mensajeError = "No se pudo agregar el transporte.";
	INSERT INTO transporte (estado_transporte,fecha_hora_inicio,kms_distancia,origen, destino, matricula,usuarioC,documentoCliente) VALUES ('Pendiente', pFechaInicio, pkmsRecorrido, pOrigen, pDestino, pMatricula,pUsuarioC,pCliente);

	SET pIdTransporte = LAST_INSERT_ID();
	SET mensajeError = "No se pudo asignar el transporte al chofer.";
	INSERT INTO realizan (usuarioC, id_transporte) VALUES (pUsuarioC,pIdTransporte);

	SET mensajeError = "No se pudo asignar el administrador al transporte.";
	INSERT INTO generan (usuarioA, id_transporte) VALUES (pUsuarioA,pIdTransporte);

	COMMIT;
    
    SET transaccionActiva = 0;
END//
DELIMITER ;
    
DELIMITER //
CREATE PROCEDURE ModificarTransporte(pIdTransporte VARCHAR(50), pFechaInicio Datetime, pFechaFin Datetime, pkmsRecorrido INT(11), pOrigen VARCHAR(50), pDestino VARCHAR(50), pMatricula VARCHAR(10),pUsuarioC VARCHAR(50), pCliente VARCHAR(15), OUT MsgError VARCHAR(250))
cuerpo:BEGIN

	DECLARE mensajeError VARCHAR(50);
    DECLARE transaccionActiva BIT;
    
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    
    BEGIN
		IF transaccionActiva THEN
			ROLLBACK;
		END IF;
        
        SET MsgError = mensajeError;
    END;

	IF NOT EXISTS (SELECT * FROM transporte WHERE id_transporte = pIdTransporte and activo=1) THEN 
		SET MsgError = "No existe dicho transporte.";
		LEAVE cuerpo;

	ELSEIF NOT EXISTS(SELECT * FROM camion WHERE matricula = pMatricula) THEN
		SET MsgError = "No existe dicho camión.";
		LEAVE cuerpo;
	ELSEIF NOT EXISTS(SELECT * FROM chofer WHERE usuarioC = pUsuarioC) THEN
		SET MsgError = "No existe dicho chofer.";
		LEAVE cuerpo;
	ELSEIF NOT EXISTS(SELECT * FROM cliente WHERE documento = pCliente) THEN
		SET MsgError = "No existe dicho cliente.";
		LEAVE cuerpo;
	END IF;

	SET transaccionActiva = 1;
    
    START TRANSACTION;
	
	SET mensajeError = "No se pudo modificar el transporte.";
	UPDATE transporte SET fecha_hora_inicio=pFechaInicio, fecha_hora_fin=pFechaFin,kms_distancia=pkmsRecorrido,origen=pOrigen,destino=pDestino,matricula=pMatricula,usuarioC=pUsuarioC,documentoCliente=pCliente WHERE id_transporte=pIdTransporte;
	
	SET mensajeError = "No se pudo modificar el chofer del transporte.";
	UPDATE realizan SET usuarioC=pUsuarioC WHERE id_transporte=pIdTransporte;

	COMMIT;
    
    SET transaccionActiva = 0;
END//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE EliminarTransporte(pIdTransporte VARCHAR(50), OUT MsgError VARCHAR(100))
BEGIN
	IF NOT EXISTS (SELECT * FROM transporte WHERE id_transporte = pIdTransporte and activo=1) THEN 
		SET MsgError = "No existe dicho transporte.";
	ELSEIF EXISTS(SELECT * FROM transporte WHERE id_transporte = pIdTransporte and estado_transporte in ('En Viaje','Finalizado')) THEN
		SET MsgError = "No se puede eliminar un transporte que no sea pendiente.";
	ELSE
		UPDATE transporte SET activo=0 WHERE id_transporte = pIdTransporte;
	END IF;
END//
DELIMITER ;

/*----------SP CAMION----------*/
CREATE PROCEDURE ListadoCamiones()
	SELECT * FROM camion;

CREATE PROCEDURE ListadoCamionesDisponibles()
	SELECT * FROM camion WHERE matricula NOT IN (SELECT matricula FROM transporte WHERE estado_transporte NOT IN ('En viaje','Pendiente') AND activo=1);

CREATE PROCEDURE BuscarCamion(pMatricula VARCHAR(10))
	SELECT * FROM camion WHERE matricula = pMatricula;
    
DELIMITER //
CREATE PROCEDURE AltaCamion(pMatricula VARCHAR(10), pAnio INT(11), pMarca VARCHAR(50), pKilometros INT(11), pIdEstado CHAR(3), pIdTipo CHAR(7), OUT MsgError VARCHAR(250))
BEGIN
	IF EXISTS(SELECT * FROM camion WHERE matricula = pMatricula) THEN
		SET MsgError = "Ya existe dicho camión.";
	ELSEIF NOT EXISTS(SELECT * FROM estado_camion WHERE id_estado = pIdEstado) THEN
		SET MsgError = "No existe dicho estado de camión.";
	ELSEIF NOT EXISTS(SELECT * FROM tipo_camion WHERE id_tipo = pIdTipo) THEN
		SET MsgError = "No existe dicho tipo de camión.";
	ELSE
		INSERT INTO camion (matricula,anio,marca,kilometros,id_estado, id_tipo) VALUES (pMatricula,pAnio,pMarca,pKilometros,pIdEstado,pIdTipo);
	END IF;
END//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE ModificarCamion(pMatricula VARCHAR(10), pAnio INT(11), pMarca VARCHAR(50), pKilometros INT(11), pIdEstado CHAR(3), pIdTipo CHAR(7), OUT MsgError VARCHAR(250))
BEGIN
	IF NOT EXISTS(SELECT * FROM camion WHERE matricula = pMatricula) THEN
		SET MsgError = "No existe dicho camión.";
	ELSEIF NOT EXISTS(SELECT * FROM estado_camion WHERE id_estado = pIdEstado) THEN
		SET MsgError = "No existe dicho estado de camión.";
	ELSEIF NOT EXISTS(SELECT * FROM tipo_camion WHERE id_tipo = pIdTipo) THEN
		SET MsgError = "No existe dicho tipo de camión.";
	ELSE
		UPDATE camion SET anio=pAnio, marca=pMarca , kilometros=pKilometros , id_estado=pIdEstado ,id_tipo=pIdTipo WHERE matricula=pMatricula;
	END IF;
END//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE EliminarCamion(pMatricula VARCHAR(10), OUT MsgError VARCHAR(250))
BEGIN
	IF NOT EXISTS (SELECT * FROM camion WHERE matricula=pMatricula) THEN 
		SET MsgError = "No existe dicho camión.";
	ELSEIF EXISTS(SELECT * FROM transporte WHERE matricula = pMatricula) THEN
		SET MsgError = "No se puede eliminar un camión que esté asignado a un transporte.";
	ELSE
		DELETE FROM camion WHERE matricula = pMatricula;
	END IF;
END//
DELIMITER ;

CREATE PROCEDURE ListadoCamionesEnReparacion()
	SELECT c.* FROM camion c INNER JOIN mantenimiento m WHERE m.estado_mantenimiento=1;

CREATE PROCEDURE ListadoHistorialMantenimientoCamion(pMatricula VARCHAR(10))
	SELECT c.anio,c.marca,c.kilometros,c.tipo,m.* FROM camion c INNER JOIN mantenimiento m WHERE m.matricula=pMatricula;

/*----------SP TIPO CAMION----------*/
CREATE PROCEDURE ListadoTipoCamion()
	SELECT * FROM tipo_camion order by descripcion;

CREATE PROCEDURE BuscarTipoCamion(pidTipo CHAR(7))
	SELECT  * FROM tipo_camion WHERE id_tipo=pidTipo;

DELIMITER //
CREATE PROCEDURE AltaTipoCamion(pidTipo CHAR(7), pDescripcion VARCHAR(100), pDimensiones VARCHAR(50), pEjes INT(11), pCarga DECIMAL(8,2), pCombustible INT(11), OUT MsgError VARCHAR(250))
BEGIN
	IF EXISTS(SELECT * FROM tipo_camion WHERE id_tipo = pidTipo) THEN
		SET MsgError = "Ya existe dicho tipo de camión.";
	ELSE
		INSERT INTO tipo_camion (id_tipo,descripcion,dimensiones,cantidad_ejes,capacidad_carga, capacidad_combustible) VALUES (pidTipo,pDescripcion,pDimensiones,pEjes,pCarga,pCombustible);
	END IF;
END//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE ModificarTipoCamion(pidTipo CHAR(7), pDescripcion VARCHAR(100), pDimensiones VARCHAR(50), pEjes INT(11), pCarga DECIMAL(8,2), pCombustible INT(11), OUT MsgError VARCHAR(250))
BEGIN
	IF NOT EXISTS(SELECT * FROM tipo_camion WHERE id_tipo = pidTipo) THEN
		SET MsgError = "No existe dicho tipo de camión.";
	ELSE
		UPDATE tipo_camion SET descripcion=pDescripcion, dimensiones=pDimensiones , cantidad_ejes=pEjes , capacidad_carga=pCarga ,capacidad_combustible=pCombustible WHERE id_tipo=pidTipo;
	END IF;
END//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE EliminarTipoCamion(pidTipo CHAR(7), OUT MsgError VARCHAR(250))
BEGIN
	IF NOT EXISTS (SELECT * FROM tipo_camion WHERE id_tipo = pidTipo) THEN 
		SET MsgError = "No existe dicho tipo de camión.";
	ELSEIF EXISTS(SELECT * FROM camion WHERE id_tipo = pidTipo) THEN
		SET MsgError = "No se puede eliminar un tipo de camión que esté asignado.";
	ELSE
		DELETE FROM tipo_camion WHERE id_tipo = pidTipo;
	END IF;
END//
DELIMITER ;

/*----------SP ESTADO CAMION----------*/
CREATE PROCEDURE ListadoEstadoCamion()
	SELECT * FROM estado_camion order by descripcion;

CREATE PROCEDURE BuscarEstadoCamion(pidEstado CHAR(3)) 
	SELECT  * FROM estado_camion WHERE id_estado=pidEstado;

DELIMITER //
CREATE PROCEDURE AltaEstadoCamion(pidEstado CHAR(3), pDescripcion VARCHAR(50), OUT MsgError VARCHAR(250))
BEGIN
	IF EXISTS(SELECT * FROM estado_camion WHERE id_estado = pidEstado) THEN
		SET MsgError = "Ya existe dicho estado de camión.";
	ELSE
		INSERT INTO estado_camion (id_estado,descripcion) VALUES (pidEstado,pDescripcion);
	END IF;
END//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE ModificarEstadoCamion(pidEstado CHAR(3), pDescripcion VARCHAR(50), OUT MsgError VARCHAR(250))
BEGIN
	IF NOT EXISTS(SELECT * FROM estado_camion WHERE id_estado = pidEstado) THEN
		SET MsgError = "No existe dicho estado de camión.";
	ELSE
		UPDATE estado_camion SET descripcion=pDescripcion WHERE id_estado=pidEstado;
	END IF;
END//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE EliminarEstadoCamion(pidEstado CHAR(3), OUT MsgError VARCHAR(250))
BEGIN
	IF NOT EXISTS (SELECT * FROM estado_camion WHERE id_estado = pidEstado) THEN 
		SET MsgError = "No existe dicho estado de camión.";
	ELSEIF EXISTS(SELECT * FROM camion WHERE id_estado = pidEstado) THEN
		SET MsgError = "No se puede eliminar un estado de camión que esté asignado.";
	ELSE
		DELETE FROM estado_camion WHERE id_estado = pidEstado;
	END IF;
END//
DELIMITER ;

/*----------SP CLIENTE----------*/
CREATE PROCEDURE ListarCliente()
	SELECT * FROM cliente order by nombre_completo;

CREATE PROCEDURE BuscarCliente(pDocumento VARCHAR(15)) 
	SELECT  * FROM cliente WHERE documento=pDocumento;

DELIMITER //
CREATE PROCEDURE AltaCliente(pDocumento VARCHAR(15), pNombreCompleto VARCHAR(50),pDireccion VARCHAR(100),pTelefono INT(11), OUT MsgError VARCHAR(250))
BEGIN
	IF EXISTS(SELECT * FROM cliente WHERE documento = pDocumento) THEN
		SET MsgError = "Ya existe dicho cliente.";
	ELSE
		INSERT INTO cliente (documento,nombre_completo,direccion,telefono) VALUES (pDocumento,pNombreCompleto,pDireccion,pTelefono);
	END IF;
END//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE ModificarCliente(pDocumento VARCHAR(15), pNombreCompleto VARCHAR(50),pDireccion VARCHAR(100),pTelefono INT(11), OUT MsgError VARCHAR(250))
BEGIN
	IF NOT EXISTS(SELECT * FROM cliente WHERE documento = pDocumento) THEN
		SET MsgError = "No existe dicho cliente.";
	ELSE
		UPDATE cliente SET nombre_completo=pNombreCompleto,direccion=pDireccion,telefono=pTelefono WHERE documento=pDocumento;
	END IF;
END//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE EliminarCliente(pDocumento VARCHAR(15), OUT MsgError VARCHAR(250))
BEGIN
	IF NOT EXISTS (SELECT * FROM cliente WHERE documento = pDocumento) THEN 
		SET MsgError = "No existe dicho cliente.";
	ELSEIF EXISTS(SELECT * FROM transporte WHERE documentoCliente = pDocumento) THEN
		SET MsgError = "No se puede eliminar un cliente que esté asociado a un transporte.";
	ELSE
		DELETE FROM cliente WHERE documento = pDocumento;
	END IF;
END//
DELIMITER ;

/*----------SP GASTOS ----------*/
CREATE PROCEDURE ListarGastos()
	SELECT * FROM gasto_asociado;

CREATE PROCEDURE ListarGastosPorTransporte(pIdTransporte VARCHAR(50))
	SELECT * FROM gasto_asociado WHERE id_transporte=pIdTransporte;

CREATE PROCEDURE ExportarReporteGastos(pFechaInicio Datetime, pFechaFin Datetime)
	SELECT id_gasto, monto_gasto, observaciones, id_transporte, fecha_gasto FROM gasto_asociado WHERE fecha_gasto BETWEEN pFechaInicio AND pFechaFin ORDER BY id_transporte;

DELIMITER //
CREATE PROCEDURE IniciarRegistroGasto(pIdTransporte VARCHAR(50),pMontoGasto DECIMAL(8,2), pObservacion VARCHAR(100), pUrlImagen VARCHAR(100), OUT MsgError VARCHAR(100))
BEGIN
	IF NOT EXISTS(SELECT * FROM transporte WHERE id_transporte = pIdTransporte) THEN
		SET MsgError = "No existe dicho transporte.";
	ELSE
		INSERT INTO gasto_asociado (monto_gasto,observaciones,id_transporte,fecha_gasto,url_imagen) VALUES (pMontoGasto,pObservacion,pIdTransporte,now(),pUrlImagen);
	END IF;
END//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE ModificarGasto(pIdGasto INT(11), pMonto DECIMAL(8,2),pObservacion VARCHAR(100),pFecha DATETIME, OUT MsgError VARCHAR(250))
BEGIN
	IF NOT EXISTS(SELECT * FROM gasto_asociado WHERE id_gasto = pIdGasto) THEN
		SET MsgError = "No existe dicho gasto.";
	ELSE
		UPDATE gasto_asociado SET monto_gasto=pMonto,observaciones=pObservacion,fecha_gasto=pFecha WHERE id_gasto=pIdGasto;
	END IF;
END//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE EliminarGasto(pIdGasto INT(11), OUT MsgError VARCHAR(250))
BEGIN
	IF NOT EXISTS (SELECT * FROM gasto_asociado WHERE id_gasto = pIdGasto) THEN 
		SET MsgError = "No existe dicho gasto.";
	ELSE
		DELETE FROM gasto_asociado WHERE id_gasto = pIdGasto;
	END IF;
END//
DELIMITER ;

/*----------SP MANTENIMIENTO----------*/
CREATE PROCEDURE ListarMantenimiento()
	SELECT * FROM mantenimiento WHERE estado_mantenimiento=1;

DELIMITER //
CREATE PROCEDURE RegistrarMantenimiento(pFechaMantenimieto DATE, pObservacion VARCHAR(100),pCosto DECIMAL(8,2),pMatricula VARCHAR(10),pUsuarioT VARCHAR(50), OUT MsgError VARCHAR(100))
BEGIN
	IF NOT EXISTS(SELECT * FROM camion WHERE matricula = pMatricula) THEN
		SET MsgError = "No existe dicho camion.";
	ELSEIF NOT EXISTS(SELECT * FROM tecnico WHERE usuarioT = pUsuarioT) THEN
		SET MsgError = "El empleado no es un tecnico.";
	ELSE
		INSERT INTO mantenimiento (fecha_mantenimiento,observaciones,estado_mantenimiento,costo,matricula,usuarioT) VALUES (pFechaMantenimieto,pObservacion,1,pCosto,pMatricula,pUsuarioT);
	END IF;
END//
DELIMITER ;

/*----------SP SOLICITUD MATERIALES----------*/
CREATE PROCEDURE ListadoSolicitudMaterialesMantenimineto(pIdMantenimiento INT(11))
	SELECT * FROM solicitud_de_material WHERE id_mantenimiento = pIdMantenimiento ORDER BY producto_solicitado;

DELIMITER //
CREATE PROCEDURE CambiarEstadoSolicitud(pIdSolicitud INT(11),pEstado CHAR(9), OUT MsgError VARCHAR(100))
BEGIN
	IF NOT EXISTS(SELECT * FROM solicitud_de_material WHERE id_solicitud = pIdSolicitud) THEN
		SET MsgError = "No existe dicha solicitud.";
	ELSE
		UPDATE solicitud_de_material SET estado=pEstado WHERE id_solicitud = pIdSolicitud;
	END IF;
END//
DELIMITER ;

DELIMITER //
CREATE PROCEDURE AltaEstadoSolicitud(pIdMantenimiento INT(11),pProducto VARCHAR(100),pCantidad INT(11), OUT MsgError VARCHAR(100))
BEGIN
	IF NOT EXISTS(SELECT * FROM mantenimiento WHERE id_mantenimiento = pIdMantenimiento) THEN
		SET MsgError = "No existe dicho mantenimiento.";
	ELSE
		INSERT INTO solicitud_de_material (id_mantenimiento,producto_solicitado,cantidad,estado) VALUES (pIdMantenimiento,pProducto,pCantidad,'Pendiente');
	END IF;
END//
DELIMITER ;


/* CREATE PROCEDURE AltaCamion(pMatricula VARCHAR(10),pAnio INT(11), pMarca VARCHAR(50), pKilometros INT(11), pIdEstado CHAR(3), pIdTipo CHAR(7), OUT MsgError VARCHAR(250))
SET @out_value;
CALL IniciarRegistroGasto(1,2023,'Prueba','',@out_value);
SELECT @out_value;*/