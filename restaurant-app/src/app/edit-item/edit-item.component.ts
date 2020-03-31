import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { ItemService } from '../item.service';
@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit {
  item = {
    name: '',
    price: '',
    quantity: '',
  };

  public id:any;

  message = "";

  submitted = false;
  
  constructor(private route: ActivatedRoute,
    private itemService: ItemService,
    private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
  }
  updateItem(){
    const data = {
      name: this.item.name,
      price: this.item.price,
      quantity: this.item.quantity
    };
    let id = this.route.snapshot.paramMap.get('id');
    this.itemService.update(id,data).subscribe(
      response =>{
        console.log(response);
        this.message = "Başarıyla güncellendi.";
        this.submitted = true;
      },
      error =>{
        console.log(error);
        this.message = "Başarıyla güncellendi.";
        this.router.navigateByUrl('/menu');
        this.submitted = true;
      }
    );
  }

}
