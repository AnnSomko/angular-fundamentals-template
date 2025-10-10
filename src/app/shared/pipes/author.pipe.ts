import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'authorNames',
})
export class AuthorNamesPipe implements PipeTransform {
  transform(authorIds: string[]): string {
    if (!authorIds || !Array.isArray(authorIds) || authorIds.length === 0) {
      return 'Authors';
    }

    return authorIds
      .map((authorId) => {
        if (!authorId || typeof authorId !== 'string') {
          return 'Unknown Author';
        }
        return authorId;
      })
      .join(", ");
  }
}