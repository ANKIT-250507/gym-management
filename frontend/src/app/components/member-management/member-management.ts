import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MemberService } from '../../services/member.service';

@Component({
  selector: 'app-member-management',
  standalone: true,
  imports: [CommonModule,
    FormsModule
  ],
  templateUrl: './member-management.html',
  styleUrl: './member-management.css',
})
export class MemberManagement implements OnInit {

  members: any[] = [];
  filteredMembers: any[] = [];
  searchText = "";
  loading = true;

  constructor(private memberService: MemberService) { }

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers() {
    this.loading = true;

    this.memberService.getMembers().subscribe({
      next: (res: any) => {
        this.members = res;
        this.filteredMembers = res;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }
  showAddModal = false;

  newMember = {
    name: '',
    email: '',
    password: '',
    phone: '',
    age: '',
    gender: 'Male',
    height: '',
    weight: '',
    goal: 'Muscle Gain',
    activityLevel: 'Moderately Active'
  };
  addMember() {

    if (this.editingMember) {

      this.memberService.updateMember(
        this.selectedMemberId,
        this.newMember
      ).subscribe({

        next: () => {

          alert("Member Updated Successfully");

          this.showAddModal = false;

          this.editingMember = false;

          this.loadMembers();

        },

        error: (err) => {

          console.error(err);

        }

      });

      return;

    }

    this.memberService.addMember(this.newMember).subscribe({

      next: () => {

        alert("Member Added Successfully");

        this.showAddModal = false;

        this.loadMembers();

        this.newMember = {
          name: '',
          email: '',
          password: '',
          phone: '',
          age: '',
          gender: 'Male',
          height: '',
          weight: '',
          goal: 'Muscle Gain',
          activityLevel: 'Moderately Active'
        };

      },

      error: (err) => {

        console.error(err);

      }

    });

  }

  deleteMember(id: string) {

    const confirmDelete = confirm(
      "Are you sure you want to delete this member?"
    );

    if (!confirmDelete) return;

    this.memberService.deleteMember(id).subscribe({

      next: (res) => {

        alert(res.message);

        this.loadMembers();

      },

      error: (err) => {

        console.error(err);

        alert(err.error?.message || "Delete Failed");

      }

    });

  }
  editingMember = false;

  selectedMemberId = "";

  editMember(member: any) {

    this.editingMember = true;

    this.selectedMemberId = member._id;

    this.newMember = {

      name: member.name,
      email: member.email,
      password: "",
      phone: member.phone,
      age: member.age,
      gender: member.gender,
      height: member.height,
      weight: member.weight,
      goal: member.goal,
      activityLevel: member.activityLevel

    };

    this.showAddModal = true;

  }

  searchMembers() {

    const text = this.searchText.toLowerCase();

    this.filteredMembers = this.members.filter((member: any) => {

      return (

        member.name.toLowerCase().includes(text) ||

        member.email.toLowerCase().includes(text)

      );

    });

  }



}