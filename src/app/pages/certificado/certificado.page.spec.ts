import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificadoPage } from './certificado.page';

describe('CertificadoPage', () => {
  let component: CertificadoPage;
  let fixture: ComponentFixture<CertificadoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CertificadoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificadoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
