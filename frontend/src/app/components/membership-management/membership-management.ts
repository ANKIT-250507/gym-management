import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MembershipService } from '../../services/membership.service';

@Component({
  selector: 'app-membership-management',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './membership-management.html',
  styleUrl: './membership-management.css'
})
export class MembershipManagement implements OnInit {

  memberships: any[] = [];
  members: any[] = [];
  activeCount = 0;
  expiredCount = 0;
  totalFees = 0;

  showModal = false;
  showRenewModal = false;

  editing = false;
  selectedId = '';

  loading = false;

  newMembership = {
    member: '',
    planName: '',
    duration: 1,
    fees: 0,
    paymentStatus: 'Pending',
    startDate: '',
    expiryDate: ''
  };

  renewData = {
    duration: 1,
    fees: 0,
    expiryDate: ''
  };

  constructor(
    private membershipService: MembershipService
  ) { }

  ngOnInit(): void {
    this.loadMemberships();
    this.loadMembers();
  }

  loadMemberships() {

    this.membershipService.getMemberships().subscribe({

      next: (res: any) => {

        console.log("Membership Response:", res);

        this.memberships =
          res.memberships ||
          res.members ||
          res ||
          [];

      },

      error: (err) => {

        console.error("Membership Error:", err);

      }

    });

  }

  loadMembers(): void {

    this.membershipService.getMembers().subscribe({

      next: (res: any) => {

        console.log("MEMBERS RESPONSE:", res);

        this.members =
          res.members ||
          res.users ||
          res.data ||
          [];

        console.log("MEMBERS ARRAY:", this.members);

      },

      error: (err) => {

        console.error("Members Error:", err);

      }

    });

  }

  openAddModal(): void {

    this.editing = false;

    this.selectedId = '';

    this.resetForm();

    this.showModal = true;

  }

  editMembership(membership: any): void {

    this.editing = true;

    this.selectedId = membership._id;

    this.newMembership = {

      member: membership.member?._id || membership.member || '',

      planName: membership.planName || '',

      duration: membership.duration || 1,

      fees: membership.fees || 0,

      paymentStatus: membership.paymentStatus || 'Pending',

      startDate: this.formatDate(membership.startDate),

      expiryDate: this.formatDate(membership.expiryDate)

    };

    this.showModal = true;

  }

  saveMembership(): void {

    if (
      !this.newMembership.member ||
      !this.newMembership.planName ||
      !this.newMembership.duration ||
      !this.newMembership.fees ||
      !this.newMembership.expiryDate
    ) {

      alert('Please fill all required fields');

      return;

    }

    this.loading = true;

    if (this.editing) {

      this.membershipService
        .updateMembership(
          this.selectedId,
          this.newMembership
        )
        .subscribe({

          next: () => {

            alert('Membership Updated Successfully');

            this.closeModal();

            this.loadMemberships();

          },

          error: (err) => {

            console.error(err);

            alert(
              err.error?.message ||
              'Failed to update membership'
            );

            this.loading = false;

          }

        });

    } else {

      this.membershipService
        .createMembership(this.newMembership)
        .subscribe({

          next: () => {

            alert('Membership Created Successfully');

            this.closeModal();

            this.loadMemberships();

          },

          error: (err) => {

            console.error(err);

            alert(
              err.error?.message ||
              'Failed to create membership'
            );

            this.loading = false;

          }

        });

    }

  }

  openRenewModal(membership: any): void {

    this.selectedId = membership._id;

    this.renewData = {

      duration: membership.duration || 1,

      fees: membership.fees || 0,

      expiryDate: this.formatDate(membership.expiryDate)

    };

    this.showRenewModal = true;

  }

  renewMembership(): void {

    if (!this.renewData.duration) {

      alert('Enter duration');

      return;

    }

    this.membershipService
      .renewMembership(
        this.selectedId,
        this.renewData
      )
      .subscribe({

        next: () => {

          alert('Membership Renewed Successfully');

          this.showRenewModal = false;

          this.loadMemberships();

        },

        error: (err) => {

          console.error(err);

          alert(
            err.error?.message ||
            'Failed to renew membership'
          );

        }

      });

  }

  deleteMembership(id: string): void {

    if (!confirm('Are you sure you want to delete this membership?')) {
      return;
    }

    this.membershipService
      .deleteMembership(id)
      .subscribe({

        next: () => {

          alert('Membership Deleted Successfully');

          this.loadMemberships();

        },

        error: (err) => {

          console.error(err);

          alert(
            err.error?.message ||
            'Failed to delete membership'
          );

        }

      });

  }

  isExpired(expiryDate: string): boolean {

    return new Date(expiryDate) < new Date();

  }

  closeModal(): void {

    this.showModal = false;

    this.loading = false;

    this.editing = false;

  }

  resetForm(): void {

    this.newMembership = {

      member: '',

      planName: '',

      duration: 1,

      fees: 0,

      paymentStatus: 'Pending',

      startDate: '',

      expiryDate: ''

    };

  }

  formatDate(date: string): string {

    if (!date) {
      return '';
    }

    return new Date(date)
      .toISOString()
      .split('T')[0];

  }

}