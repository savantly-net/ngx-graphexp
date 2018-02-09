import { GraphConfig, GraphexpService } from '@savantly/ngx-graphexp';
import { Component } from '@angular/core';

@Component({
  selector: 'sv-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  graphConfig: GraphConfig = new GraphConfig();

  constructor (public service: GraphexpService) {
    this.graphConfig.nodeLabels = ['god', 'titan', 'demigod', 'human', 'monster', 'location'];
    this.graphConfig.linkLabels = ['is_father_of', 'has_pet', 'lives_in'];
  }

}
