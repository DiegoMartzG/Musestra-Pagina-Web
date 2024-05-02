<?php
require_once("BBDD_CTRLR.php");

if (isset($_REQUEST['peticion'])) {
    switch ($_REQUEST['peticion']) {
        case "CargarCursos":           
            $sql = "SELECT * FROM cursos ORDER BY cur_nombre";
            $datos['sql']=$sql;
            $datos['datos'] = BBDD_CTRLR::Consultas($sql);
            echo json_encode($datos);  
            break; 
        case "CursoPorId":
            $id = $_REQUEST['cur_id'];
            $sql = "SELECT * FROM cursos WHERE cur_id = $id";
            $datos['sql']=$sql;
            $datos['datos'] = BBDD_CTRLR::Consultas($sql);
            echo json_encode($datos);  
            break; 
        case "CursoInsertar":
            $nombre = $_REQUEST['cur_nombre'];
            $sql = "INSERT INTO cursos VALUES (null, '$nombre')";
            $datos['sql']=$sql;
            $datos['datos'] = BBDD_CTRLR::CRUD($sql, 'i');
            echo json_encode($datos);  
            break; 
        case "CursoModificar":
            $id = $_REQUEST['cur_id'];
            $nombre = $_REQUEST['cur_nombre'];
            $sql = "UPDATE cursos SET cur_nombre = '$nombre' WHERE cur_id = $id";
            $datos['sql']=$sql;
            $datos['datos'] = BBDD_CTRLR::CRUD($sql, '');
            echo json_encode($datos);  
            break;
        case "CursoBorrar":
            $cur_id = $_REQUEST['cur_id'];
            $sql = "DELETE FROM cursos WHERE cur_id = $cur_id";
            $datos['sql']=$sql;
            $datos['datos'] = BBDD_CTRLR::CRUD($sql, '');
            echo json_encode($datos);  
            break;
            // alumnos
        case "CargarAlumnos":
            $sql = "SELECT c.cur_nombre, a.* 
                    FROM cursos as c LEFT JOIN alumnos as a
                    on c.cur_id = a.al_cur_id
                    ORDER BY c.cur_nombre, a.al_apellidos, a.al_nombre";
            $datos['sql']=$sql;
            $datos['datos'] = BBDD_CTRLR::Consultas($sql);
            echo json_encode($datos);  
            break;
            case "AlumnosBorrar": 
                $id = $_REQUEST['al_id'];      
                $sql = "DELETE FROM alumnos WHERE al_id = $id";
                $datos['sql']=$sql;
                $datos['datos'] = BBDD_CTRLR::CRUD($sql, '');
                echo json_encode($datos);  
                break;
            case "AlumnosModificar": 
                $id = $_REQUEST['al_id'];      
                $al_nombre = $_REQUEST['al_nombre'];
                $sql = "UPDATE alumnos SET al_nombre='$al_nombre' WHERE al_id = $id";
                $datos['sql']=$sql;
                $datos['datos'] = BBDD_CTRLR::CRUD($sql, '');
                echo json_encode($datos);  
                break;
            //asignaturas
        case "CargarAsignaturas":
            $sql = "SELECT  c.cur_nombre, a.*
                    FROM cursos as c LEFT JOIN asignaturas as a
                    ON c.cur_id = a.as_cur_id
                    ORDER BY c.cur_nombre, a.as_nombre";
            $datos['sql']=$sql;
            $datos['datos'] = BBDD_CTRLR::Consultas($sql);
            echo json_encode($datos);  
            break;
             case "AsignaruraBorrar": 
            $id = $_REQUEST['as_id'];      
            $sql = "DELETE FROM asignaturas WHERE as_id = $id";
            $datos['sql']=$sql;
            $datos['datos'] = BBDD_CTRLR::CRUD($sql, '');
            echo json_encode($datos);  
            break;
        case "ClientesModificar": 
             $id = $_REQUEST['as_id'];      
             $as_nombre = $_REQUEST['as_nombre'];
             $sql = "UPDATE asignaturas SET as_nombre='$as_nombre' WHERE cas_id = $id";
             $datos['sql']=$sql;
             $datos['datos'] = BBDD_CTRLR::CRUD($sql, '');
             echo json_encode($datos);  
            break;
        // case "ClientesID":        
        //     $id = $_REQUEST['cli_id'];
        //     $sql = "SELECT * FROM clientes WHERE cli_id = $id";
        //     $datos['sql']=$sql;
        //     $datos['datos'] = BBDD_CTRLR::Consultas($sql);
        //     echo json_encode($datos);  
        //     break; 
        // case "ClientesInsertar":        
        //     $cli_nombre = $_REQUEST['cli_nombre'];
        //     $sql = "INSERT INTO clientes VALUES (null, '$cli_nombre')";
        //     $datos['sql']=$sql;
        //     $datos['datos'] = BBDD_CTRLR::CRUD($sql, 'i');
        //     echo json_encode($datos);  
        //     break; 
        // case "ClientesModificar": 
        //     $id = $_REQUEST['cli_id'];      
        //     $cli_nombre = $_REQUEST['cli_nombre'];
        //     $sql = "UPDATE clientes SET cli_nombre='$cli_nombre' WHERE cli_id = $id";
        //     $datos['sql']=$sql;
        //     $datos['datos'] = BBDD_CTRLR::CRUD($sql, '');
        //     echo json_encode($datos);  
        //     break;
       
        case "ControlRegistro":
            $alias = $_REQUEST['alias'];
            $password = $_REQUEST['password'];
            $email = $_REQUEST['email'];
            $foto = $_REQUEST['foto'];
            $sql = "INSERT INTO usuarios VALUES ( null, '$alias', md5('$password'), '$email', '$foto' )";
            $datos['sql']=$sql;
            // CUIDADO : Este servidor utiliza la función CRUD para hacer Insert, Update o Delete
            // CRUD tiene 2 parámetros, el SQL y una letra que si es i devuelve el ID generado; 
            //  si no es i devuelve el nº de registros procesados
            $datos['datos'] = BBDD_CTRLR::CRUD($sql, 'i');
            // Devuelvo a JS los datos codificados como JSON
            echo json_encode($datos);  
            break;
            
        case "EjecutarSQL":
            $sql = $_REQUEST['sql'];
            $datos['datos'] = BBDD_CTRLR::Consultas($sql);
            echo json_encode($datos);  
            break;

            
            case "EjecutarCRUD":
                $sql = $_REQUEST['sql'];
                $devolucion= $_REQUEST['devolucion'];
                $datos['datos'] = BBDD_CTRLR::CRUD($sql, $devolucion);
                echo json_encode($datos);  
                break;
            case "EjecutarCRUDAsignaturas":
                $sql = $_REQUEST['sql'];
                $devolucion= $_REQUEST['devolucion'];
                $datos['datos'] = BBDD_CTRLR::CRUD($sql, $devolucion);
                echo json_encode($datos);  
                break;
            case "EjecutarCRUDAlumnos":
                $sql = $_REQUEST['sql'];
                $devolucion= $_REQUEST['devolucion'];
                $datos['datos'] = BBDD_CTRLR::CRUD($sql, $devolucion);
                echo json_encode($datos);  
                break;
    }        
}




