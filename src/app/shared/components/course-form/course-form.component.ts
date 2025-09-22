import { Component, ElementRef, ViewChild } from '@angular/core';
import {
  FormArray,
  FormBuilder, FormControl, FormGroup,
  Validators
} from '@angular/forms';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})

export class CourseFormComponent {
  submitted = false;

  constructor(public fb: FormBuilder, public library: FaIconLibrary) {
    library.addIconPacks(fas);
  }
  courseForm!: FormGroup;

  @ViewChild('courseFormRef') courseFormRef!: ElementRef<HTMLFormElement>;

  ngOnInit() {
    this.courseForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.minLength(2)]],
      duration: [null, [Validators.required, Validators.min(0)]],
      authors: this.fb.array<FormControl<string>>([]),
      courseAuthors: this.fb.array<FormControl<string>>([]),
      newAuthor: this.fb.group({
        name: ['', [Validators.pattern(/^[a-zA-Z0-9 ]+$/), Validators.minLength(2)]]
      }),
    });
  }

  get authors(): FormArray {
    return this.courseForm.get('authors') as FormArray;
  }

  get courseAuthors(): FormArray {
    return this.courseForm.get('courseAuthors') as FormArray;
  }

  get newAuthorName() {
    return this.courseForm.get('newAuthor.name');
  }

  createAuthor(): void {
    const nameControl = this.courseForm.get('newAuthor.name') as FormControl<string>;;

    if (nameControl?.invalid) {
      nameControl.markAsTouched();
      return;
    }

    const newAuthorName = nameControl?.value.trim();
    if (!newAuthorName) return;

    this.authors.push(this.fb.control(newAuthorName));
    nameControl.reset();
  }

  addAuthor(index: number): void {
    const authorControl = this.authors.at(index);
    if (authorControl) {
      this.courseAuthors.push(this.fb.control(authorControl.value));
      this.authors.removeAt(index);
    }
  }

  removeAuthorFromList(index: number): void {
    this.authors.removeAt(index);
  }

  removeAuthorFromCourse(index: number): void {
    const removedAuthor = this.courseAuthors.at(index)?.value;

    if (removedAuthor) {
      this.authors.push(this.fb.control(removedAuthor));
    }
    this.courseAuthors.removeAt(index);
  }

  isInvalid(controlName: string) {
    const control = this.courseForm.get(controlName);
    return (control && control.invalid && (control.touched || control.dirty || this.submitted));
  }

  onSubmit() {
    this.submitted = true;

    if (this.courseForm.valid) {
      console.log('Form submitted:', this.courseForm.value);
    } else {
      console.log('Form invalid');
      this.courseForm.markAllAsTouched();
    }
  }

  onCancel() {
    this.courseForm.reset();
    this.submitted = false;
  }
}
