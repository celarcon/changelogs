import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VersionsChangesComponent } from './versions-changes.component';

describe('VersionsChangesComponent', () => {
  let component: VersionsChangesComponent;
  let fixture: ComponentFixture<VersionsChangesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VersionsChangesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VersionsChangesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
