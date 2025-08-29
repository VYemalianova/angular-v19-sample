import { DestroyRef, Injectable, signal } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';

const MIN_COMPATIBLE_WIDTH = '1000px';

@Injectable({
  providedIn: 'root'
})
export class BreakpointService {
  isMobile = signal(false);

  constructor(
    private readonly breakpointObserver: BreakpointObserver,
    destroyRef: DestroyRef,
  ) {
     this.breakpointObserver
      .observe([`(max-width: ${MIN_COMPATIBLE_WIDTH})`])
      .pipe(
        takeUntilDestroyed(destroyRef),
        map(result => result.matches),
      ).subscribe(res => this.isMobile.set(res))
  }
}
