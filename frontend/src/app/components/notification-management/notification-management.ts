import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-notification-management',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './notification-management.html',
  styleUrl: './notification-management.css'
})
export class NotificationManagement implements OnInit {

  notifications: any[] = [];

  loading = true;

  showModal = false;

  newNotification = {

    title: "",

    message: "",

    type: "General"

  };

  constructor(
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {

    this.loadNotifications();

  }

  loadNotifications() {

    this.loading = true;

    this.notificationService.getNotifications().subscribe({

      next: (res: any) => {

        this.notifications = res.notifications;

        this.loading = false;

      },

      error: (err) => {

        console.error(err);

        this.loading = false;

      }

    });

  }

  addNotification() {

    this.notificationService.addNotification(

      this.newNotification

    ).subscribe({

      next: () => {

        alert("Notification Created Successfully");

        this.showModal = false;

        this.loadNotifications();

        this.newNotification = {

          title: "",

          message: "",

          type: "General"

        };

      },

      error: (err) => {

        console.error(err);

        alert(err.error?.message || "Failed");

      }

    });

  }

  deleteNotification(id: string) {

    const confirmDelete = confirm(
      "Delete this notification?"
    );

    if (!confirmDelete) return;

    this.notificationService.deleteNotification(id).subscribe({

      next: (res: any) => {

        alert(res.message);

        this.loadNotifications();

      },

      error: (err) => {

        console.error(err);

        alert(err.error?.message || "Delete Failed");

      }

    });

  }

}