import { Component, OnInit } from '@angular/core';
import { PromotionService } from '../promotion.service';
import { Promotion } from '../models/promotion.model';

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['./promotions.component.css']
})
export class PromotionsComponent implements OnInit {
  promotions: Promotion[] = [];

  constructor(private promotionService: PromotionService) { }

  ngOnInit(): void {
    this.fetchPromotions();
  }

  fetchPromotions(): void {
    this.promotionService.getAllPromotions().subscribe(data => {
      this.promotions = data;
    });
  }
}
