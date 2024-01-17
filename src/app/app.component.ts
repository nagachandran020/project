import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Portal';

  currentImage = 0;
  backgroundImages = [
    'https://vectorlogoseek.com/wp-content/uploads/2019/03/srm-institute-of-science-and-technology-vector-logo.png',
    'https://vectorlogoseek.com/wp-content/uploads/2020/07/spam-brand-vector-logo.png'
    
    
  ];

  ngOnInit() {
    setInterval(() => {
      this.currentImage = (this.currentImage + 1) % this.backgroundImages.length;
    }, 5000); // change image every 5 seconds
  }


}
