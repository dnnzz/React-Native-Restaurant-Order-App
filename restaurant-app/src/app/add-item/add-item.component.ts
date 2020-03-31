import { Component, OnInit } from '@angular/core';
import { ItemService } from '../item.service';
@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {
  item = {
    name: '',
    price: '',
    quantity: '',
  };
  submitted = false;

  constructor(private itemService: ItemService) { }

  ngOnInit(): void {
  }
  saveItem() {
    const data = {
      name: this.item.name,
      price: this.item.price,
      quantity: this.item.quantity
    };

    this.itemService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

  newItem() {
    this.submitted = false;
    this.item = {
      name: '',
      price: '',
      quantity:'',
    };
  }

}
