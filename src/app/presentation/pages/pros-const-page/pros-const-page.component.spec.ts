import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProsConstPageComponent } from './pros-const-page.component';

describe('ProsConstPageComponent', () => {
  let component: ProsConstPageComponent;
  let fixture: ComponentFixture<ProsConstPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProsConstPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProsConstPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
