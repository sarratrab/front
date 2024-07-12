import { Component, OnInit } from '@angular/core';
import { PromotionService } from '../promotion.service';
import { Promotion } from '../models/promotion.model';

@Component({
  selector: 'app-promotionsadmin',
  templateUrl: './promotionsadmin.component.html',
  styleUrls: ['./promotionsadmin.component.css']
})
export class PromotionsadminComponent implements OnInit {
  promotions: Promotion[] = [];
  newPromotion: Promotion = { _id: '', price: 0, description: '' };

  constructor(private promotionService: PromotionService) { }

  ngOnInit(): void {
    this.fetchPromotions();
  }

  fetchPromotions(): void {
    this.promotionService.getAllPromotions().subscribe(data => {
      this.promotions = data;
    });
  }

  addPromotion(): void {
    this.promotionService.addPromotion(this.newPromotion).subscribe(data => {
      this.promotions.push(data);
      this.newPromotion = { _id: '', price: 0, description: '' };
    });
  }

  deletePromotion(id: string): void {
    this.promotionService.deletePromotion(id).subscribe(    (res) => {
      console.log(' deleted successfully');
      this.promotionService.getAllPromotions(); 
    },
    (err) => {
      console.error('Error deleting ', err);
    }
  );
}
}
