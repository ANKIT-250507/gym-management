import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './settings.html',
  styleUrl: './settings.css'
})
export class Settings {

  gymName = 'PowerFit Gym';
  gymEmail = 'powerfit@gmail.com';
  gymPhone = '9876543210';

  notifications = true;
  membershipAlerts = true;
  holidayAlerts = true;

  saveSettings() {
    alert('Settings saved successfully!');
  }

  resetSettings() {
    this.gymName = 'PowerFit Gym';
    this.gymEmail = 'powerfit@gmail.com';
    this.gymPhone = '9876543210';

    this.notifications = true;
    this.membershipAlerts = true;
    this.holidayAlerts = true;
  }
}