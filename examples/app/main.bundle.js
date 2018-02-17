webpackJsonp(["main"],{

/***/ "../../../../../src/$$_lazy_route_resource lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "../../../../../src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "../../../../../src/app/app.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<sv-graphexp [graphexpService]=\"service\" [graphConfig]=\"graphConfig\"></sv-graphexp>"

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__savantly_ngx_graphexp__ = __webpack_require__("../../../../../src/app/modules/graphexp/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AppComponent = /** @class */ (function () {
    function AppComponent(service) {
        this.service = service;
        this.graphConfig = new __WEBPACK_IMPORTED_MODULE_0__savantly_ngx_graphexp__["a" /* GraphConfig */]();
        this.graphConfig.nodeLabels = ['god', 'titan', 'demigod', 'human', 'monster', 'location'];
        this.graphConfig.linkLabels = ['is_father_of', 'has_pet', 'lives_in'];
    }
    AppComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["n" /* Component */])({
            selector: 'sv-root',
            template: __webpack_require__("../../../../../src/app/app.component.html"),
            styles: [__webpack_require__("../../../../../src/app/app.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__savantly_ngx_graphexp__["c" /* GraphexpService */]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export graphexpService */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("../../../platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_animations__ = __webpack_require__("../../../platform-browser/esm5/animations.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__savantly_ngx_graphexp__ = __webpack_require__("../../../../../src/app/modules/graphexp/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__savantly_gremlin_js__ = __webpack_require__("../../../../@savantly/gremlin-js/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_router__ = __webpack_require__("../../../router/esm5/router.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var routes = [];
var graphexpService = new __WEBPACK_IMPORTED_MODULE_4__savantly_ngx_graphexp__["c" /* GraphexpService */](new __WEBPACK_IMPORTED_MODULE_5__savantly_gremlin_js__["a" /* GremlinClientOptions */]());
var AppModule = /** @class */ (function () {
    function AppModule() {
        console.log('Constructed AppModule');
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["K" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* AppComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_6__angular_router__["a" /* RouterModule */].forRoot(routes),
                __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
                __WEBPACK_IMPORTED_MODULE_4__savantly_ngx_graphexp__["b" /* GraphexpModule */]
            ],
            providers: [{ provide: __WEBPACK_IMPORTED_MODULE_4__savantly_ngx_graphexp__["c" /* GraphexpService */], useValue: graphexpService }],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* AppComponent */]]
        }),
        __metadata("design:paramtypes", [])
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "../../../../../src/app/modules/graphexp/graphViz/graphConfig.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GraphConfig; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__graphexp_service__ = __webpack_require__("../../../../../src/app/modules/graphexp/graphexp.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_d3__ = __webpack_require__("../../../../d3/index.js");


var GraphConfig = /** @class */ (function () {
    function GraphConfig() {
        this.enableEdit = true;
        this.nodeLabels = [];
        this.linkLabels = [];
        this.numberOfLayers = 3;
        this.format = __WEBPACK_IMPORTED_MODULE_0__graphexp_service__["b" /* GraphsonFormat */].GraphSON3;
        // Physics
        this.force_strength = -600;
        this.link_strength = 0.2;
        this.force_x_strength = 0.1;
        this.force_y_strength = 0.1;
        // Nodes
        this.default_node_size = 15;
        this.default_stroke_width = 2;
        this.default_node_color = '#80E810';
        this.active_node_margin = 6;
        this.active_node_margin_opacity = 0.3;
        // Edges
        this.default_edge_stroke_width = 3;
        this.default_edge_color = '#CCC';
        this.edge_label_color = '#111';
        this.colorPalette = __WEBPACK_IMPORTED_MODULE_1_d3__["k" /* scaleOrdinal */](__WEBPACK_IMPORTED_MODULE_1_d3__["l" /* schemeCategory20 */]);
    }
    return GraphConfig;
}());



/***/ }),

/***/ "../../../../../src/app/modules/graphexp/graphViz/graphLayers.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GraphLayers; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__nodes_d3Node__ = __webpack_require__("../../../../../src/app/modules/graphexp/nodes/d3Node.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_d3__ = __webpack_require__("../../../../d3/index.js");


var GraphLayers = /** @class */ (function () {
    function GraphLayers(graphViz) {
        this.graphViz = graphViz;
        // Submodule that handles layers of visualization
        this.old_Nodes = [];
        this.old_Links = [];
        this._Nodes = [];
        this._Links = [];
    }
    GraphLayers.prototype.depth = function () {
        return this.config.numberOfLayers;
    };
    Object.defineProperty(GraphLayers.prototype, "config", {
        get: function () {
            return this.graphViz.config;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GraphLayers.prototype, "nodes", {
        get: function () {
            return this._Nodes;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GraphLayers.prototype, "links", {
        get: function () {
            return this._Links;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GraphLayers.prototype, "_svg", {
        get: function () {
            return this.graphViz.graphRoot;
        },
        enumerable: true,
        configurable: true
    });
    GraphLayers.prototype.push_layers = function () {
        // old links and nodes become older
        // and are moved to the next deeper layer
        for (var k = this.config.numberOfLayers; k > 0; k--) {
            var kp = k - 1;
            this._svg.selectAll('.old_edge' + kp).classed('old_edge' + k, true);
            this._svg.selectAll('.old_node' + kp).classed('old_node' + k, true);
            this._svg.selectAll('.old_edgepath' + kp).classed('old_edgepath' + k, true);
            this._svg.selectAll('.old_edgelabel' + kp).classed('old_edgelabel' + k, true);
        }
        ;
    };
    GraphLayers.prototype.clear_old = function () {
        this.old_Nodes = [];
        this.old_Links = [];
    };
    GraphLayers.prototype.update_data = function (d) {
        // Save the data
        var previous_nodes = this._svg.selectAll('g').filter('.active_node');
        var previous_nodes_data = previous_nodes.data();
        this.old_Nodes = this.updateAdd(this.old_Nodes, previous_nodes_data);
        var previous_links = this._svg.selectAll('.active_edge');
        var previous_links_data = previous_links.data();
        this.old_Links = this.updateAdd(this.old_Links, previous_links_data);
        // handle the pinned nodes
        var pinned_Nodes = this._svg.selectAll('g').filter('.pinned');
        var pinned_nodes_data = pinned_Nodes.data();
        // get the node data and merge it with the pinned nodes
        this._Nodes = d.nodes;
        this._Nodes = this.updateAdd(this._Nodes, pinned_nodes_data);
        // add coordinates to the new active nodes that already existed in the previous step
        this._Nodes = this.transfer_coordinates(this._Nodes, this.old_Nodes);
        // retrieve the links between nodes and pinned nodes
        this._Links = d.links.concat(previous_links_data); // first gather the links
        this._Links = this.find_active_links(this._Links, this._Nodes); // then find the ones that are between active nodes
    };
    GraphLayers.prototype.updateAdd = function (array1, array2) {
        // Update lines of array1 with the ones of array2 when the elements' id match
        // and add elements of array2 to array1 when they do not exist in array1
        var arraytmp = array2.slice(0);
        var removeValFromIndex = [];
        array1.forEach(function (d, index, thearray) {
            for (var i = 0; i < arraytmp.length; i++) {
                if (d.id === arraytmp[i].id) {
                    thearray[index] = arraytmp[i];
                    removeValFromIndex.push(i);
                }
            }
        });
        // remove the already updated values (in reverse order, not to mess up the indices)
        removeValFromIndex.sort();
        for (var i = removeValFromIndex.length - 1; i >= 0; i--) {
            arraytmp.splice(removeValFromIndex[i], 1);
        }
        return array1.concat(arraytmp);
    };
    GraphLayers.prototype.find_active_links = function (list_of_links, active_nodes) {
        // find the links in the list_of_links that are between the active nodes and discard the others
        var active_links = [];
        list_of_links.forEach(function (row) {
            for (var i = 0; i < active_nodes.length; i++) {
                for (var j = 0; j < active_nodes.length; j++) {
                    if (active_nodes[i].id === row.source.id && active_nodes[j].id === row.target.id) {
                        var L_data = new __WEBPACK_IMPORTED_MODULE_0__nodes_d3Node__["a" /* D3Node */](row);
                        L_data.source = row.source.id;
                        L_data.target = row.target.id;
                        active_links = active_links.concat(L_data);
                    }
                    else if (active_nodes[i].id === row.source && active_nodes[j].id === row.target) {
                        var L_data = row;
                        active_links = active_links.concat(L_data);
                    }
                }
            }
        });
        // the active links are in active_links but there can be some duplicates
        // remove duplicates links
        var dic = {};
        for (var i = 0; i < active_links.length; i++) {
            dic[active_links[i].id] = active_links[i]; // this will remove the duplicate links (with same id)
        }
        var list_of_active_links = [];
        for (var _i = 0, _a = Object.keys(dic); _i < _a.length; _i++) {
            var key = _a[_i];
            list_of_active_links.push(dic[key]);
        }
        return list_of_active_links;
    };
    GraphLayers.prototype.transfer_coordinates = function (Nodes, old_Nodes) {
        // Transfer coordinates from old_nodes to the new nodes with the same id
        for (var i = 0; i < old_Nodes.length; i++) {
            var exists = 0;
            for (var j = 0; j < Nodes.length; j++) {
                if (Nodes[j].id === old_Nodes[i].id) {
                    Nodes[j].x = old_Nodes[i].x;
                    Nodes[j].y = old_Nodes[i].y;
                    Nodes[j].fx = old_Nodes[i].x;
                    Nodes[j].fy = old_Nodes[i].y;
                    Nodes[j].vx = old_Nodes[i].vx;
                    Nodes[j].vy = old_Nodes[i].vy;
                }
            }
        }
        return Nodes;
    };
    GraphLayers.prototype.remove_duplicates = function (elem_class, elem_class_old) {
        var _this = this;
        // Remove all the duplicate nodes and edges among the old_nodes and old_edges.
        // A node or an edge can not be on several layers at the same time.
        __WEBPACK_IMPORTED_MODULE_1_d3__["n" /* selectAll */](elem_class).each(function (d) {
            var ID = d.id;
            for (var n = 0; n < _this.config.numberOfLayers; n++) {
                var list_old_elements = __WEBPACK_IMPORTED_MODULE_1_d3__["n" /* selectAll */](elem_class_old + n);
                // list_old_nodes_data = list_old_nodes.data();
                list_old_elements.each(function (od) {
                    if (od.id === ID) {
                        __WEBPACK_IMPORTED_MODULE_1_d3__["m" /* select */](_this).remove();
                        // console.log('Removed!!')
                    }
                });
            }
        });
    };
    return GraphLayers;
}());



/***/ }),

/***/ "../../../../../src/app/modules/graphexp/graphViz/graphLinks.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GraphLinks; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3__ = __webpack_require__("../../../../d3/index.js");

var GraphLinks = /** @class */ (function () {
    function GraphLinks(graphViz) {
        this.graphViz = graphViz;
    }
    Object.defineProperty(GraphLinks.prototype, "config", {
        get: function () {
            return this.graphViz.config;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GraphLinks.prototype, "graphRoot", {
        get: function () {
            return this.graphViz.graphRoot;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GraphLinks.prototype, "linkModels", {
        get: function () {
            return this.graphViz.linkModels;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GraphLinks.prototype, "nodeModels", {
        get: function () {
            return this.graphViz.nodeModels;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GraphLinks.prototype, "selectLinks", {
        get: function () {
            return this.graphViz.selectLinks;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GraphLinks.prototype, "selectEdgePaths", {
        get: function () {
            return this.graphViz.selectEdgePaths;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GraphLinks.prototype, "selectEdgeLabels", {
        get: function () {
            return this.graphViz.selectEdgeLabels;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GraphLinks.prototype, "selectGraphNodes", {
        get: function () {
            return this.graphViz.selectGraphNodes;
        },
        enumerable: true,
        configurable: true
    });
    GraphLinks.prototype.update = function (arrangedData) {
        // links not active anymore are classified old_links
        this.selectLinks.exit().classed('old_edge0', true).classed('active_edge', false);
        this.selectEdgePaths.exit().classed('old_edgepath0', true).classed('active_edgepath', false);
        this.selectEdgeLabels.exit().classed('old_edgelabel0', true).classed('active_edgelabel', false);
        // handling active links associated to the data
        var edgepaths_e = this.selectEdgePaths.enter(), edgelabels_e = this.selectEdgeLabels.enter(), link_e = this.selectLinks.enter();
        var decor_out = this.decorate(link_e, edgepaths_e, edgelabels_e);
        var links = decor_out[0], edgepaths = decor_out[1], edgelabels = decor_out[2];
        // previous links plus new links are merged
        links.merge(this.selectLinks);
        edgepaths.merge(this.selectEdgePaths);
        edgelabels.merge(this.selectEdgeLabels);
    };
    GraphLinks.prototype.tick = function () {
        this.selectLinks
            .attr('x1', function (d) {
            return d.source.x;
        })
            .attr('y1', function (d) {
            return d.source.y;
        })
            .attr('x2', function (d) {
            return d.target.x;
        })
            .attr('y2', function (d) {
            return d.target.y;
        });
        this.selectEdgePaths.attr('d', function (d) {
            return 'M ' + d.source.x + ' ' + d.source.y + ' L ' + d.target.x + ' ' + d.target.y;
        });
        this.selectEdgeLabels.attr('transform', function (d) {
            if (d.target.x < d.source.x) {
                var bbox = this.getBBox();
                var rx = bbox.x + bbox.width / 2;
                var ry = bbox.y + bbox.height / 2;
                return 'rotate(180 ' + rx + ' ' + ry + ')';
            }
            else {
                return 'rotate(0)';
            }
        });
    };
    GraphLinks.prototype.getStrokeWidth = function (d) {
        if ('stroke_width' in d) {
            return d.stroke_width;
        }
        else {
            return this.config.default_edge_stroke_width;
        }
    };
    GraphLinks.prototype.getEdgeText = function (d) {
        if ('text' in d) {
            return d.text;
        }
        else {
            return d.properties.weight;
        }
    };
    GraphLinks.prototype.getEdgeColor = function (d) {
        if ('color' in d) {
            return d.color;
        }
        else {
            return this.config.default_edge_color;
        }
    };
    GraphLinks.prototype.decorate = function (edges, edgepaths, edgelabels) {
        var _this = this;
        var edges_deco = edges.append('line').attr('class', 'edge').classed('active_edge', true)
            .attr('source_ID', function (d) {
            return d.source;
        })
            .attr('target_ID', function (d) {
            return d.target;
        })
            .attr('ID', function (d) {
            return d.id;
        });
        this.createMarkers(edges_deco);
        // Attach the arrows
        edges_deco.attr('marker-end', function (d) {
            return 'url(#marker_' + d.id + ')';
        })
            .attr('stroke-width', function (d) { return _this.getStrokeWidth(d); })
            .append('title').text(function (d) {
            return d.properties.weight;
        });
        // Attach the edge labels
        var e_label = this.createEdgeLabels(edgepaths, edgelabels);
        var edgepaths_deco = e_label[0];
        var edgelabels_deco = e_label[1];
        edgelabels_deco.append('textPath')
            .attr('class', 'edge_text')
            .attr('href', function (d, i) {
            return '#edgepath' + d.id;
        })
            .style('text-anchor', 'middle')
            .style('pointer-events', 'none')
            .attr('startOffset', '50%')
            .text(function (d) {
            return d.label;
        });
        // Attach the edge actions
        this.attachEdgeEvents(edges_deco);
        // Add property info if checkbox checked
        this.addEnabledProperties('edges', edgelabels_deco);
        return [edges_deco, edgepaths_deco, edgelabels_deco];
    };
    GraphLinks.prototype.nodeModelById = function (id) {
        // return data associated to the node with id 'id'
        for (var node in this.nodeModels) {
            // console.log(_Nodes[node])
            if (this.nodeModels[node].id === id) {
                return this.nodeModels[node];
            }
        }
    };
    GraphLinks.prototype.createMarkers = function (edge_in) {
        var _this = this;
        var edge_data = edge_in.data();
        var arrow_data = this.graphRoot.selectAll('.arrow').data();
        var data = arrow_data.concat(edge_data);
        this.graphRoot.selectAll('.arrow')
            .data(data)
            .enter()
            .append('marker')
            .attr('class', 'arrow')
            .attr('id', function (d) { return 'marker_' + d.id; })
            .attr('markerHeight', 5)
            .attr('markerWidth', 5)
            .attr('markerUnits', 'strokeWidth')
            .attr('orient', 'auto')
            .attr('refX', function (d) {
            var node = _this.nodeModelById(d.target);
            return _this.graphViz.graphNodes.getNodeSize(node) + _this.graphViz.graphNodes.getNodeStrokeWidth(node);
        })
            .attr('refY', 0)
            .attr('viewBox', '0 -5 10 10')
            .append('svg:path')
            .attr('d', 'M0,-5L10,0L0,5')
            .style('fill', function (d) { return _this.getEdgeColor(d); });
    };
    GraphLinks.prototype.addEnabledProperties = function (item, selected_items) {
        // Add text from a property if the checkbox is checked on the sidebar
        var item_properties = [];
        if (item === 'edges') {
            // TODO: get properties
            // item_properties = this.graphexpService.edgeProperties.value;
        }
        else if (item === 'nodes') {
            // item_properties = this.graphexpService.nodeProperties.value;
        }
        for (var prop_idx = 0; prop_idx < item_properties.length; prop_idx++) {
            var prop_name = item_properties[prop_idx];
            var prop_id_nb = prop_idx;
            var prop_id = item + '_' + prop_name;
            this.graphViz.attachEnabledProperties(selected_items, prop_name, prop_id_nb, item);
        }
    };
    GraphLinks.prototype.createEdgeLabels = function (edgepaths, edgelabels) {
        var edgepaths_deco = edgepaths.append('path')
            .attr('class', 'edgepath').classed('active_edgepath', true)
            .attr('fill-opacity', 0)
            .attr('stroke-opacity', 0)
            .attr('id', function (d, i) {
            return 'edgepath' + d.id;
        })
            .attr('ID', function (d) {
            return d.id;
        })
            .style('pointer-events', 'none');
        var edgelabels_deco = edgelabels.append('text')
            .attr('dy', -3)
            .style('pointer-events', 'none')
            .attr('class', 'edgelabel').classed('active_edgelabel', true)
            .attr('id', function (d, i) {
            return 'edgelabel' + d.id;
        })
            .attr('ID', function (d) {
            return d.id;
        })
            .attr('font-size', 10)
            .attr('fill', this.config.edge_label_color);
        return [edgepaths_deco, edgelabels_deco];
    };
    GraphLinks.prototype.attachEdgeEvents = function (edge) {
        edge.on('mouseover', function (theEdge, index, elements) {
            console.log('mouse over!!');
            var line = elements[index];
            __WEBPACK_IMPORTED_MODULE_0_d3__["m" /* select */](line).selectAll('.text_details').style('visibility', 'visible');
        })
            .on('mouseout', function (theEdge, index, elements) {
            var line = elements[index];
            __WEBPACK_IMPORTED_MODULE_0_d3__["m" /* select */](line).selectAll('.text_details').style('visibility', 'hidden');
        })
            .on('click', function (theEdge, index, elements) {
            console.log('edge clicked!');
        });
    };
    return GraphLinks;
}());



/***/ }),

/***/ "../../../../../src/app/modules/graphexp/graphViz/graphNodes.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GraphNodes; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3__ = __webpack_require__("../../../../d3/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__ = __webpack_require__("../../../../rxjs/BehaviorSubject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__);


var GraphNodes = /** @class */ (function () {
    function GraphNodes(graphViz) {
        this.graphViz = graphViz;
        this.connectionCreated = new __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__["BehaviorSubject"](null);
    }
    Object.defineProperty(GraphNodes.prototype, "config", {
        get: function () {
            return this.graphViz.config;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GraphNodes.prototype, "graphRoot", {
        get: function () {
            return this.graphViz.graphRoot;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GraphNodes.prototype, "nodeModels", {
        get: function () {
            return this.graphViz.nodeModels;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GraphNodes.prototype, "simulation", {
        get: function () {
            return this.graphViz.simulation;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GraphNodes.prototype, "isShifted", {
        get: function () {
            return window.event['shiftKey'] === true;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GraphNodes.prototype, "graphNodes", {
        /**
         * get all active nodes in the graph
         */
        get: function () {
            return this.graphViz.selectGraphNodes;
        },
        enumerable: true,
        configurable: true
    });
    GraphNodes.prototype.mouseXY = function (relativeNode) {
        var xy = __WEBPACK_IMPORTED_MODULE_0_d3__["i" /* mouse */](relativeNode);
        return {
            x: xy[0],
            y: xy[1]
        };
    };
    /**
     * for each tick
     */
    GraphNodes.prototype.tick = function () {
        this.graphNodes
            .attr('transform', function (d) {
            return "translate(" + d.x + ", " + d.y + ")";
        });
    };
    /**
     * update the node data in the graph
     */
    GraphNodes.prototype.update = function (arrangedData) {
        console.log('GraphNodes#update');
        // old nodes not active any more are tagged
        this.graphNodes.exit().classed('old_node0', true).classed('active_node', false);
        // nodes associated to the data are constructed
        var nodes = this.graphNodes.enter();
        // add node decoration
        var node_deco = this.decorateNodes(nodes);
        nodes = node_deco.merge(nodes);
    };
    GraphNodes.prototype.decorateNodes = function (node) {
        var _this = this;
        var _self = this;
        var node_deco = node.append('g')
            .attr('class', 'active_node').attr('ID', function (d) {
            return d.id;
        })
            .classed('node', true);
        // Attach the event listener
        this.attachNodeEvents(node_deco);
        node_deco.moveToFront();
        // Create the circle shape
        var node_base_circle = node_deco.append('circle').classed('base_circle', true)
            .attr('r', function (d) { return _this.getNodeSize(d); })
            .style('stroke-width', function (d) { return _this.getNodeStrokeWidth(d); })
            .style('stroke', 'black')
            .attr('fill', function (d) { return _this.getNodeColor(d); });
        node_base_circle.append('title').text(function (d) { return _this.getNodeText(d); });
        // Add the text to the nodes
        node_deco.append('text').classed('text_details', true)
            .attr('x', function (d) {
            return _this.config.default_node_size + 2;
        })
            .text(function (d) { return _this.getNodeText(d); })
            .style('visibility', 'hidden');
        node_deco.append('text').classed('text_details', true)
            .attr('x', function (d) {
            return _this.config.default_node_size + 4;
        })
            .attr('y', this.config.default_node_size)
            .text(function (d) { return _this.getNodeSubText(d); })
            .style('visibility', 'hidden');
        // Add the node pin
        var node_pin = node_deco.append('circle').classed('Pin', true)
            .attr('r', function (d) {
            return _this.config.default_node_size / 2;
        })
            .attr('transform', function (d) {
            return 'translate(' + (_this.config.default_node_size * 3 / 4) + ',' + (-_this.config.default_node_size * 3 / 4) + ')';
        })
            .attr('fill', this.config.default_node_color)
            .moveToBack()
            .style('visibility', 'hidden');
        node_pin.on('click', function (d) {
            _self.pinIt(this, d);
        });
        // spot the active node and draw additional circle around it
        /* TODO: make active node different
        if (with_active_node) {
          d3.selectAll('.active_node').each((d) => {
            if (d.id === with_active_node) {
              const n_radius = Number(d3.select(this).select('.base_circle').attr('r')) + this.active_node_margin;
              d3.select(this)
                .append('circle').classed('focus_node', true)
                .attr('r', n_radius)
                .attr('fill', this.node_color)
                .attr('opacity', this.active_node_margin_opacity)
                .moveToBack();
            }
          });
        }
         */
        return node_deco;
    };
    GraphNodes.prototype.attachNodeEvents = function (node) {
        var _this = this;
        var _self = this;
        node.call(__WEBPACK_IMPORTED_MODULE_0_d3__["a" /* drag */]()
            .on('start', function (d) {
            if (_self.isShifted) {
                _self.dragConnectionStarted(d);
            }
            else {
                _self.dragNodeStarted(d);
            }
        })
            .on('drag', function (d) {
            if (_self.isShifted) {
                _self.draggingConnection(d);
            }
            else {
                _self.draggingNode(d);
            }
        })
            .on('end', function (ev) {
            if (_this.isShifted) {
                _this.dragConnectionEnded(ev);
            }
            else {
                _this.dragNodeEnded(ev);
            }
        }));
        node.on('click', function (ev) { _this.clicked(ev); })
            .on('mouseover', function () {
            __WEBPACK_IMPORTED_MODULE_0_d3__["m" /* select */](this).select('.Pin').style('visibility', 'visible');
            __WEBPACK_IMPORTED_MODULE_0_d3__["m" /* select */](this).selectAll('.text_details').style('visibility', 'visible');
        })
            .on('mouseout', function () {
            var chosen_node = __WEBPACK_IMPORTED_MODULE_0_d3__["m" /* select */](this);
            if (!chosen_node.classed('pinned')) {
                __WEBPACK_IMPORTED_MODULE_0_d3__["m" /* select */](this).select('.Pin').style('visibility', 'hidden');
            }
            if (!this.show_name) {
                __WEBPACK_IMPORTED_MODULE_0_d3__["m" /* select */](this).selectAll('.text_details').style('visibility', 'hidden');
            }
        });
    };
    GraphNodes.prototype.getConnectedEdgesByNodeId = function (node_id) {
        // Return the in and out edges of node with id 'node_id'
        var connected_edges = __WEBPACK_IMPORTED_MODULE_0_d3__["n" /* selectAll */]('.edge').filter(function (item) {
            if (item.source === node_id || item.source.id === node_id) {
                return item;
            }
            else if (item.target === node_id || item.target.id === node_id) {
                return item;
            }
        });
        return connected_edges;
    };
    //////////////////////////////////
    // Handling mouse events
    GraphNodes.prototype.dragConnectionStarted = function (d) {
        this.mouseDownNode = d;
    };
    GraphNodes.prototype.dragNodeStarted = function (d) {
        if (!__WEBPACK_IMPORTED_MODULE_0_d3__["b" /* event */].active) {
            this.simulation.alphaTarget(0.3).restart();
        }
        d.fx = d.x;
        d.fy = d.y;
    };
    GraphNodes.prototype.draggingConnection = function (d) {
        // reposition dragged directed edge
        if (!this.mouseDownNode) {
            return;
        }
        var dragLine = this.graphViz.dragLine.classed('hidden', false);
        var transform = this.graphRoot.attr('transform');
        this.graphViz.dragLine
            .attr('d', "M " + d.x + "," + d.y + " L " + __WEBPACK_IMPORTED_MODULE_0_d3__["b" /* event */].x + ", " + __WEBPACK_IMPORTED_MODULE_0_d3__["b" /* event */].y)
            .attr('transform', transform);
        console.log('dragging new connection');
    };
    GraphNodes.prototype.draggingNode = function (d) {
        var connected_edges = this.getConnectedEdgesByNodeId(d.id);
        var f_connected_edges = connected_edges.filter('*:not(.active_edge)');
        if (f_connected_edges._groups[0].length === 0) {
            d.fx = __WEBPACK_IMPORTED_MODULE_0_d3__["b" /* event */].x;
            d.fy = __WEBPACK_IMPORTED_MODULE_0_d3__["b" /* event */].y;
        }
        else {
            f_connected_edges
                .style('stroke-width', function () {
                return parseInt(__WEBPACK_IMPORTED_MODULE_0_d3__["m" /* select */](this).attr('stroke-width'), 10) + 2;
            })
                .style('stroke-opacity', 1)
                .classed('blocking', true);
        }
    };
    GraphNodes.prototype.dragConnectionEnded = function (d) {
        var target = __WEBPACK_IMPORTED_MODULE_0_d3__["b" /* event */].sourceEvent.toElement;
        this.graphViz.dragLine.classed('hidden', true);
        console.log("connecting to: " + target);
        this.connectionCreated.next({
            source: this.mouseDownNode,
            target: __WEBPACK_IMPORTED_MODULE_0_d3__["m" /* select */](target).data()[0]
        });
    };
    GraphNodes.prototype.dragNodeEnded = function (d) {
        if (!__WEBPACK_IMPORTED_MODULE_0_d3__["b" /* event */].active) {
            this.simulation.alphaTarget(0);
        }
        __WEBPACK_IMPORTED_MODULE_0_d3__["n" /* selectAll */]('.blocking')
            .style('stroke-width', function () {
            return __WEBPACK_IMPORTED_MODULE_0_d3__["m" /* select */](this).attr('stroke-width');
        })
            .style('stroke-opacity', function () {
            return __WEBPACK_IMPORTED_MODULE_0_d3__["m" /* select */](this).attr('stroke-opacity');
        })
            .classed('blocking', false);
        // d.fx = null;
        // d.fy = null;
    };
    GraphNodes.prototype.clicked = function (d) {
        __WEBPACK_IMPORTED_MODULE_0_d3__["m" /* select */]('.focus_node').remove();
        // TODO: wire up 'freeze' button
        // const input = document.getElementById('freeze-in');
        // const isChecked = input.checked;
        // if (isChecked) {
        //  infobox.display_info(d);
        // } else {
        this.simulation.stop();
        // remove the oldest links and nodes
        var stop_layer = this.graphViz.graphLayers.depth() - 1;
        this.graphRoot.selectAll('.old_node' + stop_layer).remove();
        this.graphRoot.selectAll('.old_edge' + stop_layer).remove();
        this.graphRoot.selectAll('.old_edgepath' + stop_layer).remove();
        this.graphRoot.selectAll('.old_edgelabel' + stop_layer).remove();
        this.graphViz.displayInfo(d);
        this.graphViz.loadRelatedNodes(d);
        console.log('node clicked');
    };
    GraphNodes.prototype.pinIt = function (elem, data) {
        var _this = this;
        __WEBPACK_IMPORTED_MODULE_0_d3__["b" /* event */].stopPropagation();
        var node_pin = __WEBPACK_IMPORTED_MODULE_0_d3__["m" /* select */](elem);
        var pinned_node = __WEBPACK_IMPORTED_MODULE_0_d3__["m" /* select */](elem.parentNode);
        if (!pinned_node.empty() && pinned_node.classed('active_node')) {
            if (!pinned_node.classed('pinned')) {
                pinned_node.classed('pinned', true);
                console.log('Pinned!');
                node_pin.attr('fill', '#000');
                pinned_node.moveToFront();
            }
            else {
                pinned_node.classed('pinned', false);
                console.log('Unpinned!');
                node_pin.attr('fill', function () { return _this.getNodeColor(data); });
            }
        }
    };
    GraphNodes.prototype.colorize = function (prop_name) {
        var _this = this;
        // Color the nodes according the value of the property 'prop_name'
        var node_code_color = null;
        var value_list = __WEBPACK_IMPORTED_MODULE_0_d3__["n" /* selectAll */]('.node').data();
        if (prop_name === 'none') {
            __WEBPACK_IMPORTED_MODULE_0_d3__["n" /* selectAll */]('.base_circle').style('fill', function (d) {
                return _this.getNodeColor(d);
            });
            __WEBPACK_IMPORTED_MODULE_0_d3__["n" /* selectAll */]('.Pin').style('fill', function (d) {
                return _this.getNodeColor(d);
            });
        }
        else if (prop_name === 'label') {
            var value_set = new Set(value_list.map(function (d) {
                return d.label;
            }));
            node_code_color = __WEBPACK_IMPORTED_MODULE_0_d3__["k" /* scaleOrdinal */]().domain(value_set).range(__WEBPACK_IMPORTED_MODULE_0_d3__["j" /* range */](0, value_set.size));
            __WEBPACK_IMPORTED_MODULE_0_d3__["n" /* selectAll */]('.base_circle').style('fill', function (d) {
                return _this.config.colorPalette(node_code_color(d.label));
            });
            __WEBPACK_IMPORTED_MODULE_0_d3__["n" /* selectAll */]('.Pin').style('fill', function (d) {
                return _this.config.colorPalette(node_code_color(d.label));
            });
        }
        else {
            var value_set = new Set(value_list.map(function (d) {
                if (typeof d.properties[prop_name] !== 'undefined') {
                    return d.properties[prop_name][0].value;
                }
            }));
            node_code_color = __WEBPACK_IMPORTED_MODULE_0_d3__["k" /* scaleOrdinal */]().domain(value_set).range(__WEBPACK_IMPORTED_MODULE_0_d3__["j" /* range */](0, value_set.size));
            __WEBPACK_IMPORTED_MODULE_0_d3__["n" /* selectAll */]('.base_circle').style('fill', function (d) {
                if (typeof d.properties[prop_name] !== 'undefined') {
                    return _this.config.colorPalette(node_code_color(d.properties[prop_name][0].value));
                }
                return _this.getNodeColor(d);
            });
            __WEBPACK_IMPORTED_MODULE_0_d3__["n" /* selectAll */]('.Pin').style('fill', function (d) {
                if (typeof d.properties[prop_name] !== 'undefined') {
                    return _this.config.colorPalette(node_code_color(d.properties[prop_name][0].value));
                }
                return _this.getNodeColor(d);
            });
        }
    };
    GraphNodes.prototype.getNodeSize = function (d) {
        if ('size' in d) {
            return d.size;
        }
        else {
            return this.config.default_node_size;
        }
    };
    GraphNodes.prototype.getNodeStrokeWidth = function (d) {
        if ('stroke_width' in d) {
            return d.stroke_width;
        }
        else {
            return this.config.default_stroke_width;
        }
    };
    GraphNodes.prototype.getNodeColor = function (d) {
        return this.config.default_node_color;
        /*
        if (colored_prop !== 'none') {
          if (colored_prop === 'label') {
            return this.color_palette(node_code_color(d.label));
          } else if (typeof d.properties[colored_prop] !== 'undefined') {
            if (this.graphSONFormat === GraphsonFormat.GraphSON3) {
              return this.color_palette(node_code_color(d.properties[colored_prop]['summary']));
            } else {
              return this.color_palette(node_code_color(d.properties[colored_prop][0].value));
            }
          } else if ('color' in d.properties) {
            return d.properties.color[0].value;
          } else {
            return this.default_node_color;
          }
        } else if ('color' in d.properties) {
          return d.properties.color[0].value;
        } else {
          return this.default_node_color;
        } */
    };
    GraphNodes.prototype.getNodeTitle = function (d) {
        if ('node_title' in d) {
            return d.node_title;
        }
        else {
            return d.label;
        }
    };
    GraphNodes.prototype.getNodeText = function (d) {
        if ('node_text' in d) {
            return d.node_text;
        }
        else {
            return d.id;
        }
    };
    GraphNodes.prototype.getNodeSubText = function (d) {
        if ('node_subtext' in d) {
            return d.node_subtext;
        }
        else {
            return d.label;
        }
    };
    return GraphNodes;
}());



/***/ }),

/***/ "../../../../../src/app/modules/graphexp/graphViz/graphShapes.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GraphShapes; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3__ = __webpack_require__("../../../../d3/index.js");

var GraphShapes = /** @class */ (function () {
    function GraphShapes(graphSONFormat, graph_viz, graphexpService) {
        this.graphSONFormat = graphSONFormat;
        this.graph_viz = graph_viz;
        this.graphexpService = graphexpService;
        // https://github.com/wbkd/d3-extended
        __WEBPACK_IMPORTED_MODULE_0_d3__["o" /* selection */].prototype.moveToFront = function () {
            // move the selection to the front
            return this.each(function () {
                this.parentNode.appendChild(this);
            });
        };
        __WEBPACK_IMPORTED_MODULE_0_d3__["o" /* selection */].prototype.moveToBack = function () {
            // move the selection to the back
            return this.each(function () {
                var firstChild = this.parentNode.firstChild;
                if (firstChild) {
                    this.parentNode.insertBefore(this, firstChild);
                }
            });
        };
    }
    GraphShapes.prototype.decorate_old_elements = function (nb_layers) {
        var _loop_1 = function (k) {
            __WEBPACK_IMPORTED_MODULE_0_d3__["n" /* selectAll */]('.old_edge' + k)
                .style('opacity', function () {
                return 0.8 * (1 - k / nb_layers);
            });
            __WEBPACK_IMPORTED_MODULE_0_d3__["n" /* selectAll */]('.old_node' + k)
                .style('opacity', function () {
                return 0.8 * (1 - k / nb_layers);
            });
            __WEBPACK_IMPORTED_MODULE_0_d3__["n" /* selectAll */]('.old_edgelabel' + k)
                .style('opacity', function () {
                return 0.8 * (1 - k / nb_layers);
            });
        };
        // Decrease the opacity of nodes and edges when they get old
        for (var k = 0; k < nb_layers; k++) {
            _loop_1(k);
        }
        ;
    };
    GraphShapes.prototype.show_names = function (value) {
        var text_to_show = __WEBPACK_IMPORTED_MODULE_0_d3__["n" /* selectAll */]('.text_details');
        if (value) {
            text_to_show.style('visibility', 'visible');
        }
        else {
            text_to_show.style('visibility', 'hidden');
        }
    };
    return GraphShapes;
}());



/***/ }),

/***/ "../../../../../src/app/modules/graphexp/graphViz/graphViz.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GraphViz; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__graphLayers__ = __webpack_require__("../../../../../src/app/modules/graphexp/graphViz/graphLayers.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__graphShapes__ = __webpack_require__("../../../../../src/app/modules/graphexp/graphViz/graphShapes.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__graphexp_service__ = __webpack_require__("../../../../../src/app/modules/graphexp/graphexp.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__graphLinks__ = __webpack_require__("../../../../../src/app/modules/graphexp/graphViz/graphLinks.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__graphNodes__ = __webpack_require__("../../../../../src/app/modules/graphexp/graphViz/graphNodes.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_d3__ = __webpack_require__("../../../../d3/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_Observable__ = __webpack_require__("../../../../rxjs/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_BehaviorSubject__ = __webpack_require__("../../../../rxjs/BehaviorSubject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_BehaviorSubject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_rxjs_BehaviorSubject__);








var GraphViz = /** @class */ (function () {
    function GraphViz(graphexpService, _config) {
        this.graphexpService = graphexpService;
        this._config = _config;
        this._graphWidth = 0;
        this._graphHeight = 0;
        this._simulation = {};
        this.state = {
            shiftNodeDrag: false
        };
        this.selectedNode = new __WEBPACK_IMPORTED_MODULE_7_rxjs_BehaviorSubject__["BehaviorSubject"](null);
        this.createNodeEvent = new __WEBPACK_IMPORTED_MODULE_7_rxjs_BehaviorSubject__["BehaviorSubject"](null);
    }
    Object.defineProperty(GraphViz.prototype, "config", {
        get: function () {
            return this._config;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GraphViz.prototype, "simulation", {
        get: function () {
            return this._simulation;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GraphViz.prototype, "graphRoot", {
        get: function () {
            return this._graphRoot;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GraphViz.prototype, "nodeModels", {
        get: function () {
            return this._graphLayers.nodes;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GraphViz.prototype, "graphLayers", {
        get: function () {
            return this._graphLayers;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GraphViz.prototype, "graphNodes", {
        get: function () {
            return this._graphNodes;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GraphViz.prototype, "linkModels", {
        get: function () {
            return this._graphLayers._Links;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GraphViz.prototype, "selectLinks", {
        get: function () {
            var all_links = this.graphRoot.selectAll('.active_edge')
                .data(this.linkModels, function (n) {
                return n.id;
            });
            return all_links;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GraphViz.prototype, "selectEdgePaths", {
        get: function () {
            var all_edgepaths = this.graphRoot.selectAll('.active_edgepath')
                .data(this.linkModels, function (n) {
                return n.id;
            });
            return all_edgepaths;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GraphViz.prototype, "selectEdgeLabels", {
        get: function () {
            var all_edgelabels = this.graphRoot.selectAll('.active_edgelabel')
                .data(this.linkModels, function (n) {
                return n.id;
            });
            return all_edgelabels;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GraphViz.prototype, "selectGraphNodes", {
        /**
        * get all active nodes in the graph
        */
        get: function () {
            // Existing active nodes
            var allNodes = this.graphRoot.selectAll('g').filter('.active_node')
                .data(this.nodeModels, function (n) {
                return n.id;
            });
            return allNodes;
        },
        enumerable: true,
        configurable: true
    });
    ///////////////////////////////////////
    // Remove force layout and data
    GraphViz.prototype.clear = function () {
        console.log(this._simulation);
        if (Object.keys(this._simulation).length !== 0) {
            this._simulation.stop();
            this._simulation.nodes([]);
            this._simulation.force('link').links([]);
        }
        this._graphRoot.selectAll('*').remove();
        this.nodeModels.length = 0, this.linkModels.length = 0;
        this._graphLayers.clear_old();
        this._simulation = {};
    };
    GraphViz.prototype.addzoom = function (svg) {
        var _this = this;
        // Add zoom to the svg object
        svg.append('rect')
            .attr('width', this._graphWidth).attr('height', this._graphHeight)
            .style('fill', 'none').style('pointer-events', 'all')
            .call(__WEBPACK_IMPORTED_MODULE_5_d3__["p" /* zoom */]().scaleExtent([1 / 2, 4]).on('zoom', function () {
            _this._graphRoot.attr('transform', __WEBPACK_IMPORTED_MODULE_5_d3__["b" /* event */].transform);
        }));
    };
    GraphViz.prototype.simulationStart = function (center_f) {
        var force_x, force_y;
        this.
            // Define the force applied to the nodes
            _simulation = __WEBPACK_IMPORTED_MODULE_5_d3__["f" /* forceSimulation */]()
            .force('charge', __WEBPACK_IMPORTED_MODULE_5_d3__["e" /* forceManyBody */]().strength(this._config.force_strength))
            .force('link', __WEBPACK_IMPORTED_MODULE_5_d3__["d" /* forceLink */]().strength(this._config.link_strength).id(function (d) {
            return d.id;
        }));
        if (center_f === 1) {
            force_y = this._config.force_x_strength;
            force_x = this._config.force_y_strength;
            this._simulation.force('center', __WEBPACK_IMPORTED_MODULE_5_d3__["c" /* forceCenter */](this._graphWidth / 2, this._graphHeight / 2));
        }
        else {
            force_y = 0;
            force_x = 0;
        }
        this._simulation.force('y', __WEBPACK_IMPORTED_MODULE_5_d3__["h" /* forceY */]().strength(function (d) {
            return force_y;
        }))
            .force('x', __WEBPACK_IMPORTED_MODULE_5_d3__["g" /* forceX */]().strength(function (d) {
            return force_x;
        }));
        return this._simulation;
    };
    GraphViz.prototype.refreshData = function (arrangedData, center_f, with_active_node) {
        var _this = this;
        // Main visualization function
        var svg_graph = this.graphRoot;
        this._graphLayers.push_layers();
        this._graphLayers.update_data(arrangedData);
        this._graphLinks.update(arrangedData);
        this._graphNodes.update(arrangedData);
        //////////////////////////////////
        // Additional clean up
        this._graphShapes.decorate_old_elements(this._graphLayers.depth());
        svg_graph.selectAll('g').filter('.pinned').moveToFront();
        this._graphLayers.remove_duplicates('.active_node', '.old_node');
        this._graphLayers.remove_duplicates('.active_edge', '.old_edge');
        this._graphLayers.remove_duplicates('.active_edgepath', '.old_edgepath');
        this._graphLayers.remove_duplicates('.active_edgelabel', '.old_edgelabel');
        // Force simulation simulation model and paramers Associate the simulation with the data
        this._simulation = this.simulationStart(center_f);
        this._simulation.nodes(this.nodeModels).on('tick', function () {
            _this._graphNodes.tick();
            _this._graphLinks.tick();
        });
        this._simulation.force('link').links(this.linkModels);
        this._simulation.alphaTarget(0);
    };
    GraphViz.prototype.displayShapeProperty = function (prop) {
        var prop_id = prop.id;
        var prop_id_nb = prop.getAttribute('id_nb');
        var text_base_offset = 10;
        var text_offset = 10;
        var prop_name = prop_id.slice(prop_id.indexOf('_') + 1);
        var item = prop_id.slice(0, prop_id.indexOf('_'));
        console.log(prop_id, item);
        if (__WEBPACK_IMPORTED_MODULE_5_d3__["m" /* select */]('#' + prop_id).property('checked')) {
            var elements_text = void 0;
            if (item === 'nodes') {
                elements_text = __WEBPACK_IMPORTED_MODULE_5_d3__["n" /* selectAll */]('.node');
            }
            else if (item === 'edges') {
                elements_text = __WEBPACK_IMPORTED_MODULE_5_d3__["n" /* selectAll */]('.edgelabel');
            }
            this.attachEnabledProperties(elements_text, prop_name, prop_id_nb, item);
        }
        else {
            if (item === 'nodes') {
                __WEBPACK_IMPORTED_MODULE_5_d3__["n" /* selectAll */]('.node').select('.' + prop_id).remove();
            }
            else if (item === 'edges') {
                __WEBPACK_IMPORTED_MODULE_5_d3__["n" /* selectAll */]('.edgelabel').select('.' + prop_id).remove();
            }
        }
    };
    GraphViz.prototype.attachEnabledProperties = function (graph_objects, prop_name, prop_id_nb, item) {
        var _this = this;
        var elements_text;
        var text_base_offset = 10;
        var text_offset = 10;
        var prop_id = item + '_' + prop_name;
        if (item === 'nodes') {
            elements_text = graph_objects.append('text').style('pointer-events', 'none');
        }
        else if (item === 'edges') {
            elements_text = graph_objects.append('textPath')
                .attr('class', 'edge_text')
                .attr('href', function (d, i) { return '#edgepath' + d.id; })
                .style('text-anchor', 'middle')
                .style('pointer-events', 'none')
                .attr('startOffset', '70%');
            prop_id_nb = prop_id_nb + 1;
        }
        else {
            console.log('Bad item name.');
            return 1;
        }
        elements_text.classed('prop_details', true).classed(prop_id, true)
            .attr('dy', function (d) {
            return _this._graphNodes.getNodeSize(d) + text_base_offset + text_offset * parseInt(prop_id_nb, 10);
        })
            .text(function (d) {
            return _this.getPropertyValue(d, prop_name, item);
        });
    };
    GraphViz.prototype.getPropertyValue = function (d, prop_name, item) {
        if (prop_name in d.properties) {
            if (item === 'nodes') {
                if (this._config.format === __WEBPACK_IMPORTED_MODULE_2__graphexp_service__["b" /* GraphsonFormat */].GraphSON3) {
                    return d.properties[prop_name]['summary'];
                }
                else if (this._config.format === __WEBPACK_IMPORTED_MODULE_2__graphexp_service__["b" /* GraphsonFormat */].GraphSON1) {
                    return d.properties[prop_name][0].value;
                }
            }
            else if (item === 'edges') {
                console.log(d.properties[prop_name]);
                return d.properties[prop_name];
            }
        }
        else {
            return '';
        }
    };
    GraphViz.prototype.colorize = function (data) {
        this._graphNodes.colorize(data);
    };
    GraphViz.prototype.displayInfo = function (data) {
        this.selectedNode.next(data);
    };
    GraphViz.prototype.loadRelatedNodes = function (d) {
        var _this = this;
        this.graphexpService.getRelatedNodes(d).then(function (arrangedData) {
            _this.refreshData(arrangedData, 1, null);
            _this.displayInfo(d);
        });
    };
    GraphViz.prototype.addSvgDefinitions = function (svg) {
        // define arrow markers for graph links
        var defs = svg.append('svg:defs');
        defs.append('svg:marker')
            .attr('id', 'end-arrow')
            .attr('viewBox', '0 -5 10 10')
            .attr('refX', '32')
            .attr('markerWidth', 5)
            .attr('markerHeight', 5)
            .attr('orient', 'auto')
            .append('svg:path')
            .attr('d', 'M0,-5L10,0L0,5');
        // define arrow markers for leading arrow
        defs.append('svg:marker')
            .attr('id', 'mark-end-arrow')
            .attr('viewBox', '0 -5 10 10')
            .attr('refX', 7)
            .attr('markerWidth', 5)
            .attr('markerHeight', 5)
            .attr('orient', 'auto')
            .append('svg:path')
            .attr('d', 'M0,-5L10,0L0,5');
    };
    GraphViz.prototype.init = function (label) {
        var _this = this;
        this._graphLayers = new __WEBPACK_IMPORTED_MODULE_0__graphLayers__["a" /* GraphLayers */](this);
        this._graphShapes = new __WEBPACK_IMPORTED_MODULE_1__graphShapes__["a" /* GraphShapes */](this._config.format, this, this.graphexpService);
        // GraphNodes class init
        this._graphNodes = new __WEBPACK_IMPORTED_MODULE_4__graphNodes__["a" /* GraphNodes */](this);
        this.connectionCreated = new __WEBPACK_IMPORTED_MODULE_6_rxjs_Observable__["Observable"](function (observer) {
            _this._graphNodes.connectionCreated.subscribe(function (val) {
                if (val != null) {
                    observer.next(val);
                    console.log("connection created: " + val.source.id + " -> " + val.target.id);
                }
            });
        });
        this._graphLinks = new __WEBPACK_IMPORTED_MODULE_3__graphLinks__["a" /* GraphLinks */](this);
        var svg = __WEBPACK_IMPORTED_MODULE_5_d3__["m" /* select */](label).select('svg');
        var width = +__WEBPACK_IMPORTED_MODULE_5_d3__["m" /* select */](label).node().getBoundingClientRect().width;
        var height = +__WEBPACK_IMPORTED_MODULE_5_d3__["m" /* select */](label).node().getBoundingClientRect().height;
        this._graphWidth = width;
        this._graphHeight = height;
        // displayed when dragging between nodes
        this.dragLine = svg.append('svg:path')
            .attr('class', 'link drag-line hidden')
            .attr('d', 'M0,0L0,0')
            .style('marker-end', 'url(#mark-end-arrow)');
        svg.attr('width', this._graphWidth).attr('height', this._graphHeight);
        this.addSvgDefinitions(svg);
        this.addzoom(svg);
        // Finally create a root g node for all the nodes/links
        this._graphRoot = svg.append('g');
    };
    return GraphViz;
}());



/***/ }),

/***/ "../../../../../src/app/modules/graphexp/graphexp.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".hidden {\r\n\tdisplay: none;\r\n}\r\n\r\n.sv-graphexp mat-sidenav-container {\r\n\twidth: 100%;\r\n}\r\n\r\n.sv-graphexp mat-sidenav {\r\n\tpadding: 1em;\r\n\twidth: 25em;\r\n}\r\n\r\n.sv-graphexp mat-divider {\r\n\tpadding: 5px 0;\r\n}\r\n\r\ndiv.sv-graphexp {\r\n\theight: 100%;\r\n}\r\n\r\n.sv-graphexp-content {\r\n\tpadding: 1em;\r\n\tposition: relative;\r\n\ttop: 0;\r\n\theight: 100%;\r\n}\r\n\r\n.sv-graphexp-left-bar {\r\n\tposition: absolute;\r\n\ttop: 0;\r\n\twidth: 10em;\r\n}\r\n\r\n.sv-graphexp-right-bar {\r\n\tposition: absolute;\r\n\ttop: 0;\r\n\tright: 0;\r\n\twidth: 10em;\r\n}\r\n\r\npath.drag-line {\r\n    fill: none;\r\n    stroke: #333;\r\n    stroke-width: 4px;\r\n    stroke-dasharray: 5 5;\r\n    cursor: default;\r\n}\r\n\r\n.edge {\r\n\tstroke: #999;\r\n\tstroke-opacity: 0.8;\r\n}\r\n\r\n.old_edge0 {\r\n\tstroke: #999;\r\n\tstroke-opacity: 0.6;\r\n}\r\n\r\n.node circle {\r\n\tstroke: #000;\r\n\tstroke-width: 1.5px;\r\n}\r\n\r\n.node text {\r\n\tfont: 10px sans-serif;\r\n}\r\n\r\n.node:hover circle {\r\n\tstroke-opacity: 0.6;\r\n}\r\n\r\n.pinned circle {\r\n\tstroke: #000;\r\n\tstroke-width: 1.5px;\r\n}\r\n\r\n.pinned text {\r\n\tfont: 10px sans-serif;\r\n}\r\n\r\n.pinned:hover circle {\r\n\tstroke-opacity: 0.6;\r\n}\r\n\r\n.old_node0 circle {\r\n\tstroke-opacity: 0.9;\r\n}\r\n\r\n.old_node0 text {\r\n\tfont: 10px sans-serif;\r\n\topacity: 0.9;\r\n\tcolor: #000; /* Fallback for older browsers */\r\n\tcolor: rgba(0, 0, 0, 0.5);\r\n}\r\n\r\n.cell {\r\n\tfill: none;\r\n\tpointer-events: all;\r\n}", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/modules/graphexp/graphexp.component.html":
/***/ (function(module, exports) {

module.exports = "<div fxLayout fxFlexFill class=\"content sv-graphexp\">\n\t<mat-sidenav-container fxFLex>\n\t\t<mat-sidenav #graphexpSideMenu position=\"end\" fxLayout=\"column\" fxLayoutGap=\"1.5em\">\n\t\t\t<button mat-mini-fab color=\"accent\" (click)=\"graphexpSideMenu.toggle()\">\n\t\t      <mat-icon>arrow_right</mat-icon>\n\t\t    </button>\n\t\t    <div fxLayout fxLayoutGap=\"1em\">\n\t\t    \t<button mat-raised-button (click)=\"getGraphInfo()\">\n\t\t    \t\tRefresh<mat-icon>refresh</mat-icon>\n\t\t    \t</button>\n\t\t    \t<button mat-raised-button (click)=\"openNodeEditDialog()\">\n\t\t\t\t\tCreate<mat-icon>add</mat-icon>\n\t\t\t\t</button>\n\t\t    \t<span fxFlex></span>\n\t\t\t\t<button mat-raised-button (click)=\"clearGraph()\">\n\t\t\t\t\tClear<mat-icon>clear</mat-icon>\n\t\t\t\t</button>\n\t\t    </div>\n\t\t    <mat-checkbox [(ngModel)]=\"showGraphInfo\">Show Graph Info</mat-checkbox>\n\t\t    <mat-checkbox>Show Selection Properties</mat-checkbox>\n\t\t    <mat-checkbox (click)=\"showNames()\">Show Labels</mat-checkbox>\n\t\t    <mat-checkbox>Freeze Graph</mat-checkbox>\n\t\t\t<section>\n\t\t\t\t<div fxLayout>\n\t\t\t\t\t<label>Visible Layers</label>\n\t\t    \t\t<mat-slider min=\"1\" max=\"5\" [(ngModel)]=\"numberOfLayers\" thumbLabel tickInterval=\"1\"></mat-slider>\n\t\t\t\t</div>\n\t\t    </section>\t\t    \n\t\t</mat-sidenav>\n\t\t<div fxLayout=\"column\" fxFlexFill>\n\t\t\t<mat-toolbar fxLayoutGap=\"1em\">\n\t\t\t    <label>Search</label>\n\t\t\t\t<mat-form-field>\n\t\t\t\t\t<mat-select [(ngModel)]=\"searchField\">\n\t\t\t\t\t\t<mat-optgroup label=\"Node\">\n\t\t\t\t\t\t\t<mat-option value=\"id\">id</mat-option>\n\t\t\t\t\t\t\t<mat-option *ngFor=\"let item of nodeProperties | async\" [value]=\"item\">{{item}}</mat-option>\n\t\t\t\t\t\t</mat-optgroup>\n\t\t\t\t\t\t<mat-optgroup label=\"Edge\">\n\t\t\t\t\t\t\t<mat-option value=\"id\">id</mat-option>\n\t\t\t\t\t\t\t<mat-option *ngFor=\"let item of edgeProperties | async\" [value]=\"item\">{{item}}</mat-option>\n\t\t\t\t\t\t</mat-optgroup>\n\t\t\t\t\t</mat-select>\n\t\t\t\t</mat-form-field>\n\t\t\t\t<mat-input-container>\n\t\t\t\t\t<input matInput name=\"searchValue\" [(ngModel)]=\"searchValue\" placeholder=\"Id/Keyword\">\n\t\t\t\t</mat-input-container>\n\t\t\t\t<button (click)=\"search()\" mat-mini-fab>\n\t\t\t\t\t<mat-icon>search</mat-icon>\n\t\t\t\t</button>\n\t\t\t\t<button mat-mini-fab (click)=\"openNodeEditDialog()\">\n\t\t\t\t\t<mat-icon>add</mat-icon>\n\t\t\t\t</button>\n\t\t\t    <span fxFlex></span>\n\t\t\t\t<button mat-mini-fab (click)=\"graphexpSideMenu.toggle()\">\n\t\t\t      <mat-icon>menu</mat-icon>\n\t\t\t    </button>\n\t\t\t</mat-toolbar>\n\t\t\t\n\t\t\t<div class=\"sv-graphexp-content\">\n\t\t\t\t<div class=\"sv-graphexp-left-bar\">\n\t\t\t\t\t<div *ngIf=\"showGraphInfo\"><br/>\n\t\t\t\t\t\t<strong>Node Names</strong>\n\t\t\t\t\t\t<div *ngFor=\"let item of nodeNames | async\">\n\t\t\t\t\t\t\t{{item.key}}: {{item.value}}\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class=\"sv-graphexp-right-bar\">\n\t\t\t\t\t<strong>Selected Node</strong>\n\t\t\t\t\t\t<div *ngIf=\"selectedNode\">\n\t\t\t\t\t\t\t<div>Label: {{selectedNode.label}}</div>\n\t\t\t\t\t\t\t<div>Type: {{selectedNode.type}}</div>\n\t\t\t\t\t\t\t<div *ngFor=\"let prop of getFlattenedNodeProperties(selectedNode)\">\n\t\t\t\t\t\t\t\t<div>{{prop.name}}: {{prop.value}}</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t\n\t\t\t\t<div class=\"sv-graphexp\" id=\"sv_graphexp\">\n\t\t\t\t\t<svg></svg>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t</mat-sidenav-container>\n</div>\n\n"

/***/ }),

/***/ "../../../../../src/app/modules/graphexp/graphexp.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GraphexpComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__graphViz_graphConfig__ = __webpack_require__("../../../../../src/app/modules/graphexp/graphViz/graphConfig.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__graphViz_graphViz__ = __webpack_require__("../../../../../src/app/modules/graphexp/graphViz/graphViz.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__graphexp_service__ = __webpack_require__("../../../../../src/app/modules/graphexp/graphexp.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__link_edit_link_edit_component__ = __webpack_require__("../../../../../src/app/modules/graphexp/link-edit/link-edit.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__node_edit_node_edit_component__ = __webpack_require__("../../../../../src/app/modules/graphexp/node-edit/node-edit.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__nodes_gremlinLink__ = __webpack_require__("../../../../../src/app/modules/graphexp/nodes/gremlinLink.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__nodes_gremlinNode__ = __webpack_require__("../../../../../src/app/modules/graphexp/nodes/gremlinNode.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var GraphexpComponent = /** @class */ (function () {
    function GraphexpComponent(dialog) {
        this.dialog = dialog;
        this.searchValue = '';
        this.searchField = 'id';
        this.numberOfLayers = 3;
        this.showGraphInfo = true;
        this.newNode = {};
    }
    Object.defineProperty(GraphexpComponent.prototype, "selectedNode", {
        get: function () {
            if (this.graphViz && this.graphViz.selectedNode && this.graphViz.selectedNode.value) {
                return this.graphViz.selectedNode.value;
            }
            else {
                return null;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GraphexpComponent.prototype, "nodeNames", {
        get: function () {
            return this.graphexpService.nodeNames;
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(GraphexpComponent.prototype, "nodeProperties", {
        get: function () {
            return this.graphexpService.nodeProperties;
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(GraphexpComponent.prototype, "edgeProperties", {
        get: function () {
            return this.graphexpService.edgeProperties;
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(GraphexpComponent.prototype, "enableEdit", {
        get: function () {
            return (this.graphConfig && this.graphConfig.enableEdit);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GraphexpComponent.prototype, "nodeLabels", {
        get: function () {
            return this.graphConfig.nodeLabels;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GraphexpComponent.prototype, "linkLabels", {
        get: function () {
            return this.graphConfig.linkLabels;
        },
        enumerable: true,
        configurable: true
    });
    GraphexpComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (!this.graphConfig) {
            this.graphConfig = new __WEBPACK_IMPORTED_MODULE_0__graphViz_graphConfig__["a" /* GraphConfig */]();
        }
        this.graphViz = new __WEBPACK_IMPORTED_MODULE_1__graphViz_graphViz__["a" /* GraphViz */](this.graphexpService, this.graphConfig);
        setTimeout(function () {
            _this.graphViz.init('#sv_graphexp');
            _this.graphexpService.queryGraphInfo();
            _this.graphViz.connectionCreated.subscribe(function (val) {
                console.log("GraphexpComponent#ngAfterViewInit: connection created " + val);
                var gremlinLink = new __WEBPACK_IMPORTED_MODULE_5__nodes_gremlinLink__["a" /* GremlinLink */]();
                gremlinLink.source = val.source.id;
                gremlinLink.target = val.target.id;
                _this.openLinkEditDialog(gremlinLink);
            });
            _this.graphViz.createNodeEvent.subscribe(function (d3Node) {
                if (d3Node === null) {
                    return;
                }
                var gremlinNode = new __WEBPACK_IMPORTED_MODULE_6__nodes_gremlinNode__["a" /* GremlinNode */]();
                _this.openNodeEditDialog(gremlinNode);
            });
        });
    };
    GraphexpComponent.prototype.openLinkEditDialog = function (item) {
        var _this = this;
        var dialogRef = this.dialog.open(__WEBPACK_IMPORTED_MODULE_3__link_edit_link_edit_component__["a" /* LinkEditComponent */], {
            width: '30em',
            data: { labels: this.linkLabels, item: item }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log('The dialog was closed');
            if (result) {
                _this.createLink(result);
            }
        });
    };
    GraphexpComponent.prototype.openNodeEditDialog = function (item) {
        var _this = this;
        item = item || new __WEBPACK_IMPORTED_MODULE_6__nodes_gremlinNode__["a" /* GremlinNode */]();
        var dialogRef = this.dialog.open(__WEBPACK_IMPORTED_MODULE_4__node_edit_node_edit_component__["a" /* NodeEditComponent */], {
            width: '30em',
            data: { labels: this.nodeLabels, item: item }
        });
        dialogRef.afterClosed().subscribe(function (result) {
            console.log('The dialog was closed');
            if (result) {
                _this.createNode(result);
            }
        });
    };
    GraphexpComponent.prototype.createLink = function (data) {
        this.graphexpService.createLink(data).then(function (tinkerNode) {
            console.log(data);
        }, function (err) { console.error(err); });
    };
    GraphexpComponent.prototype.createNode = function (data) {
        this.graphexpService.createNode(data.label, data.properties).then(function (tinkerNode) {
            console.log(data);
        }, function (err) { console.error(err); });
    };
    GraphexpComponent.prototype.search = function () {
        var _this = this;
        console.log("searching field: " + this.searchField + ", value: " + this.searchValue);
        this.graphexpService.queryNodes(this.searchField, this.searchValue).then(function (data) {
            _this.graphViz.refreshData(data, 1, null);
        }).catch(function (err) {
            console.error(err);
        });
    };
    GraphexpComponent.prototype.getFlattenedNodeProperties = function (node) {
        var props = [];
        for (var _i = 0, _a = Object.keys(node.properties); _i < _a.length; _i++) {
            var prop = _a[_i];
            var valArray = node.properties[prop];
            var val = valArray[0]['value'];
            props.push({
                name: prop,
                value: val
            });
        }
        return props;
    };
    GraphexpComponent.prototype.showNames = function () {
    };
    GraphexpComponent.prototype.setNumberOfLayers = function () {
        this.graphConfig.numberOfLayers = this.numberOfLayers;
    };
    GraphexpComponent.prototype.clearGraph = function () {
        this.graphViz.clear();
    };
    GraphexpComponent.prototype.toggleGraphInfo = function () {
        this.showGraphInfo = !this.showGraphInfo;
    };
    GraphexpComponent.prototype.getGraphInfo = function () {
        this.graphexpService.queryGraphInfo();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_7__angular_core__["F" /* Input */])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2__graphexp_service__["a" /* GraphexpService */])
    ], GraphexpComponent.prototype, "graphexpService", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_7__angular_core__["F" /* Input */])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__graphViz_graphConfig__["a" /* GraphConfig */])
    ], GraphexpComponent.prototype, "graphConfig", void 0);
    GraphexpComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_7__angular_core__["n" /* Component */])({
            selector: 'sv-graphexp',
            template: __webpack_require__("../../../../../src/app/modules/graphexp/graphexp.component.html"),
            styles: [__webpack_require__("../../../../../src/app/modules/graphexp/graphexp.component.css")],
            encapsulation: __WEBPACK_IMPORTED_MODULE_7__angular_core__["_15" /* ViewEncapsulation */].None
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_8__angular_material__["d" /* MatDialog */]])
    ], GraphexpComponent);
    return GraphexpComponent;
}());



/***/ }),

/***/ "../../../../../src/app/modules/graphexp/graphexp.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GraphexpModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__graphexp_service__ = __webpack_require__("../../../../../src/app/modules/graphexp/graphexp.service.ts");
/* unused harmony reexport GraphexpService */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__graphViz_graphConfig__ = __webpack_require__("../../../../../src/app/modules/graphexp/graphViz/graphConfig.ts");
/* unused harmony reexport GraphConfig */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common__ = __webpack_require__("../../../common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__graphexp_component__ = __webpack_require__("../../../../../src/app/modules/graphexp/graphexp.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__angular_flex_layout__ = __webpack_require__("../../../flex-layout/esm5/flex-layout.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__node_edit_node_edit_component__ = __webpack_require__("../../../../../src/app/modules/graphexp/node-edit/node-edit.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__link_edit_link_edit_component__ = __webpack_require__("../../../../../src/app/modules/graphexp/link-edit/link-edit.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};










var GraphexpModule = /** @class */ (function () {
    function GraphexpModule() {
    }
    GraphexpModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["K" /* NgModule */])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_3__angular_common__["b" /* CommonModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_forms__["c" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_6__angular_material__["l" /* MatSidenavModule */],
                __WEBPACK_IMPORTED_MODULE_6__angular_material__["b" /* MatButtonModule */],
                __WEBPACK_IMPORTED_MODULE_6__angular_material__["h" /* MatIconModule */],
                __WEBPACK_IMPORTED_MODULE_6__angular_material__["g" /* MatFormFieldModule */],
                __WEBPACK_IMPORTED_MODULE_6__angular_material__["i" /* MatInputModule */],
                __WEBPACK_IMPORTED_MODULE_6__angular_material__["j" /* MatListModule */],
                __WEBPACK_IMPORTED_MODULE_6__angular_material__["k" /* MatSelectModule */],
                __WEBPACK_IMPORTED_MODULE_6__angular_material__["c" /* MatCheckboxModule */],
                __WEBPACK_IMPORTED_MODULE_6__angular_material__["n" /* MatToolbarModule */],
                __WEBPACK_IMPORTED_MODULE_6__angular_material__["m" /* MatSliderModule */],
                __WEBPACK_IMPORTED_MODULE_6__angular_material__["e" /* MatDialogModule */],
                __WEBPACK_IMPORTED_MODULE_7__angular_flex_layout__["a" /* FlexLayoutModule */]
            ],
            declarations: [__WEBPACK_IMPORTED_MODULE_4__graphexp_component__["a" /* GraphexpComponent */], __WEBPACK_IMPORTED_MODULE_8__node_edit_node_edit_component__["a" /* NodeEditComponent */], __WEBPACK_IMPORTED_MODULE_9__link_edit_link_edit_component__["a" /* LinkEditComponent */]],
            entryComponents: [__WEBPACK_IMPORTED_MODULE_8__node_edit_node_edit_component__["a" /* NodeEditComponent */], __WEBPACK_IMPORTED_MODULE_9__link_edit_link_edit_component__["a" /* LinkEditComponent */]],
            providers: [],
            exports: [
                __WEBPACK_IMPORTED_MODULE_4__graphexp_component__["a" /* GraphexpComponent */],
                __WEBPACK_IMPORTED_MODULE_3__angular_common__["b" /* CommonModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_forms__["c" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_6__angular_material__["l" /* MatSidenavModule */],
                __WEBPACK_IMPORTED_MODULE_6__angular_material__["b" /* MatButtonModule */],
                __WEBPACK_IMPORTED_MODULE_6__angular_material__["h" /* MatIconModule */],
                __WEBPACK_IMPORTED_MODULE_6__angular_material__["g" /* MatFormFieldModule */],
                __WEBPACK_IMPORTED_MODULE_6__angular_material__["i" /* MatInputModule */],
                __WEBPACK_IMPORTED_MODULE_6__angular_material__["j" /* MatListModule */],
                __WEBPACK_IMPORTED_MODULE_6__angular_material__["k" /* MatSelectModule */],
                __WEBPACK_IMPORTED_MODULE_6__angular_material__["c" /* MatCheckboxModule */],
                __WEBPACK_IMPORTED_MODULE_6__angular_material__["n" /* MatToolbarModule */],
                __WEBPACK_IMPORTED_MODULE_6__angular_material__["m" /* MatSliderModule */],
                __WEBPACK_IMPORTED_MODULE_6__angular_material__["e" /* MatDialogModule */],
                __WEBPACK_IMPORTED_MODULE_7__angular_flex_layout__["a" /* FlexLayoutModule */]
            ]
        })
    ], GraphexpModule);
    return GraphexpModule;
}());



/***/ }),

/***/ "../../../../../src/app/modules/graphexp/graphexp.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return GraphsonFormat; });
/* unused harmony export ArrangedGraphData */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return KV; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GraphexpService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__savantly_gremlin_js__ = __webpack_require__("../../../../@savantly/gremlin-js/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject__ = __webpack_require__("../../../../rxjs/BehaviorSubject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var GraphsonFormat;
(function (GraphsonFormat) {
    GraphsonFormat[GraphsonFormat["GraphSON1"] = 1] = "GraphSON1";
    GraphsonFormat[GraphsonFormat["GraphSON2"] = 2] = "GraphSON2";
    GraphsonFormat[GraphsonFormat["GraphSON3"] = 3] = "GraphSON3";
})(GraphsonFormat || (GraphsonFormat = {}));
var ArrangedGraphData = /** @class */ (function () {
    function ArrangedGraphData() {
    }
    return ArrangedGraphData;
}());

var KV = /** @class */ (function () {
    function KV() {
    }
    return KV;
}());

var GraphexpService = /** @class */ (function () {
    function GraphexpService(options) {
        this.COMMUNICATION_METHOD = GraphsonFormat.GraphSON3;
        this.graphInfoData = new __WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject__["BehaviorSubject"]({});
        this.nodeNames = new __WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject__["BehaviorSubject"]([]);
        this.nodeProperties = new __WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject__["BehaviorSubject"]([]);
        this.edgeProperties = new __WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject__["BehaviorSubject"]([]);
        this.node_limit_per_request = 50;
        this.gremlinService = new __WEBPACK_IMPORTED_MODULE_1__savantly_gremlin_js__["b" /* GremlinService */](options);
    }
    GraphexpService.prototype.queryGraphInfo = function () {
        var _this = this;
        var gremlin_query_nodes = 'nodes = g.V().groupCount().by(label);';
        var gremlin_query_edges = 'edges = g.E().groupCount().by(label);';
        var gremlin_query_nodes_prop = 'nodesprop = g.V().valueMap().select(keys).groupCount();';
        var gremlin_query_edges_prop = 'edgesprop = g.E().valueMap().select(keys).groupCount();';
        var gremlinQuery = gremlin_query_nodes + gremlin_query_nodes_prop
            + gremlin_query_edges + gremlin_query_edges_prop
            + '[nodes.toList(),nodesprop.toList(),edges.toList(),edgesprop.toList()]';
        this.executeQuery(gremlinQuery).then(function (response) {
            _this.handleGraphInfo(response.data);
        });
    };
    GraphexpService.prototype.queryNodes = function (field, value) {
        var _this = this;
        var input_string = value;
        var input_field = field;
        var filtered_string = input_string; // You may add .replace(/\W+/g, ''); to refuse any character not in the alphabet
        if (filtered_string.length > 50) {
            filtered_string = filtered_string.substring(0, 50); // limit string length
        }
        // Translate to Gremlin query
        var gremlin_query_nodes = null;
        var gremlin_query_edges = null;
        var gremlin_query = null;
        if (input_string === '') {
            gremlin_query_nodes = "nodes = g.V().limit(" + this.node_limit_per_request + ")";
            gremlin_query_edges =
                "edges = g.V().limit(" + this.node_limit_per_request + ").aggregate('node').outE().as('edge').inV().where(within('node')).select('edge')";
            gremlin_query = gremlin_query_nodes + '\n' + gremlin_query_edges + '\n' + '[nodes.toList(),edges.toList()]';
        }
        else {
            var has_str = "has('" + input_field + "', '" + filtered_string + "')";
            if (this.isInt(input_string)) {
                has_str = "has('" + input_field + "', " + filtered_string + ")";
            }
            gremlin_query = 'g.V().' + has_str;
            gremlin_query_nodes = 'nodes = g.V().' + has_str;
            gremlin_query_edges = 'edges = g.V().' + has_str
                + ".aggregate('node').outE().as('edge').inV().where(within('node')).select('edge')";
            gremlin_query = gremlin_query_nodes + '\n' + gremlin_query_edges + '\n' + '[nodes.toList(),edges.toList()]';
        }
        console.log(gremlin_query);
        return new Promise(function (resolve, reject) {
            _this.executeQuery(gremlin_query).then(function (response) {
                resolve(_this.arrangeData(response.data));
            }, function (error) { reject(error); });
        });
    };
    GraphexpService.prototype.getRelatedNodes = function (d) {
        var _this = this;
        var id = d.id;
        if (isNaN(id)) {
            id = "'" + id + "'";
        }
        var gremlin_query_nodes = "nodes = g.V(" + id + ").as('node').both().as('node').select(all,'node').inject(g.V(" + id + ")).unfold()";
        var gremlin_query_edges = "edges = g.V(" + id + ").bothE()";
        var gremlin_query = gremlin_query_nodes + "\n " + gremlin_query_edges + "\n[nodes.toList(),edges.toList()]";
        return new Promise(function (resolve, reject) {
            _this.executeQuery(gremlin_query).then(function (response) {
                resolve(_this.arrangeData(response.data));
            }, function (error) { reject(error); });
        });
    };
    GraphexpService.prototype.createNode = function (label, properties) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            var propString = '';
            properties.forEach(function (kv) {
                propString += ", '" + kv.key + "', '" + kv.value + "'";
            });
            var gremlin = "vertex = graph.addVertex(label, '" + label + "'" + propString + ")";
            console.log("executing query: " + gremlin);
            _this.executeQuery(gremlin).then(function (response) {
                resolve(response.data);
            }, function (error) {
                console.error(error);
                reject(error);
            });
        });
        return promise;
    };
    GraphexpService.prototype.createLink = function (item) {
        var _this = this;
        var properties = item.properties;
        var promise = new Promise(function (resolve, reject) {
            var gremlin = "edge = g.V(" + item.source + ").next().addEdge('" + item.label + "',g.V(" + item.target + ").next());";
            console.log("executing query: " + gremlin);
            _this.executeQuery(gremlin).then(function (response) {
                resolve(response.data);
            }, function (error) {
                console.error(error);
                reject(error);
            });
        });
        return promise;
    };
    GraphexpService.prototype.executeQuery = function (gremlin, bindings) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            var query = _this.gremlinService.createQuery(gremlin, bindings);
            query.onComplete = function (response) {
                resolve(response);
            };
            _this.gremlinService.sendMessage(query);
        });
        return promise;
    };
    GraphexpService.prototype.handleGraphInfo = function (data) {
        if (this.COMMUNICATION_METHOD === GraphsonFormat.GraphSON3) {
            data = this.graphson3to1(data);
        }
        var nodeNames = [];
        data[0].map(function (nameGroup) {
            for (var _i = 0, _a = Object.keys(nameGroup); _i < _a.length; _i++) {
                var nameItem = _a[_i];
                nodeNames.push({ key: nameItem, value: nameGroup[nameItem] });
            }
        });
        this.nodeNames.next(nodeNames);
        this.graphInfoData.next(data);
        this.nodeProperties.next(this.make_properties_list(data[1][0]));
        this.edgeProperties.next(this.make_properties_list(data[3][0]));
    };
    GraphexpService.prototype.graphson3to1 = function (data) {
        // Convert data from graphSON v2 format to graphSON v1
        if (!(Array.isArray(data) || ((typeof data === 'object') && (data !== null)))) {
            return data;
        }
        if ('@type' in data) {
            if (data['@type'] === 'g:List') {
                data = data['@value'];
                return this.graphson3to1(data);
            }
            else if (data['@type'] === 'g:Set') {
                data = data['@value'];
                return data;
            }
            else if (data['@type'] === 'g:Map') {
                var data_tmp = {};
                for (var i = 0; i < data['@value'].length; i += 2) {
                    var data_key = data['@value'][i];
                    if ((typeof data_key === 'object') && (data_key !== null)) {
                        data_key = this.graphson3to1(data_key);
                    }
                    if (Array.isArray(data_key)) {
                        data_key = JSON.stringify(data_key).replace(/\'/g, ' ');
                    }
                    data_tmp[data_key] = this.graphson3to1(data['@value'][i + 1]);
                }
                data = data_tmp;
                return data;
            }
            else {
                data = data['@value'];
                if ((typeof data === 'object') && (data !== null)) {
                    data = this.graphson3to1(data);
                }
                return data;
            }
        }
        else if (Array.isArray(data) || ((typeof data === 'object') && (data !== null))) {
            for (var _i = 0, _a = Object.keys(data); _i < _a.length; _i++) {
                var key = _a[_i];
                data[key] = this.graphson3to1(data[key]);
            }
            return data;
        }
        return data;
    };
    GraphexpService.prototype.arrangeData = function (data) {
        if (this.COMMUNICATION_METHOD === GraphsonFormat.GraphSON3) {
            data = this.graphson3to1(data);
            return this.arrange_datav3(data);
        }
        else {
            return this.arrange_datav2(data);
        }
    };
    GraphexpService.prototype.arrange_datav3 = function (data) {
        var _this = this;
        // Extract node and edges from the data returned for 'search' and 'click' request
        // Create the graph object
        var nodes = [], links = [];
        for (var _i = 0, _a = Object.keys(data); _i < _a.length; _i++) {
            var key = _a[_i];
            data[key].forEach(function (item) {
                if (!('inV' in item) && _this.idIndex(nodes, item.id) == null) {
                    item.type = 'vertex';
                    nodes.push(_this.extract_infov3(item));
                }
                if (('inV' in item) && _this.idIndex(links, item.id) == null) {
                    item.type = 'edge';
                    links.push(_this.extract_infov3(item));
                }
            });
        }
        return { nodes: nodes, links: links };
    };
    GraphexpService.prototype.arrange_datav2 = function (data) {
        // Extract node and edges from the data returned for 'search' and 'click' request
        // Create the graph object
        var nodes = [], links = [];
        for (var _i = 0, _a = Object.keys(data); _i < _a.length; _i++) {
            var key = _a[_i];
            data[key].forEach(function (item) {
                if (item.type === 'vertex' && this.idIndex(nodes, item.id) === null) {
                    nodes.push(this.extract_infov2(item));
                }
                if (item.type === 'edge' && this.idIndex(links, item.id) == null) {
                    links.push(this.extract_infov2(item));
                }
            });
        }
        return { nodes: nodes, links: links };
    };
    GraphexpService.prototype.extract_infov2 = function (data) {
        var data_dic = { id: data.id, label: data.label, type: data.type, properties: {}, source: null, target: null };
        var prop_dic = data.properties;
        for (var key in prop_dic) {
            if (prop_dic.hasOwnProperty(key)) {
                data_dic.properties[key] = prop_dic[key];
            }
        }
        if (data.type === 'edge') {
            data_dic.source = data.outV;
            data_dic.target = data.inV;
        }
        return data_dic;
    };
    GraphexpService.prototype.extract_infov3 = function (data) {
        var data_dic = { id: data.id, label: data.label, type: data.type, properties: {}, source: null, target: null };
        var prop_dic = data.properties;
        for (var key in prop_dic) {
            if (prop_dic.hasOwnProperty(key)) {
                var property = null;
                if (data.type === 'vertex') {
                    property = prop_dic[key];
                    property['summary'] = this.get_vertex_prop_in_list(prop_dic[key]).toString();
                }
                else {
                    property = prop_dic[key]['value'];
                }
                data_dic.properties[key] = property;
            }
        }
        if (data.type === 'edge') {
            data_dic.source = data.outV;
            data_dic.target = data.inV;
        }
        return data_dic;
    };
    GraphexpService.prototype.get_vertex_prop_in_list = function (vertexProperty) {
        var prop_value_list = [];
        for (var _i = 0, _a = Object.keys(vertexProperty); _i < _a.length; _i++) {
            var key = _a[_i];
            prop_value_list.push(vertexProperty[key]['value']);
        }
        return prop_value_list;
    };
    GraphexpService.prototype.idIndex = function (list, elem) {
        // find the element in list with id equal to elem
        // return its index or null if there is no
        for (var i = 0; i < list.length; i++) {
            if (list[i].id === elem) {
                return i;
            }
        }
        return null;
    };
    GraphexpService.prototype.make_properties_list = function (data) {
        var prop_dic = {};
        for (var _i = 0, _a = Object.keys(data); _i < _a.length; _i++) {
            var prop_str = _a[_i];
            prop_str = prop_str.replace(/[\[\ \"\'\]]/g, ''); // get rid of symbols [,",',] and spaces
            var prop_list = prop_str.split(',');
            for (var prop_idx = 0; prop_idx < prop_list.length; prop_idx++) {
                prop_dic[prop_list[prop_idx]] = 0;
            }
        }
        var properties_list = [];
        for (var _b = 0, _c = Object.getOwnPropertyNames(prop_dic); _b < _c.length; _b++) {
            var key = _c[_b];
            properties_list.push(key);
        }
        return properties_list;
    };
    GraphexpService.prototype.isInt = function (value) {
        return !isNaN(value) &&
            !isNaN(parseInt(value, 10));
    };
    GraphexpService.prototype.updateSelection = function (edge) {
        console.log('graphexpService#updateSelection: edge selected: ' + edge.id);
    };
    GraphexpService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])(),
        __metadata("design:paramtypes", [Object])
    ], GraphexpService);
    return GraphexpService;
}());



/***/ }),

/***/ "../../../../../src/app/modules/graphexp/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__graphexp_module__ = __webpack_require__("../../../../../src/app/modules/graphexp/graphexp.module.ts");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__graphexp_module__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__graphViz_graphConfig__ = __webpack_require__("../../../../../src/app/modules/graphexp/graphViz/graphConfig.ts");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__graphViz_graphConfig__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__graphexp_component__ = __webpack_require__("../../../../../src/app/modules/graphexp/graphexp.component.ts");
/* unused harmony reexport GraphexpComponent */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__graphexp_service__ = __webpack_require__("../../../../../src/app/modules/graphexp/graphexp.service.ts");
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_3__graphexp_service__["a"]; });






/***/ }),

/***/ "../../../../../src/app/modules/graphexp/link-edit/link-edit.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/modules/graphexp/link-edit/link-edit.component.html":
/***/ (function(module, exports) {

module.exports = "<h2 mat-dialog-title>Edit Link</h2>\n<mat-dialog-content>\n\t<div fxLayout fxLayoutAlign=\"start center\" fxLayoutGap=\"1em\">\n\t\t<mat-input-container>\n\t\t\t<mat-select [(ngModel)]=\"data.item.label\" placeholder=\"Label\">\n\t\t\t\t<mat-option *ngFor=\"let item of data.labels\" [value]=\"item\">{{item}}</mat-option>\n\t\t\t</mat-select>\n\t\t</mat-input-container>\n\t\t<div>\n\t\t\t<button mat-raised-button (click)=\"createProperty()\"><mat-icon>add</mat-icon>Add Property</button>\n\t\t</div>\n\t</div>\n\t\n\t\n\t<div fxLayout fxLayoutGap=\"1em\" *ngFor=\"let item of data.item.properties\">\n\t\t<mat-input-container>\n\t\t\t<input matInput placeholder=\"property name\" [(ngModel)]=\"item.key\">\n\t\t</mat-input-container>\n\t\t<mat-input-container>\n\t\t\t<input matInput placeholder=\"property value\" [(ngModel)]=\"item.value\">\n\t\t</mat-input-container>\n\t</div>\n</mat-dialog-content>\n<mat-dialog-actions>\n\t<button mat-button mat-dialog-close>Cancel</button>\n\t<!-- The mat-dialog-close directive optionally accepts a value as a result for the dialog. -->\n\t<button mat-button [mat-dialog-close]=\"data.item\">Confirm</button>\n</mat-dialog-actions>"

/***/ }),

/***/ "../../../../../src/app/modules/graphexp/link-edit/link-edit.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LinkEditComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};


var LinkEditComponent = /** @class */ (function () {
    function LinkEditComponent(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
    }
    LinkEditComponent.prototype.createProperty = function () {
        this.data.item.properties.push({ key: '', value: '' });
    };
    LinkEditComponent.prototype.ngOnInit = function () {
    };
    LinkEditComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'sv-link-edit',
            template: __webpack_require__("../../../../../src/app/modules/graphexp/link-edit/link-edit.component.html"),
            styles: [__webpack_require__("../../../../../src/app/modules/graphexp/link-edit/link-edit.component.css")]
        }),
        __param(1, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Inject */])(__WEBPACK_IMPORTED_MODULE_1__angular_material__["a" /* MAT_DIALOG_DATA */])),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_material__["f" /* MatDialogRef */], Object])
    ], LinkEditComponent);
    return LinkEditComponent;
}());



/***/ }),

/***/ "../../../../../src/app/modules/graphexp/node-edit/node-edit.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/modules/graphexp/node-edit/node-edit.component.html":
/***/ (function(module, exports) {

module.exports = "<h2 mat-dialog-title>Edit Node</h2>\n<mat-dialog-content>\n\t<div fxLayout fxLayoutAlign=\"start center\" fxLayoutGap=\"1em\">\n\t\t<mat-input-container>\n\t\t\t<mat-select [(ngModel)]=\"data.item.label\" placeholder=\"Label\">\n\t\t\t\t<mat-option *ngFor=\"let item of data.labels\" [value]=\"item\">{{item}}</mat-option>\n\t\t\t</mat-select>\n\t\t</mat-input-container>\n\t\t<div>\n\t\t\t<button mat-raised-button (click)=\"createProperty()\"><mat-icon>add</mat-icon>Add Property</button>\n\t\t</div>\n\t</div>\n\t\n\t\n\t<div fxLayout fxLayoutGap=\"1em\" *ngFor=\"let item of data.item.properties\">\n\t\t<mat-input-container>\n\t\t\t<input #propertyName matInput placeholder=\"property name\" [(ngModel)]=\"item.key\" />\n\t\t</mat-input-container>\n\t\t<mat-input-container>\n\t\t\t<input #propertyValue matInput placeholder=\"property value\" [(ngModel)]=\"item.value\" />\n\t\t</mat-input-container>\n\t</div>\n</mat-dialog-content>\n<mat-dialog-actions>\n\t<button mat-button mat-dialog-close>Cancel</button>\n\t<!-- The mat-dialog-close directive optionally accepts a value as a result for the dialog. -->\n\t<button mat-button [mat-dialog-close]=\"data.item\">Confirm</button>\n</mat-dialog-actions>"

/***/ }),

/***/ "../../../../../src/app/modules/graphexp/node-edit/node-edit.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NodeEditComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__graphexp_service__ = __webpack_require__("../../../../../src/app/modules/graphexp/graphexp.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_material__ = __webpack_require__("../../../material/esm5/material.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};



var NodeEditComponent = /** @class */ (function () {
    function NodeEditComponent(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
    }
    NodeEditComponent.prototype.createProperty = function () {
        this.data.item.properties.push(new __WEBPACK_IMPORTED_MODULE_0__graphexp_service__["c" /* KV */]());
    };
    NodeEditComponent.prototype.ngOnInit = function () {
    };
    NodeEditComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["n" /* Component */])({
            selector: 'sv-node-edit',
            template: __webpack_require__("../../../../../src/app/modules/graphexp/node-edit/node-edit.component.html"),
            styles: [__webpack_require__("../../../../../src/app/modules/graphexp/node-edit/node-edit.component.css")]
        }),
        __param(1, Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["B" /* Inject */])(__WEBPACK_IMPORTED_MODULE_2__angular_material__["a" /* MAT_DIALOG_DATA */])),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_material__["f" /* MatDialogRef */], Object])
    ], NodeEditComponent);
    return NodeEditComponent;
}());



/***/ }),

/***/ "../../../../../src/app/modules/graphexp/nodes/d3Node.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return D3Node; });
var D3Node = /** @class */ (function () {
    function D3Node(options) {
        this.properties = {};
        Object.assign(this, options);
    }
    D3Node.prototype.addProperty = function (key, value) {
        this.properties[key] = value;
    };
    D3Node.prototype.removeProperty = function (key) {
        delete this.properties[key];
    };
    return D3Node;
}());



/***/ }),

/***/ "../../../../../src/app/modules/graphexp/nodes/gremlinLink.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GremlinLink; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__gremlinNode__ = __webpack_require__("../../../../../src/app/modules/graphexp/nodes/gremlinNode.ts");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();

var GremlinLink = /** @class */ (function (_super) {
    __extends(GremlinLink, _super);
    function GremlinLink() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return GremlinLink;
}(__WEBPACK_IMPORTED_MODULE_0__gremlinNode__["a" /* GremlinNode */]));



/***/ }),

/***/ "../../../../../src/app/modules/graphexp/nodes/gremlinNode.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GremlinNode; });
var GremlinNode = /** @class */ (function () {
    function GremlinNode() {
        this.label = '';
        this.properties = [];
    }
    return GremlinNode;
}());



/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false
};


/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/esm5/platform-browser-dynamic.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_18" /* enableProdMode */])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);


/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map