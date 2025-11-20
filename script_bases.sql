-- ==========================================================
-- SCRIPT COMPLETO: SCHEMA + SEED
-- ==========================================================
-- ESTE SCRIPT BORRARÁ LOS DATOS EXISTENTES PARA REINICIAR LA APP
-- ==========================================================

CREATE DATABASE IF NOT EXISTS pharmaflow_db;
USE pharmaflow_db;

-- 1. LIMPIEZA (DROP TABLES)
-- Desactivamos chequeo de FKs para borrar tablas sin problemas de orden
SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS detalle_ventas;
DROP TABLE IF EXISTS ventas;
DROP TABLE IF EXISTS lotes;
DROP TABLE IF EXISTS compras;
DROP TABLE IF EXISTS usuarios;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS medicamentos;

SET FOREIGN_KEY_CHECKS = 1;

-- 2. CREACIÓN DE TABLAS (SCHEMA)

CREATE TABLE roles (
	id INT PRIMARY KEY AUTO_INCREMENT,
	nombre VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE usuarios (
	id INT PRIMARY KEY AUTO_INCREMENT,
	usuario varchar(50) NOT NULL UNIQUE,
	nombre_completo VARCHAR(255) NOT NULL UNIQUE,
	password VARCHAR(180) NOT NULL,
	id_rol INT NOT NULL,
	FOREIGN KEY (id_rol) REFERENCES roles(id) ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE medicamentos (
	id INT PRIMARY KEY AUTO_INCREMENT,
	nombre VARCHAR(200) NOT NULL UNIQUE,
	descripcion TEXT,
	precio_venta DECIMAL(10,2) NOT NULL
);

CREATE TABLE compras (
	id INT PRIMARY KEY AUTO_INCREMENT,
	id_medicamento INT NOT NULL,
	fecha DATETIME NOT NULL,
	cantidad INT NOT NULL,
	proveedor VARCHAR(100),
	FOREIGN KEY (id_medicamento) REFERENCES medicamentos(id)
);

CREATE TABLE lotes (
	id INT PRIMARY KEY AUTO_INCREMENT,
	codigo VARCHAR(50) NOT NULL UNIQUE,
	id_medicamento INT NOT NULL,
	fecha_vencimiento DATETIME NOT NULL,
	stock INT NOT NULL,
	id_compra INT NOT NULL,
	FOREIGN KEY (id_compra) REFERENCES compras (id),
	FOREIGN KEY (id_medicamento) REFERENCES medicamentos(id)
	ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE ventas (
	id INT PRIMARY KEY AUTO_INCREMENT,
	fecha DATETIME NOT NULL,
	id_usuario INT NOT NULL,
	FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
	ON DELETE RESTRICT ON UPDATE CASCADE
);

CREATE TABLE detalle_ventas (
	id INT PRIMARY KEY AUTO_INCREMENT,
	id_venta INT NOT NULL,
	id_lote INT NOT NULL,
	cantidad_vendida INT NOT NULL,
	precio_venta_historico DECIMAL(10, 2) NOT NULL, 
	FOREIGN KEY (id_venta) REFERENCES ventas(id) ON DELETE CASCADE,
	FOREIGN KEY (id_lote) REFERENCES lotes(id) ON DELETE RESTRICT
) ENGINE=InnoDB;


-- 3. POBLADO DE DATOS (SEED)

-- --- Insertar Roles ---
INSERT INTO roles (id, nombre) VALUES 
(1, 'Gerente'), 
(2, 'Farmaceutico'), 
(3, 'Investigador');

-- --- Insertar Usuario Admin por defecto ---
INSERT INTO usuarios (usuario, nombre_completo, password, id_rol) VALUES 
('admin', 'Administrador Principal', '12345', 1);

-- --- Insertar Medicamentos (CON ID EXPLÍCITO) ---
-- Incluimos el ID para asegurar que coincida con las referencias en compras y lotes
INSERT INTO medicamentos (id, nombre, descripcion, precio_venta) VALUES 
(1, 'Paracetamol 500mg', 'Analgésico y antipirético. Caja con 20 tabletas.', 45.50),
(2, 'Ibuprofeno 400mg', 'Antiinflamatorio no esteroideo. Caja con 10 cápsulas.', 60.00),
(3, 'Amoxicilina 500mg', 'Antibiótico de amplio espectro. Suspensión 100ml.', 120.00),
(4, 'Loratadina 10mg', 'Antihistamínico para alergias. Caja con 10 tabletas.', 35.00),
(5, 'Omeprazol 20mg', 'Inhibidor de la bomba de protones para gastritis. Frasco 14 cap.', 85.00),
(6, 'Metformina 850mg', 'Hipoglucemiante para diabetes tipo 2. Caja con 30 tabletas.', 95.50),
(7, 'Atorvastatina 20mg', 'Para reducir el colesterol y triglicéridos. Caja con 30 tabletas.', 210.00),
(8, 'Salbutamol Aerosol', 'Broncodilatador para asma. Inhalador con 200 dosis.', 150.00),
(9, 'Aspirina Protect 100mg', 'Antiagregante plaquetario. Caja con 28 tabletas.', 55.00),
(10, 'Diclofenaco Gel', 'Antiinflamatorio tópico para golpes y torceduras. Tubo 60g.', 75.00),
(11, 'Losartán 50mg', 'Antihipertensivo. Caja con 30 grageas.', 110.00),
(12, 'Azitromicina 500mg', 'Antibiótico macrólido. Caja con 3 tabletas.', 180.00),
(13, 'Clonazepam 2mg', 'Benzodiazepina ansiolítica. Caja con 30 tabletas.', 250.00),
(14, 'Enalapril 10mg', 'Para la hipertensión arterial. Caja con 30 tabletas.', 40.00),
(15, 'Simvastatina 20mg', 'Reductor de colesterol. Caja con 14 tabletas.', 80.00),
(16, 'Ketorolaco 10mg', 'Analgésico potente sublingual. Caja con 4 tabletas.', 65.00),
(17, 'Vitamina C + Zinc', 'Suplemento dietético para defensas. Tubo 10 tabletas efervescentes.', 90.00),
(18, 'Buscapina Compositum', 'Antiespasmódico para dolor abdominal. Caja con 20 grageas.', 115.00),
(19, 'Naproxeno 550mg', 'Antiinflamatorio para dolor muscular. Caja con 12 tabletas.', 70.00),
(20, 'Electrolitos Orales', 'Suero rehidratante sabor fresa. Botella 500ml.', 28.00);

-- --- Insertar Compras (CON ID EXPLÍCITO) ---
-- Incluimos el ID para asegurar que los Lotes encuentren su compra padre
INSERT INTO compras (id, id_medicamento, fecha, cantidad, proveedor) VALUES
(1, 1, '2023-10-01 08:00:00', 100, 'Farmacéutica Global S.A.'), 
(2, 1, '2024-01-15 09:30:00', 50,  'Distribuidora El Salud'),     
(3, 2, '2023-11-05 10:00:00', 80,  'Bayer de México'),            
(4, 3, '2023-12-01 11:00:00', 40,  'Pfizer'),                     
(5, 4, '2024-02-10 14:00:00', 100, 'Genéricos Intercambiables'),  
(6, 5, '2023-09-20 08:15:00', 60,  'Laboratorios Liomont'),       
(7, 6, '2023-10-10 09:00:00', 200, 'Farmacéutica Global S.A.'),   
(8, 7, '2024-01-05 12:00:00', 30,  'Pfizer'),                     
(9, 8, '2024-03-01 16:45:00', 50,  'GlaxoSmithKline'),            
(10, 9, '2023-11-20 10:30:00', 150, 'Bayer de México'),            
(11, 10, '2024-02-15 11:20:00', 40, 'Genomma Lab'),                
(12, 11, '2023-12-12 09:00:00', 80, 'Laboratorios Silanes'),       
(13, 12, '2024-01-20 13:10:00', 25, 'Pfizer'),                     
(14, 13, '2024-02-28 15:00:00', 20, 'Roche'),                      
(15, 14, '2023-10-30 08:45:00', 100, 'Genéricos Intercambiables'), 
(16, 15, '2024-01-10 10:00:00', 50, 'Merck'),                      
(17, 16, '2024-03-15 12:30:00', 60, 'Laboratorios Senosiain'),     
(18, 17, '2023-12-20 14:00:00', 120, 'Bayer de México'),           
(19, 18, '2024-02-05 09:15:00', 45, 'Sanofi'),                     
(20, 19, '2024-03-10 11:00:00', 70, 'Laboratorios Liomont'),       
(21, 20, '2024-04-01 08:30:00', 200, 'Pisa Farmacéutica'),         
(22, 1, '2024-04-05 10:00:00', 100, 'Farmacéutica Global S.A.'),   
(23, 3, '2024-04-10 11:30:00', 30,  'Pfizer'),                     
(24, 5, '2024-04-12 15:45:00', 50,  'Laboratorios Liomont'),       
(25, 20, '2024-04-15 13:00:00', 150, 'Pisa Farmacéutica');         

-- --- Insertar Lotes ---
INSERT INTO lotes (codigo, fecha_vencimiento, stock, id_compra, id_medicamento) VALUES
('LOT-PARA-001', '2025-10-01 00:00:00', 100, 1, 1),  
('LOT-PARA-002', '2026-01-15 00:00:00', 50,  2, 1),  
('LOT-IBU-105',  '2025-11-05 00:00:00', 80,  3, 2),  
('LOT-AMOX-99',  '2025-05-01 00:00:00', 40,  4, 3),  
('LOT-LORA-22',  '2026-08-10 00:00:00', 100, 5, 4),  
('LOT-OME-334',  '2025-09-20 00:00:00', 60,  6, 5),  
('LOT-MET-888',  '2026-10-10 00:00:00', 200, 7, 6),  
('LOT-ATOR-11',  '2025-12-05 00:00:00', 30,  8, 7),  
('LOT-SALB-01',  '2026-03-01 00:00:00', 50,  9, 8),  
('LOT-ASP-555',  '2027-01-01 00:00:00', 150, 10, 9), 
('LOT-DICLO-77', '2025-06-15 00:00:00', 40,  11, 10), 
('LOT-LOSA-44',  '2026-04-12 00:00:00', 80,  12, 11), 
('LOT-AZIT-22',  '2025-08-20 00:00:00', 25,  13, 12), 
('LOT-CLON-90',  '2027-02-28 00:00:00', 20,  14, 13), 
('LOT-ENA-12',   '2025-10-30 00:00:00', 100, 15, 14), 
('LOT-SIMV-34',  '2026-01-10 00:00:00', 50,  16, 15), 
('LOT-KETO-56',  '2025-07-15 00:00:00', 60,  17, 16), 
('LOT-VITC-88',  '2025-12-20 00:00:00', 120, 18, 17), 
('LOT-BUSC-99',  '2026-05-05 00:00:00', 45,  19, 18), 
('LOT-NAP-112',  '2026-09-10 00:00:00', 70,  20, 19), 
('LOT-ELEC-01',  '2025-05-01 00:00:00', 200, 21, 20), 
('LOT-PARA-003', '2027-04-05 00:00:00', 100, 22, 1), 
('LOT-AMOX-100', '2026-04-10 00:00:00', 30,  23, 3), 
('LOT-OME-335',  '2026-11-12 00:00:00', 50,  24, 5), 
('LOT-ELEC-02',  '2025-06-15 00:00:00', 150, 25, 20);
