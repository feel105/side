import { Component } from '@angular/core';
import { FCM } from '@awesome-cordova-plugins/fcm/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Inbox', url: '/folder/Inbox', icon: 'mail' },
    { title: 'Outbox', url: '/folder/Outbox', icon: 'paper-plane' },
    { title: 'Favorites', url: '/folder/Favorites', icon: 'heart' },
    { title: 'Archived', url: '/folder/Archived', icon: 'archive' },
    { title: 'Trash', url: '/folder/Trash', icon: 'trash' },
    { title: 'Spam', url: '/folder/Spam', icon: 'warning' },
    { title: 'test', url: '/test/test', icon: 'warning' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor(private fcm: FCM) {
    this.fcm.subscribeToTopic('marketing');
    this.fcm.getToken().then((token) => {
      // backend.registerToken(token);
    });

    this.fcm.onNotification().subscribe((data) => {
      if (data.wasTapped) {
        console.log('Received in background');
      } else {
        console.log('Received in foreground');
      }
    });

    this.fcm.onTokenRefresh().subscribe((token) => {
      //backend.registerToken(token);
    });

    this.fcm.hasPermission().then((hasPermission) => {
      if (hasPermission) {
        console.log('Has permission!');
      }
    });

    this.fcm.clearAllNotifications();

    this.fcm.unsubscribeFromTopic('marketing');
  }
}
