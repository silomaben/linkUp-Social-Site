import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavbarComponent]
    });
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle menuOptions display on hamburger click', () => {
    const hamburger = fixture.nativeElement.querySelector('.hamburger-click');
    const menuOptions = fixture.nativeElement.querySelector('.menu-options');
    
  
    expect(menuOptions.style.display).toBe('none');
    
    hamburger.click();
    fixture.detectChanges();

    expect(menuOptions.style.display).toBe('block');
    
    hamburger.click();
    fixture.detectChanges();
  
    expect(menuOptions.style.display).toBe('none');
  });
  
});
