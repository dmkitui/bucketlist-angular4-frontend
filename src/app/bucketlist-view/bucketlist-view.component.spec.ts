import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BucketlistViewComponent } from './bucketlist-view.component';

describe('BucketlistViewComponent', () => {
  let component: BucketlistViewComponent;
  let fixture: ComponentFixture<BucketlistViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BucketlistViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BucketlistViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
