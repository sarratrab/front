import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UtilisateurService } from '../utilisateur.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-utilisateursadmin',
  templateUrl: './utilisateursadmin.component.html',
  styleUrls: ['./utilisateursadmin.component.css']
})
export class UtilisateursadminComponent implements OnInit {
  utilisateurs: User[] = [];
  selectedUser?: User;
  searchTerm: string = '';
  users: User[] = [];
  filteredUsers: User[] = [];
  userRoles = [
    { key: 'garagiste', label: 'Garagistes' },
    { key: 'clientpro', label: 'Clients Pro' },
    { key: 'clientprivate', label: 'Clients Private' },
  ];
  constructor(
    private toastr: ToastrService,
    private utilisateurService: UtilisateurService
  ) { }

  ngOnInit(): void {
    this.fetchUsers();

    
  }

  fetchUsers(): void {
    this.utilisateurService.getAllUsers().subscribe(data => {
      let deletedUsers = JSON.parse(sessionStorage.getItem('deletedUsers') || '[]');
      this.users = data.filter(user => !deletedUsers.includes(user._id));
      this.filteredUsers = this.users;
    });
  }
  filterUsersByRole(role: string): User[] {
    return this.users.filter(user => user.role === role);
  }
  removeUser(user: User): void {
    this.users = this.users.filter(u => u !== user);
    this.filteredUsers = this.filteredUsers.filter(u => u !== user);

    let deletedUsers = JSON.parse(sessionStorage.getItem('deletedUsers') || '[]');
    deletedUsers.push(user._id);
    sessionStorage.setItem('deletedUsers', JSON.stringify(deletedUsers));
  }

  filterUsers(): void {
    console.log('Search Term:', this.searchTerm); // Ajoutez cette ligne
    if (this.searchTerm) {
      this.filteredUsers = this.users.filter(user =>
        user.nom.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        user.prenom.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredUsers = this.users;
    }
    console.log('Filtered Users:', this.filteredUsers); // Ajoutez cette ligne
  }

  getAllUsers() {
    this.utilisateurService.getAllUsers().subscribe(
      (res: User[]) => {
        let deletedUsers = JSON.parse(sessionStorage.getItem('deletedUsers') || '[]');
        this.utilisateurs = res.filter(user => !deletedUsers.includes(user._id));
      },
      (err: any) => {
        console.error('Error fetching users:', err);
        this.toastr.error('Error fetching users', 'Error');
      }
    );
  }

  delete(userId: string) {
    this.utilisateurService.deleteUser(userId).subscribe(
      (res) => {
        console.log('User deleted successfully');
        this.getAllUsers(); // Pour rafraîchir la liste des utilisateurs
      },
      (err) => {
        console.error('Error deleting user', err);
      }
    );
  }

  editUser(user: User): void {
    this.selectedUser = { ...user };
  }

  updateUser(updatedUser: User): void {
    this.utilisateurService.updateUser(updatedUser).subscribe(() => {
      this.utilisateurs = this.utilisateurs.map(user => user._id === updatedUser._id ? updatedUser : user);
      this.selectedUser = undefined; // Clear the selected user after updating
    });
  }

  showForm = false; // État pour gérer la visibilité du formulaire

  toggleForm() {
    this.showForm = !this.showForm;
  }
}
