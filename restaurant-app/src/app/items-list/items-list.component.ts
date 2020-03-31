import { Component, OnInit } from '@angular/core';
import { ItemService } from '../item.service';

import { HttpClient } from  "@angular/common/http";
import { Router } from '@angular/router';

@Component({
  selector: 'app-items-list,[itemslist]',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.css']
})
export class ItemsListComponent implements OnInit {
  items = [];


  constructor(private itemService: ItemService,
    private router: Router) { 
  }

  ngOnInit(): void {
    this.loadItems()  
  }
  loadItems() {
    this.itemService.getItems()
      .subscribe((data:any[])=>{
        console.log(data);
        this.items=data; 
      }   
      );
  }
  deleteItem(id){
    this.itemService.delete(id)
    .subscribe(
      response => {
        console.log(response);
        window.location.reload();
      },
      error => {
        console.log(error);
      });
  }
}
