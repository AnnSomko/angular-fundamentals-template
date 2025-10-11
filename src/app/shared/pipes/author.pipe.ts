import { Pipe, PipeTransform } from "@angular/core";
import { Author } from "@app/models/author.model";

@Pipe({
  name: 'authorNames',
})
export class AuthorNamesPipe implements PipeTransform {
  transform(authorIds: string[], authors: Author[]): string {
    if (!authorIds || !Array.isArray(authorIds) || authorIds.length === 0) {
      return 'Authors';
    }

    const names = authorIds.map(id => {
      const author = authors.find(a => a.id === id);
      return author ? author.name : 'Unknown Author';
    });

    return names.join(", ");
  }
}