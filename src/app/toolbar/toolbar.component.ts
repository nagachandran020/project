import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  constructor(public authService: AuthService){

  }
  showProfile = false;
  currentImage = 0;
  backgroundImages = [
    'https://vectorlogoseek.com/wp-content/uploads/2019/03/srm-institute-of-science-and-technology-vector-logo.png',
    'https://vectorlogoseek.com/wp-content/uploads/2020/07/spam-brand-vector-logo.png'
    
    
  ];

  ngOnInit() {
    var data:any = this.authService.localStorager();
    if (data !== null) {
      this.authService.userDetails = JSON.parse(data);
    }
  }

  toggleProfile(){
    console.log('jdjdj');
    this.showProfile = !this.showProfile
  }

  logout(){
    console.log('logout--->')
    this.authService.logout();
  }



  

}
