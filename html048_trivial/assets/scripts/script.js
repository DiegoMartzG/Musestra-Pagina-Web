function fInicio(){
   
    fGeneraCombo();
   
    
    
    // Mostrar la modal
    document.querySelector("#div_modal").style.display = 'none';
}


function fOcultarModal(){
    document.querySelector("#div_modal").style.display = 'none';
}
//quiero pintar el contenido
function fMostrarCategorias(){
    // Sacar categorias en el section
    let URL = 'assets/php/servidor.php?peticion=CargarCategorias';
    fetch(URL)
        .then((response) => response.json())
        .then((data) => {
            console.log("categorias", data);    
            let html = "<h2>";
            html+=`CATEGORIAS`;
                                                    //operacion(letra), id(0 porque no esta creado,categoria,color)
            html += `  <span title="Añadir cursos" onclick="fPrepararFormCategorias('a',0,'','')">`;
            html+=`<i class="fas fa-plus"> </i>`;
            html+=`</span>`
            html+= `</h2>`
            html += "<table border=1>";
            // Cabeceras
            html += "<tr>";
            // html += "   <th>ID</th>"
            html += "   <th>Categoría</th>";
            html += "   <th>Color</th>"; 
            html += "   <th>Acciones</th>";            
            html += "</tr>";
            // Datos
            data.datos.forEach(item => {
                html+= "<tr>";                
                // html+= `    <td>${item.cat_id}</td>`;                
                html+= `    <td>${item.cat_categoria}</td>`;  
                html+=`     <td>${item.cat_color}</td>`;        
                html+= `    <td>`;
                html+= `        <div class="botonera">`;    
                html+= `            <div onclick="fPrepararFormCategorias('e',${item.cat_id},'${item.cat_categoria}','${item.cat_color}')">`;
                html+= `                <i class="fas fa-trash" title="Borrar"></i>`;
                html+= "            </div>";                
                html+= `            <div onclick="fPrepararFormCategorias('m',${item.cat_id},'${item.cat_categoria}','${item.cat_color}')">`;
                html+= `                <i class="fas fa-edit"></i>`;                
                html+= "            </div>";             
                html+= "        </div>";
                html+= `    </td>`;
                html+= "</tr>";
            });
            html += "</table>";
            document.querySelector("section").innerHTML = html;
        })
        .finally(function () {
            
        })
}
// mostrar modal
function fPrepararFormCategorias(operacion, id, categoria,color) {
    document.querySelector("#cat_id").value=id;
    document.querySelector("#cat_error").innerHTML="";
    document.querySelector("#cat_categoria").value=categoria;
    document.querySelector("#cat_color").value=color
    if (operacion == 'a') {
        document.querySelector("#cat_categoria").innerHTML="";
        document.querySelector("#cat_color").innerHTML="";
        document.querySelector("#boton_grabar_categoria").style.display="block";
        document.querySelector("#boton_eliminar_categoria").style.display="none";
        document.querySelector("#boton_modificar_categoria").style.display="none";
    }
    if (operacion == 'e') {
        document.querySelector("#cat_categoria").innerHTML="";
        document.querySelector("#cat_color").innerHTML="";
        document.querySelector("#boton_grabar_categoria").style.display="none";
        document.querySelector("#boton_eliminar_categoria").style.display="block";
        document.querySelector("#boton_modificar_categoria").style.display="none";
    }
    if (operacion == 'm') {
        document.querySelector("#cat_categoria").innerHTML="";
        document.querySelector("#cat_color").innerHTML="";
        document.querySelector("#boton_grabar_categoria").style.display="none";
        document.querySelector("#boton_eliminar_categoria").style.display="none";
        document.querySelector("#boton_modificar_categoria").style.display="block";
    }
    fMostrarForm("#div_form_categorias");
}
function fCategoriaCRUD(operacion){
    let id= document.querySelector("#cat_id").value;
    let categoria= document.querySelector("#cat_categoria").value.trim();
    let color=document.querySelector("#cat_color").value.trim();
    let devolucion="";
    let sql="";
    if (categoria==""||color=="") {
        document.querySelector("#cat_error").innerHTML="categoria o color no introducida";
    }else
    if (operacion=='a') {
        sql=`INSERT INTO categorias VALUES (null,'${categoria}','${color}')`;
        devolucion="i";
    }
    if (operacion=='e') {
        sql=`DELETE FROM categorias WHERE cat_id = ${id}`;
    }
    if (operacion=='m') {
        sql=`UPDATE categorias SET cat_color='${color}', cat_categoria='${categoria}' WHERE cat_id =${id}`;
    }

    console.log(sql);
    let URL = 'assets/php/servidor.php?peticion=CategoriaCRUD';
    URL+="&sql="+ sql;
    URL+="&devolucion=" + devolucion;
    
    fetch(URL)
        .then((response) => response.json())
        .then((data) => {
            console.log("CRUD cursos", data);  
           fOcultarModal();
            
        })
        .finally( ()=> {
            // fGeneraCombo("#as_curso","as_cur_id");
            // fGeneraCombo("#al_curso","al_cur_id");
            // fMostrarCursos();
            fMostrarCategorias()
        })
}

