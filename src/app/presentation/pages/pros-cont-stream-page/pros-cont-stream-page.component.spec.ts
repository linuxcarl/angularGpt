import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProsContStreamPageComponent } from './pros-cont-stream-page.component';

describe('ProsContStreamPageComponent', () => {
  let component: ProsContStreamPageComponent;
  let fixture: ComponentFixture<ProsContStreamPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProsContStreamPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProsContStreamPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
