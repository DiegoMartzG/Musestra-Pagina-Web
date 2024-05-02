-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 23-04-2024 a las 19:07:03
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `bd_trivial`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `cat_id` int(11) NOT NULL,
  `cat_categoria` varchar(50) NOT NULL,
  `cat_color` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`cat_id`, `cat_categoria`, `cat_color`) VALUES
(1, 'Literatura y Arte', 'Marrón'),
(2, 'Ciencia y Naturaleza', 'Verde'),
(3, 'Historia', 'Amarillo'),
(4, 'Geografía', 'Azul'),
(5, 'Deporte y Juegos', 'Naranja'),
(6, 'Espectáculos', 'Rosa');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `preguntas`
--

CREATE TABLE `preguntas` (
  `pr_id` int(11) NOT NULL,
  `pr_pregunta` text NOT NULL,
  `pr_r1` text NOT NULL,
  `pr_r2` text NOT NULL,
  `pr_r3` text NOT NULL,
  `pr_r4` text NOT NULL,
  `pr_valida` text NOT NULL,
  `pr_cat_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `preguntas`
--

INSERT INTO `preguntas` (`pr_id`, `pr_pregunta`, `pr_r1`, `pr_r2`, `pr_r3`, `pr_r4`, `pr_valida`, `pr_cat_id`) VALUES
(1, '¿En qué deporte se usa tiza?', 'Billar', 'Hockey', 'Dardos', 'Fútbol', '1', 5),
(2, '¿Qué instrumento musical tiene nombre y forma geométricos?', 'Triángulo', 'Violín', 'Guitarra', 'Piano', '1', 1),
(3, '¿Quién escribió \"Hansel y Gretel\"?', 'Los hermanos Grimm.', 'Hans Christian Andersen.', 'Charles Perrault.', 'Felix María Samaniego.', '1', 1),
(4, 'El gentilicio de la provincia de Granada es:', 'Granadino.', 'Granadiniano.', 'Granadiense.', 'Granadieniense.', '1', 4);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`cat_id`);

--
-- Indices de la tabla `preguntas`
--
ALTER TABLE `preguntas`
  ADD PRIMARY KEY (`pr_id`),
  ADD KEY `Preguntas_pr_gen_id_idx` (`pr_cat_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `cat_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `preguntas`
--
ALTER TABLE `preguntas`
  MODIFY `pr_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `preguntas`
--
ALTER TABLE `preguntas`
  ADD CONSTRAINT `preguntas_ibfk_1` FOREIGN KEY (`pr_cat_id`) REFERENCES `categorias` (`cat_id`) ON DELETE NO ACTION ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
