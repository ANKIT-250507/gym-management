import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-member',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './member.html',
  styleUrl: './member.css'
})
export class Member implements OnInit {

  members: any[] = [];

  filteredMembers: any[] = [];

  loading = false;

  ngOnInit(): void {

    this.filteredMembers = this.members;

  }

}