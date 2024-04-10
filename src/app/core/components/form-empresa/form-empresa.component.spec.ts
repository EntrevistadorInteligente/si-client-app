import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEmpresaComponent } from './form-empresa.component';

describe('FormEmpresaComponent', () => {
  let component: FormEmpresaComponent;
  let fixture: ComponentFixture<FormEmpresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormEmpresaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
