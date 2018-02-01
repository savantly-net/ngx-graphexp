import { GraphexpService } from './modules/graphexp/graphexp.service';
import { Component } from '@angular/core';

@Component({
  selector: 'sv-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor (public service: GraphexpService) {


//    subMenuItem.items.push(subSubMenuItem);
//    menuItem.items.push(subMenuItem);
//
//    menuService.addMenu(menuItem);
//    console.log(menuItem);
  }

}
