function search_query(){
	graphioGremlin.search_query();
}

function get_graph_info(){
	graphioGremlin.get_graph_info();
	infobox.show_element("#graphInfo");
	document.getElementById ("showgraphinfo").checked = true;
}

function init_property_bar(){
	document.getElementById('nbLayers').value = default_nb_of_layers;
}

function change_nav_bar(node_data,edge_data){
	var nav_bar = d3.select("#prop_choice");
	nav_bar.select("input").remove();
	nav_bar.select("select").remove();
	var select = d3.select('#prop_choice')
		.append('select').attr('class','select').attr('id','search_field');
	
	var select_node = select.append('optgroup').attr('label','Nodes');

	var select_edge = select.append('optgroup').attr('label','Edges');

	var node_options = select_node
		.selectAll('option')
		.data(node_data).enter()
		.append('option')
		.text(function (d) { return d; });

	var edge_options = select_edge
		.selectAll('option')
		.data(edge_data).enter()
		.append('option')
		.text(function (d) { return d; });

}

function display_properties_bar(prop_list,item,text){
	var nav_bar = d3.select("#graphInfoBar");
	nav_bar.select("#property_bar_"+item).remove();
	var property_bar = nav_bar.append("div").attr("id","property_bar_"+item);
	property_bar.append('text').text(text).style("font-weight","bold");
	var property_label = property_bar.selectAll('input').append("ul")
		.data(prop_list).enter().append("li");

		
	property_label.append('input').attr('type','checkbox').attr('id',function (d) { return item+"_"+d; })
		.attr('id_nb',function (d) { return prop_list.indexOf(d); })
		.attr('onchange','display_prop(this)');

	property_label.append('label').text(function (d) { return d; });
	

}

function display_color_choice(prop_list,item,text){
	prop_list = ['none','label'].concat(prop_list);
	var nav_bar = d3.select("#graphInfoBar");
	nav_bar.select("#color_choice_"+item).remove();
	var color_bar = nav_bar.append("div").attr("id","color_choice_"+item);
	color_bar.append("div").append("text").text(text).style("font-weight","bold");
	color_bar.append("div").append("select").attr("class","select").attr("id","color_select_"+item)
		.attr("onchange","colorize(this)")
		.selectAll("option")
		.data(prop_list).enter()
		.append("option")
		.text(function (d) { return d; });
}

function colorize(selection){
	var value = selection.value;
	console.log(value);
	graphShapes.colorize(value);

}

function display_prop(prop){
	var prop_id = prop.id;
	var prop_id_nb = prop.getAttribute('id_nb');
	var text_base_offset = 10;
	var text_offset = 10;
	var prop_name = prop_id.slice(prop_id.indexOf("_")+1);
	var item = prop_id.slice(0,prop_id.indexOf("_"));
	console.log(prop_id,item)		
	if(d3.select("#"+prop_id).property("checked")){
		if (item=='nodes'){
			var elements_text = d3.selectAll('.node');
		} else if (item=='edges'){
			var elements_text = d3.selectAll('.edgelabel');
		}
		attach_property(elements_text,prop_name,prop_id_nb,item)
	}
	else{
		if (item=='nodes'){
			d3.selectAll('.node').select('.'+prop_id).remove();
		}
		else if (item=='edges'){
			d3.selectAll('.edgelabel').select('.'+prop_id).remove();
		}

	}
}


function attach_property(graph_objects,prop_name,prop_id_nb,item){
	var text_base_offset = 10;
	var text_offset = 10;
	var prop_id = item+"_"+prop_name;
	if (item=='nodes'){
		elements_text = graph_objects.append("text").style("pointer-events", "none");
	}
	else if (item=='edges'){
		var elements_text = graph_objects.append("textPath")
		.attr('class','edge_text')
		.attr('href', function (d, i) {return '#edgepath' + d.id})
		.style("text-anchor", "middle")
		.style("pointer-events", "none")
		.attr("startOffset", "70%");
		//.text(function (d) {return d.label});
		prop_id_nb = prop_id_nb + 1;
	}
	else { 
		console.log('Bad item name.'); return 1;
	}
	elements_text.classed("prop_details",true).classed(prop_id,true)
  		//.attr("x", 12)
  		.attr("dy",function(d){return graphShapes.node_size(d)+text_base_offset+text_offset*parseInt(prop_id_nb);})
  		//.attr("y", ".31em")
		.text(function(d){return get_prop_value(d,prop_name,item);});
	}


function get_prop_value(d,prop_name,item){
	if (prop_name in d.properties){
		if (item=='nodes'){
			if (COMMUNICATION_METHOD == 'GraphSON3') {
				return d.properties[prop_name]['summary'];
			} else if (COMMUNICATION_METHOD == 'GraphSON1') {
				return d.properties[prop_name][0].value;
			}
		}
		else if (item=='edges'){
			console.log(d.properties[prop_name])
			return d.properties[prop_name];
		}
	}
	else {
		return "";
	}
}


function set_nb_layers(){
	var nb_layers = parseInt(document.getElementById('nbLayers').value);
	//var nb_layers = parseInt(layer_input.getAttribute("value"));
	console.log(nb_layers)
	graph_viz.layers.set_nb_layers(nb_layers);

}

function show_hide_element(element_label){
	element = d3.select(element_label);
	var input = document.getElementById ("showgraphinfo");
	var isChecked = input.checked;
	if (isChecked) element.style("display", "inline");
	else {element.style("display", "none");}
}

function Spot() {

	var contentElement = document.querySelector('.spot-content');
	
	this.helloWorld = function(){
		sprout.showLoader({fullScreen: true});
		sprout.zone.run(function(){
			sprout.http.get('./rest/modules/spot/hello', {responseType: 'text'}).subscribe(function(response){
				contentElement.innerHTML = response;
				sprout.hideLoader();
			}, function(err){
				console.error(err);
				contentElement.innerHTML = err.error;
				sprout.hideLoader();
			});
		});
	};
	
	this.init = function(){
		sprout.zone.run(function(){
			window.graphShapes = new GraphShapes();
			init_property_bar();
			// Create the graph canvas in the chosen div element
			graph_viz.init("#main");
			// Add the zoom layer to the graph
			graph_viz.addzoom();

			// Create the info box for node details
			infobox.create("#graphInfo","#nodeInfo"); // from module in infobox.js
			get_graph_info();
			sprout.hideLoader();
		});
	};
	
	sprout.zone.run(function(){
		sprout.showLoader({fullScreen: true});
		setTimeout(function() {
			spot.init();
		}, 2000);
	});
}

window.spot = new Spot();