import { Component, ElementRef, Renderer2, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements AfterViewInit {
  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngAfterViewInit() {
    // Code for toggling the menu
    const hamburger = this.el.nativeElement.querySelector('.hamburger-click');
    const menuOptions = this.el.nativeElement.querySelector('.menu-options');

    this.renderer.listen(hamburger, 'click', () => {
      if (menuOptions.style.display === "block") {
        menuOptions.style.display = "none";
      } else {
        menuOptions.style.display = "block";
      }
    });

    // Code for sticky navigation
    const nav = this.el.nativeElement.querySelector('.navbar');
    const scrollThreshold = 50; // Adjust this value as needed

    window.addEventListener('scroll', () => {
      if (window.scrollY >= scrollThreshold) {
        this.renderer.addClass(nav, 'sticky');
      } else {
        this.renderer.removeClass(nav, 'sticky');
      }
    });
  }
}
