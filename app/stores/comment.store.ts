import { Observable } from 'rxjs/Rx';
import { Comment } from '../models';
import { CollectionStore } from '../engine/store';

export class CommentStore extends CollectionStore<Comment> {
  constructor() {
    super(Comment);
  }

  private sortByTime(a, b) {
    var x = a.createdAt;
    var y = b.createdAt;
    return x > y ? -1 : x < y ? 1 : 0;
  }

  get comments$(): Observable<Array<Comment>> {
    return this.state$.map(c => c.sort(this.sortByTime));
  }
}
