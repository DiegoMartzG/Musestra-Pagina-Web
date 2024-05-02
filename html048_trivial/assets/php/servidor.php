<?php
require_once("BBDD_CTRLR.php");

if (isset($_REQUEST['peticion'])) {
    switch ($_REQUEST['peticion']) {
        case "CargarCategorias":           
            $sql = "SELECT * FROM categorias ORDER BY cat_categoria";
            $datos['sql']=$sql;
            $datos['datos'] = BBDD_CTRLR::Consultas($sql);
            echo json_encode($datos);  
            break; 
        case "CargarPreguntas":           
            $sql = "SELECT c.cat_categoria, p.* from preguntas p JOIN categorias c on p.pr_cat_id=c.cat_id ORDER BY c.cat_categoria";
            $datos['sql']=$sql;
            $datos['datos'] = BBDD_CTRLR::Consultas($sql);
            echo json_encode($datos);  
            break; 
        
            
        case "EjecutarSQL":
            $sql = $_REQUEST['sql'];
            $datos['datos'] = BBDD_CTRLR::Consultas($sql);
            echo json_encode($datos);  
            break;

            
            case "CategoriaCRUD":
                $sql = $_REQUEST['sql'];
                $devolucion= $_REQUEST['devolucion'];
                $datos['datos'] = BBDD_CTRLR::CRUD($sql, $devolucion);
                echo json_encode($datos);  
                break;
            case "PreguntasCRUD":
                $sql = $_REQUEST['sql'];
                $devolucion= $_REQUEST['devolucion'];
                $datos['datos'] = BBDD_CTRLR::CRUD($sql, $devolucion);
                echo json_encode($datos);  
                break;
            
    }        
}

// CargarCategorias

// CargarPreguntas
