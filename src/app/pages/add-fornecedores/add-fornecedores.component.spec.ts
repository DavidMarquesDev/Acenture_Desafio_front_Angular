import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFornecedoresComponent } from './add-fornecedores.component';

describe('AddFornecedoresComponent', () => {
  let component: AddFornecedoresComponent;
  let fixture: ComponentFixture<AddFornecedoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFornecedoresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFornecedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