//---------------------------------Preguntas-------------------------------------------------------------------------------------------
function fMostrarPreguntas(){
    // Sacar categorias en el section
    let URL = 'assets/php/servidor.php?peticion=CargarPreguntas';
    fetch(URL)
        .then((response) => response.json())
        .then((data) => {
            console.log("pregutas", data);    
            let html = "<h2>";
            html+=`Preguntas`;
                                                    //id,pregunta,respuesta1,respuesta2,repuesta3,repuesta4,respuestaValida,cat_id
            html += `  <span title="Añadir cursos" onclick="fPrepararFormPreguntas('a',0,'','','','','','',0)">`;
            html+=`<i class="fas fa-plus"> </i>`;
            html+=`</span>`
            html+= `</h2>`
            html += "<table border=1>";
            // Cabeceras
            html += "<tr>";
            // html += "   <th>ID</th>"
            html += "   <th>Categoría</th>";
            html += "   <th>Pregunta</th>"; 
            html += "   <th>Respuesta 1</th>";
            html += "   <th>Respuesta 2</th>";
            html += "   <th>Respuesta 3</th>";
            html += "   <th>Respuesta 4</th>"
            html += "   <th>Repuesta Valida</th>";
            html += "   <th>Acciones</th>";            
            html += "</tr>";
            // Datos
            data.datos.forEach(item => {
                html+= "<tr>";                
                // html+= `    <td>${item.pr_id}</td>`;    
                html+=`     <td>${item.cat_categoria}</td>`;             
                html+= `    <td>${item.pr_pregunta}</td>`;  
                html+=`     <td>${item.pr_r1}</td>`;  
                html+=`     <td>${item.pr_r2}</td>`; 
                html+=`     <td>${item.pr_r3}</td>`;  
                html+=`     <td>${item.pr_r4}</td>`; 
                html+=`     <td>${item.pr_valida}</td>`;      
                html+= `    <td>`;
                html+= `        <div class="botonera">`;    
                html+= `            <div onclick="fPrepararFormPreguntas('e',${item.pr_id},'${item.pr_pregunta}','${item.pr_r1}','${item.pr_r2}','${item.pr_r3}','${item.pr_r4}',${item.pr_valida},'${item.cat_categoria}')">`;
                html+= `                <i class="fas fa-trash" title="Borrar"></i>`;
                html+= "            </div>";                
                html+= `            <div onclick="fPrepararFormPreguntas('m',${item.pr_id},'${item.pr_pregunta}','${item.pr_r1}','${item.pr_r2}','${item.pr_r3}','${item.pr_r4}',${item.pr_valida},'${item.cat_categoria}')">`;
                html+= `                <i class="fas fa-edit"></i>`;                
                html+= "            </div>";             
                html+= "        </div>";
                html+= `    </td>`;
                html+= "</tr>";
            });
            html += "</table>";
            document.querySelector("section").innerHTML = html;
        })
        .finally(function () {
            
        })
}
//Aqui le indico que es lo que quiero recibir  y que boton quiero que este visible 
function fPrepararFormPreguntas(operacion, id, categoria,pregunta,respuestaUno,respuestaDos,repuestaTres,repuestaCuatro,valida) {
    document.querySelector("#pr_id").value=id;
    document.querySelector("#pr_error").innerHTML="";
   document.querySelector("#cat_categoria").value=categoria;
    document.querySelector("#pr_pregunta").value=pregunta;
    document.querySelector("#pr_r1").value=respuestaUno;
    document.querySelector("#pr_r2").value=respuestaDos;
    document.querySelector("#pr_r3").value=repuestaTres;
    document.querySelector("#pr_r4").value=repuestaCuatro;
    document.querySelector("#pr_valida").value=valida
    if (operacion == 'a') {
        document.querySelector("#pr_pregunta").innerHTML="";
        document.querySelector("#pr_r1").innerHTML="";
        document.querySelector("#pr_r2").innerHTML="";
        document.querySelector("#pr_r3").innerHTML="";
        document.querySelector("#pr_r4").innerHTML="";
        document.querySelector("#pr_valida").innerHTML="";
        document.querySelector("#boton_grabar_preguntas").style.display="block";
        document.querySelector("#boton_eliminar_preguntas").style.display="none";
        document.querySelector("#boton_modificar_preguntas").style.display="none";
    }
    if (operacion == 'e') {
        document.querySelector("#pr_pregunta").innerHTML="";
        document.querySelector("#pr_r1").innerHTML="";
        document.querySelector("#pr_r2").innerHTML="";
        document.querySelector("#pr_r3").innerHTML="";
        document.querySelector("#pr_r4").innerHTML="";
        document.querySelector("#pr_valida").innerHTML="";
        document.querySelector("#boton_grabar_preguntas").style.display="none";
        document.querySelector("#boton_eliminar_preguntas").style.display="block";
        document.querySelector("#boton_modificar_preguntas").style.display="none";
    }
    if (operacion == 'm') {
        document.querySelector("#pr_pregunta").innerHTML="";
        document.querySelector("#pr_r1").innerHTML="";
        document.querySelector("#pr_r2").innerHTML="";
        document.querySelector("#pr_r3").innerHTML="";
        document.querySelector("#pr_r4").innerHTML="";
        document.querySelector("#pr_valida").innerHTML="";
        document.querySelector("#boton_grabar_preguntas").style.display="none";
        document.querySelector("#boton_eliminar_preguntas").style.display="none";
        document.querySelector("#boton_modificar_preguntas").style.display="block";
    }
    fMostrarForm("#div_form_preguntas");

    
}
// Aqui le indico el crud
function fPreguntasCRUD(operacion){
    
    let id=document.querySelector("#pr_id").value;
    let categoria= document.querySelector("#pr_cat_id").value;
    let pregunta=document.querySelector("#pr_pregunta").value.trim();
    let respuestaUno=document.querySelector("#pr_r1").value.trim();
    let respuestaDos=document.querySelector("#pr_r2").value.trim();
    let respuestaTres=document.querySelector("#pr_r3").value.trim();
    let respuestaCuatro=document.querySelector("#pr_r4").value.trim();
    let valida=document.querySelector("#pr_valida").value.trim();
    let devolucion="";
    let sql="";
   
    if(valida>4 || valida==0){
        document.querySelector("#pr_validacion_error").innerHTML="No puede ser mayor el numero introducido que las respuestas o es 0";
        return;
    }
    if (pregunta==""||respuestaUno==""||respuestaDos==""||respuestaTres==""||respuestaCuatro==""||valida=="") {
        document.querySelector("#pr_error").innerHTML="Hay uno o varios campos sin informacion";
    }else

    if (operacion=='a') {
        sql=`INSERT INTO preguntas VALUES (null,'${pregunta}','${respuestaUno}','${respuestaDos}','${respuestaTres}','${respuestaCuatro}',${valida},${categoria})`;
        devolucion="i";
    }
    if (operacion=='e') {
        sql=`DELETE FROM preguntas WHERE pr_id = ${id}`;
    }
    if (operacion=='m') {
        sql=`UPDATE preguntas SET  pr_valida=${valida},pr_r4='${respuestaCuatro}',pr_r3='${respuestaTres}',pr_r2='${respuestaDos}',pr_r1='${respuestaUno}',pr_pregunta='${pregunta}' WHERE pr_id =${id}`;
    }
    console.log(sql);
    let URL = 'assets/php/servidor.php?peticion=PreguntasCRUD';
    URL+="&sql="+ sql;
    URL+="&devolucion=" + devolucion;
    
    fetch(URL)
        .then((response) => response.json())
        .then((data) => {
            console.log("CRUD cursos", data);  
           fOcultarModal();
            
        })
        .finally( ()=> {
            // fGeneraCombo("#as_curso","as_cur_id");
            // fGeneraCombo("#al_curso","al_cur_id");
            // fMostrarCursos();
            fMostrarPreguntas()
        })
}








