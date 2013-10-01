//almacenamiento

function registro(usuario){
	if(window.localStorage.getItem('id')==undefined){
		window.localStorage.setItem('usuario',usuario);
		window.localStorage.setItem('id',infoDisp()['id']);
	}
}
//Acceso a la base de datos
function accesoBD(){
	var bd = window.openDatabase('Hotel','1.0','Hotel', 2000000);
	return bd;
}
function guardarReserva(th, ha, di, pe){
	accesoBD().transaction(function(tx){
		tx.executeSql('CREATE TABLE IF NOT EXISTS reservas (id unique, th, ha, di, pe)');
		tx.executeSql('INSERT INTO reservas (th, ha, di, pe) VALUES ("'+th+'","'+ha+'","'+di+'","'+pe+'")');
	}, function(err){
		alert("Error processing SQL: "+err);
	}, function(){
		navigator.notification.alert("Esperando conexión con servidor...", null, "Guardado","Aceptar");
	});
}

function guardatempcalif(p1, p2, p3, p4,p5){
	accesoBD().transaction(function(tx){
		tx.executeSql('CREATE TABLE IF NOT EXISTS calif (id unique,p1, p2, p3, p4,p5)');
		tx.executeSql('INSERT INTO calif (p1, p2, p3, p4,p5) VALUES ("'+p1+'","'+p2+'","'+p3+'","'+p4+'","'+p5+'")');
			
	}, function(err){
		alert("Error processing SQL: "+err);
	}, function(){
		navigator.notification.alert("Esperando conexión con servidor...", null, "Guardado","Aceptar");
	});

}
function guardarHistorial(th, ha, di, pe){
	accesoBD().transaction(function(tx){
		tx.executeSql('CREATE TABLE IF NOT EXISTS historial (id unique, th, ha, di, pe)');
		tx.executeSql('INSERT INTO historial (th, ha, di, pe) VALUES ("'+th+'","'+ha+'","'+di+'","'+pe+'")');
	}, function(err){
		alert("Error processing SQL: "+err);
	}, function(){
		navigator.notification.alert("Hecho", null, "Guardado","Aceptar");
	});
}


function leeresarvas2(){
	accesoBD().transaction(function(tx){
		tx.executeSql('SELECT * FROM calif',[],function(tx2, resultado){
			var largo = resultado.rows.length;
			if(largo>0){
	
				for(i=0;i<largo;i++){

						sube_interno(resultado.rows.item(i).p1,resultado.rows.item(i).p2,resultado.rows.item(i).p3,resultado.rows.item(i).p4,resultado.rows.item(i).p5);
						//window.location.reload();
				}
				borrarReserva();
				
			}
		}, function(err){
			alert('Error: '+err.code);
		});
	}, function(err){
		navigator.notification.alert("Error",null,"Error","Aceptar");
	}, function(){
		return 1;
	});
}

function leerReservas(){
/*var check=getCookie("indice");
if (check!=null && check!="")
  {
 
  }
else 
  {

    setCookie("indice",0,365);
    
  }
var cont=getCookie("indice");*/
	accesoBD().transaction(function(tx){
		
		tx.executeSql('SELECT * FROM calif',[],function(tx2, resultado){
			var largo = resultado.rows.length;
	
			if(largo>0){
				for(i=0;i<largo;i++)
				{
				
				
					sube_interno(resultado.rows.item(i).p1,resultado.rows.item(i).p2,resultado.rows.item(i).p3,resultado.rows.item(i).p4,resultado.rows.item(i).p5);//,resultado.rows.item(i).id);
					
				/*var con2=parseInt(cont)+1;
		      cont=cont2.toString();
		   
		setCookie("indice",cont,365);*/
				}
				borrarReserva();
			}
		}, function(err){
			
		});
	}, function(err){
		navigator.notification.alert("Error"+err.code,null,"Error","Aceptar");
	}, function(){
		return 1;
	});
}
function borrarReserva(){
	accesoBD().transaction(function(tx){
		tx.executeSql('DELETE FROM calif' );
	},function(err){
		alert(err.code);
	}, function(){
		return 1;
	});
}
function leerHistorial(){
	accesoBD().transaction(function(tx){
		tx.executeSql('SELECT * FROM historial',[],function(tx2, resultado){
			var largo = resultado.rows.length;
			if(largo>0){
				var code = '';
				for(i=0;i<largo;i++){
					code += '<div data-role="collapsible-set">'+
						'<div data-role="collapsible" data-collapsed="true">'+
							'<h3>'+
								'08/06/2013'+
							'</h3>'+
							'<strong>Días</strong> '+resultado.rows.item(i).di+'<br />'+
							'<strong>Habitaciones</strong> '+resultado.rows.item(i).ha+'<br />'+
							'<strong>Personas</strong> '+resultado.rows.item(i).pe+
						'</div>'+
					'</div>';
				}
				$('#historial div[data-role=content]').html(code);
			}
		}, function(err){
			alert('Error: '+err.code);
		});
	}, function(err){
		navigator.notification.alert("Error",null,"Error","Aceptar");
	}, function(){
		return 1;
	});
}