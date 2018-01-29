import { Component, OnInit } from '@angular/core';
import { GremlinService, GremlinClientOptions } from '@savantly/gremlin-js';

@Component({
  selector: 'sv-graphexp',
  templateUrl: './graphexp.component.html',
  styleUrls: ['./graphexp.component.css']
})
export class GraphexpComponent implements OnInit {

  gremlin: GremlinService = new GremlinService();
  query = '';

  submit() {
    this.gremlin.sendMessage(this.query, (data) => {
      console.log(data.rawMessage);
    });
  }

  constructor() {
    const options = new GremlinClientOptions();
    this.gremlin.createConnection(options);
  }

  ngOnInit() {
  }

}