// function fCombo(){
//     let valor = document.querySelector("#lista_cursos").value;
//     let posicion = document.querySelector("#lista_cursos").selectedIndex;
//     console.log (valor, posicion);
// }

function fGeneraCombo(){
    // Generar combo de cursos DONDE tú digas
    let URL = 'assets/php/servidor.php?peticion=CargarCategorias';
    fetch(URL)
        .then((response) => response.json())
        .then((data) => {
            console.log("pr_cat_id", data); 
            let html = `<select name='sel_categoria' id='pr_cat_id'>`;
            for (i=0; i<data.datos.length; i++) {
                //let id=data.datos[i].cur_id;
                    html += `<option value="${data.datos[i].cat_id}">${data.datos[i].cat_categoria}</option>`;
            };
            html+="</select>";
            document.querySelector("#cat_categorias").innerHTML = html;
        })
        .finally(function () {
           
        })
}

// Pasos
/*
Crear formulario dentro de la modal
Para mostrar un formulario, dime el nombre
    Ocultar todos
    Mostrar el que medigas
    Mostrar Modal
Para cada tabla de la BD, crear funciones de mostrar que permita CRUD

    CUANDO PULSEN +
        Preparar el formulario para alta
        Muestro el formulario

   CUANDO PULSEN MODIFICAR
        Preparar el formulario para modficar
        Muestro el formulario

    CUANDO PULSEN ELIMINAR
        Preparar el formulario para eliminar
         Muestro el formulario


Los botones llama a una funcion CRUD que genera los SQL necesarios y los ejecuta
Cuando acabe, Oculto modal y refresco pantalla

*/
// function fInicio(){
//     fGeneraCombo("#as_curso","as_cur_id");
//     fGeneraCombo("#al_curso","al_cur_id");
    
    
//     // Mostrar la modal
//     document.querySelector("#div_modal").style.display = 'none';
// }
function fMostrarForm(formulario) {
    // Ocultar todos los formularios
    let lista_formularios = document.querySelectorAll("#div_modal > div");
    lista_formularios.forEach(item => {
        item.style.display = 'none';
    });
    // Mostrar el que quiero
    document.querySelector(formulario).style.display = 'block';
    // Mostrar la modal
    document.querySelector("#div_modal").style.display = 'flex';
}