export class Collection<T> {
  constructor(
    public resources: T[],
    public nextPageToken: string | null = null,
  ) {}
}
