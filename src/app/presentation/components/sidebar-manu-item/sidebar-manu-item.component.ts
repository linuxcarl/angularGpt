import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar-manu-item',
  standalone: true,
  imports: [RouterModule],
  template: `
    <a 
      [routerLink]="path" 
      routerLinkActive="bg-gray-8"
      class="flex  intems-center hover:bg-gray-800 rounded-md p-2 transition-colors duration-300"
     > 
        <i class="{{ icon }} text-2xl text-indigo-400"></i> 
        <div class="text-white text-lg ml-3 font-semibold">{{title}}
        <div class="text-gray-400 text-xs">{{description}}</div></div>
       
    </a>
  `,
})
export class SidebarManuItemComponent {
  @Input({ required: true }) icon!: string;
  @Input({ required: true }) title!: string;
  @Input({ required: true }) description!: string;
  @Input({ required: true }) path!: string;
}
