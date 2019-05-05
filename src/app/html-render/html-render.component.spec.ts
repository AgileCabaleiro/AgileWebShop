import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HtmlRenderComponent } from './html-render.component';

describe('HtmlRenderComponent', () => {
  let component: HtmlRenderComponent;
  let fixture: ComponentFixture<HtmlRenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HtmlRenderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HtmlRenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
