import { Component } from '@angular/core';
import { MenuComponent, MenuService, Menu } from './modules/menu';

@Component({
  selector: 'sv-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor (private menuService: MenuService) {
    const menuItem = new Menu({
      id: 'example',
      text: 'test',
      isPublic: true,
      roles: ['*'],
      items: [],
      position: 0,
      disabled: false,
      icon: 'menu',
      callback: () => {}
    });

    const subMenuItem = new Menu({
      id: 'sub-example',
      text: 'test submenu',
      isPublic: true,
      roles: ['*'],
      items: [],
      position: 0,
      disabled: false,
      icon: 'andriod',
      callback: () => {console.log('submenu callback')}
    });

    const subSubMenuItem = new Menu({
      id: 'sub-sub-example',
      text: 'test sub submenu',
      isPublic: true,
      roles: ['*'],
      items: [],
      position: 0,
      disabled: false,
      icon: 'bookmark',
      callback: () => {
        console.log('subsubmenu callback');
        return new Promise(function(resolve, reject){
         resolve('done');
        });
      }
    });

//    subMenuItem.items.push(subSubMenuItem);
//    menuItem.items.push(subMenuItem);
//
//    menuService.addMenu(menuItem);
//    console.log(menuItem);
  }

}
