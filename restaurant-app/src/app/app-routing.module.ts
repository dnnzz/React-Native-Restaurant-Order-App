import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemsListComponent } from './items-list/items-list.component';
import { AddItemComponent } from './add-item/add-item.component';
import { EditItemComponent } from './edit-item/edit-item.component';


const routes: Routes = [
  { path:  '', pathMatch:  'full', redirectTo:  'menu'},
  { path: 'menu', component: ItemsListComponent},
  { path: 'create', component: AddItemComponent},
  { path: 'edit/:id', component: EditItemComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
