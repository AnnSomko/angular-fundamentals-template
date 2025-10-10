export interface Course {
    id: string;
    title: string;
    description: string;
    duration: number;
    authors: string[];
    creationDate: string | Date;
}

export type CoursesResponse = {
  successful: boolean;
  result: Course[];
};

export type CourseResponse = {
  successful: boolean;
  result: Course;
};