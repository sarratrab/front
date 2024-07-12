import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { User } from '../models/user.model';
import { UtilisateurService } from '../utilisateur.service';

@Component({
  selector: 'app-modifadmin',
  templateUrl: './modifadmin.component.html',
  styleUrls: ['./modifadmin.component.css']
})
export class ModifadminComponent implements OnChanges {
  @Input() user!: User;
  @Output() update = new EventEmitter<User>();
  formData: User = {} as User;

  constructor(private utilisateurService: UtilisateurService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['user'] && changes['user'].currentValue) {
      this.formData = { ...this.user };
    }
  }

  onSubmit(): void {
    this.update.emit(this.formData);
  }
}


