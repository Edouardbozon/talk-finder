export class CollectionParameters {
  constructor(
    public nextPageToken: string | null = null,
    public limit: number = 5,
  ) { }
}
