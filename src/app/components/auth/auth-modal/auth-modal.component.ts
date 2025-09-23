import { Component, computed, DestroyRef, effect, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { controlMatchValidator } from '../../../validators/password-match.validator';
import { AuthService } from '../../../services/auth/auth.service';
import { MatButtonModule } from '@angular/material/button';

enum AuthMode {
  signup = 'signup',
  signin = 'signin',
} 

@Component({
  selector: 'app-auth-modal',
  imports: [MatFormFieldModule, MatInputModule, MatDialogModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './auth-modal.component.html',
  styleUrl: './auth-modal.component.scss'
})
export class AuthModalComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private destroyRef = inject(DestroyRef);
  private dialogRef = inject(MatDialogRef<AuthModalComponent>);

  authModeSwitcher = signal(AuthMode.signin);
  isSigninMode = computed(() => this.authModeSwitcher() === AuthMode.signin)

  form = this.fb.group({
    email: this.fb.control('', [Validators.required, Validators.email]),
    password: this.fb.control('', [Validators.required, Validators.minLength(6)]),
  });

  constructor() {
    effect(() => {
      if (this.authModeSwitcher() === AuthMode.signup) {
        (this.form as FormGroup).addControl('confirmPassword', this.fb.control('', [Validators.required]));
        this.form.setValidators(controlMatchValidator('password', 'confirmPassword'));
        this.form.updateValueAndValidity();
      }

      if (this.authModeSwitcher() === AuthMode.signin && this.form.contains('confirmPassword')) {
        this.form.clearValidators();
        (this.form as FormGroup).removeControl('confirmPassword');
        this.form.updateValueAndValidity();
      }
    })
  }

  onSwitchAuthMode(): void {
    const currentMode = this.authModeSwitcher();
    this.authModeSwitcher.set(currentMode === AuthMode.signin ? AuthMode.signup : AuthMode.signin)

    this.form.reset();
  }

  onAuthenticate(): void {
    if (this.form.valid) {
      const currentMode = this.authModeSwitcher();
      const formData = this.form.getRawValue();

      this.authService.authenticate(currentMode, {
        email: formData.email as string,
        password: formData.password as string
      }).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
        this.dialogRef.close();
      });
    }
  }
}
