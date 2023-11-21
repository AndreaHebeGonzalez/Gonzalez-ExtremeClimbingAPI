
DROP TABLE IF EXISTS `estrellas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estrellas` (
  `id_productos` int unsigned NOT NULL,
  `una_estrella` int unsigned DEFAULT NULL,
  `dos_estrellas` int unsigned DEFAULT NULL,
  `tres_estrellas` int unsigned DEFAULT NULL,
  `cuatro_estrellas` int unsigned DEFAULT NULL,
  `cinco_estrellas` int unsigned DEFAULT NULL,
  `valoracion` int unsigned DEFAULT NULL,
  KEY `id_productos_idx` (`id_productos`),
  CONSTRAINT `id_productos` FOREIGN KEY (`id_productos`) REFERENCES `productos` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

